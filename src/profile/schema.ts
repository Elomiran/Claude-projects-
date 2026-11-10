/**
 * The candidate profile. The real file lives at data/profile.json and is
 * git-ignored. data/profile.example.json is the redacted template.
 * Every answer the tool writes into a form is derived from this file, the
 * answer bank, or Claude drafting free text from it. Nothing is invented.
 */
import { readFileSync } from "node:fs";
import { z } from "zod";
import { PATHS } from "../config.js";

const YesNo = z.enum(["yes", "no"]);
/** A voluntary self-identification question may be declined. */
const YesNoDecline = z.enum(["yes", "no", "decline"]);

/**
 * What the candidate is searching for when it is not an early-career software role. Leave it out
 * and every behaviour stays as it was: software internships and new-grad roles, from the lists
 * and the boards. With it, discovery reads company boards only, keeps the postings whose title
 * matches `titleInclude`, rates fit against `focus`, and treats `levels` as the experience levels
 * the candidate will apply to.
 */
export const SearchSchema = z.object({
  /** One or two sentences naming the work wanted, in the candidate's own terms. Used as the definition of a fit. */
  focus: z.string().min(10),
  /** Regular-expression sources matched, case-insensitively, against a posting title. A title must match one. */
  titleInclude: z.array(z.string().min(1)).min(1),
  /** A title that matches one of these is dropped, even if it also matches `titleInclude`. */
  titleExclude: z.array(z.string().min(1)).default([]),
  /** The experience levels to apply to. A posting at another level is skipped. */
  levels: z.array(z.enum(["entry", "mid", "senior", "lead"])).min(1),
  /** Company boards to poll, in addition to the ones the tool ships for this kind of search. */
  boards: z.array(z.object({ ats: z.enum(["greenhouse", "lever", "ashby"]), slug: z.string().min(1), company: z.string().min(1) })).default([]),
  /** Also read the software internship and new-grad lists. Off by default for a search that is not for software. */
  useSoftwareLists: z.boolean().default(false),
  /** Replaces the multiplier for a location tier, e.g. { "international": 0.9 } for someone who wants remote work from abroad. */
  locationWeights: z.record(z.enum(["vancouver", "canada", "remote", "us", "international", "unclear"]), z.number().min(0).max(1)).default({}),
});

export type Search = z.infer<typeof SearchSchema>;

export const ProfileSchema = z.object({
  name: z.object({
    first: z.string().min(1),
    last: z.string().min(1),
    preferred: z.string().optional(),
  }),
  pronouns: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  email: z.string().email(),
  phone: z.object({
    /** Digits only, no country code. */
    national: z.string().regex(/^\d{7,15}$/),
    countryCode: z.string().regex(/^\+\d{1,3}$/),
  }),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    region: z.string(),
    regionCode: z.string(),
    postalCode: z.string(),
    country: z.string(),
    countryCode: z.string().length(2),
  }),
  links: z.object({
    linkedin: z.string().url(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    portfolio: z.string().url().optional(),
  }),
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string(),
        field: z.string(),
        /** Other names the same field goes by, tried in this order on a list that does not have `field` ("Computer Science" for "Computing Science"). A box that takes any text still gets `field`. */
        fieldAlso: z.array(z.string()).optional(),
        minor: z.string().optional(),
        startMonth: z.number().int().min(1).max(12),
        startYear: z.number().int(),
        gradMonth: z.number().int().min(1).max(12),
        gradYear: z.number().int(),
        status: z.enum(["in_progress", "completed", "transferred"]),
        gpa: z
          .object({
            cumulative: z.number().optional(),
            major: z.number().optional(),
            scale: z.number().default(4),
            /** When false the GPA is only given if a form will not submit without it. */
            volunteer: z.boolean().default(false),
          })
          .optional(),
      }),
    )
    .min(1),
  experience: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      location: z.string(),
      start: z.string(),
      end: z.string(),
      current: z.boolean().default(false),
      bullets: z.array(z.string()),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      start: z.string(),
      end: z.string(),
      link: z.string().optional(),
      bullets: z.array(z.string()),
    }),
  ),
  skills: z.object({
    languages: z.array(z.string()),
    frameworks: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  spokenLanguages: z.array(z.object({ name: z.string(), level: z.string() })),
  workAuthorization: z.object({
    citizenships: z.array(z.string()).min(1),
    /** Countries where the candidate can work without sponsorship. */
    authorizedCountries: z.array(z.string()).min(1),
    /**
     * Countries where the candidate may work now or by the start date, but will need the employer
     * to sponsor a visa later (a student on US OPT or STEM OPT, for example). A question whether
     * they are authorized to work there is answered Yes, and one whether they will need
     * sponsorship is answered Yes too. A country listed here needs sponsorship even if
     * `authorizedCountries` names it as well.
     */
    authorizedWithSponsorshipLater: z.array(z.string()).optional(),
    /** Whether sponsorship would be needed in any country not listed above. */
    requiresSponsorshipElsewhere: z.boolean(),
    /** One sentence, used verbatim when a form asks to explain status. */
    statement: z.string(),
  }),
  demographics: z.object({
    gender: z.string(),
    ethnicity: z.string(),
    hispanicOrLatino: YesNoDecline,
    veteran: YesNoDecline,
    disability: YesNoDecline,
    sexualOrientation: z.string(),
    transgender: YesNoDecline,
  }),
  preferences: z.object({
    earliestStart: z.string(),
    availability: z.string(),
    /** Left empty on purpose: the tool never volunteers a number. */
    salaryExpectation: z.string(),
    /** What goes in a salary box that will not submit empty, when salaryExpectation is empty. */
    salaryIfRequired: z.string().default("Negotiable"),
    willingToRelocate: YesNo,
    remote: z.enum(["preferred", "open", "no"]),
    preferredLocations: z.array(z.string()),
    howDidYouHear: z.string(),
    /** What to do when a form requires references. "skip" logs and moves on. */
    references: z.enum(["skip"]),
    /** "never" skips a form that requires one. "when_asked" writes a cover letter for this job whenever a form has a box for one, as if apply --cover. */
    coverLetter: z.enum(["never", "when_asked"]),
  }),
  resume: z.object({
    /** Absolute path on the machine that runs the browser. */
    path: z.string(),
    filename: z.string(),
  }),
  /** An academic transcript, attached only to a file box that asks for one. Leave it out and such a form is held for you. */
  transcript: z.object({ path: z.string() }).optional(),
  /** Three or four sentences used as the candidate side of every JEV rating call. */
  summary: z.string().min(40),
  /** Short facts Claude may use when drafting free text. Nothing outside this list is claimed. */
  facts: z.array(z.string()),
  /**
   * Standing answers: how the candidate wants a recurring question answered.
   * JEV reads them when it picks an option; Claude reads them when it drafts.
   */
  answers: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  /** What to search for, when it is not an early-career software role. */
  search: SearchSchema.optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export function loadProfile(file = PATHS.profile): Profile {
  let raw: string;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    throw new Error(`No profile at ${file}. Copy data/profile.example.json to data/profile.json and fill it in.`);
  }
  const parsed = ProfileSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) throw new Error(`data/profile.json is invalid:\n${parsed.error.message}`);
  return parsed.data;
}

/** Countries where the candidate may work now but will need sponsorship later. Empty when the profile lists none. */
export function sponsorshipLater(profile: Pick<Profile, "workAuthorization">): string[] {
  return profile.workAuthorization.authorizedWithSponsorshipLater ?? [];
}

/**
 * The candidate's standing in the United States. Most postings on the lists are American and many
 * refuse sponsorship, so discovery needs to know whether that rules the candidate out.
 * `authorized` means authorized without sponsorship, now and later: a candidate who will need
 * sponsorship later (US OPT) is not, since a posting that refuses sponsorship refuses them.
 */
export function usStatus(profile: Pick<Profile, "workAuthorization">): { authorized: boolean; citizen: boolean } {
  const isUs = (c: string) => /^(united states( of america)?|u\.?s\.?a?\.?)$/i.test(c.trim());
  const later = sponsorshipLater(profile).some(isUs);
  return { authorized: !later && profile.workAuthorization.authorizedCountries.some(isUs), citizen: profile.workAuthorization.citizenships.some(isUs) };
}

/** True when the title is one the search wants: it matches an include pattern and no exclude pattern. */
export function titleWanted(title: string, search: Pick<Search, "titleInclude" | "titleExclude">): boolean {
  const any = (patterns: string[]) => patterns.some((p) => new RegExp(p, "i").test(title));
  return any(search.titleInclude) && !any(search.titleExclude);
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function monthName(m: number): string {
  return MONTHS[m - 1] ?? String(m);
}
