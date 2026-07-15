import { motion } from 'framer-motion'
import { ScanLine, Leaf, ShieldCheck, ShieldAlert, Camera } from 'lucide-react'

export default function CropHealthCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg, #0f1f14 0%, #0a1628 100%)',
        border: '1px solid rgba(5,150,105,0.15)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: -50, left: -50,
        width: 150, height: 150,
        background: 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(5,150,105,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Leaf size={16} color="var(--color-primary-light)" />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)', fontFamily: 'Inter' }}>
          Crop Health Status
        </span>
      </div>

      {/* Current crop */}
      <div style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(5,150,105,0.06)',
        border: '1px solid rgba(5,150,105,0.15)',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontFamily: 'Inter', marginBottom: 3 }}>Active Crop</p>
            <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text)', fontFamily: 'Syne, sans-serif' }}>🌾 Wheat — Kharif</p>
          </div>
          <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
            <ShieldCheck size={10} /> Healthy
          </span>
        </div>
      </div>

      {/* Rows */}
      {[
        { label: 'Last AI Scan',      val: '2 hours ago',   color: 'var(--color-text-soft)' },
        { label: 'Disease Detected',  val: 'None',          color: 'var(--color-success)' },
        { label: 'Confidence',        val: '97.4%',         color: 'var(--color-primary-light)' },
        { label: 'Treatment Status',  val: 'Not Required',  color: 'var(--color-text-soft)' },
      ].map(({ label, val, color }) => (
        <div key={label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{label}</span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color, fontFamily: 'Inter' }}>{val}</span>
        </div>
      ))}

      {/* Scan button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1.25rem', gap: '0.5rem' }}
        id="dashboard-quick-scan-btn"
      >
        <Camera size={15} />
        Quick Crop Scan
        <ScanLine size={13} style={{ marginLeft: 'auto', opacity: 0.7 }} />
      </motion.button>
    </motion.div>
  )
}
