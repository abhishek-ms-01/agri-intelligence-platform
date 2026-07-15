import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Leaf, Zap, BarChart2, Droplets } from 'lucide-react'

const REASONS = [
  { icon: Brain, color: '#10b981', title: 'AI-Powered Decisions', desc: 'Google Gemini AI processes complex agricultural data to give you precise, actionable recommendations tailored to your farm.' },
  { icon: Leaf, color: '#22c55e', title: 'Sustainable Farming', desc: 'Reduce chemical usage, conserve water, and improve soil health through smart resource optimization guided by AI.' },
  { icon: Zap, color: '#f59e0b', title: 'Faster Decisions', desc: 'What used to take days of expert consultation now takes seconds. Get instant AI insights at your fingertips.' },
  { icon: BarChart2, color: '#3b82f6', title: 'Improved Productivity', desc: 'Farmers using our platform report an average 28% increase in yield and 35% reduction in crop losses.' },
  { icon: Droplets, color: '#a855f7', title: 'Resource Optimization', desc: 'Intelligent irrigation scheduling and fertilizer recommendations reduce waste while maximizing crop output.' },
]

export default function WhyUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-us" ref={ref} style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Left text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 600, color: '#059669',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}
            >
              Our Advantage
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1.25rem', color: '#f8fafc' }}
            >
              Why Farmers Choose{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Krishi AI</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              style={{ fontFamily: 'Inter', fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.7 }}
            >
              We replace five disconnected apps with one intelligent platform that understands the entire farming lifecycle — from soil to sale.
            </motion.p>

            {/* Big stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              style={{
                marginTop: '2rem',
                background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(245,158,11,0.05))',
                border: '1px solid rgba(5,150,105,0.2)', borderRadius: 16, padding: '1.5rem',
                display: 'flex', gap: '2rem',
              }}
            >
              {[{ v: '28%', l: 'Yield Increase' }, { v: '35%', l: 'Less Crop Loss' }, { v: '3x', l: 'Faster Decisions' }].map(({ v, l }) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: '#10b981' }}>{v}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: '#64748b' }}>{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: reason list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {REASONS.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  background: 'rgba(17,24,39,0.4)', border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 14, padding: '1.25rem', cursor: 'default',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color + '30'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0, marginTop: 2,
                  background: color + '15', border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#f8fafc', marginBottom: '0.25rem' }}>
                    {title}
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
