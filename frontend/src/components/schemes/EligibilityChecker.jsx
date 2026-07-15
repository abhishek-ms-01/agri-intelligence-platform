import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    state: 'Maharashtra',
    crop: 'Tomato',
    area: '4.5',
    category: 'Small',
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = () => {
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult({
        eligible: 6,
        confidence: 94,
        message: 'Your profile matches multiple high-value schemes. The data aligns perfectly with state agricultural registries.',
      })
      setLoading(false)
      toast.success('Eligibility check complete', { icon: '🤖' })
    }, 1500)
  }

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(59,130,246,0.1))', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={20} color="#3b82f6" />
        </div>
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>AI Eligibility Checker</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', margin: '0.25rem 0 0' }}>Verify your details for instant scheme matching</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>State</label>
          <select className="input" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })}>
            <option>Maharashtra</option>
            <option>Punjab</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>Crop Type</label>
          <select className="input" value={formData.crop} onChange={e => setFormData({ ...formData, crop: e.target.value })}>
            <option>Tomato</option>
            <option>Wheat</option>
            <option>Sugarcane</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>Land Area (Acres)</label>
          <input className="input" type="number" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>Farmer Category</label>
          <select className="input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
            <option>Small (1-2 Hectares)</option>
            <option>Marginal (Up to 1 Hectare)</option>
            <option>Large (&gt;2 Hectares)</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheck} disabled={loading}>
        {loading ? <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> AI Processing...</span> : 'Check Eligibility'}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={20} color="#10b981" style={{ marginTop: 2 }} />
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#10b981', margin: '0 0 0.25rem' }}>Eligible for {result.eligible} Schemes</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', margin: 0, lineHeight: 1.5 }}>{result.message}</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', margin: '0 0 2px' }}>AI Confidence</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981', margin: 0 }}>{result.confidence}%</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
