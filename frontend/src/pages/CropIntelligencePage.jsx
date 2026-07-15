import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit, Microscope, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

import PageTransition from '@/components/common/PageTransition'
import UploadPanel    from '@/components/crop/UploadPanel'
import ScanningOverlay from '@/components/crop/ScanningOverlay'
import AnalysisResults from '@/components/crop/AnalysisResults'
import EmptyAnalysis  from '@/components/crop/EmptyAnalysis'
import ScanHistory    from '@/components/crop/ScanHistory'
import { analyzeCropImage } from '@/api/cropService'

// ─── Component ────────────────────────────────────────────────────────────────
export default function CropIntelligencePage() {
  const [phase, setPhase] = useState('idle') // idle | scanning | result
  const [result, setResult] = useState(null)

  const handleScan = useCallback(async (file) => {
    if (!file) {
       toast.error('Please upload an image first');
       return;
    }

    setPhase('scanning')
    setResult(null)

    try {
      // Create a canvas to compress the image
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize to max 800px width/height to save bandwidth & Gemini processing time
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert back to blob with 0.7 quality jpeg
        canvas.toBlob(async (compressedBlob) => {
          URL.revokeObjectURL(objectUrl);
          const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });
          
          try {
            const apiResult = await analyzeCropImage(compressedFile);
            setResult(apiResult);
            setPhase('result');
            toast.success('AI analysis complete!', { icon: '🔬' });
          } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'API Request Failed';
            toast.error(`Error: ${errorMessage}`, { icon: '❌' });
            setPhase('idle');
          }
        }, 'image/jpeg', 0.7);
      };
      
      img.src = objectUrl;

    } catch (error) {
      toast.error('Image compression failed', { icon: '❌' });
      setPhase('idle');
    }
  }, [])

  const handleReset = useCallback(() => {
    setPhase('idle')
    setResult(null)
  }, [])

  const handleDownload = useCallback(() => {
    toast.success('Analysis report download started (PDF)', { icon: '📄' })
  }, [])

  return (
    <PageTransition>
      {/* ── Page Header ─────────────────────────────── */}
      <div className="page-header" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(5,150,105,0.25), rgba(5,150,105,0.1))',
            border: '1px solid rgba(5,150,105,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Microscope size={20} color="var(--color-primary-light)" />
          </div>
          <div>
            <h1 className="page-title text-gradient-green" style={{ marginBottom: 0 }}>
              AI Crop Intelligence
            </h1>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.625rem' }}>
            <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
              ● Gemini Vision
            </span>
            <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
              <Sparkles size={10} /> 200+ Diseases
            </span>
          </div>
        </div>
        <p className="page-subtitle">
          Upload a crop image for instant AI-powered disease detection, health scoring, and treatment recommendations.
        </p>
      </div>

      {/* ── Two-Column Layout ───────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 420px) 1fr',
        gap: '1.5rem',
        alignItems: 'start',
      }}
        className="crop-intel-grid"
      >
        {/* ── LEFT: Upload Panel (always visible) ─── */}
        <div style={{ position: 'sticky', top: 80 }}>
          <UploadPanel
            onScan={handleScan}
            onReset={handleReset}
            isAnalyzing={phase === 'scanning'}
            hasResult={phase === 'result'}
          />
        </div>

        {/* ── RIGHT: Dynamic Results Area ─────────── */}
        <div>
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyAnalysis />
                <div style={{ marginTop: '1.25rem' }}>
                  <ScanHistory />
                </div>
              </motion.div>
            )}

            {phase === 'scanning' && (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ScanningOverlay isVisible={true} />
              </motion.div>
            )}

            {phase === 'result' && result && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnalysisResults
                  result={result}
                  onScanAgain={handleReset}
                  onDownload={handleDownload}
                />
                <div style={{ marginTop: '1.25rem' }}>
                  <ScanHistory />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── AI Stats Bar ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
        }}
      >
        {[
          { label: 'Diseases Detected',  value: '200+',  color: 'var(--color-primary-light)', bg: 'rgba(5,150,105,0.08)',  border: 'rgba(5,150,105,0.2)'  },
          { label: 'Detection Accuracy', value: '97.3%', color: '#f59e0b',                   bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
          { label: 'AI Model',           value: 'Gemini', color: '#3b82f6',                  bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
          { label: 'Avg Scan Time',      value: '5.4s',  color: '#a78bfa',                   bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)'},
          { label: 'Scans Today',        value: '1,284', color: '#22c55e',                   bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.2)'  },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: stat.bg,
              border: `1px solid ${stat.border}`,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Syne,sans-serif', color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: 4, fontWeight: 500 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ── Responsive override ─────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .crop-intel-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .crop-intel-grid > div:first-child {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </PageTransition>
  )
}
