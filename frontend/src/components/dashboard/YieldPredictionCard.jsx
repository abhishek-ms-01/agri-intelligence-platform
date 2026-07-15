import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, IndianRupee, AlertCircle, BarChart2 } from 'lucide-react'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'

const trendData = [
  { m: 'Feb', y: 2.8 }, { m: 'Mar', y: 3.1 }, { m: 'Apr', y: 3.4 },
  { m: 'May', y: 3.0 }, { m: 'Jun', y: 3.6 }, { m: 'Jul', y: 3.9 },
  { m: 'Aug', y: 4.2 },
]

function AnimatedStat({ label, val, color, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} style={{
      padding: '0.875rem',
      borderRadius: 'var(--radius-md)',
      background: `${color}08`,
      border: `1px solid ${color}20`,
    }}>
      <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontFamily: 'Inter', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      <p style={{ fontSize: '1.125rem', fontWeight: 700, color, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
        {prefix}{val}{suffix}
      </p>
    </div>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#111827', border: '1px solid #1f2d3d',
      borderRadius: 8, padding: '0.5rem 0.75rem',
      fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'white',
    }}>
      <p>{payload[0]?.payload?.m}</p>
      <p style={{ color: '#10b981', fontWeight: 600 }}>{payload[0]?.value} t/ha</p>
    </div>
  )
}

export default function YieldPredictionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg, #111827, #0a1628)',
        border: '1px solid rgba(245,158,11,0.15)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: -40, right: -40,
        width: 140, height: 140,
        background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(245,158,11,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BarChart2 size={16} color="var(--color-accent)" />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)', fontFamily: 'Inter' }}>
          Yield & Profit Prediction
        </span>
        <span className="badge badge-accent" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>
          AI Forecast
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <AnimatedStat label="Expected Yield"   val="4.2 t/ha" color="#10b981" />
        <AnimatedStat label="Expected Revenue" val="₹1.26L"   color="#f59e0b" />
        <AnimatedStat label="Risk Level"        val="Low"      color="#34d399" />
        <AnimatedStat label="Confidence"        val="91%"      color="#a78bfa" />
      </div>

      {/* Mini chart */}
      <div style={{ height: 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="y" stroke="#10b981" strokeWidth={2} fill="url(#yieldGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '0.5rem' }}>
        <TrendingUp size={13} color="#10b981" />
        <span style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'Inter', fontWeight: 500 }}>
          +18% above last season average
        </span>
      </div>
    </motion.div>
  )
}
