import LandingNavbar    from '@/components/landing/LandingNavbar'
import HeroSection      from '@/components/landing/HeroSection'
import MetricsSection   from '@/components/landing/MetricsSection'
import FeaturesSection  from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import WhyUsSection     from '@/components/landing/WhyUsSection'
import FutureSection    from '@/components/landing/FutureSection'
import CtaSection       from '@/components/landing/CtaSection'
import Footer           from '@/components/landing/Footer'
import FloatingAIBot    from '@/components/common/FloatingAIBot'

/**
 * LandingPage — The public-facing homepage of Krishi AIligence Platform.
 * Sections: Navbar → Hero → Metrics → Features → How It Works → Why Us → Future → CTA → Footer
 */
export default function LandingPage() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <LandingNavbar />
      <HeroSection />
      <MetricsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyUsSection />
      <FutureSection />
      <CtaSection />
      <Footer />
      <FloatingAIBot />
    </div>
  )
}
