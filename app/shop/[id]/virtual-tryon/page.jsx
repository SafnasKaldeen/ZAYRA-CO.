// app/shop/[id]/virtual-tryon/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Loader2, Image as ImageIcon,
  CheckCircle2, AlertTriangle, Sparkles, X,
} from 'lucide-react';
import { shopProducts } from '../../../../lib/products';
import { useVirtualTryOn } from '../../../../hooks/useVirtualTryon'

// ─── Constants ───────────────────────────────────────────────────────────────
const processingSteps = [
  { label: 'Checking credits',          time: '1s'     },
  { label: 'Processing images',         time: '8–10s'  },
  { label: 'Connecting to AI engine',   time: '7–8s'   },
  { label: 'Analysing garment details', time: '14–17s' },
  { label: 'Detecting body pose',       time: '18–20s' },
  { label: 'Generating virtual try-on', time: '25–35s' },
  { label: 'Processing final image',    time: '5–10s'  },
  { label: 'Finalising result',         time: '2–3s'   },
];

// Real step timings matching the actual API processing time
const STEP_TIMINGS = [1000, 10000, 8000, 16000, 20000, 30000, 7000, 2500];

const tips = [
  { n: '01', title: 'Clear Photos',     body: 'Well-lit images with the person facing forward work best.' },
  { n: '02', title: 'Plain Background', body: 'Garments on plain backgrounds produce sharper overlays.'   },
  { n: '03', title: 'High Resolution',  body: 'Higher-quality images yield more realistic results.'        },
  { n: '04', title: 'Privacy First',    body: 'Your images are processed securely and never stored.'      },
];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Upload Zone ─────────────────────────────────────────────────────────────
function UploadZone({ label, sublabel, preview, fileName, icon: Icon, onUpload, onRemove, locked }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-sans text-[10px] uppercase tracking-widest" style={{ color: '#0F3D2E' }}>
          {label}
        </p>
        {sublabel && (
          <span
            className="font-sans text-[9px] uppercase tracking-widest px-2 py-1"
            style={{ backgroundColor: 'rgba(198,167,94,0.12)', color: '#C6A75E' }}
          >
            {sublabel}
          </span>
        )}
      </div>

      {!preview ? (
        <label className="cursor-pointer block">
          <input type="file" accept="image/*" onChange={onUpload} className="sr-only" />
          <div
            className="flex flex-col items-center justify-center gap-4 py-16 transition-all duration-300"
            style={{
              border: '1px dashed rgba(198,167,94,0.4)',
              backgroundColor: 'rgba(246,241,232,0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(198,167,94,0.85)';
              e.currentTarget.style.backgroundColor = '#F6F1E8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(198,167,94,0.4)';
              e.currentTarget.style.backgroundColor = 'rgba(246,241,232,0.5)';
            }}
          >
            <Icon size={26} strokeWidth={1.2} style={{ color: 'rgba(198,167,94,0.6)' }} />
            <div className="text-center">
              <p className="font-sans text-[11px] uppercase tracking-widest mb-1" style={{ color: '#0F3D2E' }}>
                Click to Upload
              </p>
              <p className="font-sans text-[10px]" style={{ color: 'rgba(42,42,42,0.4)' }}>
                PNG · JPG · up to 10 MB
              </p>
            </div>
          </div>
        </label>
      ) : (
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', backgroundColor: '#e8e2d8' }}>
          <Image src={preview} alt={label} fill className="object-cover" sizes="40vw" />

          {!locked && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-3 right-3 flex items-center justify-center"
              style={{
                width: 30, height: 30,
                backgroundColor: 'rgba(246,241,232,0.95)',
                border: '1px solid rgba(198,167,94,0.35)',
              }}
            >
              <X size={12} strokeWidth={1.5} style={{ color: '#0F3D2E' }} />
            </button>
          )}

          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-2"
            style={{ backgroundColor: 'rgba(15,61,46,0.88)' }}
          >
            <CheckCircle2 size={12} strokeWidth={1.5} style={{ color: '#C6A75E' }} />
            <p className="font-sans text-[10px] uppercase tracking-widest truncate" style={{ color: '#F6F1E8' }}>
              {fileName || 'Image selected'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VirtualTryOnPage() {
  const { id } = useParams();
  const product = shopProducts.find(p => p.id === id);
  if (!product) notFound();

  // ── Real hook ───────────────────────────────────────────────────────────────
  const { result, loading, error, generateTryOn, reset } = useVirtualTryOn();

  // ── State ───────────────────────────────────────────────────────────────────
  const [personFile,     setPersonFile]     = useState(null);
  const [personPreview,  setPersonPreview]  = useState(null);
  const [garmentFile,    setGarmentFile]    = useState(null);
  const [garmentPreview, setGarmentPreview] = useState(product.image);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTime,      setElapsedTime]       = useState(0);

  // Pre-load product image as File
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(product.image);
        const blob = await res.blob();
        setGarmentFile(new File([blob], 'garment.jpg', { type: 'image/jpeg' }));
      } catch { /* non-critical */ }
    })();
  }, [product.image]);

  // Elapsed timer
  useEffect(() => {
    let t;
    if (loading) t = setInterval(() => setElapsedTime(s => s + 1), 1000);
    else setElapsedTime(0);
    return () => clearInterval(t);
  }, [loading]);

  // Step progress tied to real timings
  useEffect(() => {
    if (!loading) { setCurrentStepIndex(0); return; }
    let total = 0;
    const timers = STEP_TIMINGS.map((dur, i) => {
      const t = setTimeout(() => setCurrentStepIndex(i + 1), total);
      total += dur;
      return t;
    });
    return () => timers.forEach(clearTimeout);
  }, [loading]);

  const progress = loading
    ? Math.round((currentStepIndex / processingSteps.length) * 100)
    : 0;

  const formatTime = s => {
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  };

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handlePersonUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPersonFile(file);
    setPersonPreview(URL.createObjectURL(file));
  };

  const handleGarmentUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGarmentFile(file);
    setGarmentPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!garmentFile || !personFile) return;
    await generateTryOn(garmentFile, personFile);
  };

  const resetAll = () => {
    setPersonFile(null);
    setPersonPreview(null);
    setGarmentPreview(product.image);
    reset();
    ;(async () => {
      try {
        const res  = await fetch(product.image);
        const blob = await res.blob();
        setGarmentFile(new File([blob], 'garment.jpg', { type: 'image/jpeg' }));
      } catch { /* non-critical */ }
    })();
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href     = result.imageBase64;
    a.download = 'zayra-co-tryon.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────── */}
      <div className="pt-24 pb-4 px-6 md:px-12" style={{ backgroundColor: '#F6F1E8' }}>
        <p className="font-sans text-[10px] uppercase tracking-widest" style={{ color: 'rgba(198,167,94,0.7)' }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <span className="mx-2">·</span>
          <Link href="/shop" className="hover:opacity-60 transition-opacity">Shop</Link>
          <span className="mx-2">·</span>
          <Link href={`/shop/${product.id}`} className="hover:opacity-60 transition-opacity">{product.name}</Link>
          <span className="mx-2">·</span>
          <span style={{ color: '#0F3D2E' }}>Virtual Try-On</span>
        </p>
      </div>

      {/* ── Hero ───────────────────────────────────── */}
      <section className="pt-10 pb-16 px-6 md:px-12 text-center" style={{ backgroundColor: '#0F3D2E' }}>
        <motion.p {...fadeUp(0.05)} className="font-sans text-[10px] uppercase tracking-widest mb-4" style={{ color: 'rgba(198,167,94,0.7)' }}>
          AI-Powered Experience
        </motion.p>
        <motion.h1
          {...fadeUp(0.15)}
          className="font-serif font-light"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', color: '#F6F1E8', letterSpacing: '0.06em', lineHeight: 1.1 }}
        >
          Virtual Try-On
        </motion.h1>
        <motion.div
          {...fadeUp(0.25)}
          className="mx-auto mt-5 mb-5"
          style={{ width: '3rem', height: '1px', backgroundColor: 'rgba(198,167,94,0.35)' }}
        />
        <motion.p
          {...fadeUp(0.3)}
          className="font-sans font-light text-sm tracking-wide max-w-md mx-auto"
          style={{ color: 'rgba(246,241,232,0.5)' }}
        >
          See how the <span style={{ color: '#C6A75E' }}>{product.name}</span> looks on you before you order.
        </motion.p>
      </section>

      {/* ── Main ───────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-5xl mx-auto">

          <form onSubmit={handleSubmit}>
            {/* ── Upload panels ──────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <UploadZone
                label="Garment"
                sublabel="Pre-filled"
                preview={garmentPreview}
                fileName={garmentFile?.name ?? product.name}
                icon={Sparkles}
                onUpload={handleGarmentUpload}
                onRemove={() => { setGarmentFile(null); setGarmentPreview(null); }}
                locked={true}   // ← was false
              />
              <UploadZone
                label="Your Photo"
                preview={personPreview}
                fileName={personFile?.name}
                icon={ImageIcon}
                onUpload={handlePersonUpload}
                onRemove={() => { setPersonFile(null); setPersonPreview(null); }}
                locked={false}
              />
            </div>

            {/* Divider */}
            <div className="mb-10" style={{ height: '1px', backgroundColor: 'rgba(198,167,94,0.2)' }} />

            {/* ── CTAs ───────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="submit"
                disabled={loading || !garmentFile || !personFile}
                className="font-sans text-[11px] uppercase tracking-widest px-12 py-4 flex items-center gap-3 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#0F3D2E', color: '#F6F1E8', border: '1px solid #0F3D2E' }}
                onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.backgroundColor = '#C6A75E'; e.currentTarget.style.borderColor = '#C6A75E'; } }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0F3D2E'; e.currentTarget.style.borderColor = '#0F3D2E'; }}
              >
                {loading
                  ? <><Loader2 size={14} className="animate-spin" /> Processing…</>
                  : <><Sparkles size={14} /> Generate Try-On</>
                }
              </button>

              {(personFile || result) && !loading && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="font-sans text-[11px] uppercase tracking-widest px-12 py-4 transition-all duration-300"
                  style={{ backgroundColor: 'transparent', color: '#0F3D2E', border: '1px solid rgba(15,61,46,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C6A75E'; e.currentTarget.style.color = '#C6A75E'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,61,46,0.3)'; e.currentTarget.style.color = '#0F3D2E'; }}
                >
                  Start Over
                </button>
              )}
            </div>
          </form>

          {/* ── Error ──────────────────────────────── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-10 flex items-start gap-4 p-6"
                style={{ backgroundColor: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.2)' }}
              >
                <AlertTriangle size={14} strokeWidth={1.5} style={{ color: '#c0392b', marginTop: 2 }} />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest mb-1" style={{ color: '#c0392b' }}>Error</p>
                  <p className="font-sans text-sm font-light" style={{ color: 'rgba(42,42,42,0.8)' }}>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Low quality warning ────────────────── */}
          <AnimatePresence>
            {result?.isLowQuality && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-10 flex items-start gap-4 p-6"
                style={{ backgroundColor: 'rgba(198,167,94,0.06)', border: '1px solid rgba(198,167,94,0.3)' }}
              >
                <AlertTriangle size={14} strokeWidth={1.5} style={{ color: '#C6A75E', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest mb-2" style={{ color: '#C6A75E' }}>
                    Backup Model Used
                  </p>
                  <p className="font-sans text-sm font-light leading-relaxed" style={{ color: 'rgba(42,42,42,0.7)' }}>
                    Our premium AI model is temporarily unavailable. For best results, use a clear frontal photo with good lighting and a plain background. Try again in a few minutes for premium quality.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Loading / progress ─────────────────── */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-16 max-w-xl mx-auto"
              >
                {/* Timer */}
                <div className="text-center mb-8">
                  <p className="font-sans text-[10px] uppercase tracking-widest mb-2" style={{ color: 'rgba(198,167,94,0.7)' }}>
                    Generating your look
                  </p>
                  <p className="font-serif font-light" style={{ fontSize: '2.4rem', color: '#0F3D2E', letterSpacing: '0.06em' }}>
                    {formatTime(elapsedTime)}
                  </p>
                  <p className="font-sans text-[10px] mt-1" style={{ color: 'rgba(42,42,42,0.4)' }}>
                    Estimated 2–3 minutes total
                  </p>
                </div>

                {/* Gold progress bar */}
                <div className="mb-10 overflow-hidden" style={{ height: '1px', backgroundColor: 'rgba(198,167,94,0.15)' }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ height: '100%', backgroundColor: '#C6A75E' }}
                  />
                </div>

                {/* Steps list */}
                <div className="space-y-px">
                  {processingSteps.map((step, i) => {
                    const done   = i < currentStepIndex;
                    const active = i === currentStepIndex;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-4 py-3 transition-all duration-500"
                        style={{
                          backgroundColor: done ? 'rgba(15,61,46,0.04)' : active ? 'rgba(198,167,94,0.07)' : 'transparent',
                          opacity: i > currentStepIndex ? 0.3 : 1,
                        }}
                      >
                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                          {done
                            ? <CheckCircle2 size={13} strokeWidth={1.5} style={{ color: '#0F3D2E' }} />
                            : active
                            ? <Loader2 size={13} strokeWidth={1.5} className="animate-spin" style={{ color: '#C6A75E' }} />
                            : <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'rgba(42,42,42,0.2)' }} />
                          }
                        </div>
                        <p className="flex-1 font-sans text-[11px] uppercase tracking-widest" style={{ color: done || active ? '#0F3D2E' : 'rgba(42,42,42,0.4)' }}>
                          {step.label}
                        </p>
                        <p className="font-sans text-[10px]" style={{ color: 'rgba(42,42,42,0.3)' }}>{step.time}</p>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-10 text-center font-sans text-[10px] uppercase tracking-widest" style={{ color: 'rgba(42,42,42,0.35)' }}>
                  Your images are processed securely and never stored
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Result ─────────────────────────────── */}
          <AnimatePresence>
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-16"
              >
                {/* Header */}
                <div className="text-center mb-10">
                  <p className="font-sans text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(198,167,94,0.7)' }}>
                    Your Result
                  </p>
                  <h2 className="font-serif font-light" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0F3D2E', letterSpacing: '0.05em' }}>
                    Here's How It Looks
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <CheckCircle2 size={12} strokeWidth={1.5} style={{ color: '#C6A75E' }} />
                    <p className="font-sans text-[10px] uppercase tracking-widest" style={{ color: '#C6A75E' }}>
                      Generated Successfully
                    </p>
                  </div>
                </div>

                {/* Side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-widest mb-3 text-center" style={{ color: 'rgba(42,42,42,0.45)' }}>
                      Your Photo
                    </p>
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4', backgroundColor: '#e8e2d8' }}>
                      {personPreview && (
                        <Image src={personPreview} alt="Your photo" fill className="object-cover" sizes="30vw" />
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-widest mb-3 text-center" style={{ color: 'rgba(42,42,42,0.45)' }}>
                      With {product.name}
                    </p>
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4', backgroundColor: '#e8e2d8' }}>
                      <Image src={result.imageBase64} alt="Virtual try-on result" fill className="object-cover" sizes="30vw" />
                      <div
                        className="absolute top-0 right-0 w-8 h-8"
                        style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(198,167,94,0.4) 50%)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleDownload}
                    className="font-sans text-[11px] uppercase tracking-widest px-10 py-4 flex items-center gap-3 transition-all duration-300"
                    style={{ backgroundColor: '#0F3D2E', color: '#F6F1E8', border: '1px solid #0F3D2E' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C6A75E'; e.currentTarget.style.borderColor = '#C6A75E'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#0F3D2E'; e.currentTarget.style.borderColor = '#0F3D2E'; }}
                  >
                    <Download size={13} /> Download Result
                  </button>

                  <Link
                    href={`/shop/${product.id}`}
                    className="font-sans text-[11px] uppercase tracking-widest px-10 py-4 flex items-center justify-center gap-3 transition-all duration-300"
                    style={{ backgroundColor: 'transparent', color: '#0F3D2E', border: '1px solid rgba(15,61,46,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C6A75E'; e.currentTarget.style.color = '#C6A75E'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,61,46,0.3)'; e.currentTarget.style.color = '#0F3D2E'; }}
                  >
                    Order This Piece
                  </Link>

                  <button
                    onClick={resetAll}
                    className="font-sans text-[11px] uppercase tracking-widest px-10 py-4 transition-all duration-300"
                    style={{ backgroundColor: 'transparent', color: '#0F3D2E', border: '1px solid rgba(15,61,46,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C6A75E'; e.currentTarget.style.color = '#C6A75E'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,61,46,0.3)'; e.currentTarget.style.color = '#0F3D2E'; }}
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Tips ───────────────────────────────── */}
          {!loading && !result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-20 pt-10"
              style={{ borderTop: '1px solid rgba(198,167,94,0.2)' }}
            >
              <p className="font-sans text-[10px] uppercase tracking-widest text-center mb-10" style={{ color: 'rgba(198,167,94,0.7)' }}>
                Tips for Best Results
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {tips.map(t => (
                  <div key={t.n}>
                    <p className="font-serif font-light mb-3" style={{ fontSize: '1.6rem', color: 'rgba(198,167,94,0.22)', letterSpacing: '0.1em' }}>
                      {t.n}
                    </p>
                    <p className="font-sans text-[11px] uppercase tracking-widest mb-2" style={{ color: '#0F3D2E' }}>
                      {t.title}
                    </p>
                    <p className="font-sans font-light text-xs leading-relaxed" style={{ color: 'rgba(42,42,42,0.55)' }}>
                      {t.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </>
  );
}