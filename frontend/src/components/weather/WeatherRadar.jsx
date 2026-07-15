import { motion } from 'framer-motion'

export default function WeatherRadar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg,#020d18 0%,#061a10 100%)',
        border: '1px solid rgba(5,150,105,0.2)',
        padding: '1.25rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(5,150,105,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16 }}>📡</span>
        </div>
        <div>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Weather Radar</span>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Nashik, Maharashtra · Live</p>
        </div>
        <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>● Live</span>
      </div>

      {/* Radar visual */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 280, margin: '0 auto' }}>
        {/* Concentric circles */}
        {[1, 2, 3, 4].map((ring) => (
          <div
            key={ring}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${ring * 24}%`, height: `${ring * 24}%`,
              borderRadius: '50%',
              border: '1px solid rgba(5,150,105,0.2)',
            }}
          />
        ))}

        {/* Crosshairs */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(5,150,105,0.15)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(5,150,105,0.15)' }} />

        {/* Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(5,150,105,0.5) 0deg, rgba(5,150,105,0.1) 60deg, transparent 90deg)',
          }}
        />

        {/* Rain blobs */}
        {[
          { top: '30%', left: '25%', size: 28, opacity: 0.5, color: '#3b82f6' },
          { top: '20%', left: '50%', size: 42, opacity: 0.4, color: '#60a5fa' },
          { top: '45%', left: '60%', size: 20, opacity: 0.35, color: '#3b82f6' },
          { top: '55%', left: '35%', size: 16, opacity: 0.3, color: '#2563eb' },
        ].map((blob, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [blob.opacity, blob.opacity * 0.6, blob.opacity] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: blob.top, left: blob.left,
              width: blob.size, height: blob.size,
              borderRadius: '50%', background: blob.color,
              filter: 'blur(8px)',
            }}
          />
        ))}

        {/* Center dot */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 10, height: 10, borderRadius: '50%',
          background: '#10b981',
          boxShadow: '0 0 12px rgba(16,185,129,0.8)',
        }} />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginTop: '1rem' }}>
        {[
          { color: '#2563eb', label: 'Heavy Rain' },
          { color: '#60a5fa', label: 'Moderate' },
          { color: '#93c5fd', label: 'Light Rain' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
