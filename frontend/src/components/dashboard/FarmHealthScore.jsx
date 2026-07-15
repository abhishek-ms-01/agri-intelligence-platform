import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, TrendingUp, Leaf } from 'lucide-react'

const SCORE = 94
const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function AnimatedCounter({ target, duration = 1.8 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}</span>
}

export default function FarmHealthScore() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setProgress(SCORE), 200)
    return () => clearTimeout(timer)
  }, [inView])

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card card-glow"
      style={{
        background: 'linear-gradient(135deg, #111827 0%, #0a1628 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 140, height: 140,
        background: 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(5,150,105,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Leaf size={16} color="var(--color-primary-light)" />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)', fontFamily: 'Inter, sans-serif' }}>
          Farm Health
        </span>
        <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>
          ● Healthy
        </span>
      </div>

      {/* Ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width={130} height={130} viewBox="0 0 130 130">
            {/* Track */}
            <circle cx={65} cy={65} r={RADIUS}
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={10} />
            {/* Glow ring */}
            <circle cx={65} cy={65} r={RADIUS}
              fill="none"
              stroke="rgba(5,150,105,0.15)"
              strokeWidth={10}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{
                transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)',
                filter: 'blur(6px)',
              }}
            />
            {/* Main arc */}
            <circle cx={65} cy={65} r={RADIUS}
              fill="none"
              stroke="url(#healthGrad)"
              strokeWidth={10}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }}
            />
            <defs>
              <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--color-text)', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
              <AnimatedCounter target={SCORE} />%
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--color-muted)', fontFamily: 'Inter', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Score
            </span>
          </div>
        </div>

        {/* Details */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { label: 'Soil Moisture', val: 78, color: '#3b82f6' },
              { label: 'Crop Vigor',    val: 96, color: '#10b981' },
              { label: 'Pest Risk',     val: 12, color: '#f97316', invert: true },
            ].map(({ label, val, color, invert }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{label}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color, fontFamily: 'Inter' }}>
                    {invert ? `${val}%` : `${val}%`}
                  </span>
                </div>
                <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${val}%` : 0 }}
                    transition={{ duration: 1.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    style={{ height: '100%', borderRadius: 99, background: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div style={{
        marginTop: '1.25rem',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(5,150,105,0.06)',
        border: '1px solid rgba(5,150,105,0.15)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
      }}>
        <Activity size={13} color="var(--color-primary-light)" style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-soft)', fontFamily: 'Inter', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--color-primary-light)' }}>AI Analysis:</strong>{' '}
          Farm conditions are excellent. Crop vigor is at peak performance. Minor soil moisture optimization recommended.
        </p>
      </div>
    </motion.div>
  )
}
