import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx';
import CTABanner from '../components/CTABanner.jsx';
import PageTransition from '../components/PageTransition.jsx';
import LogoMark from '../components/LogoMark.jsx';

const ease = [0.16, 1, 0.3, 1];

const heroLines = [
  { text: 'Most organisations do not', delay: 0.45 },
  { text: 'lack activity.', delay: 0.60 },
  { text: 'They lack continuity\u00A0of responsibility.', delay: 0.75, muted: true },
];

export default function Home() {
  return (
    <PageTransition>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero" aria-label="Introduction">
        <LogoMark className="hero__bg-mark" invert />
        <div className="hero__content">
          <motion.p
            className="hero__label section-label section-label-light t-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            Responsibility-led consulting
          </motion.p>

          <h1 className="hero__title t-display">
            {heroLines.map(({ text, delay, muted }) => (
              <span key={text} className="hero__title-line">
                <motion.span
                  style={muted ? { color: 'var(--white-65)', fontWeight: 400, fontSize: 'clamp(18px,2vw,24px)', display: 'block', marginTop: 'var(--sp-24)' } : {}}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            style={{ height: 1, background: 'var(--white-16)', marginBlock: 'var(--sp-32)' }}
            initial={{ width: 0 }}
            animate={{ width: '100%', maxWidth: 640 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
          />

          <motion.p
            className="hero__subtext"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.0 }}
          >
            Elòmiràn Consult exists to hold responsibility where your work depends on continuity — so you can stop being the final checkpoint.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.15 }}
          >
            <Link to="/contact" className="btn btn-gold">
              Start here <span className="arrow">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span className="hero__scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ── WHAT WE SOLVE ─────────────────────────────── */}
      <section className="what-we-solve section-pad" id="what-we-solve">
        <div className="container">
          <div className="wws-grid">
            <Reveal direction="left" className="wws-sticky">
              <div className="wws-number" aria-hidden="true">01</div>
              <p className="section-label t-label">The problem</p>
              <h2 className="t-h2 wws-heading">What we solve</h2>
            </Reveal>
            <div className="wws-body">
              <Reveal delay={0.05}>
                <p className="t-body-lg">Most organisations do not lack activity. They lack continuity of responsibility.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="t-body-lg" style={{ marginTop: 24, color: 'var(--grey-dark)' }}>
                  Over time, this shows up in specific ways.
                </p>
              </Reveal>
              <StaggerGroup className="problem-list" style={{ marginTop: 'var(--sp-32)' }}>
                {[
                  'Decisions are made, then quietly undone by later work.',
                  'Standards exist, but only in people\'s heads.',
                  'Leaders stay closer to execution than their role requires — because letting go feels risky.',
                ].map(item => (
                  <StaggerItem key={item} as="li" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-16)', padding: 'var(--sp-20) 0', borderTop: '1px solid var(--grey-pale)', fontSize: 'clamp(15px,1.3vw,17px)', lineHeight: 1.6, color: 'var(--ink-80)' }}>
                    <span className="problem-list__icon" aria-hidden="true" />
                    {item}
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <Reveal delay={0.2}>
                <div className="wws-statement">
                  <p>The cost is constant friction. Time spent re-explaining. Energy spent correcting avoidable misalignment. <em>These problems are usually tolerated because they appear manageable in isolation. Taken together, they drain momentum.</em></p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────────── */}
      <section className="who-for section-pad" id="who-for">
        <div className="container">
          <Reveal>
            <p className="section-label t-label">02 — Fit</p>
            <h2 className="t-h2" style={{ maxWidth: 560, marginBottom: 8 }}>Who this is for</h2>
            <p className="t-body-lg" style={{ color: 'var(--grey-dark)', maxWidth: 560 }}>
              This work is for organisations where the same patterns keep surfacing.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="who-for-grid" style={{ marginTop: 'var(--sp-48)' }}>
              <div className="who-for-col">
                <p className="who-for-col-title">We are typically engaged by</p>
                <ul className="who-for-list">
                  {[
                    'Founders who sense that growth is increasing effort faster than clarity.',
                    'Researchers whose work spans months or years and cannot afford inconsistency.',
                    'Teams producing steady output while quietly losing coherence.',
                  ].map(item => <li key={item}>{item}</li>)}
                </ul>
                <p style={{ marginTop: 32, fontSize: 15, color: 'var(--grey-dark)', lineHeight: 1.65 }}>
                  Organisations where the same work keeps resurfacing under different names. Where progress feels real, but fragile.
                </p>
              </div>
              <div className="who-for-col">
                <p className="who-for-col-title">We are not a fit for</p>
                <ul className="who-for-list">
                  {[
                    'Short-term execution without ongoing accountability.',
                    'Work designed to be disposable.',
                    'High-volume, trend-driven output.',
                    'Organisations where inconsistency has no real cost.',
                  ].map(item => <li key={item}>{item}</li>)}
                </ul>
                <p style={{ marginTop: 32, fontSize: 15, color: 'var(--grey-dark)', lineHeight: 1.65 }}>
                  If the work is finite, the brief is fully defined, and there is no continuity requirement — we are probably not the right engagement.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── APPROACH ──────────────────────────────────── */}
      <section className="approach section-pad" id="approach">
        <div className="container">
          <Reveal className="approach-intro">
            <p className="section-label t-label">03 — Method</p>
            <h2 className="t-h2" style={{ marginBottom: 20 }}>How the work is approached</h2>
            <p className="t-body-lg" style={{ color: 'var(--grey-dark)' }}>
              We do not begin by listing tasks. Tasks can be completed without improving the system that produces them.
            </p>
          </Reveal>
          <StaggerGroup className="approach-steps">
            {[
              { num: '01', title: 'Identify the responsibility gap', body: 'We begin by identifying the part of the work that matters over time, but is not explicitly held by anyone. Once that boundary is defined, everything else follows from it.' },
              { num: '02', title: 'Assume responsibility within scope', body: 'We preserve context across decisions, apply judgment before execution proceeds, and maintain standards even when attention shifts elsewhere. This reduces the need for constant oversight.' },
              { num: '03', title: 'Hold it over time', body: 'The value is not in a single intervention. It is in maintaining coherence as the work evolves — so corrections decrease, not because people work harder, but because fewer mistakes are introduced upstream.' },
            ].map(({ num, title, body }) => (
              <StaggerItem key={num} className="approach-step">
                <p className="approach-step__num">{num}</p>
                <h3 className="approach-step__title">{title}</h3>
                <p className="approach-step__body">{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── WHAT CHANGES ──────────────────────────────── */}
      <section className="what-changes section-pad" id="what-changes">
        <div className="container">
          <div className="what-changes__intro">
            <Reveal direction="left" className="what-changes__intro-left">
              <p className="section-label section-label-light t-label">04 — Outcome</p>
              <h2 className="t-h2">What changes when responsibility is held</h2>
            </Reveal>
            <Reveal direction="right" className="what-changes__intro-right">
              <p>These changes are gradual. They compound. When continuity is explicit, leaders spend less time monitoring and teams spend less time compensating.</p>
            </Reveal>
          </div>
          <StaggerGroup className="what-changes__items">
            {[
              { n: '01', title: 'Decisions stop being revisited', body: 'Work proceeds from established understanding rather than relitigating what was agreed.' },
              { n: '02', title: 'Work aligns more predictably with intent', body: 'Output reflects direction — not what happened to be convenient when the work was done.' },
              { n: '03', title: 'Corrections decrease upstream', body: 'Fewer mistakes are introduced before execution begins. Corrective work drops as a result.' },
              { n: '04', title: 'Less explanation required', body: 'Context is retained. You stop re-explaining to the people doing the work.' },
              { n: '05', title: 'Fewer interventions needed', body: 'Standards hold without you remaining the enforcer. Oversight becomes optional rather than essential.' },
              { n: '06', title: 'Confidence to leave work unattended', body: 'Greater trust that work will hold when your attention is elsewhere.' },
            ].map(({ n, title, body }) => (
              <StaggerItem key={n} className="change-item">
                <p className="change-item__number" aria-hidden="true">{n}</p>
                <h3 className="change-item__title">{title}</h3>
                <p className="change-item__body">{body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── PROOF ─────────────────────────────────────── */}
      <section className="proof section-pad" id="proof">
        <div className="container">
          <Reveal className="proof__intro">
            <p className="section-label t-label">05 — Evidence</p>
            <h2 className="t-h2" style={{ marginBottom: 16 }}>Proof of practice</h2>
            <p className="t-body-lg" style={{ color: 'var(--grey-dark)' }}>
              Clients tend to describe similar relief: less explanation, fewer interventions, greater confidence leaving work unattended for longer periods.
            </p>
            <p className="proof__note">
              Logos and short statements are presented here as evidence of sustained involvement, not as claims of transformation.
            </p>
          </Reveal>
          <StaggerGroup className="proof__grid">
            {[
              { statement: 'Ongoing strategy and content direction since engagement began.' },
              { statement: 'Website management and funnel alignment across 18 months.' },
              { statement: 'Research documentation standards maintained across three project phases.' },
              { statement: 'Messaging and positioning held consistently as the team scaled.' },
            ].map(({ statement }, i) => (
              <StaggerItem key={i} className="proof-item">
                <p className="proof-item__logo">Client</p>
                <p className="proof-item__statement">{statement}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="proof__cta-note" style={{ marginTop: 'var(--sp-48)' }}>
            <p>Ready to stop carrying this alone?</p>
            <Link to="/contact" className="btn btn-dark">Start a conversation <span className="arrow">→</span></Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────── */}
      <CTABanner
        heading="Stop carrying<br>this alone."
        sub="If there is an area of your work that you keep mentally tracking because no one else is — that is usually the right place to start a conversation."
        tagline="A short conversation to determine whether this responsibility should be held, and whether we are the right party to hold it."
      />
    </PageTransition>
  );
}
