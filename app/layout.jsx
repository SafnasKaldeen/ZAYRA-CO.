// app/layout.jsx
import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { buildMetadata, orgJsonLd } from '../config/seo.config';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400'],
  variable: '--font-cormorant',
  display:  'swap',
});

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400'],
  variable: '--font-inter',
  display:  'swap',
});

// ─── Root metadata (pulled entirely from seo.config.js) ──────────────────────
export const metadata = buildMetadata();

// ─── Root layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}        
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}