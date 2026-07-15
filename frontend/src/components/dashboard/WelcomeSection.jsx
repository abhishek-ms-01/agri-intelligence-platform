import { motion } from 'framer-motion'
import { BrainCircuit, CloudSun, Sprout, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

const STATUS_PILLS = [
  { label: '3 AI Insights Ready', color: '#10b981', bg: 'rgba(16,185,129,0.1)', dot: true },
  { label: 'Farm: Healthy',        color: '#34d399', bg: 'rgba(52,211,153,0.1)', dot: false, icon: Sprout },
  { label: 'Rain Tomorrow',        color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', dot: false, icon: CloudSun },
]

export default function WelcomeSection() {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginBottom: '2rem',
        padding: '1.75rem 2rem',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(5,150,105,0.02) 50%, rgba(9,26,46,0.6) 100%)',
        border: '1px solid rgba(5,150,105,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: '30%',
        width: 150, height: 150,
        background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Left: greeting */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <motion.span
              animate={{ rotate: [0, 15, -5, 10, 0] }}
              transition={{ duration: 1.5, delay: 0.5, repeat: 0 }}
              style={{ fontSize: '1.5rem', lineHeight: 1 }}
            >
              👋
            </motion.span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.2 }}>
              {getGreeting()}, Farmer!
            </h2>
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-soft)', fontFamily: 'Inter', marginBottom: '0.5rem' }}>
            Welcome back to your <strong style={{ color: 'var(--color-primary-light)' }}>Farm Intelligence Center</strong>.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{today}</p>
        </div>

        {/* Right: AI Status pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          {STATUS_PILLS.map(({ label, color, bg, dot, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 99,
                background: bg,
                border: `1px solid ${color}30`,
                fontSize: '0.75rem', fontWeight: 600, color,
                fontFamily: 'Inter',
              }}
            >
              {dot && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: color }}
                />
              )}
              {Icon && <Icon size={12} color={color} />}
              {label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Today's status bar */}
      <div style={{
        marginTop: '1.25rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(5,150,105,0.08)',
          border: '1px solid rgba(5,150,105,0.2)',
        }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary-light)', flexShrink: 0 }}
          />
          <BrainCircuit size={14} color="var(--color-primary-light)" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-light)', fontFamily: 'Inter' }}>
            AI is continuously analyzing your farm conditions
          </span>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}
          id="welcome-view-full-report"
          onClick={() => navigate('/app/crop-intelligence')}
        >
          View Full Report <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
