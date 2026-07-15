import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, Camera, ImagePlus, X, ScanLine, RotateCcw,
  FileImage, CheckCircle2, Leaf, Sparkles,
} from 'lucide-react'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
const MAX_MB = 10

const DEMO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tomato_leaf_with_blight.jpg/320px-Tomato_leaf_with_blight.jpg'

export default function UploadPanel({ onScan, onReset, isAnalyzing, hasResult }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError]   = useState('')
  const [isDemo, setIsDemo] = useState(false)

  const handleFile = useCallback((file) => {
    if (!file) return
    if (!ACCEPTED.includes(file.type)) {
      setError('Unsupported format. Use JPG, PNG, WebP, or HEIC.')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_MB}MB allowed.`)
      return
    }
    setError('')
    setFileName(file.name)
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB')
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreview(url)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = () => setIsDragging(false)

  const handleReset = () => {
    setPreview(null)
    setSelectedFile(null)
    setFileName('')
    setFileSize('')
    setError('')
    setIsDemo(false)
    if (inputRef.current) inputRef.current.value = ''
    onReset()
  }

  const handleDemo = useCallback(() => {
    setIsDemo(true)
    setPreview(DEMO_IMAGE)
    setFileName('tomato_leaf_sample.jpg')
    setFileSize('1.24 MB')
    setError('')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {/* ── Upload Zone ───────────────────────────────────── */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', gap: '0.625rem',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(5,150,105,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FileImage size={16} color="var(--color-primary-light)" />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.9375rem', fontFamily: 'Syne, sans-serif' }}>
            Upload Crop Image
          </span>
          <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.6875rem' }}>
            AI Ready
          </span>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <AnimatePresence mode="wait">
            {!preview ? (
              /* ── Drop Zone ── */
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => inputRef.current?.click()}
                style={{
                  border: `2px dashed ${isDragging ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '3rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  background: isDragging
                    ? 'rgba(5,150,105,0.05)'
                    : 'rgba(255,255,255,0.015)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                }}
              >
                {/* Floating icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(5,150,105,0.2) 0%, rgba(5,150,105,0.05) 70%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(5,150,105,0.2)',
                  }}
                >
                  <ImagePlus size={28} color="var(--color-primary-light)" />
                </motion.div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'Syne, sans-serif', marginBottom: 4 }}>
                    {isDragging ? 'Drop to upload' : 'Drag & Drop your crop image'}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                    or click to browse from device
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                  {['JPG', 'PNG', 'WebP', 'HEIC'].map(fmt => (
                    <span key={fmt} style={{
                      fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.6rem',
                      borderRadius: 99, background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--color-border)', color: 'var(--color-muted)',
                    }}>{fmt}</span>
                  ))}
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.6rem',
                    borderRadius: 99, background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--color-border)', color: 'var(--color-muted)',
                  }}>Max {MAX_MB}MB</span>
                </div>
              </motion.div>
            ) : (
              /* ── Preview ── */
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
              >
                <img
                  src={preview}
                  alt="Crop preview"
                  style={{
                    width: '100%', height: 260,
                    objectFit: 'cover', display: 'block',
                    borderRadius: 'var(--radius-lg)',
                  }}
                />
                {/* Overlay info */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(to top, rgba(3,7,18,0.9) 0%, transparent 100%)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <CheckCircle2 size={14} color="#22c55e" />
                  <span style={{ fontSize: '0.8125rem', color: '#f8fafc', fontWeight: 500 }}>{fileName}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginLeft: 'auto' }}>{fileSize}</span>
                </div>
                {/* Remove button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleReset() }}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(3,7,18,0.8)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#f8fafc',
                  }}
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-danger)' }}
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(',')}
          style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files[0])}
        />
      </div>

      {/* ── Action Buttons ────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          className="btn btn-secondary"
          style={{ flex: 1 }}
          onClick={() => inputRef.current?.click()}
          disabled={isAnalyzing}
        >
          <Upload size={15} /> Upload
        </button>
        <button
          className="btn btn-secondary"
          style={{ flex: 1, opacity: 0.6, cursor: 'not-allowed' }}
          title="Camera capture (coming soon)"
          disabled
        >
          <Camera size={15} /> Camera
        </button>
      </div>

      {/* ── Demo Button ──────────────────────────────────── */}
      {!preview && !isAnalyzing && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-secondary"
          id="demo-scan-btn"
          style={{
            width: '100%',
            border: '1px dashed rgba(245,158,11,0.4)',
            color: 'var(--color-accent)',
            background: 'rgba(245,158,11,0.05)',
            fontSize: '0.875rem',
          }}
          onClick={handleDemo}
        >
          <Sparkles size={15} /> Try Demo Scan
        </motion.button>
      )}

      {/* ── Scan / Reset ─────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <motion.button
          whileHover={{ scale: preview && !isAnalyzing ? 1.02 : 1 }}
          whileTap={{ scale: preview && !isAnalyzing ? 0.97 : 1 }}
          className="btn btn-primary btn-lg"
          style={{
            flex: 1,
            opacity: preview && !isAnalyzing ? 1 : 0.4,
            cursor: preview && !isAnalyzing ? 'pointer' : 'not-allowed',
            fontSize: '0.9375rem',
          }}
          disabled={!preview || isAnalyzing}
          onClick={() => preview && onScan(selectedFile)}
        >
          {isAnalyzing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              />
              Analyzing…
            </>
          ) : (
            <>
              <ScanLine size={16} />
              {hasResult ? 'Re-Scan' : 'Start AI Scan'}
            </>
          )}
        </motion.button>

        {(preview || hasResult) && !isAnalyzing && (
          <motion.button
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            className="btn btn-secondary"
            style={{ padding: '0.875rem 1rem' }}
            onClick={handleReset}
          >
            <RotateCcw size={15} />
          </motion.button>
        )}
      </div>

      {/* ── Tips Card ─────────────────────────────────────── */}
      <div className="glass" style={{
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
          <Leaf size={13} color="var(--color-primary-light)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-light)' }}>
            For Best Results
          </span>
        </div>
        {[
          'Use clear, well-lit images of affected leaves',
          'Capture close-ups of visible symptoms',
          'Avoid blurry or heavily shadowed images',
          'Include stem or root if root disease suspected',
        ].map((tip, i) => (
          <p key={i} style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: 1.6, paddingLeft: '1.25rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>·</span>
            {tip}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
