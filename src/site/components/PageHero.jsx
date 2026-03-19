import { motion } from 'framer-motion';
import LogoMark from './LogoMark.jsx';

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero" aria-label={`${title} overview`}>
      <LogoMark className="page-hero__bg-mark" invert />
      <div className="page-hero__inner">
        <motion.p
          className="page-hero__label section-label section-label-light t-label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="page-hero__title t-h1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="page-hero__desc"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
