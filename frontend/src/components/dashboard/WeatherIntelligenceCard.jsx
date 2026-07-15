import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, Thermometer, AlertTriangle, BrainCircuit } from 'lucide-react'

const stats = [
  { icon: Thermometer, label: 'Temperature', val: '28°C',     color: '#f97316', bg: 'rgba(249,115,22,0.1)'  },
  { icon: Droplets,    label: 'Humidity',    val: '74%',      color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
  { icon: Cloud,       label: 'Rainfall',    val: '12mm',     color: '#a78bfa', bg: 'rgba(167,139,250,0.1)'},
  { icon: Wind,        label: 'Wind Speed',  val: '18 km/h',  color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
]

export default function WeatherIntelligenceCard() {
  const riskPercent = 62

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #0a1628)',
        border: '1px solid rgba(96,165,250,0.15)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: -50, right: -50,
        width: 160, height: 160,
        background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(96,165,250,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Cloud size={16} color="#60a5fa" />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)', fontFamily: 'Inter' }}>
          Weather Intelligence
        </span>
        <span className="badge" style={{ marginLeft: 'auto', fontSize: '0.6875rem', background: 'rgba(96,165,250,0.1)', color: '#60a5fa' }}>
          Live
        </span>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1.25rem' }}>
        {stats.map(({ icon: Icon, label, val, color, bg }) => (
          <div key={label} style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            background: bg,
            border: `1px solid ${color}25`,
            display: 'flex', alignItems: 'center', gap: '0.625rem',
          }}>
            <Icon size={14} color={color} />
            <div>
              <p style={{ fontSize: '0.625rem', color: 'var(--color-muted)', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color, fontFamily: 'Syne, sans-serif', lineHeight: 1.1 }}>{val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Disease Risk Meter */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <AlertTriangle size={13} color="#f97316" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-soft)', fontFamily: 'Inter' }}>Disease Risk</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f97316', fontFamily: 'Syne, sans-serif' }}>{riskPercent}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${riskPercent}%` }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '100%', borderRadius: 99,
              background: 'linear-gradient(90deg, #f97316, #ef4444)',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: '0.625rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>Low</span>
          <span style={{ fontSize: '0.625rem', color: '#f97316', fontFamily: 'Inter', fontWeight: 600 }}>Moderate</span>
          <span style={{ fontSize: '0.625rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>High</span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div style={{
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(96,165,250,0.06)',
        border: '1px solid rgba(96,165,250,0.15)',
        display: 'flex', gap: '0.5rem',
      }}>
        <BrainCircuit size={13} color="#60a5fa" style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-soft)', fontFamily: 'Inter', lineHeight: 1.5 }}>
          <strong style={{ color: '#60a5fa' }}>AI:</strong> Blight risk elevated. Apply preventive spray before 6 AM tomorrow.
        </p>
      </div>
    </motion.div>
  )
}
