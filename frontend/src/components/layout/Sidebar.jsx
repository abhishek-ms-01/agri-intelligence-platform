import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Leaf,
  Cloud,
  TrendingUp,
  MessageSquareText,
  BookOpen,
  Sprout,
  X,
} from 'lucide-react'

// ─── Navigation Items ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: '/app',                label: 'Dashboard',      icon: LayoutDashboard, end: true },
  { to: '/app/crop-intelligence', label: 'Crop Intelligence', icon: Leaf },
  { to: '/app/weather',        label: 'Weather',        icon: Cloud },
  { to: '/app/yield',          label: 'Yield & Profit', icon: TrendingUp },
  { to: '/app/advisor',        label: 'AI Advisor',     icon: MessageSquareText },
  { to: '/app/schemes',        label: 'Gov. Schemes',   icon: BookOpen },
]

/**
 * Sidebar — Fixed left navigation panel.
 */
export default function Sidebar({ isOpen, onClose }) {

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="app-sidebar hidden md:flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #030712 100%)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        <SidebarContent onClose={null} />
      </aside>

      {/* ── Mobile Sidebar (animated) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="app-sidebar flex flex-col md:hidden z-[110]"
            style={{
              background: 'linear-gradient(180deg, #0a1628 0%, #030712 100%)',
              borderRight: '1px solid var(--color-border)',
            }}
          >
            <SidebarContent onClose={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Inner content (shared between desktop/mobile) ────────────────────────────
function SidebarContent({ onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between pt-[24px] pb-[20px] pl-[24px] pr-[22px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <NavLink to="/" className="flex items-center no-underline group" style={{ gap: '18px' }}>
          <div
            className="flex items-center justify-center transition-all duration-300 flex-shrink-0"
            style={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(16,185,129,.18), rgba(16,185,129,.08))',
              border: '1px solid rgba(16,185,129,.25)',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <img src="/logo.png" alt="Krishi AI Logo" style={{ width: '26px', height: '26px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            <Sprout size={24} color="#10B981" strokeWidth={2.5} style={{ display: 'none' }} />
          </div>
          <div className="flex items-center" style={{ marginTop: '2px' }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF', fontSize: '26px', fontWeight: 800, letterSpacing: '0.5px', lineHeight: 1 }}>Krishi AI</p>
          </div>
        </NavLink>
        {onClose && (
          <button onClick={onClose} className="btn btn-ghost btn-sm ml-2" aria-label="Close sidebar">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Label */}
      <div className="px-6 pt-6 pb-3">
        <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,.45)', letterSpacing: '1.8px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
          Workspace
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 pb-4" style={{ overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  height: '56px',
                  padding: '0 16px',
                  borderRadius: '16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                  background: isActive ? 'linear-gradient(90deg, rgba(16,185,129,.18), rgba(16,185,129,.08))' : 'transparent',
                  border: isActive ? '1px solid rgba(16,185,129,.25)' : '1px solid transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(16,185,129,0.1)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={22}
                      color={isActive ? '#10B981' : 'rgba(255,255,255,0.45)'}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        style={{
                          marginLeft: 'auto',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#10B981',
                          boxShadow: '0 0 8px rgba(16,185,129,0.8)'
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom User / Status */}
      <div className="p-4 m-4 mt-auto mb-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(16,185,129,0.3)' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>AA</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Agri Admin
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                System Online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
