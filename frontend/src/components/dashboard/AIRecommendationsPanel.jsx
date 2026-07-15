import { motion } from 'framer-motion'
import {
  Droplets, Zap, ShieldAlert, CloudLightning,
  TrendingUp, CheckCircle2, Clock, AlertTriangle,
} from 'lucide-react'

const tasks = [
  {
    icon: Droplets, iconColor: '#60a5fa',
    title: 'Recommended Irrigation',
    desc: 'Skip today — rainfall tomorrow will suffice.',
    time: '6:00 AM',
    tag: 'Irrigation', tagColor: '#60a5fa', tagBg: 'rgba(96,165,250,0.1)',
    status: 'pending',
  },
  {
    icon: Zap, iconColor: '#f59e0b',
    title: 'Fertilizer Reminder',
    desc: 'Apply Urea to North Field — 40 kg/acre.',
    time: '10:00 AM',
    tag: 'Nutrient', tagColor: '#f59e0b', tagBg: 'rgba(245,158,11,0.1)',
    status: 'pending',
  },
  {
    icon: ShieldAlert, iconColor: '#f97316',
    title: 'Disease Prevention',
    desc: 'Spray Mancozeb fungicide before rain.',
    time: 'ASAP',
    tag: 'Disease', tagColor: '#f97316', tagBg: 'rgba(249,115,22,0.1)',
    status: 'urgent',
  },
  {
    icon: CloudLightning, iconColor: '#a78bfa',
    title: 'Weather Alert',
    desc: '87mm rain predicted 8 AM tomorrow.',
    time: 'Tomorrow',
    tag: 'Weather', tagColor: '#a78bfa', tagBg: 'rgba(167,139,250,0.1)',
    status: 'info',
  },
  {
    icon: TrendingUp, iconColor: '#10b981',
    title: 'Market Insight',
    desc: 'Wheat MSP ↑ ₹85/qt. Lock in forward contracts.',
    time: 'Market',
    tag: 'Market', tagColor: '#10b981', tagBg: 'rgba(16,185,129,0.1)',
    status: 'info',
  },
]

const statusDot = {
  pending: { color: '#60a5fa' },
  urgent:  { color: '#ef4444', animate: true },
  info:    { color: '#a78bfa' },
  done:    { color: '#10b981' },
}

export default function AIRecommendationsPanel() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%',
    }}>
      {/* Panel header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(5,150,105,0.12), rgba(5,150,105,0.04))',
        border: '1px solid rgba(5,150,105,0.2)',
        display: 'flex', alignItems: 'center', gap: '0.625rem',
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: 'linear-gradient(135deg, #059669, #047857)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 14px rgba(5,150,105,0.35)',
        }}>
          <CheckCircle2 size={17} color="white" />
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', fontFamily: 'Syne, sans-serif' }}>Today's Tasks</p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>5 AI recommendations</p>
        </div>
        <div style={{
          marginLeft: 'auto', padding: '2px 10px', borderRadius: 99,
          background: 'rgba(5,150,105,0.15)',
          border: '1px solid rgba(5,150,105,0.3)',
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', fontFamily: 'Inter' }}>
            0/5 Done
          </span>
        </div>
      </div>

      {/* Task cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {tasks.map(({ icon: Icon, iconColor, title, desc, time, tag, tagColor, tagBg, status }, i) => {
          const dot = statusDot[status]
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ x: -2, transition: { duration: 0.15 } }}
              style={{
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="card-glow"
            >
              {/* Left accent */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: iconColor, borderRadius: '4px 0 0 4px',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingLeft: 6 }}>
                {/* Icon */}
                <div style={{
                  width: 32, height: 32, flexShrink: 0, borderRadius: 8,
                  background: `${iconColor}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2,
                }}>
                  <Icon size={14} color={iconColor} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    {/* Status dot */}
                    <motion.div
                      animate={dot.animate ? { scale: [1, 1.4, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: dot.color, flexShrink: 0 }}
                    />
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'Inter', lineHeight: 1.3 }}>
                      {title}
                    </p>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter', lineHeight: 1.4, marginBottom: 6 }}>
                    {desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 600,
                      padding: '1px 7px', borderRadius: 99,
                      background: tagBg, color: tagColor,
                      fontFamily: 'Inter',
                    }}>
                      {tag}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
                      <Clock size={10} color="var(--color-muted)" />
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
