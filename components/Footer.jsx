import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F3D2E' }} className="py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl uppercase tracking-widest2 mb-3" style={{ color: '#C6A75E' }}>
            ZAYRA CO.
          </p>
          <p className="font-sans text-xs tracking-widest uppercase" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Luxury in Every Layer.
          </p>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: '#C6A75E' }}>
            Navigate
          </p>
          {[['/', 'Home'], ['/collections', 'Collections'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-xs tracking-widest uppercase hover:opacity-100 transition-opacity duration-200"
              style={{ color: 'rgba(246,241,232,0.65)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: '#C6A75E' }}>
            Contact
          </p>
          <p className="font-sans text-xs tracking-wide leading-relaxed" style={{ color: 'rgba(246,241,232,0.65)' }}>
            Colombo, Sri Lanka
          </p>
          <a href="mailto:hello@zayra.co" className="font-sans text-xs tracking-wide hover:opacity-100 transition-opacity" style={{ color: 'rgba(246,241,232,0.65)' }}>
            hello@zayra.co
          </a>
          <a href="https://instagram.com/zayra.co" target="_blank" rel="noopener noreferrer" className="font-sans text-xs tracking-widest uppercase hover:opacity-100 transition-opacity" style={{ color: 'rgba(246,241,232,0.65)' }}>
            @zayra.co
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid rgba(198,167,94,0.2)' }}>
        <p className="font-sans text-xs tracking-widest uppercase" style={{ color: 'rgba(246,241,232,0.35)' }}>
          © 2024 ZAYRA CO. All rights reserved.
        </p>
        <p className="font-sans text-xs tracking-widest uppercase" style={{ color: 'rgba(246,241,232,0.35)' }}>
          Sri Lanka
        </p>
      </div>
    </footer>
  );
}
