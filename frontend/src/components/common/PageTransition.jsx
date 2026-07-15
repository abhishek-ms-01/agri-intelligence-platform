import { motion } from 'framer-motion'

/**
 * PageTransition — Wraps page content with a smooth fade+slide entrance.
 * Use this as the root wrapper inside every page component.
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
