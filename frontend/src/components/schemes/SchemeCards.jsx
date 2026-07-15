import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Calendar, ChevronRight, TrendingUp, ShieldCheck, Coins } from 'lucide-react'
import toast from 'react-hot-toast'

const ICON_MAP = {
  Subsidy: Coins,
  Insurance: ShieldCheck,
  Loans: TrendingUp,
  Equipment: CheckCircle2,
}
const COLOR_MAP = {
  Subsidy: '#10b981',
  Insurance: '#3b82f6',
  Loans: '#f59e0b',
  Equipment: '#a78bfa',
}

function SchemeCard({ scheme, delay = 0 }) {
  const Icon = ICON_MAP[scheme.category] || FileText
  const color = COLOR_MAP[scheme.category] || '#10b981'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
      }}
      whileHover={{ y: -4, borderColor: `rgba(255,255,255,0.15)`, boxShadow: `0 12px 40px rgba(0,0,0,0.4)` }}
    >
      {/* Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={24} color={color} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>{scheme.name}</h3>
            <span className="badge" style={{ background: `${color}15`, color: color, borderColor: `${color}30` }}>
              {scheme.matchScore}% Match
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-soft)', margin: 0, lineHeight: 1.5 }}>{scheme.description}</p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* AI Insight Box */}
        <div style={{ padding: '0.875rem', borderRadius: 8, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)', display: 'flex', gap: '0.625rem' }}>
          <div style={{ marginTop: 2 }}><CheckCircle2 size={16} color="#10b981" /></div>
          <div>
            <p style={{ fontSize: '0.6875rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Why it fits you</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', lineHeight: 1.5 }}>{scheme.aiReason}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginBottom: 2 }}>Financial Benefit</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)' }}>{scheme.financialBenefit}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginBottom: 2 }}>Approval Prob.</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)' }}>{scheme.probability}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12}/> Deadline</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)' }}>{scheme.deadline}</p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {scheme.tags.map(t => (
            <span key={t} style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: 99, background: 'rgba(255,255,255,0.04)', color: 'var(--color-muted)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.1)', display: 'flex', gap: '1rem' }}>
        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => toast.success(`Viewing details for ${scheme.name}`)}>
          View Details <ChevronRight size={16} />
        </button>
        <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => toast.success('Opening Official Portal...')}>
          Official Portal
        </button>
      </div>
    </motion.div>
  )
}

export default function SchemeCards({ schemes }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
      {schemes.map((s, i) => <SchemeCard key={s.id} scheme={s} delay={i * 0.1} />)}
    </div>
  )
}
