import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to="/" className="footer__brand-name">Elòmiràn</Link>
            <span className="footer__brand-sub">Consult</span>
            <p className="footer__tagline">
              Holding responsibility where your work depends on continuity across time.
            </p>
          </div>
          <div>
            <p className="footer__col-title">Pages</p>
            <ul className="footer__nav-list">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/how-we-work', label: 'How We Work' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Start Here' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to} className="footer__nav-link">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Services</p>
            <ul className="footer__nav-list">
              <li><Link to="/services#strategy" className="footer__nav-link">Strategy</Link></li>
              <li><Link to="/services#creative" className="footer__nav-link">Creative</Link></li>
              <li><Link to="/services#systems" className="footer__nav-link">Systems / Execution</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© 2025 Elòmiràn Consult. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
