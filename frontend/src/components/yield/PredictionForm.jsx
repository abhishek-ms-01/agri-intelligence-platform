import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sprout, RotateCcw, Sparkles, ChevronDown } from 'lucide-react'
const CROP_OPTIONS = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Sugarcane', 'Tomato']
const SOIL_OPTIONS = ['Alluvial', 'Black', 'Red', 'Laterite', 'Loamy', 'Sandy']
const SEASON_OPTIONS = ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)', 'Year-round']
const IRRIGATION_OPTIONS = ['Drip', 'Sprinkler', 'Canal', 'Tube Well', 'Rainfed (None)']
const RAINFALL_OPTIONS = ['Low (< 500mm)', 'Moderate (500-1000mm)', 'High (> 1000mm)']
const FERTILIZER_OPTIONS = ['Organic', 'Chemical', 'Mixed', 'None']
const DEMO_FORM = {
  crop: 'Wheat', area: '12', areaUnit: 'Acres', soilType: 'Loamy', season: 'Rabi (Winter)',
  irrigation: 'Sprinkler', rainfall: 'Moderate (500-1000mm)', fertilizer: 'Mixed',
  prevYield: '14.5', experience: '8'
}

const INITIAL = {
  crop: '', area: '', areaUnit: 'Acres', soilType: '', season: '',
  irrigation: '', rainfall: '', fertilizer: '', prevYield: '', experience: '',
}

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-soft)' }}>
        {label}{required && <span style={{ color: 'var(--color-primary-light)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        className="input"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer' }}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} color="var(--color-muted)" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  )
}

export default function PredictionForm({ onPredict, isPredicting }) {
  const [form, setForm] = useState(INITIAL)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const loadDemo = () => setForm(DEMO_FORM)
  const reset    = () => setForm(INITIAL)
  const filled   = form.crop && form.area && form.soilType && form.season

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)', padding: 0, overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(5,150,105,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sprout size={16} color="var(--color-primary-light)" />
        </div>
        <div>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Farm Profile</span>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Enter crop details for AI prediction</p>
        </div>
        <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>AI Ready</span>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Crop + Area row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Crop Name" required>
            <SelectInput value={form.crop} onChange={v => set('crop', v)} options={CROP_OPTIONS} placeholder="Select crop…" />
          </Field>
          <Field label="Land Area" required>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input className="input" type="number" min="0" step="0.1" placeholder="e.g. 4.5"
                value={form.area} onChange={e => set('area', e.target.value)}
                style={{ flex: 1 }}
              />
              <select className="input" value={form.areaUnit} onChange={e => set('areaUnit', e.target.value)} style={{ width: 96, appearance: 'none' }}>
                <option>Acres</option>
                <option>Hectares</option>
              </select>
            </div>
          </Field>
        </div>

        {/* Soil + Season */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Soil Type" required>
            <SelectInput value={form.soilType} onChange={v => set('soilType', v)} options={SOIL_OPTIONS} placeholder="Select soil…" />
          </Field>
          <Field label="Farming Season" required>
            <SelectInput value={form.season} onChange={v => set('season', v)} options={SEASON_OPTIONS} placeholder="Select season…" />
          </Field>
        </div>

        {/* Irrigation + Rainfall */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Irrigation Method">
            <SelectInput value={form.irrigation} onChange={v => set('irrigation', v)} options={IRRIGATION_OPTIONS} placeholder="Select method…" />
          </Field>
          <Field label="Expected Rainfall">
            <SelectInput value={form.rainfall} onChange={v => set('rainfall', v)} options={RAINFALL_OPTIONS} placeholder="Select range…" />
          </Field>
        </div>

        {/* Fertilizer */}
        <Field label="Fertilizer Strategy">
          <SelectInput value={form.fertilizer} onChange={v => set('fertilizer', v)} options={FERTILIZER_OPTIONS} placeholder="Select fertilizer type…" />
        </Field>

        {/* Previous Yield + Experience */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Previous Season Yield (tons)">
            <input className="input" type="number" min="0" step="0.1" placeholder="e.g. 10.2"
              value={form.prevYield} onChange={e => set('prevYield', e.target.value)} />
          </Field>
          <Field label="Farming Experience (years)">
            <input className="input" type="number" min="0" max="60" placeholder="e.g. 8"
              value={form.experience} onChange={e => set('experience', e.target.value)} />
          </Field>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.5rem' }}>
          <motion.button
            whileHover={{ scale: filled && !isPredicting ? 1.02 : 1 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary btn-lg"
            disabled={!filled || isPredicting}
            onClick={() => onPredict(form)}
            style={{ opacity: filled && !isPredicting ? 1 : 0.45, cursor: filled && !isPredicting ? 'pointer' : 'not-allowed' }}
          >
            {isPredicting ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                Predicting…
              </>
            ) : (
              <><Sparkles size={16} /> Predict Yield & Profit</>
            )}
          </motion.button>

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="btn btn-secondary" style={{ flex: 1 }} onClick={loadDemo} disabled={isPredicting}>
              <Sparkles size={14} color="var(--color-accent)" /> Load Demo
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="btn btn-ghost" style={{ padding: '0.625rem 1rem' }} onClick={reset} disabled={isPredicting}>
              <RotateCcw size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
