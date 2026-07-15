import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react'
import { DISEASE_RISKS } from './weatherData'

const RISK_CFG = {
  High:   { badge: 'badge-danger',  icon: ShieldAlert,  color: '#ef4444' },
  Medium: { badge: 'badge-warning', icon: AlertTriangle, color: '#f97316' },
  Low:    { badge: 'badge-success', icon: ShieldCheck,  color: '#22c55e' },
}

export default function DiseaseRiskPanel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldAlert size={16} color="#ef4444" />
        </div>
        <div>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Disease Risk Prediction</span>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Based on current weather conditions</p>
        </div>
        <span className="badge badge-danger" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>
          2 High Risks
        </span>
      </div>

      {/* Risks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {DISEASE_RISKS.map((d, i) => {
          const cfg = RISK_CFG[d.risk] || RISK_CFG.Low
          const Icon = cfg.icon
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -16 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Icon size={14} color={cfg.color} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', flex: 1 }}>{d.name}</span>
                <span className={`badge ${cfg.badge}`} style={{ fontSize: '0.6875rem' }}>{d.risk}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: cfg.color, minWidth: 36, textAlign: 'right' }}>{d.pct}%</span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: '0.375rem' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${d.pct}%` : 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  style={{ height: '100%', borderRadius: 99, background: cfg.color }}
                />
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', paddingLeft: '1.375rem' }}>
                {d.trigger} · <em>{d.pathogen}</em>
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
