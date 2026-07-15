import { TIMELINE_STEPS } from './schemesData'
import { CheckCircle2, Clock, Circle } from 'lucide-react'

export default function ApplicationTimeline() {
  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.5rem' }}>
        Standard Application Journey
      </h3>
      
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        {/* Track */}
        <div style={{ position: 'absolute', left: 11, top: 16, bottom: 16, width: 2, background: 'rgba(255,255,255,0.06)' }} />
        
        {TIMELINE_STEPS.map((step, i) => (
          <div key={step.id} style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1, opacity: step.status === 'upcoming' ? 0.5 : 1 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {step.status === 'completed' ? (
                <CheckCircle2 size={24} color="#10b981" />
              ) : step.status === 'current' ? (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(5,150,105,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #10b981' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                </div>
              ) : (
                <Circle size={20} color="var(--color-muted)" />
              )}
            </div>
            <div style={{ paddingTop: 2 }}>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: step.status === 'current' ? 'var(--color-primary-light)' : 'var(--color-text)', margin: '0 0 0.25rem' }}>
                {step.title}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-soft)', margin: 0 }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
