import { motion } from 'framer-motion'
import { Sparkles, BrainCircuit, CheckCircle2, TrendingUp, Clock, FileText } from 'lucide-react'

export default function SchemeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.02) 100%)',
        border: '1px solid rgba(16,185,129,0.3)',
        padding: '2rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(16,185,129,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -50, left: 100, width: 150, height: 150, background: 'rgba(59,130,246,0.1)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(16,185,129,0.1))', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BrainCircuit size={22} color="#10b981" />
        </div>
        <div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', margin: 0, letterSpacing: '-0.02em' }}>
            AI Scheme Recommendation
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', margin: '0.25rem 0 0' }}>
            Based on your crop profile, farm size (4.5 ac), and location (Nashik), you are highly eligible for:
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {['PM-KISAN', 'PMFBY (Insurance)', 'Soil Health Card'].map((sch, i) => (
          <motion.div
            key={sch}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <CheckCircle2 size={16} color="#10b981" />
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)' }}>{sch}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.5rem', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'rgba(3,7,18,0.4)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Sparkles size={12} /> AI Reasoning
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>
            You meet the primary criteria as a landholding farmer with valid Aadhaar integration. Due to elevated weather risks in your region, crop insurance is strongly advised. Expected total financial benefit is <strong style={{ color: '#10b981' }}>~₹1,06,000</strong> this season.
          </p>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', margin: '0 1rem' }} className="hide-mobile" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 150 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 8, background: 'rgba(16,185,129,0.1)' }}>
              <TrendingUp size={16} color="#10b981" />
            </div>
            <div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Match Score</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#10b981' }}>98% Match</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 8, background: 'rgba(59,130,246,0.1)' }}>
              <FileText size={16} color="#3b82f6" />
            </div>
            <div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Approval Prob.</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#3b82f6' }}>High (95%)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clock size={12} color="var(--color-muted)" />
        <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Updated Just Now · Gemini AI</span>
      </div>
    </motion.div>
  )
}
