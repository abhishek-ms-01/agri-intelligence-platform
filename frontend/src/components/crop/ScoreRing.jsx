import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const RADIUS = 48
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function AnimatedCounter({ target, duration = 1.6, suffix = '' }) {
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

  return <span ref={ref}>{count}{suffix}</span>
}

export default function ScoreRing({ score, label, color = '#10b981', glowColor = 'rgba(16,185,129,0.3)', size = 120 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [progress, setProgress] = useState(0)

  const r = RADIUS
  const c = CIRCUMFERENCE
  const strokeDashoffset = c - (progress / 100) * c
  const cx = size / 2
  const cy = size / 2

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setProgress(score), 300)
    return () => clearTimeout(t)
  }, [inView, score])

  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={9}
          />
          {/* Glow */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={glowColor}
            strokeWidth={9}
            strokeDasharray={c}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{
              transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)',
              filter: 'blur(5px)',
            }}
          />
          {/* Arc */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={`url(#ring-${label.replace(/\s/g,'')})`}
            strokeWidth={9}
            strokeDasharray={c}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)' }}
          />
          <defs>
            <linearGradient id={`ring-${label.replace(/\s/g,'')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color + 'aa'} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '1.5rem', fontWeight: 800,
            fontFamily: 'Syne, sans-serif', color: 'var(--color-text)',
            lineHeight: 1,
          }}>
            <AnimatedCounter target={score} />
            <span style={{ fontSize: '0.875rem' }}>%</span>
          </span>
        </div>
      </div>

      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)', textAlign: 'center' }}>
        {label}
      </p>
    </div>
  )
}
