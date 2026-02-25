'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Page header */}
      <section
        className="pt-36 pb-20 px-6 text-center"
        style={{ backgroundColor: '#F6F1E8' }}
      >
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans text-xs uppercase tracking-widest mb-4"
          style={{ color: '#C6A75E' }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-light"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#0F3D2E' }}
        >
          Contact Us
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 h-px w-16 origin-center"
          style={{ backgroundColor: 'rgba(198,167,94,0.5)' }}
        />
      </section>

      {/* Form + Info */}
      <section className="pb-24 px-6 md:px-10" style={{ backgroundColor: '#F6F1E8' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Form */}
          <motion.div {...fadeUp(0)}>
            {!sent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label className="font-sans text-xs uppercase tracking-widest block mb-2" style={{ color: '#0F3D2E' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="input-underline"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs uppercase tracking-widest block mb-2" style={{ color: '#0F3D2E' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="input-underline"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs uppercase tracking-widest block mb-2" style={{ color: '#0F3D2E' }}>
                    Message
                  </label>
                  <textarea
                    required
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={5}
                    className="input-underline"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start font-sans text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300"
                  style={{ backgroundColor: '#0F3D2E', color: '#F6F1E8' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#F6F1E8';
                    e.currentTarget.style.color = '#0F3D2E';
                    e.currentTarget.style.outline = '1px solid #0F3D2E';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#0F3D2E';
                    e.currentTarget.style.color = '#F6F1E8';
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  Send Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="py-12"
              >
                <p className="font-serif font-light text-2xl mb-3" style={{ color: '#0F3D2E' }}>
                  Thank you.
                </p>
                <p className="font-sans font-light text-sm leading-relaxed tracking-wide" style={{ color: '#2A2A2A' }}>
                  We have received your message and will be in touch shortly.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div {...fadeUp(0.15)} className="flex flex-col gap-10 md:pt-8">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: '#C6A75E' }}>Location</p>
              <p className="font-sans font-light text-sm leading-relaxed tracking-wide" style={{ color: '#2A2A2A' }}>
                Colombo, Sri Lanka
              </p>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: '#C6A75E' }}>Email</p>
              <a
                href="mailto:hello@zayra.co"
                className="font-sans font-light text-sm tracking-wide transition-colors duration-200"
                style={{ color: '#2A2A2A' }}
              >
                hello@zayra.co
              </a>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest mb-3" style={{ color: '#C6A75E' }}>Instagram</p>
              <a
                href="https://instagram.com/zayra.co"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-light text-sm tracking-wide transition-colors duration-200"
                style={{ color: '#2A2A2A' }}
              >
                @zayra.co
              </a>
            </div>
            <div className="h-px w-12" style={{ backgroundColor: 'rgba(198,167,94,0.4)' }} />
            <p className="font-sans font-light text-xs leading-relaxed tracking-wide" style={{ color: 'rgba(42,42,42,0.55)' }}>
              We typically respond within 1–2 business days. For urgent enquiries please reach us on Instagram.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
