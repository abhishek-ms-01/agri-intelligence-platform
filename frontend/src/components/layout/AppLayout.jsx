import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import FloatingAIBot from '../common/FloatingAIBot'

/**
 * AppLayout — The main application shell.
 * Sidebar (fixed left) + Navbar (sticky top) + page content area.
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Mobile overlay backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Main area ── */}
      <div className="app-main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="app-content">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
      
      <FloatingAIBot />
    </div>
  )
}
