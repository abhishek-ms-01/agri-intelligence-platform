import { motion } from 'framer-motion'
import { AI_INSIGHTS, FARM_CONTEXT } from './advisorData'

function FarmContextCard() {
  return (
    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
        AI Farm Context
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {FARM_CONTEXT.map(({ label, value, icon, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontWeight: 600 }}>{label}</p>
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsPanel() {
  const URGENCY_BADGE = { Critical: 'badge-danger', High: 'badge-warning', Medium: 'badge-info', Low: 'badge-success' }
  return (
    <div style={{ padding: '1rem 1.25rem', flex: 1, overflowY: 'auto' }}>
      <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
        Today's AI Insights
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {AI_INSIGHTS.map((ins, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ x: -3, boxShadow: `0 4px 16px ${ins.color}15` }}
            style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              background: ins.bg,
              border: `1px solid ${ins.border}`,
              transition: 'all 0.2s',
              cursor: 'default',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <span style={{ fontSize: 16 }}>{ins.icon}</span>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.8125rem', flex: 1 }}>{ins.title}</span>
              <span className={`badge ${URGENCY_BADGE[ins.urgency] || 'badge-info'}`} style={{ fontSize: '0.5625rem' }}>{ins.urgency}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.55, paddingLeft: '1.5rem' }}>{ins.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function AIInsightsPanel() {
  return (
    <div style={{
      width: 280,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, rgba(6,26,16,0.6) 0%, rgba(10,22,40,0.6) 100%)',
      borderLeft: '1px solid rgba(255,255,255,0.06)',
      overflowY: 'auto',
    }}>
      <FarmContextCard />
      <InsightsPanel />
    </div>
  )
}
