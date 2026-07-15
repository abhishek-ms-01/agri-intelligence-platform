import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sprout } from 'lucide-react'

export default function CtaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(5,150,105,0.12), rgba(245,158,11,0.05), rgba(5,150,105,0.08))',
            border: '1px solid rgba(5,150,105,0.25)', borderRadius: 28,
            padding: 'clamp(2.5rem, 5vw, 5rem)', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 80px rgba(5,150,105,0.1)',
          }}
        >
          {/* Decorative background orbs */}
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 200, height: 200,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.15), transparent 70%)',
            filter: 'blur(30px)',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: -40, width: 160, height: 160,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)',
            filter: 'blur(30px)',
          }} />

          <div style={{ position: 'relative' }}>
            {/* Icon */}
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'linear-gradient(135deg, #059669, #047857)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 40px rgba(5,150,105,0.4)',
            }}>
              <Sprout size={36} color="white" strokeWidth={2} />
            </div>

            <h2 className="font-display" style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
              marginBottom: '1.25rem', color: '#f8fafc',
            }}>
              Ready to Farm{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #f59e0b)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Smarter?
              </span>
            </h2>

            <p style={{ fontFamily: 'Inter', fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7,
              maxWidth: 520, margin: '0 auto 2.5rem' }}>
              Join thousands of farmers already using AI to make better decisions, reduce losses, and increase profitability — starting today.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/app"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white', fontFamily: 'Inter', fontWeight: 700, fontSize: '1rem',
                  padding: '1rem 2.25rem', borderRadius: 14, textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(5,150,105,0.4)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(5,150,105,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(5,150,105,0.4)' }}
              >
                Launch AI Platform <ArrowRight size={18} />
              </Link>
            </div>

            <p style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: '#475569', marginTop: '1.25rem' }}>
              No account needed. Free to explore all AI features.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
