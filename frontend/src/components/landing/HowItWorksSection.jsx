import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Cpu, Cloud, Lightbulb, Sprout, ArrowRight } from 'lucide-react'

const STEPS = [
  { icon: Upload, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', step: '01', title: 'Upload Crop Image', desc: 'Take a photo of your crop and upload it to the platform.' },
  { icon: Cpu, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', step: '02', title: 'AI Analysis', desc: 'Gemini Vision AI analyzes the image for diseases and health status.' },
  { icon: Cloud, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', step: '03', title: 'Weather Intelligence', desc: 'Live weather data is layered with disease risk predictions.' },
  { icon: Lightbulb, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', step: '04', title: 'AI Recommendation', desc: 'Receive personalized treatment, fertilizer, and irrigation advice.' },
  { icon: Sprout, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', step: '05', title: 'Better Harvest', desc: 'Make data-driven decisions and achieve optimal crop yields.' },
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} style={{
      padding: '6rem 2rem', position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(5,150,105,0.02), transparent)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 600,
            color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Simple & Powerful
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display"
          style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800,
            marginBottom: '1rem', color: '#f8fafc' }}
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '1.0625rem', color: '#64748b',
            maxWidth: 480, margin: '0 auto 4rem' }}
        >
          From a single photo to a complete farming strategy — in seconds.
        </motion.p>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', overflowX: 'auto', paddingBottom: '1rem' }}>
          {STEPS.map(({ icon: Icon, color, bg, border, step, title, desc }, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'flex-start', flex: 1, minWidth: 180 }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                style={{ flex: 1, padding: '0 0.75rem' }}
              >
                {/* Step number */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, background: bg, border: `1px solid ${border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 20px ${color}20`,
                  }}>
                    <Icon size={22} color={color} />
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.875rem', color: border.replace('0.25', '0.6') }}>
                    {step}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
                  {title}
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.6 }}>
                  {desc}
                </p>
              </motion.div>

              {/* Connector arrow */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  style={{ paddingTop: 14, color: '#334155', flexShrink: 0 }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
