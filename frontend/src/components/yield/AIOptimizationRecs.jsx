import { motion } from 'framer-motion'
import { BrainCircuit, ChevronRight, Clock } from 'lucide-react'

const URGENCY = {
  High:   { badge: 'badge-danger',  color: '#ef4444' },
  Medium: { badge: 'badge-warning', color: '#f97316' },
  Low:    { badge: 'badge-info',    color: '#3b82f6' },
}

export default function AIOptimizationRecs({ prediction }) {
  const RECS = prediction?.recommendations || [
    { id: '1', title: 'Optimize Nitrogen', urgency: 'High', confidence: 92, timing: 'Next 5 days', why: 'Soil needs more N', benefit: '+₹15,000', yieldGain: '+2 tons', color: '#10b981', icon: '🌱' }
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>AI Optimisation Recommendations</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          {RECS.length} recommendations · Potential gain: <span style={{ color: '#22c55e', fontWeight: 600 }}>+₹81,000</span>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {RECS.map((rec, i) => {
          const urg = URGENCY[rec.urgency] || URGENCY.Low
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ y: -2, boxShadow: `0 8px 24px ${rec.color}18` }}
              className="card"
              style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)', borderLeft: `3px solid ${rec.color}`, transition: 'all 0.2s' }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '0.875rem' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{rec.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>{rec.title}</span>
                    <span className={`badge ${urg.badge}`} style={{ fontSize: '0.6875rem' }}>{rec.urgency}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
                      {rec.confidence}% AI confidence
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Clock size={11} color="var(--color-muted)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{rec.timing}</span>
                  </div>
                </div>
              </div>

              {/* Why */}
              <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.12)', marginBottom: '0.875rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <BrainCircuit size={13} color="var(--color-primary-light)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{rec.why}</p>
                </div>
              </div>

              {/* Impact metrics */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: 99, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#22c55e' }}>{rec.benefit}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>profit gain</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981' }}>{rec.yieldGain}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>yield gain</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
