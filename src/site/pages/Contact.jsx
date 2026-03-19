import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal.jsx';
import PageTransition from '../components/PageTransition.jsx';
import LogoMark from '../components/LogoMark.jsx';

const ease = [0.16, 1, 0.3, 1];

const conditions = [
  'You keep mentally tracking it because no one else is.',
  'It feels risky to leave unattended.',
  'It consumes more of your attention than it should.',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', organisation: '', email: '', area: '', context: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.area.trim()) errs.area = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1000);
  };

  return (
    <PageTransition>
      {/* ── CONTACT HERO ──────────────────────────────── */}
      <section style={{ background: 'var(--ink)', paddingTop: 'calc(var(--nav-h) + var(--sp-80))', paddingBottom: 'var(--sp-96)', position: 'relative', overflow: 'hidden' }} aria-label="Start here">
        <svg style={{ position: 'absolute', right: '-4%', top: '-10%', width: 'min(45vw,560px)', opacity: 0.04, pointerEvents: 'none' }} viewBox="0 0 88 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 0H88V80H48L38 96V80H0Z" fill="white"/>
          <rect x="10" y="10" width="68" height="60" stroke="#1C1B18" strokeWidth="5.5" fill="none"/>
          <path d="M24 26H64V64H44" stroke="#1C1B18" strokeWidth="5.5" strokeLinecap="square" fill="none"/>
          <line x1="24" y1="44" x2="44" y2="64" stroke="#1C1B18" strokeWidth="5.5" strokeLinecap="square"/>
        </svg>
        <div style={{ maxWidth: 'var(--max-w)', marginInline: 'auto', paddingInline: 'var(--gutter)' }}>
          <motion.p className="section-label section-label-light t-label" style={{ marginBottom: 24 }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.1 }}>
            Start here
          </motion.p>
          <motion.h1 style={{ fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--white)', maxWidth: 780, marginBottom: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.2 }}>
            Start a conversation.
          </motion.h1>
          <motion.p style={{ color: 'var(--white-65)', fontSize: 'clamp(16px,1.4vw,19px)', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.32 }}>
            If there is an area of your work that meets any of these conditions, that is usually the right place to begin.
          </motion.p>
          <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)', marginTop: 'var(--sp-32)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.6 }}>
            {conditions.map((c, i) => (
              <motion.p key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-12)', fontSize: 'clamp(15px,1.3vw,17px)', color: 'var(--white-65)', lineHeight: 1.55 }} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease }}>
                <span style={{ color: 'var(--white-40)', flexShrink: 0, fontSize: 14, marginTop: 2 }}>—</span>
                {c}
              </motion.p>
            ))}
          </motion.div>
          <motion.p style={{ marginTop: 'var(--sp-40)', fontSize: 14, color: 'var(--white-40)', fontStyle: 'italic' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
            If it is not a fit, that will be clear early — and you will leave the conversation with more clarity than you arrived with.
          </motion.p>
        </div>
      </section>

      {/* ── FORM BODY ─────────────────────────────────── */}
      <section style={{ background: 'var(--white)' }} className="section-pad" id="form">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 'var(--sp-64) var(--sp-96)', alignItems: 'start' }} className="contact-body-inner">

            {/* Sidebar */}
            <Reveal direction="left" style={{ position: 'sticky', top: 'calc(var(--nav-h) + var(--sp-32))' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', marginBottom: 'var(--sp-16)' }}>What to expect</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--grey-dark)', marginBottom: 'var(--sp-16)' }}>
                The purpose of an initial conversation is to determine whether the scope can be clearly defined, whether this is the right model for your situation, and whether we are suited to hold it.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--grey-dark)', marginBottom: 'var(--sp-32)' }}>
                There is no commitment expected from a first conversation. If it is not the right fit, that will be established early — directly and without obligation.
              </p>
              <div style={{ height: 1, background: 'var(--grey-pale)', marginBlock: 'var(--sp-32)' }} />
              {[
                { label: 'Response time', body: 'We aim to respond within two business days. If the scope you describe requires more than a brief note, the response will reflect that.' },
                { label: 'What to include', body: 'A brief description of the area you would like held. You do not need to have the scope defined — part of the conversation is determining whether it can be.' },
                { label: 'Format', body: 'Written conversations first. A call where useful, but not as a default.' },
              ].map(({ label, body }) => (
                <div key={label} style={{ fontSize: 13.5, color: 'var(--grey-dark)', lineHeight: 1.6, marginBottom: 'var(--sp-12)', paddingLeft: 'var(--sp-16)', borderLeft: '2px solid var(--grey-pale)' }}>
                  <strong style={{ display: 'block', fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{label}</strong>
                  {body}
                </div>
              ))}
            </Reveal>

            {/* Form */}
            <Reveal delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ padding: 'var(--sp-24) var(--sp-32)', background: 'var(--cream)', borderLeft: '3px solid var(--ink)' }}
                  role="alert"
                >
                  <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5 }}>
                    <strong>Message received.</strong><br />
                    We will respond within two business days. If your situation requires more than a brief note, our response will reflect that.
                  </p>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="name">Name <span style={{ color: 'var(--grey-mid)' }}>(required)</span></label>
                      <input className="form-input" type="text" id="name" name="name" placeholder="Your name" autoComplete="name" value={form.name} onChange={set('name')} style={errors.name ? { borderColor: '#c0392b' } : undefined} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="organisation">Organisation</label>
                      <input className="form-input" type="text" id="organisation" name="organisation" placeholder="Company or organisation" autoComplete="organization" value={form.organisation} onChange={set('organisation')} />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email address <span style={{ color: 'var(--grey-mid)' }}>(required)</span></label>
                    <input className="form-input" type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={set('email')} style={errors.email ? { borderColor: '#c0392b' } : undefined} />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="area">What area of your work needs to be held? <span style={{ color: 'var(--grey-mid)' }}>(required)</span></label>
                    <textarea className="form-textarea" id="area" name="area" placeholder="Describe the area — strategy direction, social media and content, website management, or something more specific. You do not need to have it fully defined." rows={6} value={form.area} onChange={set('area')} style={errors.area ? { borderColor: '#c0392b' } : undefined} />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="context">Additional context</label>
                    <textarea className="form-textarea" id="context" name="context" placeholder="Any background that helps us understand your situation — the nature of your organisation, how the problem shows up, what you have already tried." rows={4} value={form.context} onChange={set('context')} />
                  </div>
                  <div className="form-submit">
                    <p className="form-note">Your information is used only for the purpose of this conversation and is not shared with third parties.</p>
                    <button type="submit" className="btn btn-dark" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send message'} {!submitting && <span className="arrow">→</span>}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
