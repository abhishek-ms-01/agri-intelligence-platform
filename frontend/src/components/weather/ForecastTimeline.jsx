import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Droplets, Wind, Thermometer } from 'lucide-react'

const RAIN_COLOR = (r) => r >= 70 ? '#ef4444' : r >= 40 ? '#f97316' : '#22c55e'

export default function ForecastTimeline({ forecast = [] }) {
  const [expanded, setExpanded] = useState(null)

  // Map OpenWeather forecast items
  const mappedForecast = forecast.map((f, i) => {
    const d = new Date(f.date);
    return {
      day: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      icon: '⛅', // We can use the generic icon for now or map f.icon if we implement weather icons
      condition: f.condition,
      high: Math.round(f.temp),
      low: Math.round(f.temp - 2), // rough estimate for missing low temp
      detail: `Expected condition: ${f.condition}. Temperature around ${Math.round(f.temp)}°C.`,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)', padding: 0, overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 16 }}>📅</span>
          </div>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>5-Day Forecast</span>
        </div>
        <span className="badge badge-info" style={{ fontSize: '0.6875rem' }}>Live</span>
      </div>

      {/* Cards */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {mappedForecast.map((day, i) => (
          <div key={`${day.day}-${i}`}>
            <motion.button
              whileHover={{ background: 'rgba(255,255,255,0.03)' }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                width: '100%', display: 'grid',
                gridTemplateColumns: '64px 32px 1fr auto 32px',
                alignItems: 'center', gap: '0.75rem',
                padding: '0.875rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: expanded === i ? 'rgba(5,150,105,0.06)' : 'transparent',
                border: expanded === i ? '1px solid rgba(5,150,105,0.15)' : '1px solid transparent',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontWeight: 600, fontSize: '0.9375rem', fontFamily: 'Syne,sans-serif', color: i === 0 ? 'var(--color-primary-light)' : 'var(--color-text)' }}>{day.day}</span>
              <span style={{ fontSize: '1.375rem' }}>{day.icon}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'capitalize' }}>{day.condition}</span>

              {/* Temp range */}
              <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{day.high}°</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>{day.low}°</span>
              </div>

              {expanded === i ? <ChevronUp size={14} color="var(--color-primary-light)" /> : <ChevronDown size={14} color="var(--color-muted)" />}
            </motion.button>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0.75rem 0.75rem 0.875rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-soft)', lineHeight: 1.6, flex: '1 1 200px' }}>
                      {day.detail}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
