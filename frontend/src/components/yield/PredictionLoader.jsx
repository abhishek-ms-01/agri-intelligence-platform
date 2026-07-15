import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

const STEPS = [
  { label: 'Collecting Farm Data',         duration: 700  },
  { label: 'Analysing Weather Patterns',   duration: 1100 },
  { label: 'Calculating Yield Estimate',   duration: 900  },
  { label: 'Estimating Revenue & Profit',  duration: 700  },
  { label: 'Generating AI Recommendations', duration: 900  },
  { label: 'Finalising Prediction Report', duration: 600  },
]

export default function PredictionLoader({ isVisible }) {
  const [active, setActive] = useState(0)
  const [done, setDone]     = useState([])

  useEffect(() => {
    if (!isVisible) { setActive(0); setDone([]); return }
    let elapsed = 0
    const timers = []
    STEPS.forEach((s, i) => {
      const t = setTimeout(() => {
        setActive(i)
        if (i > 0) setDone(p => [...p, i - 1])
      }, elapsed)
      timers.push(t)
      elapsed += s.duration
    })
    return () => timers.forEach(clearTimeout)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {/* Thinking animation */}
      <div className="card" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#061a10 100%)', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, background: 'radial-gradient(circle,rgba(5,150,105,0.12) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {[1,2,3].map(r => (
            <motion.div key={r} animate={{ scale: [1, 1.3 + r * 0.15, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: r * 0.4, ease: 'easeOut' }}
              style={{ position: 'absolute', width: 40 + r * 24, height: 40 + r * 24, borderRadius: '50%', border: '1px solid rgba(5,150,105,0.4)' }}
            />
          ))}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ width: 48, height: 48, borderRadius: '50%', border: '2.5px solid transparent', borderTopColor: 'var(--color-primary-light)', borderRightColor: 'rgba(5,150,105,0.3)' }}
          />
          <Loader2 size={18} color="var(--color-primary-light)" style={{ position: 'absolute' }} />
        </div>
        <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.25rem' }}>
          Gemini AI is analysing your farm…
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Powered by Gemini AI · Please wait</p>
      </div>

      {/* Steps */}
      <div className="card" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Prediction Pipeline</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {STEPS.map((step, i) => {
            const isDone   = done.includes(i)
            const isActive = active === i && !isDone
            const pending  = !isDone && !isActive
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: pending ? 0.4 : 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDone ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}><CheckCircle2 size={18} color="#22c55e" /></motion.div>
                    : isActive ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 16, height: 16, border: '2px solid rgba(5,150,105,0.25)', borderTopColor: 'var(--color-primary-light)', borderRadius: '50%' }} />
                    : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-border-light)' }} />}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 400, color: isDone ? 'var(--color-success)' : isActive ? 'var(--color-text)' : 'var(--color-muted)', transition: 'all 0.2s' }}>
                  {step.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Skeleton cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {[1,2,3,4].map(i => (
          <div key={i} className="card" style={{ padding: '1.25rem' }}>
            <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 28, width: '80%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 10, width: '50%' }} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
