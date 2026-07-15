import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, ExternalLink, Landmark } from 'lucide-react'

const SCHEME = {
  name: 'PM-KISAN Samman Nidhi',
  ministry: 'Ministry of Agriculture',
  benefit: '₹6,000 / year',
  eligibility: 'Small & Marginal Farmers',
  match: 98,
  deadline: 'Apply by Aug 31, 2026',
}

export default function GovSchemeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg, #0a1628, #111827)',
        border: '1px solid rgba(167,139,250,0.15)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 130, height: 130,
        background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'rgba(167,139,250,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Landmark size={16} color="#a78bfa" />
        </div>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)', fontFamily: 'Inter' }}>
          Gov. Scheme Match
        </span>
        <div style={{
          marginLeft: 'auto',
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '2px 8px',
          borderRadius: 99,
          background: 'rgba(167,139,250,0.12)',
          border: '1px solid rgba(167,139,250,0.25)',
        }}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#a78bfa', fontFamily: 'Inter' }}>
            {SCHEME.match}% match
          </span>
        </div>
      </div>

      {/* Scheme card */}
      <div style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(167,139,250,0.06)',
        border: '1px solid rgba(167,139,250,0.12)',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <BookOpen size={17} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text)', fontFamily: 'Syne, sans-serif', lineHeight: 1.25, marginBottom: 3 }}>
              {SCHEME.name}
            </p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{SCHEME.ministry}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Annual Benefit',  val: SCHEME.benefit,     color: '#10b981' },
          { label: 'Eligibility',     val: SCHEME.eligibility, color: 'var(--color-text-soft)' },
          { label: 'Deadline',        val: SCHEME.deadline,    color: '#f97316' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '0.4375rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{label}</span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color, fontFamily: 'Inter' }}>{val}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: '0.625rem' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            flex: 1, padding: '0.625rem', borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            border: 'none', cursor: 'pointer', color: 'white',
            fontFamily: 'Inter', fontWeight: 600, fontSize: '0.8125rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
          id="dashboard-scheme-apply-btn"
        >
          <CheckCircle size={14} /> Apply Now
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-secondary btn-sm"
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5 }}
          id="dashboard-scheme-view-btn"
        >
          <ExternalLink size={13} /> View
        </motion.button>
      </div>
    </motion.div>
  )
}
