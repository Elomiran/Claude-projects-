import { useEffect, useRef, useState } from 'react';
import { Reveal, StaggerGroup, StaggerItem } from '../components/Reveal.jsx';
import CTABanner from '../components/CTABanner.jsx';
import PageHero from '../components/PageHero.jsx';
import PageTransition from '../components/PageTransition.jsx';

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0, rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

const SECTION_IDS = ['strategy', 'creative', 'systems'];

const services = [
  {
    id: 'strategy',
    tag: 'Strategy',
    title: 'Direction that holds long enough to matter',
    desc: 'Strategy work exists because direction decays faster than execution.',
    intro: 'Ideas are approved, then quietly replaced. Messaging shifts. Funnels are rebuilt because upstream thinking was never stabilised. This is not a failure of effort — it is a failure of continuity.',
    includes: [
      'Ideation with constraints, not open-ended brainstorming',
      'Positioning and messaging clarification',
      'Funnel and content direction tied to business priorities',
      'Decision filtering: what advances the system and what introduces noise',
    ],
    changes: ['Fewer strategic resets', 'Direction persists long enough to measure', 'Teams execute with less second-guessing'],
    note: 'This work is ongoing by design. Direction that is visited once and then abandoned is not strategy — it is planning.',
  },
  {
    id: 'creative',
    tag: 'Creative',
    title: 'Social media and content that compounds instead of resets',
    desc: 'Most content problems are not output problems. They are coherence problems.',
    intro: 'Posting continues, but tone shifts. Engagement fluctuates. Accounts feel busy but forgettable. The issue is not volume — it is the absence of a stable voice maintained over time.',
    includes: [
      'Social media management — planning, posting, and review',
      'Content ideation aligned to strategy, not trends',
      'Caption and message refinement to maintain a stable voice',
      'Ongoing performance review across weeks, not individual posts',
    ],
    changes: ['A recognisable voice over time', 'More stable engagement and click-through metrics', 'Less content churn and corrective feedback'],
    note: 'Volume is secondary. Continuity is the point.',
  },
  {
    id: 'systems',
    tag: 'Systems / Execution',
    title: 'Websites and funnels that remain accurate, usable, and trusted',
    desc: 'Websites rarely fail outright. They decay.',
    intro: 'Pages fall out of date. Offers change. Structure stops matching how the business actually operates. Funnels underperform because messaging upstream no longer aligns with what happens downstream. Redesigns reset the surface — they do not stop the decay.',
    includes: [
      'Website audits focused on accuracy, structure, and trust',
      'Ongoing website management and updates',
      'Content edits as services, pricing, or positioning change',
      'Page additions and removals as the business evolves',
      'Broken link checks, form testing, and basic technical hygiene',
      'Funnel alignment across pages, content, and calls to action',
      'Monitoring conversion and drop-off patterns',
    ],
    changes: ['The website reflects reality, not history', 'Fewer silent credibility losses', 'Funnels behave more predictably', 'Conversion metrics improve through consistency'],
    note: 'This is maintenance work. It replaces emergency fixes.',
  },
];

export default function Services() {
  const active = useActiveSection(SECTION_IDS);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <PageHero
        eyebrow="What we do"
        title="Services"
        description="We work across three areas where breakdowns happen repeatedly. Each area includes execution, but the value comes from holding it together over time."
      />

      {/* Sticky sub-nav */}
      <div className="services-nav" role="navigation" aria-label="Services sections">
        <div className="container services-nav__inner">
          {services.map(({ id, tag }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`services-nav__link${active === id ? ' is-active' : ''}`}
              onClick={e => { e.preventDefault(); scrollTo(id); }}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {services.map(({ id, tag, title, desc, intro, includes, changes, note }) => (
        <section key={id} className="service-section section-pad" id={id}>
          <div className="container">
            <div className="service-grid">
              <Reveal direction="left" className="service-left">
                <span className="service-tag">{tag}</span>
                <h2 className="t-h2 service-title">{title}</h2>
                <p className="service-desc">{desc}</p>
              </Reveal>
              <div className="service-right">
                <Reveal><p className="service-right__intro">{intro}</p></Reveal>
                <Reveal delay={0.1} className="service-includes">
                  <p className="service-includes__title">This work typically includes</p>
                  <ul className="service-includes__list">
                    {includes.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </Reveal>
                <Reveal delay={0.2} className="service-changes">
                  <p className="service-changes__title">What changes</p>
                  <ul className="service-changes__list">
                    {changes.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </Reveal>
                <Reveal delay={0.28}><p className="service-note">{note}</p></Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* How scoped */}
      <section className="section-pad bg-ink c-white" id="scope">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 96px', alignItems: 'start' }}>
            <Reveal direction="left">
              <p className="section-label section-label-light t-label" style={{ marginBottom: 24 }}>How this is scoped</p>
              <h2 className="t-h2" style={{ color: 'var(--white)', marginBottom: 24 }}>Services are rarely isolated.</h2>
              <p style={{ color: 'var(--white-65)', fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7 }}>
                Strategy stabilises direction. Creative preserves it in public. Systems ensure it converts and remains credible.
              </p>
              <p style={{ color: 'var(--white-65)', fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7, marginTop: 20 }}>
                We combine services where responsibility overlaps. We do not package work where it does not.
              </p>
            </Reveal>
            <Reveal direction="right">
              <p className="section-label section-label-light t-label" style={{ marginBottom: 24 }}>When this is not a fit</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['One-off tasks without ongoing accountability', 'Execution on demand, without responsibility', 'High-volume, trend-driven content', 'Websites treated as static brochures'].map(item => (
                  <li key={item} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', padding: '16px 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 18, fontWeight: 300, flexShrink: 0, marginTop: -1 }}>×</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 24, fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
                This work assumes steadiness is valuable.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Stop carrying<br>this alone."
        sub="If it is unclear which service applies, that will become clear early in a conversation. The right scope is determined by the responsibility gap, not by a predefined package."
        tagline="A short conversation to determine whether this responsibility should be held, and whether we are the right party to hold it."
      />
    </PageTransition>
  );
}
