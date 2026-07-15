import { motion } from 'framer-motion'
import { ScanLine, Sparkles, Upload } from 'lucide-react'

export default function EmptyAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #06150f 100%)',
        border: '1px solid rgba(5,150,105,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 2rem',
        minHeight: 400,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(5,150,105,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Icon animation */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        {/* Outer ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -16,
            borderRadius: '50%',
            border: '1px solid rgba(5,150,105,0.3)',
          }}
        />
        {/* Middle ring */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            position: 'absolute', inset: -32,
            borderRadius: '50%',
            border: '1px solid rgba(5,150,105,0.15)',
          }}
        />
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, rgba(5,150,105,0.05) 70%)',
          border: '1px solid rgba(5,150,105,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ScanLine size={40} color="var(--color-primary-light)" />
          </motion.div>
        </div>
      </div>

      {/* Text */}
      <div style={{ maxWidth: 340, marginBottom: '2rem' }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: '1.375rem', marginBottom: '0.75rem',
          lineHeight: 1.3,
        }}>
          AI Crop Analysis
          <br />
          <span className="text-gradient-green">Ready to Begin</span>
        </h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
          Upload a crop image to begin AI-powered health analysis. Our Gemini Vision model detects 200+ diseases with up to 97% accuracy.
        </p>
      </div>

      {/* Feature pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.625rem', marginBottom: '2rem' }}>
        {[
          '🦠 Disease Detection',
          '🌿 Health Scoring',
          '💊 Treatment Plan',
          '🛡️ Prevention Tips',
          '📋 Full Report',
        ].map(feat => (
          <span key={feat} style={{
            fontSize: '0.8125rem', fontWeight: 500, padding: '0.375rem 0.875rem',
            borderRadius: 99, background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-soft)',
          }}>
            {feat}
          </span>
        ))}
      </div>

      {/* CTA hint */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.625rem 1.25rem', borderRadius: 99,
        background: 'rgba(5,150,105,0.08)',
        border: '1px solid rgba(5,150,105,0.2)',
      }}>
        <Upload size={14} color="var(--color-primary-light)" />
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-primary-light)', fontWeight: 500 }}>
          Start by uploading an image on the left
        </span>
        <Sparkles size={13} color="var(--color-accent)" />
      </div>
    </motion.div>
  )
}
