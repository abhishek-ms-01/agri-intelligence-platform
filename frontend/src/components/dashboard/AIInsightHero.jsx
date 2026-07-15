import { motion } from 'framer-motion'
import { Sparkles, CloudRain, TrendingUp, Clock, ShieldAlert, ArrowRight } from 'lucide-react'

export default function AIInsightHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid rgba(5,150,105,0.3)',
        cursor: 'default',
      }}
      whileHover={{ scale: 1.008, transition: { duration: 0.2 } }}
    >
      {/* Gradient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0d2218 0%, #091a2e 40%, #13061f 100%)',
      }} />

      {/* Animated gradient blobs */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 260, height: 260,
        background: 'radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)',
        borderRadius: '50%', animation: 'pulse-slow 4s ease infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        borderRadius: '50%', animation: 'pulse-slow 5s ease infinite 1s',
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', padding: '1.75rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #059669, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(5,150,105,0.4)',
            }}
          >
            <Sparkles size={18} color="white" />
          </motion.div>
          <div>
            <p style={{ fontSize: '0.6875rem', fontFamily: 'Inter', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
              Daily AI Intelligence
            </p>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white' }}>
              Today's AI Insight
            </h3>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}
            />
            <span style={{ fontSize: '0.6875rem', color: '#10b981', fontFamily: 'Inter', fontWeight: 600 }}>Live</span>
          </div>
        </div>

        {/* Main message */}
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '1.25rem',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
            <CloudRain size={18} color="#60a5fa" />
            <span style={{ fontSize: '0.6875rem', color: '#60a5fa', fontFamily: 'Inter', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Weather Alert
            </span>
          </div>
          <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'white', lineHeight: 1.35 }}>
            Heavy rainfall expected tomorrow morning — adjust your irrigation plan now.
          </p>
        </div>

        {/* Stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {[
            {
              icon: ShieldAlert, iconColor: '#f97316',
              label: 'Disease Risk', val: 'Moderate',
              bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)',
              textColor: '#f97316',
            },
            {
              icon: Clock, iconColor: '#60a5fa',
              label: 'Action Window', val: '24 Hours',
              bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)',
              textColor: '#60a5fa',
            },
            {
              icon: TrendingUp, iconColor: '#10b981',
              label: 'Yield Boost', val: '+8%',
              bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)',
              textColor: '#10b981',
            },
          ].map(({ icon: Icon, iconColor, label, val, bg, border, textColor }) => (
            <div key={label} style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              background: bg,
              border: `1px solid ${border}`,
              display: 'flex', flexDirection: 'column', gap: '0.375rem',
            }}>
              <Icon size={14} color={iconColor} />
              <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter' }}>{label}</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: textColor, fontFamily: 'Syne, sans-serif' }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Recommendation box */}
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(5,150,105,0.12), rgba(5,150,105,0.06))',
          border: '1px solid rgba(5,150,105,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        }}>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              AI Recommendation
            </p>
            <p style={{ fontSize: '0.9rem', color: 'white', fontFamily: 'Inter', fontWeight: 500 }}>
              Delay irrigation by 24 hours. Apply preventive fungicide to Wheat field.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-sm"
            style={{ flexShrink: 0 }}
          >
            Act <ArrowRight size={13} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
