import { Sprout } from 'lucide-react'

/**
 * PageLoader — Full-screen loader shown during lazy route loading.
 */
export default function PageLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: 'var(--color-bg)',
        zIndex: 999,
      }}
    >
      {/* Animated logo */}
      <div
        style={{
          width: 64, height: 64, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 4px 20px rgba(16, 185, 129, 0.25)',
          backdropFilter: 'blur(10px)',
          animation: 'pulse-slow 2s ease infinite',
        }}
      >
        <img src="/logo.png" alt="Krishi AI Logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
        <Sprout size={32} color="#10B981" strokeWidth={2.5} style={{ display: 'none' }} />
      </div>

      {/* Spinner bar */}
      <div
        style={{
          width: 120,
          height: 3,
          background: 'var(--color-border)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            borderRadius: 99,
            animation: 'loading-bar 1.5s ease infinite',
          }}
        />
      </div>

      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
        Loading…
      </p>

      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%) scaleX(0.3); }
          50%  { transform: translateX(0%) scaleX(0.8); }
          100% { transform: translateX(100%) scaleX(0.3); }
        }
      `}</style>
    </div>
  )
}
