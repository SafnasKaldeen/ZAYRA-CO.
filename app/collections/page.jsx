'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/products';

export default function CollectionsPage() {
  const [active, setActive] = useState('All');

  // Derive categories dynamically from the products data
  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.category))].sort();
    return ['All', ...unique];
  }, []);

  const filtered = useMemo(() =>
    active === 'All'
      ? products
      : products.filter(p => p.category === active),
    [active]
  );

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

        {/* Category counts */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="font-sans text-xs mt-3"
          style={{ color: 'rgba(246,241,232,0.4)' }}
        >
          {products.length} pieces across {categories.length - 1} categories
        </motion.p>
      </section>

      {/* Filter */}
      <section
        className="py-8 px-6 md:px-10 sticky top-0 z-30"
        style={{ backgroundColor: '#F6F1E8', borderBottom: '1px solid rgba(198,167,94,0.2)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map(cat => {
            const count = cat === 'All'
              ? products.length
              : products.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="font-sans text-xs uppercase tracking-widest px-4 py-1.5 transition-all duration-200 relative"
                style={{ color: active === cat ? '#0F3D2E' : 'rgba(42,42,42,0.45)' }}
              >
                {cat}
                <span
                  className="ml-1 text-[10px]"
                  style={{ color: active === cat ? 'rgba(198,167,94,0.9)' : 'rgba(42,42,42,0.3)' }}
                >
                  ({count})
                </span>
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{
                    width: active === cat ? '100%' : '0',
                    backgroundColor: '#C6A75E',
                  }}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-6xl mx-auto">

          {/* Active filter label */}
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-xs uppercase tracking-widest mb-10 text-center"
            style={{ color: 'rgba(42,42,42,0.4)' }}
          >
            {active === 'All' ? `All ${products.length} pieces` : `${filtered.length} piece${filtered.length !== 1 ? 's' : ''} in ${active}`}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <ProductCard {...p} tall />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-sans text-sm py-24"
              style={{ color: 'rgba(42,42,42,0.4)' }}
            >
              No pieces found in this category.
            </motion.p>
          )}
        </div>
      </section>
    </>
  );
}