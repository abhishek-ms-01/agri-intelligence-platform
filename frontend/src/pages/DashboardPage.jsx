import { motion } from 'framer-motion'
import PageTransition     from '@/components/common/PageTransition'
import WelcomeSection     from '@/components/dashboard/WelcomeSection'
import FarmHealthScore    from '@/components/dashboard/FarmHealthScore'
import AIInsightHero      from '@/components/dashboard/AIInsightHero'
import WeatherIntelligenceCard from '@/components/dashboard/WeatherIntelligenceCard'
import CropHealthCard     from '@/components/dashboard/CropHealthCard'
import YieldPredictionCard from '@/components/dashboard/YieldPredictionCard'
import GovSchemeCard      from '@/components/dashboard/GovSchemeCard'
import AIRecommendationsPanel from '@/components/dashboard/AIRecommendationsPanel'
import QuickActions       from '@/components/dashboard/QuickActions'
import RecentActivity     from '@/components/dashboard/RecentActivity'
import AnalyticsCharts    from '@/components/dashboard/AnalyticsCharts'

/**
 * DashboardPage — Farm Intelligence Dashboard
 * Layout: [main content (flex-1)] | [AI Recommendations panel (320px)]
 */
export default function DashboardPage() {
  return (
    <PageTransition>
      {/* ── Outer layout: main + right panel ── */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start',
        position: 'relative',
      }}>

        {/* ═══════════════════════════════════════
            LEFT / CENTER — Main Dashboard
        ═══════════════════════════════════════ */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Welcome */}
          <WelcomeSection />

          {/* Row 1: Hero AI Insight (full width) */}
          <div style={{ marginBottom: '1.25rem' }}>
            <AIInsightHero />
          </div>

          {/* Row 2: Farm Health + Weather + Crop Health */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.25rem',
          }}>
            <FarmHealthScore />
            <WeatherIntelligenceCard />
            <CropHealthCard />
          </div>

          {/* Row 3: Yield + Gov Scheme */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}>
            <YieldPredictionCard />
            <GovSchemeCard />
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: '2rem' }}>
            <QuickActions />
          </div>

          {/* Analytics Charts */}
          <div style={{ marginBottom: '2rem' }}>
            <AnalyticsCharts />
          </div>

          {/* Recent Activity */}
          <div style={{ marginBottom: '2rem' }}>
            <RecentActivity />
          </div>

        </div>

        {/* ═══════════════════════════════════════
            RIGHT — AI Recommendations Panel
            Hidden on mobile (<lg), sticky on desktop
        ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            width: 320,
            flexShrink: 0,
            position: 'sticky',
            top: '5rem',
            maxHeight: 'calc(100vh - 6rem)',
            overflowY: 'auto',
          }}
          className="hidden lg:block"
        >
          <AIRecommendationsPanel />
        </motion.div>

      </div>
    </PageTransition>
  )
}
