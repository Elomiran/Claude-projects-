import { describe, expect, it } from "vitest";
import { preFilter } from "../src/jobs/hardFilters.js";
import type { Job } from "../src/jobs/normalize.js";
import { fitQuestions, scoreFromAnswers } from "../src/jobs/rate.js";
import { SearchSchema, titleWanted } from "../src/profile/schema.js";
import type { Answer } from "../src/jev/types.js";

const now = new Date("2026-10-02T12:00:00Z");
const search = SearchSchema.parse({
  focus: "brand strategy, marketing management and creative direction",
  titleInclude: ["brand", "marketing manager", "creative director", "copywriter"],
  titleExclude: ["intern", "software", "sales"],
  levels: ["mid", "senior"],
  locationWeights: { international: 0.9 },
});
const job = (over: Partial<Job> = {}): Job => ({
  id: "j", source: "t", company: "Acme", title: "Brand Marketing Manager", url: "https://job-boards.greenhouse.io/acme/jobs/1", ats: "greenhouse",
  locations: ["Remote"], postedAt: "2026-10-01", terms: [], sponsorship: "unknown", degrees: [], category: null, ...over,
});
const noul = (v: number): Answer => ({ type: "noul", noul: v });
const choice = (c: string, confidence = 0.9): Answer => ({ type: "choice", choice: c, probabilities: { [c]: confidence }, confidence });
const score = (v: number): Answer => ({ type: "score", score: v, probabilities: {}, confidence: 0.9, legend: { "0": "none", "1": "weak", "2": "partial", "3": "strong", "4": "near exact" } });
const answers = (over: Record<string, Answer> = {}): Record<string, Answer> => ({
  is_software_role: noul(0.95), level: choice("mid"), is_unpaid: noul(0), needs_advanced_degree: noul(0), work_auth: choice("remote_global"),
  stack_match: score(3), experience_match: score(3), location_tier: choice("remote"), interview_practical: noul(0.2), callback_likelihood: score(3),
  needs_account: noul(0), requires_references: noul(0), ...over,
});

describe("a search that is not for software", () => {
  it("matches titles by the candidate's own words, and exclusions win", () => {
    expect(titleWanted("Senior Brand Strategist", search)).toBe(true);
    expect(titleWanted("Brand Marketing Intern", search)).toBe(false);
    expect(titleWanted("Backend Engineer", search)).toBe(false);
  });
  it("replaces the software title test in preFilter and leaves the default alone", () => {
    expect(preFilter(job(), now, () => false, undefined, undefined, undefined, search)).toBeNull();
    expect(preFilter(job({ title: "Software Engineer" }), now, () => false, undefined, undefined, undefined, search)).toMatch(/not one of the roles/);
    expect(preFilter(job(), now)).toMatch(/not a software role/);
  });
  it("drops the term and graduation questions and rewords the role and level questions", () => {
    const q = fitQuestions({ education: [], search });
    expect(q.term).toBeUndefined();
    expect(q.graduation_excluded).toBeUndefined();
    expect(q.returning_student_required).toBeUndefined();
    expect(JSON.stringify(q.is_software_role)).toContain("brand strategy");
    expect(Object.keys((q.level as { criteria: Record<string, string> }).criteria)).toEqual(["entry", "mid", "senior", "lead", "other"]);
  });
  it("scores a mid-level role in the wanted levels without a term or graduation answer", () => {
    const r = scoreFromAnswers(job(), answers(), now, undefined, search);
    expect(r.decision).toBe("apply");
    expect(r.components.termFit).toBe(1);
    expect(r.components.levelFit).toBe(1);
  });
  it("skips a level the search does not want, but only when JEV is sure", () => {
    expect(scoreFromAnswers(job(), answers({ level: choice("entry") }), now, undefined, search).skipReason).toMatch(/level is entry/);
    expect(scoreFromAnswers(job(), answers({ level: choice("lead") }), now, undefined, search).decision).toBe("skip");
    expect(scoreFromAnswers(job(), answers({ level: choice("entry", 0.4) }), now, undefined, search).skipReason).toBeNull();
    expect(scoreFromAnswers(job(), answers({ level: choice("other") }), now, undefined, search).skipReason).toBeNull();
  });
  it("skips a role of the wrong kind with its own reason", () => {
    expect(scoreFromAnswers(job(), answers({ is_software_role: noul(0.1) }), now, undefined, search).skipReason).toBe("not the kind of role searched for");
  });
  it("lets the profile reweigh a location tier", () => {
    const abroad = job({ locations: ["Lagos, Nigeria"] });
    const base = scoreFromAnswers(abroad, answers({ location_tier: choice("international") }), now).score;
    const weighed = scoreFromAnswers(abroad, answers({ location_tier: choice("international") }), now, undefined, search).score;
    expect(weighed).toBeGreaterThan(base);
  });
});
