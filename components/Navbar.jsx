// components/Navbar.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import {
  Layers,
  ShoppingBag,
  Leaf,
  Mail,
} from 'lucide-react';

const links = [
  { href: '/collections', label: 'Collections', Icon: Layers      },
  { href: '/shop',        label: 'Shop',        Icon: ShoppingBag },
  { href: '/about',       label: 'About',       Icon: Leaf        },
  { href: '/contact',     label: 'Contact',     Icon: Mail        },
];

const NAV_H_LARGE = 140;
const NAV_H_SMALL = 64;

const EASE_EXPO     = 'cubic-bezier(0.05, 1, 0.2, 1)';
const EASE_BACK     = 'cubic-bezier(0.76, 0, 0.24, 1)';
const EASE_COLOR    = 'cubic-bezier(0.25, 0, 0.15, 1)';
const DURATION      = '1.1s';
const DURATION_Y    = '1.35s';
const DURATION_BACK = '1.6s';

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setIsScrolled(v > 8));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const inHero = isHome && !isScrolled;

  const navH      = inHero ? NAV_H_LARGE : NAV_H_SMALL;
  // clamp: mobile gets smaller size and less push, desktop unchanged
  const logoSz    = inHero ? 'clamp(45px, 12vw, 122px)' : 'clamp(22px, 5vw, 30px)';
  const logoTY    = inHero ? 'clamp(80px, 18vw, 200px)' : '0px';
  const logoClr   = inHero ? '#C6A75E'   : '#0F3D2E';
  const iconClr   = inHero ? '#F6F1E8'   : '#2A2A2A';
  const bgOp      = inHero ? 0           : 1;
  const burgerClr = inHero ? '#C6A75E'   : '#0F3D2E';

  const logoTransition = inHero
    ? [
        `font-size  ${DURATION_BACK} ${EASE_BACK}`,
        `color      ${DURATION_BACK} ${EASE_COLOR}`,
        `transform  ${DURATION_BACK} ${EASE_BACK}`,
      ].join(', ')
    : [
        `font-size  ${DURATION}   ${EASE_EXPO}`,
        `color      ${DURATION}   ${EASE_COLOR}`,
        `transform  ${DURATION_Y} ${EASE_EXPO}`,
      ].join(', ');

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: navH,
          transition: inHero
            ? `height ${DURATION_BACK} ${EASE_BACK}`
            : `height ${DURATION} ${EASE_EXPO}`,
        }}
      >
        {/* Ivory bg */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#F6F1E8',
            opacity: bgOp,
            borderBottom: '1px solid rgba(198,167,94,0.25)',
            transition: inHero
              ? `opacity 0.5s ${EASE_COLOR} 0s`
              : `opacity 0.7s ${EASE_COLOR} 0.4s`,
          }}
        />

        {/* 3-col: hamburger | logo | icons */}
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-3 items-center">

          {/* LEFT — mobile hamburger */}
          <div className="flex items-center">
            <button
              className="md:hidden flex flex-col gap-1.5 w-6 cursor-pointer"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block h-px w-full"
                  style={{
                    backgroundColor: burgerClr,
                    transition: `background-color ${DURATION} ${EASE_COLOR}`,
                  }}
                />
              ))}
            </button>
          </div>

          {/* CENTER — logo */}
          <div className="flex justify-center items-center">
            <Link href="/">
              <span
                className="font-serif uppercase whitespace-nowrap block"
                style={{
                  fontSize:      logoSz,
                  letterSpacing: '0.22em',
                  fontWeight:    300,
                  color:         logoClr,
                  lineHeight:    1,
                  // logoTY already includes units from clamp/px
                  transform:     `translateY(${logoTY})`,
                  transition:    logoTransition,
                  willChange:    'font-size, color, transform',
                }}
              >
                ZAYRA CO.
              </span>
            </Link>
          </div>

          {/* RIGHT — icon nav */}
          <div className="flex justify-end items-center">
            <nav className="hidden md:flex items-center gap-7">
              {links.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredHref(href)}
                    onMouseLeave={() => setHoveredHref(null)}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.25}
                      style={{
                        color: active ? '#C6A75E' : iconClr,
                        transition: `color ${DURATION} ${EASE_COLOR}`,
                      }}
                    />
                    {/* Active dot */}
                    <span
                      className="mt-1 block rounded-full"
                      style={{
                        width:           active ? '3px' : '0px',
                        height:          active ? '3px' : '0px',
                        backgroundColor: '#C6A75E',
                        opacity:         active ? 1 : 0,
                        transition:      'all 0.3s ease',
                      }}
                    />
                    {/* Hover tooltip */}
                    <span
                      className="absolute -bottom-7 left-1/2 font-sans text-[9px] uppercase tracking-widest whitespace-nowrap pointer-events-none"
                      style={{
                        color:      '#C6A75E',
                        opacity:    hoveredHref === href ? 1 : 0,
                        transform:  `translateX(-50%) translateY(${hoveredHref === href ? '0px' : '4px'})`,
                        transition: 'opacity 0.2s ease, transform 0.2s ease',
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>
            <div className="md:hidden w-6" />
          </div>

        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ backgroundColor: '#0F3D2E' }}
        >
          <button
            className="absolute top-5 right-6 text-3xl font-light"
            onClick={() => setMenuOpen(false)}
            style={{ color: '#F6F1E8' }}
          >×</button>
          {links.map(({ href, label, Icon }, i) => (
            <motion.div
              key={href}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={href}
                className="flex items-center gap-4 font-serif text-3xl font-light tracking-widest"
                style={{ color: '#F6F1E8' }}
              >
                <Icon size={22} strokeWidth={1} style={{ color: '#C6A75E' }} />
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
