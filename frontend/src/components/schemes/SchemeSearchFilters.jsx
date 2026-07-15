import { Search, Filter } from 'lucide-react'
const SCHEME_CATEGORIES = ['All', 'Subsidy', 'Insurance', 'Loans', 'Equipment'];
export default function SchemeSearchFilters({ search, setSearch, category, setCategory }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      
      {/* Search Input */}
      <div style={{ position: 'relative', flex: '1 1 300px' }}>
        <Search size={16} color="var(--color-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          className="input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search schemes by name, keyword..."
          style={{ paddingLeft: '2.75rem', height: 48, width: '100%' }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.375rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Filter size={16} color="var(--color-muted)" style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }} />
        {SCHEME_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 8,
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: category === cat ? 'rgba(16,185,129,0.15)' : 'transparent',
              color: category === cat ? 'var(--color-primary-light)' : 'var(--color-muted)',
              border: category === cat ? '1px solid rgba(16,185,129,0.3)' : '1px solid transparent',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
