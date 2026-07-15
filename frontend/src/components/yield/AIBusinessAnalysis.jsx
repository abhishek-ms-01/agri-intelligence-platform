import { motion } from 'framer-motion'
import { BrainCircuit, TrendingUp, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react'
export default function AIBusinessAnalysis({ prediction }) {
  const A = prediction?.aiAnalysis || {
    businessRisk: prediction?.riskLevel || 'Medium',
    confidence: prediction?.successProb || 85,
    headline: prediction?.aiBusinessRecommendation || 'AI Analysis Complete',
    summary: 'Based on current conditions, the yield is expected to be within average bounds.',
    yieldIncrease: '+10%',
    profitImprovement: '+15%',
    keyFactors: [
      { label: 'Soil Health', value: 'Good', color: '#10b981' },
      { label: 'Weather Risk', value: 'Low', color: '#3b82f6' }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        background: 'linear-gradient(135deg,#060f1a 0%,#061a10 100%)',
        border: '1px solid rgba(5,150,105,0.25)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'radial-gradient(circle,rgba(5,150,105,0.15) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1.5rem' }}>
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BrainCircuit size={22} color="var(--color-primary-light)" />
        </motion.div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Gemini AI Business Analysis
            </span>
            <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>{A.businessRisk} Risk</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              {A.confidence}% confidence · {A.generatedAt}
            </span>
          </div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.3 }}>{A.headline}</h2>
        </div>
      </div>

      {/* Summary */}
      <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-soft)', lineHeight: 1.7 }}>{A.summary}</p>
      </div>

      {/* Key metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Yield Increase',      value: A.yieldIncrease,       color: '#10b981', bg: 'rgba(16,185,129,0.08)', icon: TrendingUp  },
          { label: 'Profit Improvement',  value: A.profitImprovement,   color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: TrendingUp  },
          { label: 'Business Risk',       value: A.businessRisk,        color: '#22c55e', bg: 'rgba(34,197,94,0.08)',  icon: ShieldCheck },
          { label: 'AI Confidence',       value: `${A.confidence}%`,   color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', icon: Sparkles    },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', background: bg, border: `1px solid ${color}25`, textAlign: 'center' }}>
            <Icon size={14} color={color} style={{ marginBottom: 6 }} />
            <p style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Syne,sans-serif', color, lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginTop: 3 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Key factors */}
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Key Success Factors
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {A.keyFactors.map(({ label, value, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <ChevronRight size={12} color={color} />
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', flex: 1 }}>{label}</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginTop: '1rem', textAlign: 'right' }}>
        Generated by Gemini AI · {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </motion.div>
  )
}
