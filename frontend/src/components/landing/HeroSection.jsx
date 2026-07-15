import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Sprout, Zap, Shield } from 'lucide-react'

const floatingBadges = [
  { icon: Zap, label: 'AI Powered', color: '#059669', delay: 0 },
  { icon: Shield, label: '97% Accuracy', color: '#f59e0b', delay: 0.3 },
  { icon: Sprout, label: 'Smart Farming', color: '#3b82f6', delay: 0.6 },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 2rem 80px',
      }}
    >
      {/* Animated gradient background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '60%', height: '60%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulse-slow 6s ease infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '50%', height: '50%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse-slow 8s ease infinite 2s',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '20%',
          width: '30%', height: '30%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(5,150,105,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.3)',
                borderRadius: 99, padding: '0.375rem 1rem', marginBottom: '1.5rem',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-slow 2s infinite' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '0.8125rem', fontWeight: 600, color: '#10b981' }}>
                AI-Powered Agricultural Intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-3px', marginBottom: '1.5rem' }}
            >
              Smarter Decisions.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Better Harvests.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: 'Inter', fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 480 }}
            >
              The unified AI platform that transforms how farmers detect diseases, predict yields, 
              optimize irrigation, and make data-driven decisions — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link
                to="/app"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.9375rem',
                  padding: '0.875rem 2rem', borderRadius: 12, textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(5,150,105,0.4)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(5,150,105,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.4)' }}
              >
                Try AI Platform <ArrowRight size={18} />
              </Link>
              <a
                href="#features"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#cbd5e1', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9375rem',
                  padding: '0.875rem 2rem', borderRadius: 12, textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#cbd5e1' }}
              >
                <Play size={16} /> Learn More
              </a>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap' }}
            >
              {floatingBadges.map(({ icon: Icon, label, color, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + delay, type: 'spring', stiffness: 200 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8, padding: '0.375rem 0.75rem',
                  }}
                >
                  <Icon size={13} color={color} />
                  <span style={{ fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8' }}>{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ position: 'relative' }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  const metrics = [
    { label: 'Farm Health Score', value: '94%', color: '#10b981', icon: '🌱' },
    { label: 'Disease Risk', value: 'Low', color: '#22c55e', icon: '🛡️' },
    { label: 'Yield Forecast', value: '4.2T', color: '#f59e0b', icon: '📈' },
    { label: 'AI Confidence', value: '97%', color: '#3b82f6', icon: '🤖' },
  ]

  return (
    <div style={{ position: 'relative', height: 520 }}>
      {/* Main card */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340, background: 'rgba(17,24,39,0.8)',
        backdropFilter: 'blur(20px)', border: '1px solid rgba(5,150,105,0.3)',
        borderRadius: 24, padding: '2rem',
        boxShadow: '0 0 60px rgba(5,150,105,0.15), 0 24px 64px rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, #059669, #047857)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(5,150,105,0.4)',
          }}>
            <Sprout size={20} color="white" />
          </div>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: '#f8fafc' }}>Farm Overview</p>
            <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: '#64748b' }}>Green Valley Farm · Live</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-slow 2s infinite' }} />
            <span style={{ fontFamily: 'Inter', fontSize: '0.6875rem', color: '#10b981' }}>Live</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {metrics.map(({ label, value, color, icon }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, padding: '0.875rem',
            }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{icon}</div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.25rem', color }}>{value}</p>
              <p style={{ fontFamily: 'Inter', fontSize: '0.6875rem', color: '#64748b', lineHeight: 1.3 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* AI Recommendation bar */}
        <div style={{
          marginTop: '1rem', background: 'rgba(5,150,105,0.08)',
          border: '1px solid rgba(5,150,105,0.2)', borderRadius: 10, padding: '0.75rem',
        }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.6875rem', color: '#10b981', fontWeight: 600, marginBottom: 2 }}>🤖 AI Recommendation</p>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
            Optimal conditions for irrigation. Apply fertilizer in morning hours.
          </p>
        </div>
      </div>

      {/* Floating cards */}
      {[
        { top: 20, right: -10, text: 'Disease Detected', sub: 'Early Blight · Rice', color: '#f97316' },
        { bottom: 40, left: -20, text: 'Weather Alert', sub: 'Rain expected tomorrow', color: '#3b82f6' },
      ].map(({ top, bottom, left, right, text, sub, color }) => (
        <motion.div
          key={text}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top, bottom, left, right,
            background: 'rgba(17,24,39,0.9)', backdropFilter: 'blur(16px)',
            border: `1px solid ${color}30`, borderRadius: 12,
            padding: '0.75rem 1rem', minWidth: 160,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginBottom: 4 }} />
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>{text}</p>
          <p style={{ fontFamily: 'Inter', fontSize: '0.6875rem', color: '#64748b' }}>{sub}</p>
        </motion.div>
      ))}
    </div>
  )
}
