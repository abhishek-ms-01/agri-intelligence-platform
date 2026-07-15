import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Wind, Droplets, Eye, Gauge, Thermometer,
  Sunrise, Sunset, Moon, Leaf, Zap,
} from 'lucide-react'

// Animated weather icon
function WeatherIcon({ code }) {
  const icons = {
    'partly-cloudy': (
      <motion.div style={{ position: 'relative', width: 80, height: 80 }}>
        <motion.div
          animate={{ x: [0, 3, 0], y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 0, left: 0, fontSize: 52 }}
        >☀️</motion.div>
        <motion.div
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 44 }}
        >⛅</motion.div>
      </motion.div>
    ),
    'default': (
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 72 }}
      >⛅</motion.div>
    ),
  }
  return icons[code] || icons['default']
}

function MetricPill({ icon: Icon, label, value, color = 'var(--color-muted)', bg = 'rgba(255,255,255,0.04)' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
      padding: '0.875rem 1rem',
      background: bg, borderRadius: 'var(--radius-md)',
      border: '1px solid rgba(255,255,255,0.06)',
      minWidth: 80, flex: '1 1 80px',
    }}>
      <Icon size={15} color={color} />
      <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'Syne,sans-serif', color: 'var(--color-text)' }}>{value}</span>
      <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', textAlign: 'center' }}>{label}</span>
    </div>
  )
}

export default function WeatherHero({ weather }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  if (!weather) return null;
  const W = weather;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #061a10 50%, #0a1628 100%)',
        border: '1px solid rgba(5,150,105,0.2)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle,rgba(5,150,105,0.12) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Top row: location + time */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
            <MapPin size={14} color="var(--color-primary-light)" />
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-soft)' }}>{W.location}</span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{W.date}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Syne,sans-serif', lineHeight: 1 }}>{W.time}</div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.375rem', justifyContent: 'flex-end' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>● Live</span>
            <span className="badge badge-info" style={{ fontSize: '0.6875rem' }}>AI-Enhanced</span>
          </div>
        </div>
      </div>

      {/* Main temp + icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <WeatherIcon code={W.conditionCode} />
        <div>
          <div style={{ fontSize: '5rem', fontWeight: 900, fontFamily: 'Syne,sans-serif', lineHeight: 1, background: 'linear-gradient(135deg,#f8fafc,#94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {W.temp}°
          </div>
          <div style={{ fontSize: '1.125rem', color: 'var(--color-text-soft)', fontWeight: 600, marginTop: '0.25rem' }}>{W.condition}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Feels like {W.feelsLike}°C · {W.windDir} wind</div>
        </div>

        {/* Key stats inline */}
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            { label: 'Humidity',   val: `${W.humidity || 0}%`,    color: '#3b82f6' },
            { label: 'Visibility', val: `${W.visibility || 10}km`, color: '#a78bfa' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', width: 68 }}>{label}</span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metric pills row */}
      <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
        <MetricPill icon={Wind}        label="Wind"      value={`${W.windSpeed || 0} km/h`} color="#60a5fa" bg="rgba(59,130,246,0.08)" />
        {W.pressure && <MetricPill icon={Gauge}       label="Pressure"  value={`${W.pressure} hPa`}   color="#a78bfa" bg="rgba(167,139,250,0.08)" />}
      </div>

      {/* Sunrise / Sunset / Moon row */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
        {[
          { icon: Sunrise, label: 'Sunrise', value: W.sunrise || '6:00 AM', color: '#f59e0b' },
          { icon: Sunset,  label: 'Sunset',  value: W.sunset || '6:30 PM',  color: '#f97316' }
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon size={14} color={color} />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{label}</span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)' }}>{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
