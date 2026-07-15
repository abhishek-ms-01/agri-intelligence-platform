import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, ImagePlus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const ref = useRef(null)

  const submit = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    ref.current?.focus()
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
  }

  return (
    <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(3,7,18,0.5)', backdropFilter: 'blur(16px)' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: '0.625rem',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.625rem 0.625rem 0.625rem 1rem',
        transition: 'border-color 0.2s',
      }}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          title="Upload crop image"
          onClick={() => toast('Upload crop image → Crop Intelligence', { icon: '📷' })}
          style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <ImagePlus size={15} color="var(--color-primary-light)" />
        </motion.button>

        <textarea
          ref={ref}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything about your farm… (Press Enter to send)"
          disabled={disabled}
          rows={1}
          style={{
            flex: 1, resize: 'none', background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--color-text)', fontSize: '0.9375rem', lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif', maxHeight: 120, overflowY: 'auto',
            padding: '0.375rem 0',
          }}
        />

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          title="Voice input (coming soon)"
          onClick={() => toast('Voice feature coming soon!', { icon: '🎙️' })}
          style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
          <Mic size={15} color="#a78bfa" />
        </motion.button>

        <motion.button
          whileHover={{ scale: text.trim() && !disabled ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={submit}
          disabled={!text.trim() || disabled}
          style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0, cursor: text.trim() && !disabled ? 'pointer' : 'not-allowed',
            background: text.trim() && !disabled ? 'linear-gradient(135deg, #059669, #047857)' : 'rgba(255,255,255,0.06)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <Send size={15} color={text.trim() && !disabled ? '#fff' : '#475569'} />
        </motion.button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.25rem' }}>
        <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>
          Press <kbd style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '1px 5px', fontSize: '0.6875rem' }}>Enter</kbd> to send · <kbd style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '1px 5px', fontSize: '0.6875rem' }}>Shift+Enter</kbd> for new line
        </p>
        <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>Powered by Gemini AI</p>
      </div>
    </div>
  )
}
