import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, Square, ChevronRight } from 'lucide-react'
import { DOC_CHECKLIST } from './schemesData'

export default function DocumentChecklist() {
  const [docs, setDocs] = useState(DOC_CHECKLIST)
  
  const toggle = (id) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'ready' ? 'pending' : 'ready' } : d))
  }

  const readyCount = docs.filter(d => d.status === 'ready').length
  const progress = (readyCount / docs.length) * 100

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem' }}>
        Document Checklist
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Preparation Progress</span>
        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: progress === 100 ? '#10b981' : 'var(--color-primary-light)' }}>
          {readyCount} of {docs.length} Ready
        </span>
      </div>
      
      <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, marginBottom: '1.5rem', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', background: progress === 100 ? '#10b981' : 'var(--color-primary-light)', borderRadius: 3 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {docs.map(doc => (
          <div
            key={doc.id}
            onClick={() => toggle(doc.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: doc.status === 'ready' ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
              border: doc.status === 'ready' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {doc.status === 'ready' ? <CheckSquare size={18} color="#10b981" /> : <Square size={18} color="var(--color-muted)" />}
            <span style={{ fontSize: '0.875rem', color: doc.status === 'ready' ? 'var(--color-text)' : 'var(--color-text-soft)', textDecoration: doc.status === 'ready' ? 'line-through' : 'none', opacity: doc.status === 'ready' ? 0.7 : 1 }}>
              {doc.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
