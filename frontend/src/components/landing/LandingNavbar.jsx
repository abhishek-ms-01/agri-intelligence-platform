import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, ArrowRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Roadmap', href: '#future' },
]

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.4,0,0.2,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64, display: 'flex', alignItems: 'center', padding: '0 2rem',
        background: scrolled ? 'rgba(3,7,18,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.35)';
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
          }}>
            <img src="/logo.png" alt="Agri Intel Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            <Sprout size={18} color="#10B981" strokeWidth={2.5} style={{ display: 'none' }} />
          </div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.125rem', color: '#f8fafc', letterSpacing: '0.2px' }}>Agri Intel</span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }} className="hidden md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label} href={href}
              style={{ fontFamily: 'Inter', fontSize: '0.875rem', fontWeight: 500, color: '#94a3b8',
                padding: '0.375rem 0.875rem', borderRadius: 8, textDecoration: 'none', transition: 'all 0.15s ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent' }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/app"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            background: 'linear-gradient(135deg, #059669, #047857)',
            color: 'white', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.875rem',
            padding: '0.5rem 1.25rem', borderRadius: 10, textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(5,150,105,0.35)',
            transition: 'all 0.2s ease', marginLeft: 'auto',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(5,150,105,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Try Platform <ArrowRight size={14} />
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'none', padding: 4 }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: 64, left: 0, right: 0,
              background: 'rgba(3,7,18,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '1rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#94a3b8', padding: '0.75rem 0',
                  textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {label}
              </a>
            ))}
            <Link to="/app" onClick={() => setMenuOpen(false)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem',
                background: 'linear-gradient(135deg, #059669, #047857)', color: 'white',
                fontFamily: 'Inter', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 12, textDecoration: 'none' }}>
              Try AI Platform <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
