import { motion } from 'framer-motion'
import {
  ImageUp, Microscope, Cloud, BarChart3, Cpu, CheckCircle2,
} from 'lucide-react'
import toast from 'react-hot-toast'

const events = [
  {
    icon: ImageUp,     iconColor: '#10b981', iconBg: 'rgba(16,185,129,0.12)',
    title: 'Crop Image Uploaded',
    desc: 'Wheat field — North sector, 2.4 MB',
    time: '2h ago', tag: 'Upload', tagColor: '#10b981',
  },
  {
    icon: Microscope,  iconColor: '#f97316', iconBg: 'rgba(249,115,22,0.12)',
    title: 'Disease Scan Completed',
    desc: 'No disease detected — 97.4% confidence',
    time: '2h ago', tag: 'AI Scan', tagColor: '#f97316',
  },
  {
    icon: Cloud,       iconColor: '#60a5fa', iconBg: 'rgba(96,165,250,0.12)',
    title: 'Weather Data Updated',
    desc: 'Heavy rain alert for tomorrow 8 AM',
    time: '4h ago', tag: 'Weather', tagColor: '#60a5fa',
  },
  {
    icon: BarChart3,   iconColor: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)',
    title: 'Yield Calculation Run',
    desc: 'Expected 4.2 t/ha — +18% above avg',
    time: '6h ago', tag: 'Yield', tagColor: '#f59e0b',
  },
  {
    icon: Cpu,         iconColor: '#a78bfa', iconBg: 'rgba(167,139,250,0.12)',
    title: 'AI Advice Generated',
    desc: 'Irrigation delay & fungicide spray recommended',
    time: '8h ago', tag: 'AI', tagColor: '#a78bfa',
  },
  {
    icon: CheckCircle2, iconColor: '#34d399', iconBg: 'rgba(52,211,153,0.12)',
    title: 'Task Completed',
    desc: 'Morning fertilizer application logged',
    time: 'Yesterday', tag: 'Task', tagColor: '#34d399',
  },
]

export default function RecentActivity() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text)' }}>
          Recent Activity
        </h2>
        <button
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.75rem' }}
          id="dashboard-view-all-activity"
          onClick={() => toast.success('Activity log is up to date!')}
        >
          View All →
        </button>
      </div>

      <div style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}>
        {events.map(({ icon: Icon, iconColor, iconBg, title, desc, time, tag, tagColor }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.875rem 1.25rem',
              borderBottom: i < events.length - 1 ? '1px solid var(--color-border)' : 'none',
              transition: 'background 0.15s ease',
              cursor: 'default',
              position: 'relative',
            }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.018)' }}
          >
            {/* Timeline line */}
            {i < events.length - 1 && (
              <div style={{
                position: 'absolute', left: '2.375rem', top: '3.5rem', bottom: 0,
                width: 1,
                background: 'linear-gradient(180deg, var(--color-border) 0%, transparent 100%)',
                zIndex: 0,
              }} />
            )}

            {/* Icon */}
            <div style={{
              width: 36, height: 36, flexShrink: 0, borderRadius: 10, zIndex: 1,
              background: iconBg,
              border: `1px solid ${iconColor}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={15} color={iconColor} />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'Inter' }}>
                  {title}
                </p>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600,
                  padding: '1px 6px', borderRadius: 99,
                  background: `${tagColor}12`, color: tagColor,
                  fontFamily: 'Inter', flexShrink: 0,
                }}>
                  {tag}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>
                {desc}
              </p>
            </div>

            {/* Time */}
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontFamily: 'Inter', flexShrink: 0 }}>
              {time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
