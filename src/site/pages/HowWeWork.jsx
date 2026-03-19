import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx';
import CTABanner from '../components/CTABanner.jsx';
import PageHero from '../components/PageHero.jsx';
import PageTransition from '../components/PageTransition.jsx';

const steps = [
  { n: '01', title: 'A short initial conversation', body: 'We identify the area of work — the responsibility gap. We determine whether the scope can be clearly defined and whether this is the right model for your situation. If it is not, that will be clear early.' },
  { n: '02', title: 'Scope is agreed explicitly', body: 'What is included, what is not, and what decisions remain yours. The boundary is set before work begins. Ambiguity at this stage creates the very problems we are engaged to prevent.' },
  { n: '03', title: 'Ongoing responsibility is assumed', body: 'Context is held across decisions. Standards are maintained as things change. Work proceeds against agreed understanding — not against what happens to be convenient at the time.' },
  { n: '04', title: 'Drift is prevented, not corrected', body: 'We stay involved to maintain coherence as the work evolves — not to fix problems after they compound. The cost of intervention drops because misalignment is caught before it propagates.' },
];

const outcomes = [
  { n: '01', title: 'Fewer decisions returning to you', body: 'Decisions are made, retained, and applied. They stop circling back for re-approval or re-explanation.' },
  { n: '02', title: 'Less need to re-explain context', body: 'Context is held outside your head. You stop being the only person who knows what was agreed and why.' },
  { n: '03', title: 'Fewer corrective interventions', body: 'Ideas are filtered before they become work you need to review. Less gets through that doesn\'t align.' },
  { n: '04', title: 'More confidence leaving work unattended', body: 'The work holds when your attention is elsewhere. You stop needing to be the final check on everything.' },
  { n: '05', title: 'Social media managed to agreed standards', body: 'Planning, posting, and review happens against standards that persist — not against what feels right that day.' },
  { n: '06', title: 'Website updates as the business evolves', body: 'Changes happen as they need to — not only when something breaks or reaches the point of visible failure.' },
];

const requirements = [
  {
    icon: <path d="M9 12l2 2 4-4"/>,
    title: 'Decision authority within scope',
    body: 'You must have the authority to make and commit to decisions within the defined area. Without it, external responsibility cannot be held.',
  },
  {
    icon: <path d="M4 6h16M4 10h16M4 14h10"/>,
    title: 'Accurate, current information',
    body: 'Work is held against what is true, not what was agreed months ago. When things change, we need to know promptly so the work stays aligned.',
  },
  {
    icon: <path d="M12 5v14M5 12h14"/>,
    title: 'Commitment once decisions are made',
    body: 'If approvals are slow or priorities shift constantly, responsibility cannot be maintained. Steadiness is required on both sides.',
  },
];

export default function HowWeWork() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="The model"
        title="How We Work"
        description="This outlines what changes for you once work begins — and what the engagement model requires from both sides."
      />

      {/* ── THE PROBLEM ───────────────────────────────── */}
      <section className="process-section section-pad" id="the-problem">
        <div className="container">
          <div className="process-intro-grid">
            <Reveal direction="left">
              <p className="section-label t-label" style={{ marginBottom: 24 }}>01 — The problem</p>
              <h2 className="t-h2" style={{ marginBottom: 24 }}>The problem we step into</h2>
              <p className="t-body-lg" style={{ color: 'var(--grey-dark)' }}>
                Most clients are personally holding together parts of their operation that should not require daily attention. This is not an effort issue. It is a responsibility gap.
              </p>
            </Reveal>
            <Reveal direction="right">
              <p style={{ color: 'var(--grey-mid)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 20, fontWeight: 600 }}>Typical signals</p>
              <ul className="signals-list">
                {[
                  'You review work repeatedly because you don\'t trust it to hold.',
                  'Decisions resurface because nothing enforces them.',
                  'Your website, content, or funnels feel "mostly fine" but require constant checking.',
                  'Progress depends on you remembering what was agreed.',
                ].map(item => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SETUP ─────────────────────────────────────── */}
      <section className="process-steps section-pad-sm" id="setup">
        <div className="container">
          <Reveal>
            <p className="section-label t-label" style={{ marginBottom: 24 }}>02 — Setup</p>
            <h2 className="t-h2" style={{ marginBottom: 16, maxWidth: 560 }}>How engagements are set up</h2>
            <p style={{ color: 'var(--grey-dark)', fontSize: 'clamp(16px,1.3vw,18px)', maxWidth: 560, lineHeight: 1.7, marginBottom: 56 }}>
              Every engagement has a defined scope. Within that scope, we are responsible. Outside it, we are not involved. This boundary is explicit — it is what makes the work sustainable.
            </p>
          </Reveal>
          <div>
            {steps.map(({ n, title, body }, i) => (
              <Reveal key={n} delay={i * 0.08} className="process-step-item">
                <p className="process-step-num" aria-hidden="true">{n}</p>
                <div className="process-step-content">
                  <h3 className="process-step-content__title">{title}</h3>
                  <p className="process-step-content__body">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT CHANGES ──────────────────────────────── */}
      <section className="what-changes section-pad" id="what-changes">
        <div className="container">
          <div className="what-changes__intro">
            <Reveal direction="left" className="what-changes__intro-left">
              <p className="section-label section-label-light t-label">03 — Outcome</p>
              <h2 className="t-h2">What changes for you</h2>
            </Reveal>
            <Reveal direction="right" className="what-changes__intro-right">
              <p>Work becomes steadier before it becomes faster. These changes appear gradually, then compound. They are not the result of working harder — they are the result of fewer mistakes being introduced upstream.</p>
            </Reveal>
          </div>
          <StaggerGroup className="what-changes__items">
            {outcomes.map(({ n, title, body }) => (
              <StaggerItem key={n} className="change-item">
                <p className="change-item__number" aria-hidden="true">{n}</p>
                <h3 className="change-item__title">{title}</h3>
                <p className="change-item__body">{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── REQUIREMENTS ──────────────────────────────── */}
      <section className="requirements section-pad" id="requirements">
        <div className="container">
          <Reveal>
            <p className="section-label t-label" style={{ marginBottom: 24 }}>04 — Requirements</p>
            <h2 className="t-h2" style={{ marginBottom: 16 }}>What we require from you</h2>
            <p style={{ color: 'var(--grey-dark)', fontSize: 'clamp(16px,1.3vw,18px)', maxWidth: 560, lineHeight: 1.7 }}>
              For this to work, responsibility cannot be held externally if it is constantly overridden internally.
            </p>
          </Reveal>
          <StaggerGroup className="req-grid" style={{ marginTop: 'var(--sp-48)' }}>
            {requirements.map(({ icon, title, body }) => (
              <StaggerItem key={title} className="req-item">
                <svg className="req-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
                  {icon}
                  <rect x="3" y="3" width="18" height="18"/>
                </svg>
                <h3 className="req-item__title">{title}</h3>
                <p className="req-item__body">{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── WHAT THIS IS NOT ──────────────────────────── */}
      <section className="not-this section-pad" id="not-this">
        <div className="container">
          <div className="not-this__grid">
            <Reveal direction="left">
              <p className="section-label section-label-light t-label" style={{ marginBottom: 24 }}>05 — Boundaries</p>
              <h2 className="t-h2" style={{ color: 'var(--white)', marginBottom: 24 }}>What this is not</h2>
              <p style={{ color: 'var(--white-65)', fontSize: 'clamp(16px,1.3vw,18px)', lineHeight: 1.7 }}>
                This model works in specific conditions. If those conditions are absent, involvement is usually unnecessary — and the wrong kind of engagement creates more problems than it solves.
              </p>
              <div className="not-this__statement" style={{ marginTop: 40 }}>
                <p>If you want tasks completed without accountability, this is not the right model.</p>
              </div>
            </Reveal>
            <Reveal direction="right">
              <p style={{ color: 'var(--white-40)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 20, fontWeight: 600 }}>This is not</p>
              <ul className="not-this__list">
                {['Project-based delivery with a defined end date', 'Execution on demand, without accountability', 'Short-term support while something else is being figured out', 'A management layer for work that should have internal ownership'].map(item => <li key={item}>{item}</li>)}
              </ul>
              <p style={{ color: 'var(--white-40)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginTop: 48, marginBottom: 20, fontWeight: 600 }}>When this works best</p>
              <ul className="not-this__list">
                {['Work is ongoing and inconsistency has a real cost', 'You want to stop being the final checkpoint', 'Continuity across decisions matters more than speed of output', 'The area is too important to leave unmanaged, and too persistent to manage alone'].map(item => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        heading={"If there is an area<br>you keep tracking<br>because no one else is."}
        sub="That is usually the right place to start a conversation. If it is not, that will be clear early."
        tagline="A short conversation to determine whether this responsibility should be held, and whether we are the right party to hold it."
      />
    </PageTransition>
  );
}
