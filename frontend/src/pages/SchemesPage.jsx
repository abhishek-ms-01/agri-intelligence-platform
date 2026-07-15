import { useState, useMemo, useEffect } from 'react'
import PageTransition from '@/components/common/PageTransition'

import SchemeSearchFilters from '@/components/schemes/SchemeSearchFilters'
import SchemeCards from '@/components/schemes/SchemeCards'

import { getSchemes } from '@/api/schemeService'
import toast from 'react-hot-toast'

export default function SchemesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [schemes, setSchemes] = useState([]) // Initialize empty
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const data = await getSchemes();
        if (data && data.length > 0) setSchemes(data);
      } catch (error) {
        console.error("Schemes API Error:", error);
        const errorMessage = error.response?.data?.message || error.message || 'API Request Failed';
        toast.error(`Error: ${errorMessage}`, { icon: '❌' });
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, [])

  const filteredSchemes = useMemo(() => {
    return schemes.filter(s => {
      const matchCat = category === 'All' || s.category === category
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.description.toLowerCase().includes(search.toLowerCase()) ||
                          s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [search, category, schemes])

  return (
    <PageTransition>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title text-gradient-green">Government Scheme Explorer</h1>
        <p className="page-subtitle">AI-powered financial assistance platform tailored to your farm profile</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        

        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Discover Schemes</h2>
            <SchemeSearchFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
          </div>
          
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-xl)', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)' }}>Loading AI recommended schemes...</p>
            </div>
          ) : filteredSchemes.length > 0 ? (
            <SchemeCards schemes={filteredSchemes} />
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-xl)', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)' }}>No schemes found matching your search.</p>
            </div>
          )}
        </section>



      </div>
    </PageTransition>
  )
}
