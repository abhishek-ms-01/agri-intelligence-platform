import { motion } from 'framer-motion'
import { Droplets, Clock, BrainCircuit } from 'lucide-react'
import { IRRIGATION_REC as R, SPRAY_REC as S, HARVEST_REC as H } from './weatherData'

// ── Irrigation ─────────────────────────────────────────────────────────────
function IrrigationCard() {
  const decisionColor = { SKIP: '#ef4444', YES: '#22c55e', DELAY: '#f97316' }
  const color = decisionColor[R.decision] || '#22c55e'

  return (
    <div className="card card-glow" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Droplets size={16} color="#3b82f6" />
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Irrigation Recommendation</span>
      </div>

      {/* Decision badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          background: `${color}18`,
          border: `2px solid ${color}40`,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Syne,sans-serif', color, lineHeight: 1 }}>{R.decision}</p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginTop: 2, fontWeight: 600 }}>Today</p>
        </div>
        <div>
          <div style={{ display: 'flex', align: 'center', gap: '0.375rem', marginBottom: '0.375rem' }}>
            <Clock size={13} color="var(--color-muted)" />
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Next window:</span>
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>{R.time}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{R.amount} today</p>
        </div>
      </div>

      {/* Soil moisture bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Current Soil Moisture</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6' }}>{R.soilMoisture}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${R.soilMoisture}%` }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ height: '100%', borderRadius: 99, background: '#3b82f6' }}
          />
        </div>
      </div>

      <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <BrainCircuit size={13} color="var(--color-primary-light)" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{R.reason}</p>
        </div>
      </div>
    </div>
  )
}

// ── Spray ───────────────────────────────────────────────────────────────────
function SprayCard() {
  const decisionColors = {
    TODAY: { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)' },
    YES:   { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.25)'  },
    WAIT:  { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)' },
    NO:    { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)'  },
  }
  const dc = decisionColors[S.decision] || decisionColors.YES

  return (
    <div className="card card-glow" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(249,115,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16 }}>💊</span>
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Spraying Recommendation</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{
          padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)',
          background: dc.bg, border: `2px solid ${dc.border}`, textAlign: 'center',
        }}>
          <p style={{ fontSize: '1.375rem', fontWeight: 900, fontFamily: 'Syne,sans-serif', color: dc.color, lineHeight: 1 }}>{S.decision}</p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginTop: 2 }}>Spray today</p>
        </div>
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{S.label}</p>
          <p style={{ fontSize: '0.8125rem', color: dc.color, fontWeight: 600 }}>Window: {S.window}</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Recommended Products</p>
        {S.products.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: dc.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)' }}>{p}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <BrainCircuit size={13} color="var(--color-primary-light)" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{S.reason}</p>
        </div>
      </div>
    </div>
  )
}

// ── Harvest ─────────────────────────────────────────────────────────────────
function HarvestCard() {
  const color = H.decision === 'HARVEST' ? '#22c55e' : H.decision === 'WAIT' ? '#f59e0b' : '#ef4444'
  return (
    <div className="card card-glow" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16 }}>🌾</span>
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Harvest Recommendation</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{
          padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)',
          background: `${color}18`, border: `2px solid ${color}40`, textAlign: 'center',
        }}>
          <p style={{ fontSize: '1.375rem', fontWeight: 900, fontFamily: 'Syne,sans-serif', color, lineHeight: 1 }}>{H.decision}</p>
        </div>
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Best Window: <span style={{ color }}>{H.harvestWindow}</span></p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Risk Level: <span style={{ color, fontWeight: 600 }}>{H.risk}</span></p>
        </div>
      </div>

      <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <BrainCircuit size={13} color="var(--color-primary-light)" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{H.reason}</p>
        </div>
      </div>
      <p style={{ fontSize: '0.8125rem', color: color, fontWeight: 500 }}>⚠️ {H.yieldRisk}</p>
    </div>
  )
}

// ── Exports ──────────────────────────────────────────────────────────────────
export default function FarmingRecommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>
          AI Farming Recommendations
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Decisions tailored to today's weather conditions</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
        <IrrigationCard />
        <SprayCard />
        <HarvestCard />
      </div>
    </motion.div>
  )
}
