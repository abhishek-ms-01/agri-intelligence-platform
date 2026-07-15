import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '50,000+', label: 'Farmers Supported', icon: '👨‍🌾', color: '#10b981' },
  { value: '2.4M+',  label: 'AI Predictions Made', icon: '🤖', color: '#f59e0b' },
  { value: '97.3%',  label: 'Disease Detection Accuracy', icon: '🔬', color: '#3b82f6' },
  { value: '180+',   label: 'Weather Insights Daily', icon: '🌤️', color: '#a855f7' },
]

export default function MetricsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '6rem 2rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent, rgba(5,150,105,0.03), transparent)',
        borderTop: '1px solid rgba(5,150,105,0.08)', borderBottom: '1px solid rgba(5,150,105,0.08)',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 600,
            color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Trusted Across India
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display"
          style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800,
            marginBottom: '3.5rem', color: '#f8fafc' }}
        >
          Powering the Future of Agriculture
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {STATS.map(({ value, label, icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(17,24,39,0.6)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20,
                padding: '2rem', textAlign: 'center', cursor: 'default',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color + '40'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
              <p style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color, marginBottom: '0.375rem',
              }}>
                {value}
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.4 }}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
