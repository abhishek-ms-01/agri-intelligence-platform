import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function FloatingAIBot() {
  const nav = useNavigate()

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => nav('/app/advisor')}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(16,185,129,0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
      }}
      title="Open AI Farm Advisor"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '2px solid rgba(16,185,129,0.5)',
        }}
      />
      <Bot size={24} color="#ffffff" />
    </motion.button>
  )
}
