// components/Navbar.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScroll } from 'framer-motion';
import {
  Layers,
  ShoppingBag,
  Leaf,
  Mail,
  Search,
  User,
  ShoppingCart,
  X,
} from 'lucide-react';

const links = [
  { href: '/collections', label: 'Collections', Icon: Layers      },
  { href: '/shop',        label: 'Shop',        Icon: ShoppingBag },
  { href: '/about',       label: 'About',       Icon: Leaf        },
  { href: '/contact',     label: 'Contact',     Icon: Mail        },
];

const utilLinks = [
  { href: '/account', label: 'Account', Icon: User         },
  { href: '/bag',     label: 'Bag',     Icon: ShoppingCart },
];

const NAV_H_LARGE = 140;
const NAV_H_SMALL = 64;

const EASE_EXPO     = 'cubic-bezier(0.05, 1, 0.2, 1)';
const EASE_BACK     = 'cubic-bezier(0.76, 0, 0.24, 1)';
const EASE_COLOR    = 'cubic-bezier(0.25, 0, 0.15, 1)';
const DURATION      = '1.1s';
const DURATION_Y    = '1.35s';
const DURATION_BACK = '1.6s';
const DRAWER_EASE   = 'cubic-bezier(0.25, 1, 0.5, 1)';

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [hoveredHref, setHoveredHref] = useState(null);
  const searchInputRef = useRef(null);
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setIsScrolled(v > 8));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const inHero = isHome && !isScrolled;

  // ── All original dynamic values untouched ─────────────────────────────────
  const navH      = inHero ? NAV_H_LARGE : NAV_H_SMALL;
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
      {/* ── Fixed navbar ──────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0"
        style={{ zIndex: 50 }}
      >
        <div
          style={{
            height: navH,
            transition: inHero
              ? `height ${DURATION_BACK} ${EASE_BACK}`
              : `height ${DURATION} ${EASE_EXPO}`,
          }}
        >
          {/* Ivory bg */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height:          navH,
              backgroundColor: '#F6F1E8',
              opacity:         bgOp,
              borderBottom:    searchOpen ? 'none' : '1px solid rgba(198,167,94,0.25)',
              transition:      inHero
                ? `opacity 0.5s ${EASE_COLOR} 0s, height ${DURATION_BACK} ${EASE_BACK}`
                : `opacity 0.7s ${EASE_COLOR} 0.4s, height ${DURATION} ${EASE_EXPO}`,
            }}
          />

          {/* 3-col: nav links | logo | utility icons */}
          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-3 items-center">

            {/* LEFT — mobile hamburger + desktop nav */}
            <div className="flex items-center">

              {/* Mobile hamburger — 3 bars animate to X */}
              <button
                className="md:hidden relative flex flex-col justify-center gap-[5px] w-6 h-5 cursor-pointer bg-transparent border-0 p-0"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
                style={{ zIndex: 51 }}
              >
                <span
                  className="block h-px"
                  style={{
                    width:           '24px',
                    backgroundColor: menuOpen ? '#C6A75E' : burgerClr,
                    transformOrigin: 'center',
                    transform:       menuOpen ? 'translateY(10px) rotate(45deg)' : 'none',
                    transition:      `transform 0.4s ${DRAWER_EASE}, background-color ${DURATION} ${EASE_COLOR}`,
                  }}
                />
                <span
                  className="block h-px"
                  style={{
                    width:           '24px',
                    backgroundColor: menuOpen ? '#C6A75E' : burgerClr,
                    opacity:         menuOpen ? 0 : 1,
                    transform:       menuOpen ? 'scaleX(0)' : 'scaleX(1)',
                    transition:      `transform 0.3s ease, opacity 0.2s ease, background-color ${DURATION} ${EASE_COLOR}`,
                  }}
                />
                <span
                  className="block h-px"
                  style={{
                    width:           '24px',
                    backgroundColor: menuOpen ? '#C6A75E' : burgerClr,
                    transformOrigin: 'center',
                    transform:       menuOpen ? 'translateY(-10px) rotate(-45deg)' : 'none',
                    transition:      `transform 0.4s ${DRAWER_EASE}, background-color ${DURATION} ${EASE_COLOR}`,
                  }}
                />
              </button>

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-8">
                {links.map(({ href, label, Icon }) => {
                  const active  = pathname === href;
                  const hovered = hoveredHref === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="relative flex flex-col items-center gap-1.5"
                      onMouseEnter={() => setHoveredHref(href)}
                      onMouseLeave={() => setHoveredHref(null)}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.25}
                        style={{
                          color:      active || hovered ? '#C6A75E' : iconClr,
                          transform:  hovered ? 'translateY(-2px)' : 'translateY(0)',
                          transition: `color ${DURATION} ${EASE_COLOR}, transform 0.3s ease`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily:    'sans-serif',
                          fontSize:      '8px',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color:         active || hovered ? '#C6A75E' : iconClr,
                          transition:    `color ${DURATION} ${EASE_COLOR}`,
                          lineHeight:    1,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          display:         'block',
                          height:          '0.5px',
                          width:           active ? '100%' : '0%',
                          backgroundColor: '#C6A75E',
                          transition:      'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                          marginTop:       '-4px',
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* CENTER — logo (untouched) */}
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
                    transform:     `translateY(${logoTY})`,
                    transition:    logoTransition,
                    willChange:    'font-size, color, transform',
                  }}
                >
                  ZAYRA CO.
                </span>
              </Link>
            </div>

            {/* RIGHT — Search + Account + Bag */}
            <div className="flex justify-end items-center gap-8">

              {/* Desktop search toggle */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="hidden md:flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0"
                aria-label="Toggle search"
                onMouseEnter={() => setHoveredHref('__search')}
                onMouseLeave={() => setHoveredHref(null)}
              >
                {searchOpen
                  ? <X size={18} strokeWidth={1.25} style={{ color: '#C6A75E' }} />
                  : <Search
                      size={18}
                      strokeWidth={1.25}
                      style={{
                        color:      hoveredHref === '__search' ? '#C6A75E' : iconClr,
                        transform:  hoveredHref === '__search' ? 'translateY(-2px)' : 'translateY(0)',
                        transition: `color ${DURATION} ${EASE_COLOR}, transform 0.3s ease`,
                      }}
                    />
                }
                <span
                  style={{
                    fontFamily:    'sans-serif',
                    fontSize:      '8px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         searchOpen || hoveredHref === '__search' ? '#C6A75E' : iconClr,
                    transition:    `color ${DURATION} ${EASE_COLOR}`,
                    lineHeight:    1,
                  }}
                >
                  Search
                </span>
              </button>

              {/* Desktop Account + Bag */}
              <div className="hidden md:flex items-center gap-8">
                {utilLinks.map(({ href, label, Icon }) => {
                  const hovered = hoveredHref === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="relative flex flex-col items-center gap-1.5"
                      onMouseEnter={() => setHoveredHref(href)}
                      onMouseLeave={() => setHoveredHref(null)}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.25}
                        style={{
                          color:      hovered ? '#C6A75E' : iconClr,
                          transform:  hovered ? 'translateY(-2px)' : 'translateY(0)',
                          transition: `color ${DURATION} ${EASE_COLOR}, transform 0.3s ease`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily:    'sans-serif',
                          fontSize:      '8px',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color:         hovered ? '#C6A75E' : iconClr,
                          transition:    `color ${DURATION} ${EASE_COLOR}`,
                          lineHeight:    1,
                        }}
                      >
                        {label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile: bag icon */}
              <div className="flex md:hidden items-center">
                <Link href="/bag" aria-label="Bag" style={{ color: iconClr, transition: `color ${DURATION} ${EASE_COLOR}` }}>
                  <ShoppingCart size={18} strokeWidth={1.25} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Nike-style search bar */}
        <div
          className="hidden md:block overflow-hidden -mt-4"
          style={{
            maxHeight:       searchOpen ? '72px' : '0px',
            opacity:         searchOpen ? 1 : 0,
            transition:      'max-height 0.45s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
            backgroundColor: '#F6F1E8',
            borderBottom:    searchOpen ? '1px solid rgba(198,167,94,0.25)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-4 relative" style={{ height: '72px' }}>
            <Search size={16} strokeWidth={1.25} style={{ color: '#C6A75E', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
              placeholder="Search for products..."
              style={{
                flex:          1,
                background:    'transparent',
                border:        'none',
                outline:       'none',
                fontFamily:    'sans-serif',
                fontSize:      '12px',
                letterSpacing: '0.12em',
                color:         '#0F3D2E',
                caretColor:    '#C6A75E',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: 'rgba(15,61,46,0.4)', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Blurred backdrop — always mounted, fades in/out ───────────────── */}
      <div
        className="md:hidden fixed inset-0"
        style={{
          zIndex:          58,
          backdropFilter:  menuOpen ? 'blur(6px)' : 'blur(0px)',
          backgroundColor: menuOpen ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0)',
          opacity:         menuOpen ? 1 : 0,
          pointerEvents:   menuOpen ? 'auto' : 'none',
          transition:      'backdrop-filter 0.45s ease, background-color 0.45s ease, opacity 0.45s ease',
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Side drawer — always mounted, slides in from left ─────────────── */}
      <div
        className="md:hidden fixed top-0 left-0 h-full flex flex-col"
        style={{
          zIndex:     60,
          width:      'min(80vw, 320px)',
          backgroundColor: '#0F3D2E',
          transform:  menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: `transform 0.55s ${DRAWER_EASE}`,
          boxShadow:  menuOpen ? '4px 0 40px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '20px 24px', borderBottom: '0.5px solid rgba(246,241,232,0.12)' }}
        >
          <span
            style={{
              fontFamily:    'serif',
              fontSize:      '11px',
              letterSpacing: '0.28em',
              fontWeight:    300,
              color:         '#C6A75E',
              textTransform: 'uppercase',
            }}
          >
            ZAYRA CO.
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ color: '#F6F1E8', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={1.25} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1" style={{ padding: '8px 0' }}>
          {links.map(({ href, label, Icon }, i) => (
            <Link
              key={href}
              href={href}
              style={{
                display:    'flex',
                alignItems: 'center',
                gap:        '16px',
                padding:    '18px 24px',
                borderBottom: '0.5px solid rgba(246,241,232,0.08)',
                textDecoration: 'none',
                transform:  menuOpen ? 'translateX(0)' : 'translateX(-16px)',
                opacity:    menuOpen ? 1 : 0,
                transition: `transform 0.5s ${DRAWER_EASE} ${i * 0.06 + 0.15}s, opacity 0.4s ease ${i * 0.06 + 0.15}s`,
              }}
            >
              <Icon
                size={15}
                strokeWidth={1}
                style={{ color: '#C6A75E', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily:    'serif',
                  fontSize:      'clamp(18px, 5vw, 22px)',
                  fontWeight:    300,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         pathname === href ? '#C6A75E' : '#F6F1E8',
                  lineHeight:    1,
                }}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom utility row */}
        <div
          style={{
            display:       'flex',
            alignItems:    'center',
            gap:           '24px',
            padding:       '24px',
            borderTop:     '0.5px solid rgba(246,241,232,0.12)',
            opacity:       menuOpen ? 1 : 0,
            transform:     menuOpen ? 'translateY(0)' : 'translateY(8px)',
            transition:    `opacity 0.4s ease 0.4s, transform 0.4s ${DRAWER_EASE} 0.4s`,
          }}
        >
          {[{ href: '/search', label: 'Search', Icon: Search }, ...utilLinks].map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <Icon size={14} strokeWidth={1.2} style={{ color: 'rgba(246,241,232,0.45)' }} />
              <span
                style={{
                  fontFamily:    'sans-serif',
                  fontSize:      '9px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         'rgba(246,241,232,0.45)',
                }}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}