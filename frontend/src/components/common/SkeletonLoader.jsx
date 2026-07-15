/**
 * SkeletonLoader — Animated skeleton placeholder.
 * @param {string} className - additional CSS classes
 * @param {object} style - inline styles (width, height, borderRadius, etc.)
 */
export function SkeletonBlock({ className = '', style = {} }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ minHeight: 16, ...style }}
      aria-hidden="true"
    />
  )
}

/**
 * SkeletonCard — A card-shaped skeleton placeholder.
 */
export function SkeletonCard({ rows = 3 }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <SkeletonBlock style={{ height: 20, width: '60%' }} />
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBlock key={i} style={{ height: 14, width: i === rows - 1 ? '40%' : '100%' }} />
      ))}
    </div>
  )
}

/**
 * SkeletonStat — A stat card skeleton.
 */
export function SkeletonStat() {
  return (
    <div className="stat-card">
      <SkeletonBlock style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <SkeletonBlock style={{ height: 12, width: '50%' }} />
        <SkeletonBlock style={{ height: 20, width: '70%' }} />
      </div>
    </div>
  )
}
