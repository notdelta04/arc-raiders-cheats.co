import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href: string;
  hideUrlOnHover?: boolean;
}

export default function MotionButton({ children, className, href, hideUrlOnHover = false }: Props) {
  const external = href.startsWith('http');

  if (hideUrlOnHover) {
    return (
      <motion.button
        type="button"
        className={className}
        data-go-url={href}
        whileHover={{ scale: 1.05, y: -3, boxShadow: '0 12px 32px var(--shadow-accent)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 480, damping: 20 }}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      className={className}
      {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
      whileHover={{ scale: 1.05, y: -3, boxShadow: '0 12px 32px var(--shadow-accent)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 480, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}
