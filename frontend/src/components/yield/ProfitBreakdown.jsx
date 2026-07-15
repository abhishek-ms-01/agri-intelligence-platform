import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IndianRupee, TrendingDown, TrendingUp } from 'lucide-react'


function AnimCounter({ target, prefix = '', duration = 1.6 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let s = 0; const step = target / (duration * 60)
    const t = setInterval(() => { s += step; if (s >= target) { setVal(target); clearInterval(t) } else setVal(Math.floor(s)) }, 1000 / 60)
    return () => clearInterval(t)
  }, [inView, target, duration])
  return <span ref={ref}>{prefix}{val.toLocaleString('en-IN')}</span>
}

export default function ProfitBreakdown({ prediction }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  const R = {
    revenue: prediction?.revenue || 245000,
    profit: prediction?.profit || 135000,
    roi: prediction?.roi || 120,
    breakEven: 95000,
    expenses: prediction?.expenses || [
      { label: 'Seeds', amount: 15000, color: '#3b82f6' },
      { label: 'Fertilizers', amount: 25000, color: '#10b981' },
      { label: 'Labor', amount: 35000, color: '#f59e0b' }
    ]
  };

  const total = R.expenses.reduce((s, e) => s + e.amount, 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {[
          { icon: TrendingUp,   label: 'Total Revenue',  value: R.revenue, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', prefix: '₹' },
          { icon: TrendingDown, label: 'Total Expenses', value: total,               color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',  prefix: '₹' },
          { icon: IndianRupee,  label: 'Net Profit',     value: R.profit,            color: '#22c55e', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)',  prefix: '₹' },
          { icon: TrendingUp,   label: 'ROI',            value: R.roi,              color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', prefix: '', suffix: '%' },
        ].map(({ icon: Icon, label, value, color, bg, border, prefix = '', suffix = '' }) => (
          <motion.div key={label} whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}20` }}
            style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: bg, border: `1px solid ${border}`, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Icon size={15} color={color} />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>{label}</span>
            </div>
            <p style={{ fontSize: '1.375rem', fontWeight: 800, fontFamily: 'Syne,sans-serif', color }}>
              {prefix}<AnimCounter target={value} />{suffix}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Break-even */}
      <div className="card" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Expense Breakdown</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Break-even at <span style={{ color: '#f59e0b', fontWeight: 600 }}>₹{R.breakEven.toLocaleString('en-IN')}</span></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {R.expenses.map((exp, i) => {
            const pct = Math.round((exp.amount / total) * 100)
            return (
              <div key={exp.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)' }}>{exp.label}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: exp.color }}>₹{exp.amount.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${pct}%` : 0 }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    style={{ height: '100%', borderRadius: 99, background: exp.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
