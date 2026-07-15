import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit, User, CheckCircle2, TrendingUp, Clock, Copy, RefreshCw, AlertTriangle, Lightbulb, ShieldAlert, Target } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'

// ── Typing Indicator ──────────────────────────────────────────────────────────
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', paddingLeft: '0.5rem' }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(5,150,105,0.3), rgba(5,150,105,0.1))',
        border: '1px solid rgba(5,150,105,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <BrainCircuit size={14} color="var(--color-primary-light)" />
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.75rem 1rem',
        borderRadius: '18px 18px 18px 4px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-primary-light)' }}
          />
        ))}
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginLeft: '0.375rem' }}>
          Gemini AI is thinking…
        </span>
      </div>
    </motion.div>
  )
}

function UserBubble({ msg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: 16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end', gap: '0.625rem' }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg,rgba(245,158,11,0.25),rgba(245,158,11,0.1))',
        border: '1px solid rgba(245,158,11,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <User size={14} color="#f59e0b" />
      </div>

      <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
        <div style={{
          padding: '0.875rem 1.125rem',
          borderRadius: '18px 18px 4px 18px',
          background: 'linear-gradient(135deg, rgba(5,150,105,0.25), rgba(5,150,105,0.12))',
          border: '1px solid rgba(5,150,105,0.25)',
          fontSize: '0.9375rem',
          color: 'var(--color-text)',
          lineHeight: 1.6,
        }}>
          {msg.text}
        </div>
        <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>{msg.timestamp}</span>
      </div>
    </motion.div>
  )
}

function AIBubble({ msg, onRegenerate }) {
  const [countdown, setCountdown] = useState(msg.retryAfter || 0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && msg.retryAfter > 0) {
      if (onRegenerate && msg.id !== 'welcome') {
        onRegenerate(msg.id);
      }
    }
  }, [countdown, msg.retryAfter, msg.id, onRegenerate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: -16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', paddingRight: '5%' }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0, marginTop: 4,
        background: 'linear-gradient(135deg, rgba(5,150,105,0.3), rgba(5,150,105,0.1))',
        border: '1px solid rgba(5,150,105,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <BrainCircuit size={14} color="var(--color-primary-light)" />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Gemini AI Advisor
        </span>

        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '4px 18px 18px 18px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          fontSize: '0.9375rem',
          color: 'var(--color-text-soft)',
          lineHeight: 1.75,
        }}>
          {msg.isError ? (
            <div style={{ color: '#ef4444', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} />
                <span>{msg.analysis}</span>
              </div>
              {countdown > 0 && (
                <div style={{ fontSize: '0.8125rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} /> Auto-retrying in {countdown}s...
                </div>
              )}
              {onRegenerate && msg.id !== 'welcome' && countdown === 0 && (
                <button onClick={() => onRegenerate(msg.id)} style={{
                  alignSelf: 'flex-start', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#f87171', borderRadius: 6, padding: '0.4rem 0.8rem', fontSize: '0.8125rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.4rem'
                }}>
                  <RefreshCw size={14} /> Retry
                </button>
              )}
            </div>
          ) : (
            <div className="ai-markdown" style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {msg.text && (
                <div style={{ padding: '0.75rem', background: 'rgba(16,185,129,0.05)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={11} color="var(--color-muted)" />
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>{msg.timestamp} · Powered by Gemini AI</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => { navigator.clipboard.writeText(msg.text); toast.success("Copied to clipboard!"); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
              <Copy size={12} />
            </button>
            {onRegenerate && msg.id !== 'welcome' && (
              <button onClick={() => onRegenerate(msg.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}>
                <RefreshCw size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ChatWindow({ messages, isTyping, onRegenerate }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '1.5rem',
      minHeight: 0,
    }}>
      <AnimatePresence initial={false}>
        {messages.map(msg => (
          msg.role === 'user'
            ? <UserBubble key={msg.id} msg={msg} />
            : <AIBubble   key={msg.id} msg={msg} onRegenerate={onRegenerate} />
        ))}
        {isTyping && <TypingIndicator key="typing" />}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  )
}
