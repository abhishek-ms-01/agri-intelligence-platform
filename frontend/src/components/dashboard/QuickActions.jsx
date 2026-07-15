import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Camera, CloudSun, TrendingUp, MessageSquareText, BookOpen, ArrowRight,
} from 'lucide-react'

const actions = [
  {
    icon: Camera,
    label: 'Upload Crop Image',
    desc: 'AI disease detection',
    color: '#10b981',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.06))',
    border: 'rgba(16,185,129,0.2)',
    route: '/app/crop-intelligence',
    id: 'qa-upload-crop',
  },
  {
    icon: CloudSun,
    label: 'Weather Intelligence',
    desc: 'Live forecasts & risk',
    color: '#60a5fa',
    bg: 'linear-gradient(135deg, rgba(96,165,250,0.12), rgba(59,130,246,0.06))',
    border: 'rgba(96,165,250,0.2)',
    route: '/app/weather',
    id: 'qa-weather',
  },
  {
    icon: TrendingUp,
    label: 'Yield Prediction',
    desc: 'Forecast your harvest',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.06))',
    border: 'rgba(245,158,11,0.2)',
    route: '/app/yield',
    id: 'qa-yield',
  },
  {
    icon: MessageSquareText,
    label: 'Ask AI Advisor',
    desc: 'Instant expert answers',
    color: '#a78bfa',
    bg: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(124,58,237,0.06))',
    border: 'rgba(167,139,250,0.2)',
    route: '/app/advisor',
    id: 'qa-advisor',
  },
  {
    icon: BookOpen,
    label: 'Government Schemes',
    desc: 'Subsidies & programs',
    color: '#f472b6',
    bg: 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(219,39,119,0.06))',
    border: 'rgba(244,114,182,0.2)',
    route: '/app/schemes',
    id: 'qa-schemes',
  },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text)' }}>
          Quick Actions
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>
          5 modules
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        {actions.map(({ icon: Icon, label, desc, color, bg, border, route, id }, i) => (
          <motion.button
            key={label}
            id={id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4, boxShadow: `0 8px 24px ${color}20` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(route)}
            style={{
              padding: '1.125rem',
              borderRadius: 'var(--radius-lg)',
              background: bg,
              border: `1px solid ${border}`,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex', flexDirection: 'column', gap: '0.625rem',
              transition: 'border-color 0.2s ease',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Glow corner */}
            <div style={{
              position: 'absolute', top: -20, right: -20,
              width: 80, height: 80,
              background: `radial-gradient(circle, ${color}20, transparent 70%)`,
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${color}15`,
              border: `1px solid ${color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'Inter', lineHeight: 1.3 }}>
                {label}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter', marginTop: 2 }}>
                {desc}
              </p>
            </div>
            <ArrowRight size={14} color={color} style={{ marginTop: 'auto' }} />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
