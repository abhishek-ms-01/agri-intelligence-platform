import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight, Clock } from 'lucide-react'
import { CONV_HISTORY, HISTORY_TAGS } from './advisorData'

const TAG_BADGE = {
  Disease:     'badge-danger',
  Irrigation:  'badge-info',
  Fertilizer:  'badge-success',
  Weather:     'badge-info',
  Government:  'badge-warning',
  Yield:       'badge-primary',
}

export default function ConversationHistory({ onLoad }) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = CONV_HISTORY.filter(h => {
    const matchTag = activeTag === 'All' || h.tag === activeTag
    const matchSearch = h.topic.toLowerCase().includes(search.toLowerCase()) || h.preview.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  return (
    <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Conversation History
        </p>
        <span className="badge badge-primary" style={{ fontSize: '0.6rem' }}>{CONV_HISTORY.length} chats</span>
      </div>

      <div style={{ position: 'relative', marginBottom: '0.625rem' }}>
        <Search size={13} color="var(--color-muted)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          className="input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search conversations…"
          style={{ paddingLeft: '2rem', fontSize: '0.8125rem', height: 34 }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        {HISTORY_TAGS.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            style={{
              padding: '0.25rem 0.625rem', borderRadius: 99, fontSize: '0.6875rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
              background: activeTag === tag ? 'rgba(5,150,105,0.2)' : 'rgba(255,255,255,0.04)',
              border: activeTag === tag ? '1px solid rgba(5,150,105,0.35)' : '1px solid rgba(255,255,255,0.08)',
              color: activeTag === tag ? 'var(--color-primary-light)' : 'var(--color-muted)',
            }}>
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {filtered.map((h, i) => (
          <motion.button key={h.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            whileHover={{ x: 3, background: 'rgba(255,255,255,0.04)' }}
            onClick={() => onLoad?.(h)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem', borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.topic}</span>
                <span className={`badge ${TAG_BADGE[h.tag] || 'badge-primary'}`} style={{ fontSize: '0.5625rem', flexShrink: 0 }}>{h.tag}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Clock size={10} color="var(--color-muted)" />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {h.date} · {h.preview}
                </p>
              </div>
            </div>
            <ChevronRight size={13} color="var(--color-muted)" style={{ flexShrink: 0 }} />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
