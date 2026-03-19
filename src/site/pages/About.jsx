import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx';
import CTABanner from '../components/CTABanner.jsx';
import PageHero from '../components/PageHero.jsx';
import PageTransition from '../components/PageTransition.jsx';

const values = [
  { name: 'Clarity', body: 'Decisions are made explicit and retained. Work proceeds from established understanding. Ambiguity is a cost — not a feature of flexibility.' },
  { name: 'Responsibility', body: 'Accountability is defined by what must be held over time, not by individual tasks. Taking responsibility means the work does not require constant oversight to remain coherent.' },
  { name: 'Continuity', body: 'Consistency is maintained across decisions, outputs, and people. This is the mechanism through which the other values actually function over time.' },
  { name: 'Bounded scope', body: 'Responsibility is accepted only where its limits can be clearly defined. Work that cannot be bounded cannot be held — and accepting it would compromise what is already held.' },
  { name: 'Deliberate growth', body: 'Capacity increases in line with the ability to preserve standards and continuity. Expansion that dilutes accountability is not growth — it is a different kind of decay.' },
  { name: 'These are constraints', body: 'Not a list of things the firm aspires to. Constraints are what remain in place when things become inconvenient. That is when they matter most.', dark: true },
];

export default function About() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="The firm"
        title="About"
        description="Why the firm exists, how it was formed, and what governs its decisions."
      />

      {/* ── MISSION ───────────────────────────────────── */}
      <section className="mission-section section-pad" id="mission">
        <div className="container">
          <div className="mission-grid">
            <Reveal direction="left">
              <p className="section-label t-label" style={{ marginBottom: 24 }}>01 — Purpose</p>
              <h2 className="t-h2">Mission</h2>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.35, color: 'var(--ink)', marginBottom: 32 }}>
                  Elòmiràn Consult exists to hold responsibility where work depends on continuity across time.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.75, color: 'var(--grey-dark)', marginBottom: 20 }}>
                  In many organisations, effort is sustained while context degrades. Decisions are revisited. Standards shift. Work continues, but reliability weakens.
                </p>
                <p style={{ fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.75, color: 'var(--grey-dark)', marginBottom: 20 }}>
                  The firm's role is to maintain judgment, memory, and consistency within defined areas of responsibility — so work remains coherent as it evolves.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="about-constraint-note">
                  <p>This role exists to reduce friction, prevent silent decay, and stabilise ongoing work.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ───────────────────────────────────── */}
      <section className="founder-section section-pad" id="founder">
        <div className="container">
          <div className="founder-grid">
            <Reveal direction="left">
              <p className="section-label t-label" style={{ marginBottom: 24 }}>02 — Origin</p>
              <h2 className="t-h2" style={{ marginBottom: 16 }}>Founder</h2>
              <p style={{ color: 'var(--grey-dark)', fontSize: 15, lineHeight: 1.7, maxWidth: 280 }}>
                The firm emerged from repeated exposure to the same operational pattern across different environments.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="founder-body">
              <p>In academic work, reasoning weakened as drafts accumulated and contributors changed. Progress slowed because context was fragmented across time — not because effort was lacking.</p>
              <p>In digital and commercial work, execution remained active while alignment weakened. Websites, content, and funnels changed frequently because no one was responsible for holding direction as conditions evolved.</p>
              <p>In both cases, leaders compensated by staying close to details and intervening frequently. The problem was not the people — it was the absence of a layer that held continuity as the work moved forward.</p>
              <p>Elòmiràn Consult was structured to take responsibility for that missing layer. The firm's structure reflects that purpose.</p>
              <p style={{ padding: '28px 32px', background: 'var(--white)', borderLeft: '3px solid var(--grey-pale)', marginTop: 32, fontSize: 'clamp(16px,1.4vw,18px)', fontWeight: 500, lineHeight: 1.6, color: 'var(--ink-80)' }}>
                Its scale remains intentional. Accountability stays identifiable. Standards are maintained through shared reasoning rather than individual discretion. Capacity expands only when continuity can be preserved.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────── */}
      <section className="values-section section-pad" id="values">
        <div className="container">
          <Reveal>
            <p className="section-label t-label" style={{ marginBottom: 24 }}>03 — Operating constraints</p>
            <h2 className="t-h2" style={{ marginBottom: 16 }}>Values</h2>
            <p style={{ color: 'var(--grey-dark)', fontSize: 'clamp(16px,1.3vw,18px)', maxWidth: 560, lineHeight: 1.7 }}>
              These values function as operating constraints — not aspirations. They guide engagement selection, pricing, and internal structure.
            </p>
          </Reveal>
          <StaggerGroup className="values-grid" style={{ marginTop: 'var(--sp-48)' }}>
            {values.map(({ name, body, dark }) => (
              <StaggerItem
                key={name}
                className="value-item"
                style={dark ? { background: 'var(--ink)' } : undefined}
              >
                <p className="value-item__name" style={dark ? { color: 'var(--white)' } : undefined}>
                  {name}<span className="value-item__colon" style={dark ? { color: 'var(--white-40)' } : undefined}>.</span>
                </p>
                <p className="value-item__body" style={dark ? { color: 'var(--white-65)' } : undefined}>{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTABanner
        heading="Is this the right model<br>for your situation?"
        sub="A short conversation is enough to determine whether the scope is clear, whether the conditions are right, and whether we are suited to hold it."
        tagline="If it is not the right fit, that will be clear early — and you will leave the conversation with more clarity than you arrived with."
      />
    </PageTransition>
  );
}
