'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SectionDivider from '../components/SectionDivider';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HomePage() {
  const newArrivals = products.slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* ── The House ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <blockquote
              className="font-serif font-light leading-snug"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0F3D2E' }}
            >
              "Dressing with intention is an act of self-respect."
            </blockquote>
          </motion.div>
          <motion.div {...fadeUp(0.15)}>
            <p className="font-sans font-light text-sm leading-relaxed tracking-wide" style={{ color: '#2A2A2A' }}>
              ZAYRA CO. was born from a simple belief — that modest fashion should never compromise on refinement. Rooted in Sri Lanka, each piece is thoughtfully constructed for the woman who moves through the world with quiet confidence.
            </p>
            <p className="font-sans font-light text-sm leading-relaxed tracking-wide mt-4" style={{ color: '#2A2A2A' }}>
              We create garments that transcend seasons, offering timeless silhouettes in considered fabrics. Every layer is intentional.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ── New Arrivals ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-12">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: '#C6A75E' }}>
                New Arrivals
              </p>
              <h2 className="font-serif font-light" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#0F3D2E' }}>
                The Latest Edit
              </h2>
            </div>
            <Link
              href="/collections"
              className="hidden md:inline font-sans text-xs uppercase tracking-widest pb-0.5 transition-colors duration-200"
              style={{ color: '#2A2A2A', borderBottom: '1px solid rgba(198,167,94,0.5)' }}
            >
              View All
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map((p, i) => (
              <motion.div key={p.id} {...fadeUp(i * 0.1)}>
                <ProductCard {...p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── The Lookbook ──────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-36 px-6 text-center"
        style={{ backgroundColor: '#0F3D2E' }}
      >
        <motion.p
          {...fadeUp(0)}
          className="font-sans text-xs uppercase tracking-widest mb-6"
          style={{ color: 'rgba(198,167,94,0.7)' }}
        >
          SS 2025
        </motion.p>
        <motion.h2
          {...fadeUp(0.12)}
          className="font-serif font-light italic leading-snug mb-10"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: '#F6F1E8' }}
        >
          The Art of Quiet Luxury
        </motion.h2>
        <motion.div {...fadeUp(0.25)}>
          <Link
            href="/collections"
            className="inline-block font-sans text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300"
            style={{ color: '#F6F1E8', border: '1px solid rgba(198,167,94,0.6)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#C6A75E';
              e.currentTarget.style.color = '#C6A75E';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(198,167,94,0.6)';
              e.currentTarget.style.color = '#F6F1E8';
            }}
          >
            View Lookbook
          </Link>
        </motion.div>
      </section>
    </>
  );
}
