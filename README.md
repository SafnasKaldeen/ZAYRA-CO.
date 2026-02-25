# ZAYRA CO. — Luxury Fashion Website

Premium modest wear fashion house from Sri Lanka.  
Built with **Next.js 14 App Router**, **Tailwind CSS v3**, and **Framer Motion**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Tool | Version |
|------|---------|
| Next.js | ^14 |
| React | ^18 |
| Tailwind CSS | ^3 |
| Framer Motion | ^11 |
| next/font | built-in |

## Brand Colors

| Role | HEX |
|------|-----|
| Deep Emerald (Primary) | `#0F3D2E` |
| Warm Ivory (Secondary) | `#F6F1E8` |
| Antique Gold (Accent) | `#C6A75E` |
| Charcoal Ink (Neutral) | `#2A2A2A` |

## Pages

- `/` — Home (Hero, The House, New Arrivals, Lookbook banner)
- `/collections` — Filterable product grid
- `/about` — Brand story & values
- `/contact` — Contact form

## File Structure

```
zayra-co/
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx
│   ├── collections/page.jsx
│   ├── about/page.jsx
│   └── contact/page.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ProductCard.jsx
│   └── SectionDivider.jsx
├── lib/
│   └── products.js
├── public/
│   └── images/        ← (empty — add your product images here)
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```
