import { motion } from 'framer-motion'
const SUGGESTED_QUESTIONS = [
  { id: '1', text: 'Hi! What can you help me with?', category: 'General', icon: '👋' },
  { id: '2', text: 'How do I protect Arecanut from fruit rot?', category: 'Disease', icon: '🍂' },
  { id: '3', text: 'Best time to plant paddy before monsoon?', category: 'Weather', icon: '🌧️' },
  { id: '4', text: 'Organic fertilizers for coconut yield?', category: 'Fertilizer', icon: '🥥' },
  { id: '5', text: 'Subsidies for solar water pumps in Karnataka?', category: 'Schemes', icon: '📜' },
  { id: '6', text: 'How to manage high humidity pests?', category: 'Pesticide', icon: '🐛' },
]
const TAG_COLOR = {
  Irrigation:  { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  color: '#60a5fa'  },
  Disease:     { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   color: '#f87171'  },
  Weather:     { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  color: '#60a5fa'  },
  Fertilizer:  { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)', color: '#10b981'  },
  Yield:       { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)', color: '#f59e0b'  },
  Pesticide:   { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)',color: '#a78bfa'  },
  Schemes:     { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)', color: '#f97316'  },
  General:     { bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)', color: '#94a3b8'  },
}

export default function SuggestedQuestions({ onSelect, disabled }) {
  return (
    <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
        Suggested Questions
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {SUGGESTED_QUESTIONS.map((q, i) => {
          const cfg = TAG_COLOR[q.category] || TAG_COLOR.Yield
          return (
            <motion.button
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              whileHover={{ y: -2, boxShadow: `0 4px 12px ${cfg.color}20` }}
              whileTap={{ scale: 0.96 }}
              onClick={() => !disabled && onSelect(q.text)}
              disabled={disabled}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.4375rem 0.875rem',
                borderRadius: 99,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: '0.8125rem',
                color: cfg.color,
                fontWeight: 500,
                transition: 'all 0.2s',
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <span style={{ fontSize: 14 }}>{q.icon}</span>
              {q.text}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
