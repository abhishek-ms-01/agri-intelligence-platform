import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquareText, Sparkles, LayoutDashboard, CloudRain, Sprout, Building2, UploadCloud } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import PageTransition     from '@/components/common/PageTransition'
import ChatWindow         from '@/components/advisor/ChatWindow'
import ChatInput          from '@/components/advisor/ChatInput'
import SuggestedQuestions from '@/components/advisor/SuggestedQuestions'
import { chatWithAdvisor } from '@/api/advisorService'

const WELCOME_MSG = {
  id: 'welcome',
  role: 'ai',
  timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  text: 'Hello! I am your AI Farm Advisor. How can I help you optimize your farm today? You can ask me about crop diseases, weather risks, or yield predictions.',
}


// ── Quick Tools ───────────────────────────────────────────────────────────────
function QuickTools() {
  const nav = useNavigate()
  const tools = [
    { icon: UploadCloud,   label: 'Scan Crop',    to: '/app/crop-intelligence', color: '#10b981' },
    { icon: CloudRain,     label: 'Weather',      to: '/app/weather',           color: '#3b82f6' },
    { icon: Sprout,        label: 'Predict Yield',to: '/app/yield',             color: '#f59e0b' },
    { icon: Building2,     label: 'Gov. Schemes', to: '/app/schemes',           color: '#a78bfa' },
    { icon: LayoutDashboard,label: 'Dashboard',   to: '/app',                   color: '#64748b' },
  ]
  return (
    <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
        Quick Tools
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tools.map(t => (
          <motion.button key={t.label}
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => nav(t.to)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.4375rem 0.75rem', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--color-text-soft)', fontSize: '0.75rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <t.icon size={13} color={t.color} /> {t.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdvisorPage() {
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [isTyping, setIsTyping] = useState(false)
  const [language, setLanguage] = useState('English')

  const handleClearChat = () => {
    setMessages([WELCOME_MSG]);
  }

  const handleSend = useCallback(async (text, isRegenerate = false) => {
    // 1. Add user message
    if (!isRegenerate) {
      const userMsg = {
        id: Date.now().toString(),
        role: 'user',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        text,
      }
      setMessages(prev => [...prev, userMsg])
    }
    setIsTyping(true)

    try {
      const historyForApi = messages
        .filter(m => m.id !== 'welcome') // filter out initial if needed, or map properly
        .map(m => ({
          role: m.role === 'ai' ? 'model' : 'user',
          text: m.text
        }));

      const location = 'Mangalore, Karnataka'; // Defaulting as requested
      const response = await chatWithAdvisor(text, historyForApi, language, location);
      
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        timestamp: response.timestamp ? new Date(response.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        text: response.text || 'I am sorry, I did not understand that.',
        isError: false
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'API Request Failed';
      const retryAfter = error.response?.data?.retryAfter || 0;
      
      toast.error(errorMessage, { icon: '⚠️' });
      console.error("Backend Error:", error);
      
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        text: "I encountered an error.",
        analysis: errorMessage,
        retryAfter: isRegenerate ? 0 : retryAfter,
        isError: true
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }, [messages])


  return (
    <PageTransition>
      {/* ── Page Header ────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(16,185,129,0.1))', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquareText size={20} color="#10b981" />
          </div>
          <div>
            <h1 className="page-title text-gradient-green" style={{ marginBottom: 0 }}>AI Farm Advisor</h1>
            <p className="page-subtitle" style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              Online · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', borderRadius: 6, padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' 
            }}
          >
            <option value="English">English</option>
            <option value="Kannada">Kannada</option>
          </select>
          <button onClick={handleClearChat} style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', 
              color: '#f87171', borderRadius: 6, padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' 
          }}>
            Clear Chat
          </button>
          <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
            <Sparkles size={10} /> Powered by Gemini AI
          </span>
          <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
            {messages.length - 1} interactions today
          </span>
        </div>
      </div>

      {/* ── Main Dashboard Layout ──────────────────────── */}
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 160px)',
        minHeight: 600,
        background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }} className="advisor-layout">

        {/* LEFT / CENTER: Chat Interface */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
          {/* Chat Window */}
          <ChatWindow messages={messages} isTyping={isTyping} onRegenerate={(msgId) => {
            // find the user message right before this AI message
            const aiIndex = messages.findIndex(m => m.id === msgId);
            if (aiIndex > 0 && messages[aiIndex - 1].role === 'user') {
              const text = messages[aiIndex - 1].text;
              // remove the AI message and re-send
              setMessages(prev => prev.slice(0, aiIndex));
              handleSend(text, true); // true could mean "isRegenerate" but we can just handleSend
            }
          }} />

          {/* Bottom Area (Suggestions + Input) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence>
              {!isTyping && messages.length < 5 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <SuggestedQuestions onSelect={handleSend} disabled={isTyping} />
                </motion.div>
              )}
            </AnimatePresence>
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </div>
        </div>

        {/* RIGHT: AI Context & History Panel */}
        <div style={{
          width: 340,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(3,7,18,0.3)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          overflowY: 'auto',
        }} className="advisor-sidebar">
          <div style={{ padding: '1.25rem' }}>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--color-primary-light)' }}>
              Ask Gemini About:
            </h3>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-soft)', fontSize: '0.875rem', lineHeight: 1.8 }}>
              <li>Crop disease diagnosis & treatment</li>
              <li>Weather risk management</li>
              <li>Yield optimization strategies</li>
              <li>Government scheme eligibility</li>
            </ul>
          </div>
          <QuickTools />
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 960px) {
          .advisor-layout { flex-direction: column !important; height: calc(100vh - 120px) !important; min-height: auto !important; }
          .advisor-sidebar { width: 100% !important; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.06) !important; flex: none !important; height: auto !important; }
        }
      `}</style>
    </PageTransition>
  )
}
