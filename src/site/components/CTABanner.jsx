import { Link } from 'react-router-dom';
import { Reveal } from './Reveal.jsx';

export default function CTABanner({ heading, sub, tagline, eyebrow = 'Start here' }) {
  return (
    <section className="cta-banner" aria-label="Call to action">
      <div className="container">
        <div className="cta-banner__inner">
          <Reveal direction="left">
            <p className="section-label section-label-light t-label" style={{ marginBottom: 24 }}>{eyebrow}</p>
            <h2 className="cta-banner__heading" dangerouslySetInnerHTML={{ __html: heading }} />
            <p className="cta-banner__sub">{sub}</p>
          </Reveal>
          <Reveal direction="right">
            <div className="cta-banner__right">
              <Link to="/contact" className="btn btn-gold">
                Start a conversation <span className="arrow">→</span>
              </Link>
              <p className="cta-banner__tagline">{tagline}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
