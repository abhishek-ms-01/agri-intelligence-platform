import { AlertTriangle } from 'lucide-react'

/**
 * EmptyState — Shown when a section has no data yet.
 */
export default function EmptyState({ icon: Icon = AlertTriangle, title, description, action }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 2rem',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: 'rgba(5,150,105,0.08)',
          border: '1px solid rgba(5,150,105,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={28} color="var(--color-primary)" strokeWidth={1.5} />
      </div>
      <div>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.375rem' }}>
          {title}
        </p>
        {description && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--color-muted)', maxWidth: 320 }}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
