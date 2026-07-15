import { motion } from 'framer-motion'
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { CHART_DATA } from './weatherData'

const tooltipStyle = {
  contentStyle: { background: '#111827', border: '1px solid #1f2d3d', borderRadius: 10, fontFamily: 'Inter,sans-serif', fontSize: 12 },
  labelStyle: { color: '#94a3b8' },
}

function ChartCard({ title, icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card"
      style={{ background: 'linear-gradient(135deg,#111827 0%,#0a1628 100%)', padding: '1.25rem 1.5rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '0.9375rem' }}>{title}</span>
      </div>
      {children}
    </motion.div>
  )
}

export default function WeatherAnalytics() {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.125rem', marginBottom: '0.25rem' }}>
          Weather Analytics
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>7-day weather trends and disease risk projections</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
        {/* Temperature Trend */}
        <ChartCard title="Temperature Trend (°C)" icon="🌡️" delay={0.05}>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="wt-temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}°C`, 'Temp']} />
              <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} fill="url(#wt-temp)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Humidity Trend */}
        <ChartCard title="Humidity Trend (%)" icon="💧" delay={0.1}>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, 'Humidity']} />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Rainfall Trend */}
        <ChartCard title="Rainfall (mm)" icon="🌧️" delay={0.15}>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="wt-rain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v} mm`, 'Rain']} />
              <Bar dataKey="rain" fill="url(#wt-rain)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Disease Risk Trend */}
        <ChartCard title="Disease Risk Trend (%)" icon="🦠" delay={0.2}>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="wt-disease" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, 'Risk']} />
              <Area type="monotone" dataKey="disease" stroke="#ef4444" strokeWidth={2} fill="url(#wt-disease)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
