import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Cloud, TrendingUp, MessageSquareText, BookOpen, LayoutDashboard } from 'lucide-react'

const FEATURES = [
  {
    icon: Leaf, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)',
    title: 'AI Crop Health Analysis',
    description: 'Upload a photo of your crop. Our AI instantly detects diseases, identifies symptoms, and prescribes targeted treatments.',
    pills: ['Disease Detection', 'Treatment Plans', 'Prevention Tips'],
  },
  {
    icon: Cloud, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)',
    title: 'Weather Intelligence',
    description: 'Real-time weather monitoring with 5-day forecasts and AI-powered disease risk prediction based on atmospheric data.',
    pills: ['Live Weather', '5-Day Forecast', 'Risk Alerts'],
  },
  {
    icon: TrendingUp, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)',
    title: 'Yield & Profit Prediction',
    description: 'Input your farm parameters and get accurate AI predictions on expected yield, revenue, and risk factors for the season.',
    pills: ['Yield Forecast', 'Profit Estimate', 'Risk Analysis'],
  },
  {
    icon: MessageSquareText, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)',
    title: 'AI Farm Advisor',
    description: 'Powered by Google Gemini. Ask anything — fertilizers, irrigation, pests, harvesting schedules, government schemes.',
    pills: ['Gemini Powered', 'Context Aware', '24/7 Available'],
  },
  {
    icon: BookOpen, color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)',
    title: 'Government Scheme Explorer',
    description: 'Discover subsidies, loans, and support programs tailored to your crop type, region, and farm size. Apply directly.',
    pills: ['Personalized', 'Eligibility Check', 'Direct Links'],
  },
  {
    icon: LayoutDashboard, color: '#059669', bg: 'rgba(5,150,105,0.1)', border: 'rgba(5,150,105,0.2)',
    title: 'Farm Intelligence Dashboard',
    description: 'Your command center. Farm health score, active alerts, weather summary, yield forecasts, and today\'s AI recommendation.',
    pills: ['Health Score', 'Live Alerts', 'AI Insights'],
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 600,
            color: '#059669', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Platform Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display"
          style={{ textAlign: 'center', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800,
            marginBottom: '1rem', color: '#f8fafc' }}
        >
          Everything a Farmer Needs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '1.0625rem', color: '#64748b',
            maxWidth: 560, margin: '0 auto 4rem' }}
        >
          Six powerful AI modules, unified into one seamless platform designed to support every stage of the farming lifecycle.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map(({ icon: Icon, color, bg, border, title, description, pills }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '2rem',
                cursor: 'default', transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = border
                e.currentTarget.style.boxShadow = `0 8px 40px ${color}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: bg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
              }}>
                <Icon size={24} color={color} strokeWidth={2} />
              </div>

              <h3 className="font-display" style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.625rem', color: '#f8fafc' }}>
                {title}
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                {description}
              </p>

              {/* Pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pills.map(p => (
                  <span key={p} style={{
                    fontFamily: 'Inter', fontSize: '0.6875rem', fontWeight: 600,
                    padding: '0.25rem 0.625rem', borderRadius: 99,
                    background: bg, border: `1px solid ${border}`, color,
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
