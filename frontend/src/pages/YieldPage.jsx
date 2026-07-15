import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Sparkles, Download, Share2, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import PageTransition     from '@/components/common/PageTransition'
import PredictionForm     from '@/components/yield/PredictionForm'
import PredictionLoader   from '@/components/yield/PredictionLoader'
import PredictionHero     from '@/components/yield/PredictionHero'
import AIBusinessAnalysis from '@/components/yield/AIBusinessAnalysis'
import ProfitBreakdown    from '@/components/yield/ProfitBreakdown'
import AIOptimizationRecs from '@/components/yield/AIOptimizationRecs'
import RiskAnalysis       from '@/components/yield/RiskAnalysis'
import PredictionHistory  from '@/components/yield/PredictionHistory'
import { predictYield } from '@/api/yieldService'// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyResultState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{
        background: 'linear-gradient(135deg,#0a1628 0%,#061a10 100%)',
        border: '1px solid rgba(5,150,105,0.15)',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 340,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, background: 'radial-gradient(circle,rgba(5,150,105,0.07) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, background: 'radial-gradient(circle,rgba(5,150,105,0.05) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 64, marginBottom: '1.5rem' }}>🌾</motion.div>

      <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.375rem', marginBottom: '0.75rem' }}>
        AI Yield Prediction <br />
        <span className="text-gradient-green">Ready to Begin</span>
      </h3>
      <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', maxWidth: 320, lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Enter your farm information to receive an AI-powered yield and profit prediction, personalised for your crop and conditions.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.625rem' }}>
        {['🌱 Yield Forecast', '💰 Profit Estimate', '📊 ROI Analysis', '🛡️ Risk Assessment', '🤖 AI Recommendations'].map(f => (
          <span key={f} style={{ fontSize: '0.8125rem', fontWeight: 500, padding: '0.375rem 0.875rem', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', color: 'var(--color-text-soft)' }}>{f}</span>
        ))}
      </div>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function YieldPage() {
  const [phase, setPhase] = useState('idle') // idle | predicting | result
  const [predictionData, setPredictionData] = useState(null)

  const handlePredict = useCallback(async (form) => {
    setPhase('predicting')
    try {
      const data = {
        crop: form.crop,
        landArea: Number(form.area),
        soil: form.soilType,
        season: form.season,
        rainfall: form.rainfall
      };
      
      const res = await predictYield(data);
      setPredictionData(res);
      setPhase('result')
      toast.success('AI prediction complete!', { icon: '🌾' })
    } catch (error) {
      console.error("Yield API Error:", error);
      const errorMessage = error.response?.data?.message || error.message || 'API Request Failed';
      toast.error(`Error: ${errorMessage}`, { icon: '❌' })
      setPhase('idle')
    }
  }, [])

  const handleReset = useCallback(() => setPhase('idle'), [])

  return (
    <PageTransition>
      {/* ── Page Header ────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,rgba(34,197,94,0.25),rgba(34,197,94,0.1))', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={20} color="#22c55e" />
          </div>
          <div>
            <h1 className="page-title text-gradient-green" style={{ marginBottom: 0 }}>Yield & Profit Prediction</h1>
            <p className="page-subtitle" style={{ marginTop: 2 }}>AI-powered agricultural business intelligence</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
          <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
            <Sparkles size={10} /> Gemini AI
          </span>
          <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>94% Accuracy</span>
        </div>
      </div>

      {/* ── Two-Column Layout ─────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 400px) 1fr', gap: '1.5rem', alignItems: 'start' }}
        className="yield-grid"
      >
        {/* LEFT: Form (always visible, sticky) */}
        <div style={{ position: 'sticky', top: 80 }}>
          <PredictionForm onPredict={handlePredict} isPredicting={phase === 'predicting'} />
        </div>

        {/* RIGHT: Dynamic results area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyResultState />
                <div style={{ marginTop: '1.25rem' }}>
                  <PredictionHistory />
                </div>
              </motion.div>
            )}

            {phase === 'predicting' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PredictionLoader isVisible={true} />
              </motion.div>
            )}

            {phase === 'result' && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                {/* S2: Prediction Summary */}
                <PredictionHero prediction={predictionData} />

                {/* S3: AI Business Analysis */}
                <AIBusinessAnalysis prediction={predictionData} />

                {/* S4: Profit Breakdown */}
                <section>
                  <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Profit Breakdown</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Revenue, expenses and net margin analysis</p>
                  </div>
                  <ProfitBreakdown prediction={predictionData} />
                </section>

                {/* S5 + S6: Recs + Risk side by side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="yield-two-col">
                  <AIOptimizationRecs prediction={predictionData} />
                  <RiskAnalysis prediction={predictionData} />
                </div>

                {/* S9: Quick Actions */}
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Quick Actions</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Continue your AI-powered farm management</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem' }}>
                    {[
                      { icon: '🔬', label: 'Scan Crop',       sub: 'Disease detection',  to: '/app/crop-intelligence', color: '#10b981' },
                      { icon: '🌤️', label: 'Weather Intel',   sub: 'Risk analysis',      to: '/app/weather',           color: '#3b82f6' },
                      { icon: '🤖', label: 'AI Advisor',      sub: 'Expert guidance',    to: '/app/advisor',           color: '#a78bfa' },
                      { icon: '📋', label: 'Gov. Schemes',    sub: 'Financial aid',      to: '/app/schemes',           color: '#f59e0b' },
                    ].map(({ icon, label, sub, to, color }) => (
                      <motion.button key={label}
                        whileHover={{ y: -4, boxShadow: `0 8px 24px ${color}25` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => nav(to)}
                        className="card"
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.625rem', padding: '1.25rem', cursor: 'pointer', background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)', textAlign: 'left', transition: 'all 0.2s' }}
                      >
                        <span style={{ fontSize: 28 }}>{icon}</span>
                        <div>
                          <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem', marginBottom: 2 }}>{label}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{sub}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* S10: Export */}
                <div className="card" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                    <Download size={16} color="var(--color-primary-light)" />
                    <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Export Options</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="btn btn-primary" onClick={() => toast.success('Downloading AI Prediction Report (PDF)…', { icon: '📄' })}>
                      <Download size={15} /> Download Report
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="btn btn-secondary" onClick={() => toast.success('Prediction link copied!', { icon: '🔗' })}>
                      <Share2 size={15} /> Share
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="btn btn-secondary" onClick={() => window.print()}>
                      <Printer size={15} /> Print
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="btn btn-ghost" onClick={handleReset}>
                      New Prediction
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 960px) {
          .yield-grid { grid-template-columns: 1fr !important; }
          .yield-grid > div:first-child { position: relative !important; top: auto !important; }
          .yield-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  )
}
