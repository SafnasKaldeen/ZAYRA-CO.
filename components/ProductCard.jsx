// components/ProductCard.jsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ name, category, price, image, id, tall = false }) {
  const [hovered, setHovered] = useState(false);
  const aspectClass = tall ? 'aspect-[3/4]' : 'aspect-[4/5]';

  return (
    <Link href={`/shop/${id}`} className="block group cursor-pointer">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div
          className={`w-full relative overflow-hidden ${aspectClass}`}
          style={{ backgroundColor: '#1a3d2e' }}
        >
          {image ? (
            <>
              <motion.div
                className="absolute inset-0"
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Hover overlay */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-end justify-center pb-8"
                    style={{ background: 'linear-gradient(to top, rgba(15,61,46,0.7) 0%, transparent 50%)' }}
                  >
                    <motion.span
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="font-sans text-[10px] uppercase tracking-widest px-6 py-2.5 border"
                      style={{ color: '#F6F1E8', borderColor: 'rgba(198,167,94,0.7)' }}
                    >
                      View Piece
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-4xl select-none"
                style={{ color: 'rgba(198,167,94,0.18)' }}>ZC</span>
            </div>
          )}

          {/* Category pill */}
          <div
            className="absolute top-3 left-3 font-sans text-[9px] uppercase tracking-widest px-2.5 py-1"
            style={{ backgroundColor: 'rgba(246,241,232,0.92)', color: '#0F3D2E' }}
          >
            {category}
          </div>
        </div>

        {/* Info row */}
        <div className="pt-4 pb-1 flex items-start justify-between gap-2">
          <h3
            className="font-serif font-light leading-snug"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: '#1a1a1a',
              letterSpacing: '0.03em',
            }}
          >
            {name}
          </h3>
          <p
            className="font-sans font-light text-xs tracking-widest mt-1 shrink-0"
            style={{ color: '#C6A75E' }}
          >
            {price}
          </p>
        </div>

        {/* Gold underline */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-px origin-left mt-1"
          style={{ backgroundColor: 'rgba(198,167,94,0.4)' }}
        />
      </motion.div>
    </Link>
  );
}
