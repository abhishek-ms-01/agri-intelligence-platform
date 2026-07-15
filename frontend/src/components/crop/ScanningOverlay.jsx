import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

const STEPS = [
  { id: 0, label: 'Image Uploaded',          duration: 600  },
  { id: 1, label: 'AI Processing',            duration: 1400 },
  { id: 2, label: 'Disease Detection',        duration: 1200 },
  { id: 3, label: 'Risk Analysis',            duration: 1000 },
  { id: 4, label: 'Recommendation Generated', duration: 800  },
  { id: 5, label: 'Analysis Complete',        duration: 400  },
]

export default function ScanningOverlay({ isVisible }) {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])

  useEffect(() => {
    if (!isVisible) {
      setActiveStep(0)
      setCompletedSteps([])
      return
    }

    let elapsed = 0
    const timers = []
    STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setActiveStep(i)
        setCompletedSteps(prev => [...prev, ...(i > 0 ? [i - 1] : [])])
      }, elapsed)
      timers.push(t)
      elapsed += step.duration
    })

    return () => timers.forEach(clearTimeout)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {/* ── Scanning Animation Card ────────────────────── */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f1f0f 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        {/* Pulsing scan rings */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              animate={{ scale: [1, 1.4 + ring * 0.2, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: ring * 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 48 + ring * 24,
                height: 48 + ring * 24,
                borderRadius: '50%',
                border: '1px solid rgba(5,150,105,0.4)',
              }}
            />
          ))}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: 'var(--color-primary-light)',
              borderRightColor: 'rgba(5,150,105,0.3)',
              position: 'relative', zIndex: 1,
            }}
          />
          <div style={{
            position: 'absolute',
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(5,150,105,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Loader2 size={16} color="var(--color-primary-light)" />
          </div>
        </div>

        <p style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700,
          fontSize: '1.0625rem', marginBottom: '0.375rem',
        }}>
          AI is analyzing your crop…
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
          Powered by Gemini Vision · Please wait
        </p>

        {/* Scan line animation */}
        <motion.div
          animate={{ y: [-40, 40, -40] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: 0, right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(5,150,105,0.6), transparent)',
            top: '50%',
          }}
        />
      </div>

      {/* ── Progress Steps ────────────────────────────── */}
      <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
          Analysis Pipeline
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {STEPS.map((step, i) => {
            const isDone    = completedSteps.includes(i)
            const isActive  = activeStep === i && !isDone
            const isPending = !isDone && !isActive

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                {/* Icon */}
                <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDone ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <CheckCircle2 size={18} color="#22c55e" />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: 16, height: 16,
                        border: '2px solid rgba(5,150,105,0.25)',
                        borderTopColor: 'var(--color-primary-light)',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--color-border-light)',
                    }} />
                  )}
                </div>

                {/* Label */}
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isDone
                    ? 'var(--color-success)'
                    : isActive
                    ? 'var(--color-text)'
                    : 'var(--color-muted)',
                  transition: 'all 0.2s',
                }}>
                  {step.label}
                </span>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', left: 11,
                    display: 'none', // visual connector via gap
                  }} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Skeleton Loaders ────────────────────────── */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="skeleton" style={{ height: 20, width: '60%' }} />
        <div className="skeleton" style={{ height: 14, width: '90%' }} />
        <div className="skeleton" style={{ height: 14, width: '75%' }} />
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
          <div className="skeleton" style={{ height: 70, flex: 1, borderRadius: 12 }} />
          <div className="skeleton" style={{ height: 70, flex: 1, borderRadius: 12 }} />
        </div>
        <div className="skeleton" style={{ height: 14, width: '80%' }} />
        <div className="skeleton" style={{ height: 14, width: '65%' }} />
      </div>
    </motion.div>
  )
}
