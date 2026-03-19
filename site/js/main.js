/* ============================================================
   ELOMIRAN CONSULT — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Page Curtain (entry animation) ─────────────────────── */
  function initPageCurtain() {
    const curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    document.body.prepend(curtain);

    curtain.addEventListener('animationend', () => {
      curtain.remove();
    });
  }

  /* ── Navigation ──────────────────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const isHero = nav.classList.contains('nav--hero');

    // Scroll → solidify nav
    if (isHero) {
      const onScroll = () => {
        if (window.scrollY > 60) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // run once on load
    }

    // Mobile hamburger
    const hamburger = nav.querySelector('.nav__hamburger');
    const overlay   = nav.querySelector('.nav__mobile-overlay');

    if (hamburger && overlay) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('is-open');
        overlay.classList.toggle('is-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        hamburger.setAttribute('aria-expanded', isOpen);
      });

      // Close overlay on link click
      overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('is-open');
          overlay.classList.remove('is-open');
          document.body.style.overflow = '';
          hamburger.setAttribute('aria-expanded', false);
        });
      });

      // Close on ESC
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
          hamburger.classList.remove('is-open');
          overlay.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ── Scroll Reveal ───────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px'
    });

    els.forEach(el => io.observe(el));
  }

  /* ── Services sticky sub-nav highlight ──────────────────── */
  function initServicesNav() {
    const subnav = document.querySelector('.services-nav');
    if (!subnav) return;

    const links    = subnav.querySelectorAll('.services-nav__link');
    const sections = [];

    links.forEach(link => {
      const id  = link.getAttribute('href').replace('#', '');
      const sec = document.getElementById(id);
      if (sec) sections.push({ link, sec });
    });

    if (!sections.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sections.forEach(({ link, sec }) => {
            link.classList.toggle('is-active', sec === entry.target);
          });
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(({ sec }) => io.observe(sec));
  }

  /* ── Contact form ────────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const success = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      const btn = form.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';

      // Simulate async submission (replace with real endpoint)
      setTimeout(() => {
        form.style.display = 'none';
        if (success) success.classList.add('is-visible');
      }, 1000);
    });

    // Clear error state on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  /* ── Smooth internal link transitions ───────────────────── */
  function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(link => {
      // Only internal links, not anchors
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank' ||
        href.includes('://')
      ) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        const dest = this.href;

        const exit = document.createElement('div');
        exit.className = 'page-curtain';
        exit.style.animation = 'none';
        exit.style.transform = 'scaleY(0)';
        exit.style.transformOrigin = 'bottom';
        document.body.prepend(exit);

        // Force reflow
        void exit.offsetWidth;

        exit.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        exit.style.transform = 'scaleY(1)';

        setTimeout(() => {
          window.location.href = dest;
        }, 420);
      });
    });
  }

  /* ── Stagger children ────────────────────────────────────── */
  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach(parent => {
      const children = parent.children;
      Array.from(children).forEach((child, i) => {
        if (!child.hasAttribute('data-reveal')) {
          child.setAttribute('data-reveal', '');
        }
        child.setAttribute('data-delay', Math.min(i + 1, 6));
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    initPageCurtain();
    initStagger();
    initReveal();
    initNav();
    initServicesNav();
    initContactForm();
    initPageTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
