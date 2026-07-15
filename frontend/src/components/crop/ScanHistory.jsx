import { motion } from 'framer-motion'
import { History, ChevronRight, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react'

const MOCK_HISTORY = [
  {
    id: 1,
    crop: 'Tomato',
    disease: 'Early Blight',
    severity: 'Medium',
    confidence: 91,
    date: '2 hours ago',
    color: '#f97316',
  },
  {
    id: 2,
    crop: 'Wheat',
    disease: 'Healthy Crop',
    severity: 'Low',
    confidence: 96,
    date: 'Yesterday',
    color: '#22c55e',
  },
  {
    id: 3,
    crop: 'Rice',
    disease: 'Leaf Blast',
    severity: 'High',
    confidence: 88,
    date: '3 days ago',
    color: '#ef4444',
  },
]

const SEVERITY_ICON = {
  Low:    CheckCircle2,
  Medium: AlertTriangle,
  High:   ShieldAlert,
}
const SEVERITY_COLOR = {
  Low:    '#22c55e',
  Medium: '#f97316',
  High:   '#ef4444',
}

export default function ScanHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(5,150,105,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <History size={16} color="var(--color-primary-light)" />
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>
          Previous Scans
        </span>
        <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>
          {MOCK_HISTORY.length} scans
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {MOCK_HISTORY.map((scan, i) => {
          const SevIcon = SEVERITY_ICON[scan.severity]
          const sevColor = SEVERITY_COLOR[scan.severity]
          return (
            <motion.button
              key={scan.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ x: 4, background: 'rgba(255,255,255,0.04)' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                width: '100%',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: `${sevColor}18`,
                border: `1px solid ${sevColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SevIcon size={16} color={sevColor} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {scan.disease}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  {scan.crop} · {scan.date}
                </p>
              </div>

              {/* Confidence */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10b981' }}>{scan.confidence}%</p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>confidence</p>
              </div>

              <ChevronRight size={14} color="var(--color-muted)" />
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
