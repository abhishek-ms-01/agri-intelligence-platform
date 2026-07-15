import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
} from 'recharts'

const cropHealthData = [
  { w: 'W1', score: 72 }, { w: 'W2', score: 78 }, { w: 'W3', score: 75 },
  { w: 'W4', score: 83 }, { w: 'W5', score: 88 }, { w: 'W6', score: 91 },
  { w: 'W7', score: 94 },
]

const yieldData = [
  { m: 'Jan', yield: 2.6 }, { m: 'Feb', yield: 2.9 }, { m: 'Mar', yield: 3.1 },
  { m: 'Apr', yield: 3.4 }, { m: 'May', yield: 3.0 }, { m: 'Jun', yield: 3.7 },
  { m: 'Jul', yield: 4.2 },
]

const weatherData = [
  { d: 'Mon', temp: 26, rain: 0 }, { d: 'Tue', temp: 28, rain: 2 },
  { d: 'Wed', temp: 27, rain: 5 }, { d: 'Thu', temp: 25, rain: 12 },
  { d: 'Fri', temp: 24, rain: 87 }, { d: 'Sat', temp: 27, rain: 8 },
  { d: 'Sun', temp: 29, rain: 0 },
]

const tooltipStyle = {
  background: '#111827',
  border: '1px solid #1f2d3d',
  borderRadius: 8,
  padding: '0.5rem 0.75rem',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.75rem',
  color: 'white',
  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
}

const ChartCard = ({ title, subtitle, delay, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="card"
    style={{ background: 'linear-gradient(135deg, #111827, #0f172a)' }}
  >
    <div style={{ marginBottom: '1.25rem' }}>
      <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 2 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{subtitle}</p>
    </div>
    {children}
  </motion.div>
)

export default function AnalyticsCharts() {
  const [activePeriod, setActivePeriod] = useState('7D');
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-text)' }}>
          Analytics Overview
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['7D', '1M', '3M', 'YTD'].map((period) => {
            const isActive = period === activePeriod;
            return (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              style={{
                padding: '3px 10px',
                borderRadius: 6,
                background: isActive ? 'rgba(5,150,105,0.15)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(5,150,105,0.3)' : 'var(--color-border)'}`,
                color: isActive ? 'var(--color-primary-light)' : 'var(--color-muted)',
                fontFamily: 'Inter', fontSize: '0.6875rem', fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {period}
            </button>
          )})}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Crop Health Trend */}
        <ChartCard title="Crop Health Trend" subtitle="Weekly health score progression" delay={0.4}>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cropHealthData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="healthChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="w" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#10b981' }}
                formatter={(v) => [`${v}%`, 'Health Score']}
              />
              <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} fill="url(#healthChartGrad)" dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '0.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'Inter' }}>+22 points this season</span>
          </div>
        </ChartCard>

        {/* Yield Trend */}
        <ChartCard title="Yield Forecast Trend" subtitle="Monthly yield projection (t/ha)" delay={0.45}>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={yieldData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="yieldChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#f59e0b' }}
                formatter={(v) => [`${v} t/ha`, 'Yield']}
              />
              <Area type="monotone" dataKey="yield" stroke="#f59e0b" strokeWidth={2.5} fill="url(#yieldChartGrad)" dot={{ fill: '#f59e0b', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '0.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontFamily: 'Inter' }}>Peak forecast: 4.2 t/ha</span>
          </div>
        </ChartCard>

        {/* Weather Trend */}
        <ChartCard title="Weather Trend" subtitle="Temperature & rainfall this week" delay={0.5}>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weatherData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 3, strokeWidth: 0 }} name="Temp (°C)" />
              <Line type="monotone" dataKey="rain" stroke="#60a5fa" strokeWidth={2} dot={{ fill: '#60a5fa', r: 3, strokeWidth: 0 }} name="Rain (mm)" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {[{ color: '#f97316', label: 'Temperature' }, { color: '#60a5fa', label: 'Rainfall' }].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'Inter' }}>{label}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
