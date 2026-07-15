import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import AppLayout from '@/components/layout/AppLayout'
import PageLoader from '@/components/common/PageLoader'

// ─── Lazy Routes ─────────────────────────────────────────────────────────────
const LandingPage        = lazy(() => import('@/pages/LandingPage'))
const DashboardPage      = lazy(() => import('@/pages/DashboardPage'))
const CropIntelligencePage = lazy(() => import('@/pages/CropIntelligencePage'))
const WeatherPage        = lazy(() => import('@/pages/WeatherPage'))
const YieldPage          = lazy(() => import('@/pages/YieldPage'))
const AdvisorPage        = lazy(() => import('@/pages/AdvisorPage'))
const SchemesPage        = lazy(() => import('@/pages/SchemesPage'))

// ─── Router Config ────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    // Public route — landing page (no sidebar)
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    // App shell — all platform pages share the layout
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'crop-intelligence',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CropIntelligencePage />
          </Suspense>
        ),
      },
      {
        path: 'weather',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WeatherPage />
          </Suspense>
        ),
      },
      {
        path: 'yield',
        element: (
          <Suspense fallback={<PageLoader />}>
            <YieldPage />
          </Suspense>
        ),
      },
      {
        path: 'advisor',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdvisorPage />
          </Suspense>
        ),
      },
      {
        path: 'schemes',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SchemesPage />
          </Suspense>
        ),
      },
    ],
  },
])

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111827',
            color: '#f8fafc',
            border: '1px solid #1f2d3d',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          },
          success: {
            iconTheme: { primary: '#059669', secondary: '#f8fafc' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#f8fafc' },
          },
        }}
      />
    </>
  )
}
