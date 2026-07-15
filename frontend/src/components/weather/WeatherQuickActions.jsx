import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Camera, TrendingUp, MessageSquareText, BookOpen } from 'lucide-react'

const ACTIONS = [
  { icon: Camera,            label: 'Scan Crop',       sub: 'Disease detection', color: '#10b981', bg: 'rgba(5,150,105,0.12)',   to: '/app/crop-intelligence' },
  { icon: TrendingUp,        label: 'Predict Yield',   sub: 'AI yield forecast', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  to: '/app/yield' },
  { icon: MessageSquareText, label: 'Ask AI Advisor',  sub: 'Weather-aware chat', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', to: '/app/advisor' },
  { icon: BookOpen,          label: 'Gov. Schemes',    sub: 'Weather relief aid', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', to: '/app/schemes' },
]

export default function WeatherQuickActions() {
  const nav = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Quick Actions</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Weather-informed farm operations</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem' }}>
        {ACTIONS.map(({ icon: Icon, label, sub, color, bg, to }) => (
          <motion.button
            key={label}
            whileHover={{ y: -4, boxShadow: `0 8px 24px ${color}25` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => nav(to)}
            className="card card-glow"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              gap: '0.75rem', padding: '1.25rem', cursor: 'pointer',
              background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)',
              border: '1px solid var(--color-border)', textAlign: 'left',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem', marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{sub}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
