// components/HeroSection.jsx
'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const { scrollY } = useScroll();

  const subOpacity = useTransform(scrollY, [100, 350], [1, 0]);
  const subY       = useTransform(scrollY, [100, 350], [0, -12]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#0F3D2E' }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 60%, rgba(198,167,94,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Push content below tall navbar */}
      <div
        className="relative z-10 flex flex-col items-center w-full"
        style={{ marginTop: '200px' }}
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            opacity: subOpacity,
            y: subY,
            color: 'rgba(246,241,232,0.65)',
            fontFamily: 'var(--font-inter)',
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          Luxury in Every Layer.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            opacity: subOpacity,
            height: '1px',
            width: '5rem',
            backgroundColor: 'rgba(198,167,94,0.45)',
            margin: '1.8rem auto',
          }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: subOpacity, y: subY }}
        >
          <Link
            href="/collections"
            className="inline-block font-sans text-xs uppercase tracking-widest px-8 py-3.5"
            style={{
              color: '#F6F1E8',
              border: '1px solid rgba(198,167,94,0.55)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#C6A75E';
              e.currentTarget.style.borderColor = '#C6A75E';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#F6F1E8';
              e.currentTarget.style.borderColor = 'rgba(198,167,94,0.55)';
            }}
          >
            Explore the Collection
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity: subOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-sans text-xs tracking-widest uppercase"
          style={{ color: 'rgba(246,241,232,0.35)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ backgroundColor: 'rgba(198,167,94,0.35)' }}
        />
      </motion.div>
    </section>
  );
}
