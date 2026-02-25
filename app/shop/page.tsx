// app/shop/page.jsx
'use client';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ShopPage() {
  return (
    <>
      {/* ── Page header ─────────────────────────────── */}
      <section
        className="pt-36 pb-20 px-6 md:px-10 text-center"
        style={{ backgroundColor: '#0F3D2E' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-[10px] uppercase tracking-widest mb-5"
          style={{ color: 'rgba(198,167,94,0.7)' }}
        >
          The Edit
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            color: '#F6F1E8',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
          }}
        >
          Luxury in Every Layer
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 mb-6"
          style={{ width: '3rem', height: '1px', backgroundColor: 'rgba(198,167,94,0.4)' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-sans font-light text-sm tracking-widest"
          style={{ color: 'rgba(246,241,232,0.5)' }}
        >
          Discover the current edit — abayas, dresses &amp; co-ords.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-sans text-[10px] uppercase tracking-widest mt-8"
          style={{ color: 'rgba(198,167,94,0.45)' }}
        >
          {products.length} Pieces
        </motion.p>
      </section>

      {/* ── Product grid ────────────────────────────── */}
      <section
        className="py-20 md:py-28 px-6 md:px-12"
        style={{ backgroundColor: '#F6F1E8' }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Uniform 3-col grid — all same size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {products.map((p, i) => (
              <motion.div key={p.id} {...fadeUp(0.05 + i * 0.07)}>
                <ProductCard {...p} tall />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────── */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: '#F6F1E8' }}
      >
        <motion.div {...fadeUp(0.1)}>
          <p
            className="font-sans text-[10px] uppercase tracking-widest mb-6"
            style={{ color: 'rgba(198,167,94,0.7)' }}
          >
            Bespoke &amp; Commissions
          </p>
          <h2
            className="font-serif font-light mb-8"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              color: '#0F3D2E',
              letterSpacing: '0.05em',
            }}
          >
            Looking for something unique?
          </h2>
          <a
            href="/contact"
            className="inline-block font-sans text-[11px] uppercase tracking-widest px-10 py-4"
            style={{
              color: '#0F3D2E',
              border: '1px solid rgba(15,61,46,0.4)',
              transition: 'all 0.35s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#0F3D2E';
              e.currentTarget.style.color = '#F6F1E8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#0F3D2E';
            }}
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </>
  );
}
