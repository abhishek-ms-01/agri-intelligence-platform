import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CloudLightning, Sparkles, RefreshCw, Search, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import { getWeather, analyzeWeather } from '@/api/weatherService'

import PageTransition     from '@/components/common/PageTransition'
import WeatherHero        from '@/components/weather/WeatherHero'
import ForecastTimeline   from '@/components/weather/ForecastTimeline'
import AIWeatherInsight   from '@/components/weather/AIWeatherInsight'

const SECTION_GAP = { display: 'flex', flexDirection: 'column', gap: '2rem' }

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchCity, setSearchCity] = useState('')
  const [locationDenied, setLocationDenied] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState(null)

  const fetchWeatherData = async (params) => {
    setLoading(true)
    try {
      const wData = await getWeather(params);
      
      const formattedWeather = {
        temp: Math.round(wData.temperature),
        condition: wData.currentWeather,
        humidity: wData.humidity,
        windSpeed: wData.wind,
        pressure: wData.pressure,
        visibility: wData.visibility ? (wData.visibility / 1000).toFixed(1) : '10.0',
        sunrise: new Date(wData.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        sunset: new Date(wData.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        location: wData.name || params.city || 'Unknown Location',
        forecast: wData.forecast || []
      };
      
      setWeatherData(formattedWeather);
      
      // Also fetch AI analysis
      try {
        const analysis = await analyzeWeather(wData);
        setAiAnalysis(analysis);
      } catch (aiError) {
        console.error("AI Weather Analysis Error:", aiError);
      }
      
      toast.success('Weather data updated', { icon: '🌤️' })
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || 'API Request Failed';
      toast.error(`Error: ${errorMessage}`, { icon: '❌' })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;
    localStorage.setItem('agri_weather_city', searchCity);
    fetchWeatherData({ city: searchCity });
  }

  const [showLocationPrompt, setShowLocationPrompt] = useState(false)
  const [usingMangalore, setUsingMangalore] = useState(true)

  const loadMangalore = () => {
    setUsingMangalore(true)
    fetchWeatherData({ lat: 12.9141, lon: 74.8560, city: 'Mangalore' })
  }

  const requestLocation = () => {
    if (!navigator.geolocation) {
      loadMangalore();
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationDenied(false);
        setUsingMangalore(false);
        setShowLocationPrompt(false);
        const { latitude, longitude } = position.coords;
        fetchWeatherData({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.warn("Geolocation error:", error);
        toast.error("Location access denied. Using default farm location.", { icon: '⚠️' });
        loadMangalore();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    // On first launch: Load weather automatically for Mangalore
    loadMangalore();
    
    // Check if we should ask for location
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state !== 'denied') {
          setShowLocationPrompt(true);
        }
      });
    } else {
      setShowLocationPrompt(true);
    }
  }, [])

  return (
    <PageTransition>
      {/* ── Page Header ──────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(59,130,246,0.1))',
            border: '1px solid rgba(59,130,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CloudLightning size={20} color="#60a5fa" />
          </div>
          <div>
            <h1 className="page-title text-gradient-green" style={{ marginBottom: 0 }}>
              Weather Intelligence
            </h1>
            <p className="page-subtitle" style={{ marginTop: 2 }}>
              AI-powered weather decisions for smarter farming
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
          <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>● Live Data</span>
          <span className="badge badge-info"    style={{ fontSize: '0.6875rem' }}><Sparkles size={10} /> AI Analysis</span>
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            className="btn btn-secondary btn-sm"
            title="Refresh weather data"
            style={{ padding: '0.375rem 0.75rem' }}
            onClick={requestLocation}
            disabled={loading}
          >
            <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </motion.button>
        </div>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      {/* ── Location Prompt Banner ─── */}
      {showLocationPrompt && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ marginBottom: '2rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(5,150,105,0.05) 100%)', border: '1px solid rgba(59,130,246,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={24} color="#60a5fa" />
            <div>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>Location Options</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--color-muted)' }}>Use your current location or continue with Mangalore Farm?</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowLocationPrompt(false)}>
              Continue with Mangalore
            </button>
            <button className="btn btn-primary btn-sm" onClick={requestLocation}>
              Use Current Location
            </button>
          </div>
        </motion.div>
      )}

      {loading && !weatherData && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <RefreshCw size={32} color="#60a5fa" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      )}

      {!loading && weatherData && (
        <div style={SECTION_GAP}>


          {/* ── S1: Current Weather Hero ──────────────── */}
          <WeatherHero weather={weatherData} />

          {/* ── S2 + AI Insight: side-by-side on desktop */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="weather-two-col">
            <ForecastTimeline forecast={weatherData.forecast} />
            <AIWeatherInsight analysis={aiAnalysis} />
          </div>

        </div>
      )}

      {/* ── Responsive overrides ─────────────────────── */}
      <style>{`
        @media (max-width: 960px) {
          .weather-two-col { grid-template-columns: 1fr !important; }
          .weather-two-col-right { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  )
}
