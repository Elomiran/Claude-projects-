import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export function Reveal({ children, direction = 'up', delay = 0, className, as: Tag = 'div', ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -48px 0px' });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
      y: direction === 'up' ? 28 : direction === 'fade' ? 0 : 0,
    },
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: { duration: 0.72, ease, delay },
    },
  };

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({ children, className, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -48px 0px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
