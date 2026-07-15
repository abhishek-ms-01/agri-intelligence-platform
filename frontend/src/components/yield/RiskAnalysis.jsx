import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react'


const RISK_ICON = { Low: ShieldCheck, Medium: AlertTriangle, High: ShieldAlert }
const RISK_BADGE = { Low: 'badge-success', Medium: 'badge-warning', High: 'badge-danger' }

export default function RiskAnalysis({ prediction }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const risks = prediction?.risks || [
    { name: 'Weather Risk', level: 'Low', reason: 'Favorable upcoming conditions', pct: 15, color: '#10b981' }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldAlert size={16} color="#ef4444" />
        </div>
        <div>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Risk Analysis</span>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>AI-assessed farming risks</p>
        </div>
        <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>Overall: Low</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
        {risks.map((risk, i) => {
          const Icon = RISK_ICON[risk.level] || ShieldCheck
          const badge = RISK_BADGE[risk.level] || 'badge-success'
          return (
            <motion.div
              key={risk.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -12 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Icon size={14} color={risk.color} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', flex: 1 }}>{risk.name}</span>
                <span className={`badge ${badge}`} style={{ fontSize: '0.6875rem' }}>{risk.level}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: risk.color, minWidth: 36, textAlign: 'right' }}>{risk.pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: '0.375rem' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: inView ? `${risk.pct}%` : 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  style={{ height: '100%', borderRadius: 99, background: risk.color }}
                />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', paddingLeft: '1.375rem' }}>{risk.reason}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
