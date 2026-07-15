import { motion } from 'framer-motion'
import {
  BrainCircuit, Leaf, AlertTriangle, ShieldCheck, ShieldAlert,
  Sprout, FlaskConical, CalendarClock, BookOpen, Stethoscope,
  Download, ScanLine, ChevronRight, Clock, TrendingUp,
} from 'lucide-react'
import ScoreRing from './ScoreRing'

const SEVERITY_CONFIG = {
  Low:    { badge: 'badge-success', icon: ShieldCheck,  label: 'Low Severity'     },
  Medium: { badge: 'badge-warning', icon: AlertTriangle, label: 'Moderate Severity' },
  High:   { badge: 'badge-danger',  icon: ShieldAlert,  label: 'High Risk'         },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] } }),
}

function InfoCard({ icon: Icon, title, iconColor, iconBg, children }) {
  return (
    <div className="card card-glow" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={16} color={iconColor} />
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function BulletList({ items, color = 'var(--color-primary)' }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
          <ChevronRight size={13} color={color} style={{ marginTop: 3, flexShrink: 0 }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function TreatmentTimeline({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.875rem', position: 'relative' }}>
          {i < steps.length - 1 && (
            <div style={{ position: 'absolute', left: 11, top: 24, width: 1, height: 'calc(100% - 8px)', background: 'var(--color-border)' }} />
          )}
          <div style={{ width: 23, height: 23, borderRadius: '50%', flexShrink: 0, background: step.done ? 'rgba(5,150,105,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${step.done ? 'var(--color-primary)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: step.done ? 'var(--color-primary-light)' : 'var(--color-muted)' }} />
          </div>
          <div style={{ paddingBottom: '1.25rem', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 2 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{step.label}</span>
              <span style={{ fontSize: '0.6875rem', padding: '0.15rem 0.5rem', borderRadius: 99, background: step.done ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', color: step.done ? '#22c55e' : 'var(--color-muted)', fontWeight: 600 }}>{step.time}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AnalysisResults({ result, onScanAgain, onDownload }) {
  if (!result) return null
  const sev = SEVERITY_CONFIG[result.severity] || SEVERITY_CONFIG.Medium
  const SevIcon = sev.icon

  return (
    <motion.div initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Hero Card ─────────── */}
      <motion.div custom={0} variants={fadeUp} className="card" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#06150f 100%)', border: '1px solid rgba(5,150,105,0.25)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'radial-gradient(circle,rgba(5,150,105,0.18) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <BrainCircuit size={16} color="var(--color-primary-light)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Diagnosis Complete</span>
            </div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.375rem', lineHeight: 1.2, marginBottom: '0.25rem' }}>{result.diseaseName}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Detected on <span style={{ color: 'var(--color-text-soft)' }}>{result.cropName}</span></p>
          </div>
          <span className={`badge ${sev.badge}`} style={{ fontSize: '0.75rem', padding: '0.375rem 0.875rem' }}>
            <SevIcon size={11} /> {sev.label}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '0.5rem 0 1.25rem' }}>
          <ScoreRing score={result.confidence} label="Confidence" color="#10b981" glowColor="rgba(16,185,129,0.3)" />
          <ScoreRing score={result.healthScore} label="Crop Health" color={result.healthScore > 60 ? '#f97316' : '#ef4444'} glowColor={result.healthScore > 60 ? 'rgba(249,115,22,0.3)' : 'rgba(239,68,68,0.3)'} />
        </div>

        <div style={{ padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <BrainCircuit size={14} color="var(--color-primary-light)" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>AI Expert Recommendation</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-soft)', lineHeight: 1.6 }}>{result.aiRecommendation}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Clock size={13} color="var(--color-muted)" />
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Recovery: <span style={{ color: 'var(--color-text-soft)', fontWeight: 500 }}>{result.recoveryTime}</span></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <TrendingUp size={13} color="var(--color-muted)" />
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Confidence: <span style={{ color: '#10b981', fontWeight: 600 }}>{result.confidence}%</span></span>
          </div>
        </div>
      </motion.div>

      {/* ── Symptoms ──────────── */}
      <motion.div custom={1} variants={fadeUp}>
        <InfoCard icon={Stethoscope} title="Identified Symptoms" iconColor="#f97316" iconBg="rgba(249,115,22,0.12)">
          <BulletList items={result.symptoms || []} color="#f97316" />
        </InfoCard>
      </motion.div>

      {/* ── Causes ────────────── */}
      <motion.div custom={2} variants={fadeUp}>
        <InfoCard icon={FlaskConical} title="Possible Causes" iconColor="#3b82f6" iconBg="rgba(59,130,246,0.12)">
          <BulletList items={result.causes || []} color="#3b82f6" />
        </InfoCard>
      </motion.div>

      {/* ── Treatment ─────────── */}
      <motion.div custom={3} variants={fadeUp}>
        <InfoCard icon={Sprout} title="Recommended Treatment" iconColor="#10b981" iconBg="rgba(16,185,129,0.12)">
          <BulletList items={result.treatment || []} color="#10b981" />
        </InfoCard>
      </motion.div>

      {/* ── Timeline ──────────── */}
      <motion.div custom={4} variants={fadeUp}>
        <div className="card" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarClock size={16} color="var(--color-accent)" />
            </div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Treatment Timeline</span>
            <span className="badge badge-accent" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>{result.recoveryTime}</span>
          </div>
          <TreatmentTimeline steps={result.timeline || []} />
        </div>
      </motion.div>

      {/* ── Recovery Progress ──── */}
      <motion.div custom={5} variants={fadeUp}>
        <div className="card" style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(5,150,105,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color="var(--color-primary-light)" />
            </div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>Recovery Progress</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {(result.recoveryStages || []).map((stage, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)' }}>{stage.label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: stage.color }}>{stage.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stage.pct}%` }} transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.4, 0, 0.2, 1] }} style={{ height: '100%', borderRadius: 99, background: stage.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Prevention ─────────── */}
      <motion.div custom={6} variants={fadeUp}>
        <InfoCard icon={BookOpen} title="Preventive Measures" iconColor="#a78bfa" iconBg="rgba(167,139,250,0.12)">
          <BulletList items={result.prevention || []} color="#a78bfa" />
        </InfoCard>
      </motion.div>

      {/* ── Disease Profile ───── */}
      <motion.div custom={7} variants={fadeUp}>
        <div className="card glass-light" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Leaf size={14} color="var(--color-primary-light)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Disease Profile</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { label: 'Scientific Name', value: result.scientificName },
              { label: 'Pathogen Type',   value: result.pathogenType },
              { label: 'Spread Method',   value: result.spreadMethod },
              { label: 'Crop Family',     value: result.cropFamily },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-soft)', fontWeight: 500 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Actions ────────────── */}
      <motion.div custom={8} variants={fadeUp} style={{ display: 'flex', gap: '0.75rem', paddingBottom: '1rem' }}>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={onDownload}>
          <Download size={15} /> Download Report
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={onScanAgain}>
          <ScanLine size={15} /> Scan Again
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
