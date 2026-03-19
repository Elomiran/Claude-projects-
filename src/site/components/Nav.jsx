import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LogoMark from './LogoMark.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/how-we-work', label: 'How We Work' },
  { to: '/about', label: 'About' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHero = location.pathname === '/';

  useEffect(() => {
    if (!isHero) { setScrolled(false); return; }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHero]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : '';
      return !v;
    });
  };

  const navClass = [
    'nav',
    isHero ? 'nav--hero' : 'nav--solid',
    isHero && scrolled ? 'nav--scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className="nav__inner">
        <Link to="/" className="nav__logo" aria-label="Elòmiràn Consult — home">
          <LogoMark />
          <div className="nav__logo-text">
            <span className="nav__logo-name">Elòmiràn</span>
            <span className="nav__logo-sub">Consult</span>
          </div>
        </Link>

        <div className="nav__links" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="nav__link"
              aria-current={location.pathname === to ? 'page' : undefined}
              role="listitem"
            >
              {label}
            </Link>
          ))}
          <Link to="/contact" className="nav__cta btn btn-ghost-light btn-nav" role="listitem">
            Start Here
          </Link>
        </div>

        <button
          className={`nav__hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-overlay"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-overlay"
            className="nav__mobile-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="nav__link"
                aria-current={location.pathname === to ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
            <div className="nav__mobile-rule" />
            <Link to="/contact" className="nav__mobile-cta btn btn-light">
              Start Here <span className="arrow">→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
