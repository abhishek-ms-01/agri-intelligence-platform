import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FUTURE = [
  { emoji: '🚁', title: 'Drone Monitoring', desc: 'Aerial surveillance of large farmlands with real-time crop health mapping and precise field analytics.' },
  { emoji: '📡', title: 'IoT Sensors', desc: 'Ground-level soil moisture, pH, and temperature sensors feeding continuous live data to the AI engine.' },
  { emoji: '🛰️', title: 'Satellite Intelligence', desc: 'NDVI satellite imagery for vegetation health analysis across entire districts and regions.' },
  { emoji: '🎙️', title: 'Voice Assistant', desc: 'Multilingual voice-enabled AI advisor so farmers can get guidance hands-free in their native language.' },
]

export default function FutureSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="future" ref={ref} style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(5,150,105,0.06), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 600,
            color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Roadmap
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display"
          style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800,
            marginBottom: '1rem', color: '#f8fafc' }}
        >
          The Future of Krishi AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '1.0625rem', color: '#64748b',
            maxWidth: 520, margin: '0 auto 4rem' }}
        >
          Our vision extends beyond the current platform. Here's what's coming next on our journey to transform agriculture.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {FUTURE.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20,
                padding: '2rem', textAlign: 'center', cursor: 'default',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(5,150,105,0.3)'
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(5,150,105,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>{emoji}</div>
              <div style={{
                display: 'inline-block', background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6,
                padding: '0.2rem 0.625rem', marginBottom: '1rem',
              }}>
                <span style={{ fontFamily: 'Inter', fontSize: '0.6875rem', fontWeight: 700, color: '#f59e0b' }}>
                  Coming Soon
                </span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#f8fafc', marginBottom: '0.625rem' }}>
                {title}
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.65 }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
