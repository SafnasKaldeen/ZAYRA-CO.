// components/LogoMorph.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

const LOCK = 220;
const HERO_SIZE  = 68;  // px — large hero font
const NAV_SIZE   = 18;  // px — small navbar font

export default function LogoMorph() {
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const { scrollY } = useScroll();

  // top: vertical center of viewport → vertical center of navbar (32px)
  const top      = useTransform(scrollY, [0, LOCK], ['50vh', '32px']);
  // font size interpolated as raw px number
  const fontSize = useTransform(scrollY, [0, LOCK], [HERO_SIZE, NAV_SIZE]);
  // color: gold → emerald
  const color    = useTransform(scrollY, [0, LOCK], ['#C6A75E', '#0F3D2E']);

  if (!isHome) {
    // Static navbar-center logo on all other pages
    return (
      <div
        style={{
          position: 'fixed',
          top: '32px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 60,
          pointerEvents: 'auto',
        }}
      >
        <Link
          href="/"
          className="font-serif uppercase whitespace-nowrap"
          style={{
            fontSize: `${NAV_SIZE}px`,
            letterSpacing: '0.22em',
            fontWeight: 300,
            color: '#0F3D2E',
          }}
        >
          ZAYRA CO.
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top,
        left: '50%',
        // x and y as % — Framer handles these inside its own transform matrix
        // so they DON'T conflict with each other
        x: '-50%',
        y: '-50%',
        zIndex: 60,
        pointerEvents: 'auto',
        whiteSpace: 'nowrap',
      }}
    >
      <motion.span
        className="font-serif uppercase"
        style={{
          fontSize,
          color,
          letterSpacing: '0.22em',
          fontWeight: 300,
          display: 'block',
        }}
      >
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          ZAYRA CO.
        </Link>
      </motion.span>
    </motion.div>
  );
}
