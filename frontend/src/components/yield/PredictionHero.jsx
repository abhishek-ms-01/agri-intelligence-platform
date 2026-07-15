import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, IndianRupee, Leaf, ShieldCheck, Calendar, Droplets } from 'lucide-react'


// Animated counter
function Counter({ target, prefix = '', suffix = '', duration = 1.8 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const t = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(t) }
      else setVal(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(t)
  }, [inView, target, duration])
  return <span ref={ref}>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>
}

// SVG ring for success probability
function SuccessRing({ pct }) {
  const R_SVG = 44, C = 2 * Math.PI * R_SVG
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setProgress(pct), 300)
    return () => clearTimeout(t)
  }, [inView, pct])
  const offset = C - (progress / 100) * C

  return (
    <div ref={ref} style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
      <svg width={100} height={100} viewBox="0 0 100 100">
        <circle cx={50} cy={50} r={R_SVG} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={8} />
        <circle cx={50} cy={50} r={R_SVG} fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth={8}
          strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)', filter: 'blur(4px)' }} />
        <circle cx={50} cy={50} r={R_SVG} fill="none" stroke="url(#yGrad)" strokeWidth={8}
          strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }} />
        <defs>
          <linearGradient id="yGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.375rem', fontWeight: 800, fontFamily: 'Syne,sans-serif', lineHeight: 1 }}>{pct}%</span>
        <span style={{ fontSize: '0.5625rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Success</span>
      </div>
    </div>
  )
}

export default function PredictionHero({ prediction }) {
  const R = prediction || {
    expectedYield: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
    successProb: 0,
    riskLevel: 'Medium',
    yieldPerAcre: 0,
    harvestWindow: '-',
    bestHarvestMonth: '-',
    waterUsage: '-',
    carbonScore: 0
  };
  const STAT_CARDS = [
    { icon: Leaf,        label: 'Expected Yield',   value: R.expectedYield,   suffix: ' Tons', prefix: '',   color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)' },
    { icon: IndianRupee, label: 'Estimated Revenue', value: R.revenue,         suffix: '',      prefix: '₹',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.2)' },
    { icon: TrendingUp,  label: 'Net Profit',        value: R.profit,          suffix: '',      prefix: '₹',  color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.2)'  },
    { icon: TrendingUp,  label: 'ROI',               value: R.roi,             suffix: '%',     prefix: '',   color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)' },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* ── Hero Banner ──────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #051a0e 0%, #0a1628 50%, #051a0e 100%)',
        border: '1px solid rgba(5,150,105,0.3)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '1.25rem',
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, background: 'radial-gradient(circle,rgba(5,150,105,0.15) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
          <SuccessRing pct={R.successProb} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Prediction Complete</span>
              <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
                <ShieldCheck size={10} /> {R.riskLevel} Risk
              </span>
            </div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '2rem', lineHeight: 1.1, marginBottom: '0.25rem', background: 'linear-gradient(135deg,#f8fafc,#94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <Counter target={R.expectedYield * 10} suffix="" /> <span style={{ fontSize: '1rem', WebkitTextFillColor: 'var(--color-text-soft)' }}>Tons expected</span>
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              {R.yieldPerAcre} tons/acre · Harvest: <span style={{ color: 'var(--color-text-soft)', fontWeight: 500 }}>{R.harvestWindow}</span>
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Best Month',   value: R.bestHarvestMonth, color: '#f59e0b' },
                { label: 'Water Usage',  value: R.waterUsage,       color: '#3b82f6' },
                { label: 'Carbon Score', value: `${R.carbonScore}/100`, color: '#10b981' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 700, color }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards Grid ───────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        {STAT_CARDS.map(({ icon: Icon, label, value, suffix, prefix, color, bg, border }) => (
          <motion.div
            key={label}
            whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}20` }}
            style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: bg, border: `1px solid ${border}`, transition: 'all 0.2s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Icon size={15} color={color} />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>{label}</span>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Syne,sans-serif', color, lineHeight: 1 }}>
              <Counter target={value} prefix={prefix} suffix={suffix} />
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
