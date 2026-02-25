'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

const categories = ['All', 'Abayas', 'Modest Dresses', 'Co-ords', 'Occasion Wear'];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function CollectionsPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active);

  return (
    <>
      {/* Header banner */}
      <section
        className="pt-32 pb-16 px-6 md:px-10 text-center"
        style={{ backgroundColor: '#0F3D2E' }}
      >
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="font-sans text-xs uppercase tracking-widest mb-4"
          style={{ color: 'rgba(198,167,94,0.7)' }}
        >
          Our Collections
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-light"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F6F1E8', letterSpacing: '0.05em' }}
        >
          Collections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans font-light text-sm tracking-widest mt-4"
          style={{ color: 'rgba(246,241,232,0.6)' }}
        >
          Refined modest wear, crafted with intention.
        </motion.p>
      </section>

      {/* Filter */}
      <section className="py-8 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8', borderBottom: '1px solid rgba(198,167,94,0.2)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-sans text-xs uppercase tracking-widest px-4 py-1.5 transition-all duration-200 relative"
              style={{ color: active === cat ? '#0F3D2E' : 'rgba(42,42,42,0.55)' }}
            >
              {cat}
              <span
                className="absolute bottom-0 left-0 h-px bg-gold transition-all duration-300"
                style={{ width: active === cat ? '100%' : '0', backgroundColor: '#C6A75E' }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <ProductCard {...p} tall />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
