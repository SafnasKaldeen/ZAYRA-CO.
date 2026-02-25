'use client';
import { useState, useRef } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { shopProducts } from '../../../lib/products'
import ProductCard from '../../../components/ProductCard';
import { ChevronDown, Sparkles } from 'lucide-react';

// ── Accordion item ───────────────────────────────────────────────
function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid rgba(198,167,94,0.2)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4"
      >
        <span
          className="font-sans text-[11px] uppercase tracking-widest"
          style={{ color: '#0F3D2E' }}
        >
          {title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={14} strokeWidth={1.5} style={{ color: '#C6A75E' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="pb-5 font-sans font-light text-sm leading-relaxed"
              style={{ color: 'rgba(42,42,42,0.75)', letterSpacing: '0.02em' }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function ProductPage({ params }) {
  const product = shopProducts.find(p => p.id === params.id);
  if (!product) notFound();

  const related = shopProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize,  setSelectedSize]  = useState(null);
  const [activeImg,     setActiveImg]     = useState(0);
  const [sizeError,     setSizeError]     = useState(false);

  const WHATSAPP = '94XXXXXXXXX'; // ← replace with your number

  function handleOrder() {
    if (!selectedSize) { setSizeError(true); return; }
    const msg = encodeURIComponent(
      `Hi ZAYRA CO. 👋\n\nI'd like to order:\n\n` +
      `*${product.name}*\nColour: ${selectedColor.name}\nSize: ${selectedSize}\nPrice: ${product.price}\n\n` +
      `Please let me know availability and next steps. Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  }

  return (
    <>
      {/* ── Breadcrumb ──────────────────────────────────── */}
      <div
        className="pt-24 pb-4 px-6 md:px-12"
        style={{ backgroundColor: '#F6F1E8' }}
      >
        <p className="font-sans text-[10px] uppercase tracking-widest"
          style={{ color: 'rgba(198,167,94,0.7)' }}>
          <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
          <span className="mx-2">·</span>
          <Link href="/shop" className="hover:text-emerald-700 transition-colors">Shop</Link>
          <span className="mx-2">·</span>
          <span style={{ color: '#0F3D2E' }}>{product.name}</span>
        </p>
      </div>

      {/* ── Main: gallery + sticky details ─────────────── */}
      <section
        className="px-6 md:px-12 pb-24"
        style={{ backgroundColor: '#F6F1E8' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">

            {/* LEFT — image gallery */}
            <div className="w-full md:w-3/5">

              {/* Main image */}
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '3/4', backgroundColor: '#e8e2d8' }}
              >
                <Image
                  src={product.images[activeImg]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative overflow-hidden flex-1"
                    style={{
                      aspectRatio: '1/1',
                      backgroundColor: '#e8e2d8',
                      outline: activeImg === i
                        ? '1.5px solid #C6A75E'
                        : '1.5px solid transparent',
                      outlineOffset: '2px',
                      transition: 'outline-color 0.3s',
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="10vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — sticky details */}
            <div className="w-full md:w-2/5">
              <div className="md:sticky" style={{ top: '88px' }}>

                {/* Category */}
                <p
                  className="font-sans text-[10px] uppercase tracking-widest mb-3"
                  style={{ color: 'rgba(198,167,94,0.8)' }}
                >
                  {product.category}
                </p>

                {/* Name */}
                <h1
                  className="font-serif font-light leading-tight mb-3"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    color: '#0F3D2E',
                    letterSpacing: '0.04em',
                  }}
                >
                  {product.name}
                </h1>

                {/* Price */}
                <p
                  className="font-sans font-light text-sm tracking-widest mb-6"
                  style={{ color: '#C6A75E' }}
                >
                  {product.price}
                </p>

                {/* Divider */}
                <div
                  className="mb-6"
                  style={{ height: '1px', backgroundColor: 'rgba(198,167,94,0.25)' }}
                />

                {/* Color selector */}
                <div className="mb-6">
                  <p
                    className="font-sans text-[10px] uppercase tracking-widest mb-3"
                    style={{ color: '#0F3D2E' }}
                  >
                    Colour — <span style={{ color: '#C6A75E' }}>{selectedColor.name}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map(c => (
                      <button
                        key={c.name}
                        title={c.name}
                        onClick={() => setSelectedColor(c)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: c.hex,
                          border: selectedColor.name === c.name
                            ? '2px solid #C6A75E'
                            : '2px solid transparent',
                          outline: selectedColor.name === c.name
                            ? '1px solid rgba(198,167,94,0.4)'
                            : '1px solid rgba(0,0,0,0.12)',
                          outlineOffset: '2px',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size selector */}
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="font-sans text-[10px] uppercase tracking-widest"
                      style={{ color: sizeError ? '#c0392b' : '#0F3D2E' }}
                    >
                      {sizeError ? 'Please select a size' : 'Size'}
                    </p>
                    <button
                      className="font-sans text-[9px] uppercase tracking-widest underline"
                      style={{ color: 'rgba(198,167,94,0.7)' }}
                      onClick={() => {
                        // open size guide accordion
                      }}
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => { setSelectedSize(s); setSizeError(false); }}
                        className="font-sans text-[11px] uppercase tracking-widest transition-all duration-250"
                        style={{
                          width: '44px',
                          height: '44px',
                          backgroundColor: selectedSize === s ? '#0F3D2E' : 'transparent',
                          color:           selectedSize === s ? '#F6F1E8' : '#2A2A2A',
                          border: selectedSize === s
                            ? '1px solid #0F3D2E'
                            : '1px solid rgba(42,42,42,0.25)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p
                  className="font-sans font-light text-sm leading-relaxed mb-8"
                  style={{ color: 'rgba(42,42,42,0.7)', letterSpacing: '0.02em' }}
                >
                  {product.description}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col gap-3 mb-8">
                  {/* WhatsApp order */}
                  <button
                    onClick={handleOrder}
                    className="w-full font-sans text-[11px] uppercase tracking-widest py-4 flex items-center justify-center gap-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#0F3D2E',
                      color: '#F6F1E8',
                      border: '1px solid #0F3D2E',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#C6A75E';
                      e.currentTarget.style.borderColor = '#C6A75E';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#0F3D2E';
                      e.currentTarget.style.borderColor = '#0F3D2E';
                    }}
                  >
                    {/* WhatsApp icon inline SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order via WhatsApp
                  </button>

                  <Link
                    href={`/shop/${product.id}/virtual-tryon`}
                    className="w-full font-sans text-[11px] uppercase tracking-widest py-4 flex items-center justify-center gap-3 transition-all duration-300"
                    style={{ backgroundColor: 'transparent', color: '#0F3D2E', border: '1px solid rgba(15,61,46,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#C6A75E'; e.currentTarget.style.color = '#C6A75E'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,61,46,0.3)'; e.currentTarget.style.color = '#0F3D2E'; }}
                  >
                    <Sparkles size={13} strokeWidth={1.5} />
                    Virtual Try-On
                  </Link>

                  {/* Wishlist ghost */}
                  <button
                    className="w-full font-sans text-[11px] uppercase tracking-widest py-4 transition-all duration-300"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#0F3D2E',
                      border: '1px solid rgba(15,61,46,0.3)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#C6A75E';
                      e.currentTarget.style.color = '#C6A75E';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(15,61,46,0.3)';
                      e.currentTarget.style.color = '#0F3D2E';
                    }}
                  >
                    Save to Wishlist
                  </button>
                </div>

                {/* Accordion */}
                <div style={{ borderBottom: '1px solid rgba(198,167,94,0.2)' }}>
                  <AccordionItem title="Material & Fabric">
                    {product.details.material}
                  </AccordionItem>
                  <AccordionItem title="Fit & Sizing">
                    {product.details.fit}
                  </AccordionItem>
                  <AccordionItem title="Care Instructions">
                    {product.details.care}
                  </AccordionItem>
                  <AccordionItem title="Delivery & Returns">
                    Free delivery within Sri Lanka on orders over LKR 10,000.
                    Standard delivery 3–5 business days. Express available at checkout.
                    Returns accepted within 7 days of delivery in original condition.
                  </AccordionItem>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Related products ────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="py-20 px-6 md:px-12"
          style={{ backgroundColor: '#F6F1E8', borderTop: '1px solid rgba(198,167,94,0.15)' }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-6 mb-12">
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(198,167,94,0.2)' }} />
              <p
                className="font-sans text-[10px] uppercase tracking-widest whitespace-nowrap"
                style={{ color: '#0F3D2E' }}
              >
                You May Also Like
              </p>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(198,167,94,0.2)' }} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <ProductCard {...p} tall />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
