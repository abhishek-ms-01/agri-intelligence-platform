import { Link } from 'react-router-dom'
import { Sprout, Globe, GitBranch, ExternalLink, Mail, Phone, MapPin } from 'lucide-react'

const NAV_LINKS = {
  Platform: [
    { label: 'Dashboard', href: '/app' },
    { label: 'Crop Intelligence', href: '/app/crop-intelligence' },
    { label: 'Weather', href: '/app/weather' },
    { label: 'Yield Prediction', href: '/app/yield' },
    { label: 'AI Advisor', href: '/app/advisor' },
    { label: 'Gov. Schemes', href: '/app/schemes' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Technology: [
    { label: 'Google Gemini AI', href: '#' },
    { label: 'OpenWeatherMap', href: '#' },
    { label: 'TensorFlow', href: '#' },
    { label: 'Open Source', href: '#' },
  ],
}

const SOCIAL = [
  { icon: Globe, href: '#', label: 'Twitter' },
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: ExternalLink, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(3,7,18,0.95)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                <img src="/logo.png" alt="Krishi AI Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                <Sprout size={22} color="#10b981" strokeWidth={2.5} style={{ display: 'none' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.125rem', color: '#f8fafc', lineHeight: 1.1, letterSpacing: '0.2px' }}>Krishi AI</p>
                <p style={{ fontFamily: 'Inter', fontSize: '0.6875rem', color: '#64748b' }}>AI Platform</p>
              </div>
            </Link>

            <p style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, maxWidth: 280, marginBottom: '1.5rem' }}>
              Empowering farmers with AI-driven insights for smarter decisions, better harvests, and a sustainable future.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: Mail, text: 'support@agriintel.com' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: MapPin, text: 'Bengaluru, Karnataka, India' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={13} color="#059669" />
                  <span style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: '#64748b' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(NAV_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8',
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {heading}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{ fontFamily: 'Inter', fontSize: '0.875rem', color: '#64748b', textDecoration: 'none',
                        transition: 'color 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#10b981'}
                      onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '2rem' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.8125rem', color: '#475569' }}>
            © 2026 Krishi AI. Built with ❤️ for Indian Farmers.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748b', textDecoration: 'none', transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(5,150,105,0.4)'; e.currentTarget.style.color = '#10b981' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#64748b' }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
