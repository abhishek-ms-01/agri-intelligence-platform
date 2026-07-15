import { COMPARISON_DATA } from './schemesData'

export default function BenefitsComparison() {
  return (
    <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.5rem' }}>
        Benefits Comparison
      </h3>
      
      <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Feature</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)', fontSize: '0.9375rem', fontWeight: 700 }}>PM-KISAN</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)', fontSize: '0.9375rem', fontWeight: 700 }}>PMFBY</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)', fontSize: '0.9375rem', fontWeight: 700 }}>KCC</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)', fontSize: '0.9375rem', fontWeight: 700 }}>PMKSY</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', transition: 'background 0.2s' }}>
              <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--color-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--color-text-soft)', fontSize: '0.875rem' }}>{row.pmKisan}</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--color-text-soft)', fontSize: '0.875rem' }}>{row.pmfby}</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--color-text-soft)', fontSize: '0.875rem' }}>{row.kcc}</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--color-text-soft)', fontSize: '0.875rem' }}>{row.pksy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
