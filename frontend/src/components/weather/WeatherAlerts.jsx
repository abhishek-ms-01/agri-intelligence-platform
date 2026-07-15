import { motion } from 'framer-motion'
import { WEATHER_ALERTS } from './weatherData'

const ALERT_CFG = {
  danger:  { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)',  color: '#ef4444',  badge: 'badge-danger'  },
  warning: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', color: '#f97316',  badge: 'badge-warning' },
  info:    { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)', color: '#3b82f6',  badge: 'badge-info'    },
}

export default function WeatherAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>
          Active Weather Alerts
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{WEATHER_ALERTS.length} alerts require your attention</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
        {WEATHER_ALERTS.map((alert, i) => {
          const cfg = ALERT_CFG[alert.type] || ALERT_CFG.info
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              whileHover={{ y: -3, boxShadow: `0 8px 32px ${cfg.color}20` }}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{alert.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>{alert.title}</span>
                    <span className={`badge ${cfg.badge}`} style={{ fontSize: '0.6875rem' }}>{alert.time}</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{alert.desc}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
