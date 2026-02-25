'use client';
import { motion } from 'framer-motion';

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C6A75E" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" />
        <path d="M16 4 L16 28 M4 10 L28 22 M28 10 L4 22" />
      </svg>
    ),
    title: 'Crafted with Intention',
    body: 'Every seam, every silhouette is considered. We take time where others rush, choosing quality over convenience.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C6A75E" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 4 L16 8 M16 24 L16 28 M4 16 L8 16 M24 16 L28 16" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    title: 'Timeless Over Trendy',
    body: 'We design garments that outlast seasons. Our pieces are investments in lasting elegance, never fast fashion.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C6A75E" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6 C10 6 6 10 6 16 C6 22 10 26 16 26 C22 26 26 22 26 16" />
        <path d="M20 6 L26 6 L26 12" />
        <path d="M26 6 L18 14" />
      </svg>
    ),
    title: 'Made for the Modern Muslim Woman',
    body: 'Our muse is confident, purposeful, and deeply stylish. We celebrate her identity through clothing that honours her values.',
  },
];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 22 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-40px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutPage() {
  return (
    <>
      {/* Split hero */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* L: Emerald monogram */}
        <div
          className="flex items-center justify-center py-20 md:py-0"
          style={{ backgroundColor: '#0F3D2E' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div
              className="font-serif font-light select-none"
              style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', color: 'rgba(198,167,94,0.25)', letterSpacing: '0.1em', lineHeight: 1 }}
            >
              ZC
            </div>
            <div className="h-px w-16 mx-auto my-6" style={{ backgroundColor: 'rgba(198,167,94,0.4)' }} />
            <p className="font-sans text-xs uppercase tracking-widest" style={{ color: 'rgba(198,167,94,0.6)' }}>
              Est. Sri Lanka
            </p>
          </motion.div>
        </div>

        {/* R: Brand story */}
        <div
          className="flex items-center justify-center px-8 md:px-16 py-20 md:py-0"
          style={{ backgroundColor: '#F6F1E8' }}
        >
          <div className="max-w-md">
            <motion.p
              {...fadeUp(0.2)}
              className="font-sans text-xs uppercase tracking-widest mb-6"
              style={{ color: '#C6A75E' }}
            >
              Our Story
            </motion.p>
            <motion.h1
              {...fadeUp(0.3)}
              className="font-serif font-light mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F3D2E' }}
            >
              The House of ZAYRA
            </motion.h1>
            <motion.p {...fadeUp(0.4)} className="font-sans font-light text-sm leading-relaxed tracking-wide mb-4" style={{ color: '#2A2A2A' }}>
              ZAYRA CO. began as a quiet question: why should modest fashion mean compromising on craft? Founded in the heart of Sri Lanka, we set out to create a fashion house that treated modest dressing as what it truly is — an elevated, intentional art form.
            </motion.p>
            <motion.p {...fadeUp(0.5)} className="font-sans font-light text-sm leading-relaxed tracking-wide mb-4" style={{ color: '#2A2A2A' }}>
              Every collection is built around the idea of slow fashion — considered fabrics, enduring silhouettes, and meticulous construction. We believe the women who wear ZAYRA CO. deserve nothing less than luxury in every layer.
            </motion.p>
            <motion.p {...fadeUp(0.6)} className="font-sans font-light text-sm leading-relaxed tracking-wide" style={{ color: '#2A2A2A' }}>
              Today, we continue to grow our house with the same founding principle: quality, modesty, and timeless beauty — rooted in Sri Lanka, made for the world.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: '#C6A75E' }}>Our Philosophy</p>
            <h2 className="font-serif font-light" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0F3D2E' }}>
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp(i * 0.12)} className="text-center flex flex-col items-center">
                <div className="mb-6">{v.icon}</div>
                <h3 className="font-serif font-light text-xl mb-3 tracking-wide" style={{ color: '#0F3D2E' }}>
                  {v.title}
                </h3>
                <p className="font-sans font-light text-sm leading-relaxed tracking-wide" style={{ color: '#2A2A2A' }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section
        className="py-20 md:py-28 px-6 text-center"
        style={{ backgroundColor: '#0F3D2E' }}
      >
        <motion.blockquote
          {...fadeUp(0)}
          className="font-serif font-light italic max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', color: '#F6F1E8', lineHeight: 1.5 }}
        >
          "We do not follow trends. We set the standard for how modest fashion should feel."
        </motion.blockquote>
        <motion.div {...fadeUp(0.2)} className="mx-auto mt-6 h-px w-16" style={{ backgroundColor: 'rgba(198,167,94,0.5)' }} />
        <motion.p {...fadeUp(0.3)} className="font-sans text-xs uppercase tracking-widest mt-4" style={{ color: 'rgba(198,167,94,0.6)' }}>
          — ZAYRA CO.
        </motion.p>
      </section>
    </>
  );
}
