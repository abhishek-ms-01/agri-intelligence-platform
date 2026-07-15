import { useLocation } from 'react-router-dom'
import { Menu, Bell, Search, Sprout } from 'lucide-react'
import toast from 'react-hot-toast'

// ─── Route label map ──────────────────────────────────────────────────────────
const PAGE_TITLES = {
  '/app':                  { title: 'Farm Dashboard',      subtitle: 'Your farm intelligence overview' },
  '/app/crop-intelligence': { title: 'Crop Intelligence',   subtitle: 'AI-powered disease detection & analysis' },
  '/app/weather':          { title: 'Weather Intelligence', subtitle: 'Live weather data & disease risk prediction' },
  '/app/yield':            { title: 'Yield & Profit',      subtitle: 'AI-powered harvest & revenue estimation' },
  '/app/advisor':          { title: 'AI Farm Advisor',     subtitle: 'Your intelligent farming assistant' },
  '/app/schemes':          { title: 'Government Schemes',  subtitle: 'Explore subsidies & support programs' },
}

/**
 * Navbar — Top sticky navigation bar with breadcrumb, search, and notifications.
 */
export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const page = PAGE_TITLES[pathname] || { title: 'Agri Intelligence', subtitle: '' }

  return (
    <header
      className="app-navbar flex items-center px-6 gap-4"
      style={{
        background: 'rgba(3,7,18,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="btn btn-ghost btn-sm md:hidden"
        aria-label="Open navigation menu"
        id="mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1
          className="font-display truncate"
          style={{ fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--color-text)' }}
        >
          {page.title}
        </h1>
        {page.subtitle && (
          <p
            className="truncate"
            style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter, sans-serif', marginTop: '1px' }}
          >
            {page.subtitle}
          </p>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <button
          className="btn btn-ghost btn-sm hidden sm:flex"
          aria-label="Search"
          id="navbar-search-btn"
          onClick={() => toast('Global search coming soon', { icon: '🔍' })}
        >
          <Search size={18} />
        </button>

        {/* Notification bell */}
        <button
          className="btn btn-ghost btn-sm relative"
          aria-label="Notifications"
          id="navbar-notifications-btn"
          onClick={() => toast.success('You have 3 new notifications')}
        >
          <Bell size={18} />
          {/* Badge dot */}
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              background: 'var(--color-danger)',
              borderRadius: '50%',
              border: '1.5px solid var(--color-bg)',
            }}
          />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--color-border)', margin: '0 4px' }} />

        {/* Farm Profile pill */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{
            background: 'rgba(5,150,105,0.08)',
            border: '1px solid rgba(5,150,105,0.2)',
            cursor: 'default',
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: 'linear-gradient(135deg, #059669, #047857)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/logo.png" alt="Agri Intel Logo" style={{ width: '16px', height: '16px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            <Sprout size={13} color="white" strokeWidth={2.5} style={{ display: 'none' }} />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-light)', fontFamily: 'Inter, sans-serif' }}>
            Green Valley Farm
          </span>
        </div>
      </div>
    </header>
  )
}
