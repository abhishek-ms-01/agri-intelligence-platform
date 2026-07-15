import { motion } from 'framer-motion'
import { History, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'
const PREDICTION_HISTORY = [
  { id: '1', crop: 'Wheat', date: '12 Oct 2026', yield: '15.2', profit: 245000, status: 'Accurate', diff: '+2%' },
  { id: '2', crop: 'Soybean', date: '05 Sep 2026', yield: '8.4', profit: 125000, status: 'Slightly Low', diff: '-5%' },
  { id: '3', crop: 'Corn', date: '22 Aug 2026', yield: '22.1', profit: 310000, status: 'Exceeded', diff: '+12%' },
]
const STATUS_CFG = {
  'Accurate':     { badge: 'badge-success', color: '#22c55e' },
  'Exceeded':     { badge: 'badge-primary', color: '#10b981' },
  'Slightly Low': { badge: 'badge-warning', color: '#f97316' },
}

export default function PredictionHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(5,150,105,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <History size={16} color="var(--color-primary-light)" />
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Prediction History</span>
        <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>
          {PREDICTION_HISTORY.length} predictions
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {PREDICTION_HISTORY.map((p, i) => {
          const cfg = STATUS_CFG[p.status] || STATUS_CFG['Accurate']
          const isUp = p.diff.startsWith('+')
          const DiffIcon = isUp ? TrendingUp : p.diff.startsWith('-') ? TrendingDown : Minus
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ x: 4, background: 'rgba(255,255,255,0.03)' }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {/* Timeline dot */}
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: cfg.color, flexShrink: 0, boxShadow: `0 0 8px ${cfg.color}60` }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{p.crop}</span>
                  <span className={`badge ${cfg.badge}`} style={{ fontSize: '0.6rem' }}>{p.status}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{p.date} · {p.yield} tons · ₹{p.profit.toLocaleString('en-IN')}</p>
              </div>

              {/* Diff */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                <DiffIcon size={13} color={isUp ? '#22c55e' : '#ef4444'} />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isUp ? '#22c55e' : '#ef4444' }}>{p.diff}</span>
              </div>

              <ChevronRight size={14} color="var(--color-muted)" />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
