import { motion } from 'framer-motion'
import { BrainCircuit, AlertTriangle, ChevronRight, Sparkles } from 'lucide-react'

const SEV = {
  High:   { badge: 'badge-danger',  color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
  Medium: { badge: 'badge-warning', color: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)'  },
  Low:    { badge: 'badge-success', color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)'   },
}

export default function AIWeatherInsight({ analysis }) {
  if (!analysis) return null;
  const sev = SEV[analysis.severity] || SEV.High;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      style={{
        background: 'linear-gradient(135deg, #060f1a 0%, #06150f 100%)',
        border: `1px solid ${sev.border}`,
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: `radial-gradient(circle,${sev.color}18 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1.5rem' }}>
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'rgba(5,150,105,0.15)',
            border: '1px solid rgba(5,150,105,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <BrainCircuit size={22} color="var(--color-primary-light)" />
        </motion.div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Gemini AI Weather Analysis
            </span>
            <span className={`badge ${sev.badge}`} style={{ fontSize: '0.6875rem' }}>
              {analysis.severity} Alert
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              {analysis.confidence}% confidence
            </span>
          </div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.3, color: 'var(--color-text)' }}>
            {analysis.headline}
          </h2>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        marginBottom: '1.5rem',
      }}>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-soft)', lineHeight: 1.7 }}>
          {analysis.summary}
        </p>
      </div>

      {/* Recommended Actions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          AI Recommended Actions
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {analysis.actions && analysis.actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
              style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}
            >
              <ChevronRight size={13} color={sev.color} style={{ marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{action}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, padding: '0.875rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: sev.bg, border: `1px solid ${sev.border}`,
          display: 'flex', alignItems: 'center', gap: '0.625rem',
        }}>
          <AlertTriangle size={16} color={sev.color} />
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expected Crop Impact</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: sev.color }}>{analysis.cropImpact}</p>
          </div>
        </div>
        <div style={{
          flex: 1, padding: '0.875rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)',
          display: 'flex', alignItems: 'center', gap: '0.625rem',
        }}>
          <Sparkles size={16} color="var(--color-primary-light)" />
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Confidence</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>{analysis.confidence}%</p>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginTop: '1rem', textAlign: 'right' }}>Generated by Gemini-flash-latest</p>
    </motion.div>
  )
}
