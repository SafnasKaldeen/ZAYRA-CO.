// lib/products.js — single source of truth, exports both names
export const products = [
  {
    id: 'al-noor-abaya',
    name: 'Al Noor Abaya',
    category: 'Abayas',
    price: 'LKR 18,500',
    images: [
      'https://images.pexels.com/photos/8002584/pexels-photo-8002584.jpeg',
      'https://images.pexels.com/photos/31568720/pexels-photo-31568720/free-photo-of-young-woman-in-traditional-black-abaya-outdoors.jpeg',
      'https://images.pexels.com/photos/31826008/pexels-photo-31826008.jpeg',
    ],
    image: 'https://images.pexels.com/photos/8002584/pexels-photo-8002584.jpeg',
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a' },
      { name: 'Deep Emerald',   hex: '#0F3D2E' },
      { name: 'Ivory Sand',     hex: '#F6F1E8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'The Al Noor Abaya is a study in quiet luxury — crafted from fluid crepe with a relaxed open-front silhouette. Designed for the woman who moves through the world with intention, it layers effortlessly over any ensemble.',
    details: {
      material: '100% Premium Crepe — Lightweight, breathable, wrinkle-resistant',
      fit:      "Relaxed open-front silhouette. Model is 5'7\" wearing size S.",
      care:     'Hand wash cold or dry clean. Do not tumble dry. Iron on low heat.',
    },
  },
  {
    id: 'zara-linen-coord',
    name: 'Zara Linen Co-ord Set',
    category: 'Co-ords',
    price: 'LKR 14,200',
    images: [
      'https://images.pexels.com/photos/17290211/pexels-photo-17290211.jpeg',
      'https://images.pexels.com/photos/1832322/pexels-photo-1832322.jpeg',
      'https://images.pexels.com/photos/32347431/pexels-photo-32347431/free-photo-of-elegant-woman-in-pink-hijab-fashion-portrait.jpeg',
    ],
    image: 'https://images.pexels.com/photos/17290211/pexels-photo-17290211.jpeg',
    colors: [
      { name: 'Natural Linen', hex: '#C8B89A' },
      { name: 'Sage',          hex: '#8A9E85' },
      { name: 'Ivory Sand',    hex: '#F6F1E8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Relaxed tailoring meets refined ease. The Zara Linen Co-ord is woven from pure linen for breathable all-day comfort — a considered set for the modern modest wardrobe.',
    details: {
      material: '100% Pure Linen — Pre-washed for softness',
      fit:      "Wide-leg trousers + relaxed blouse. Model is 5'6\" wearing size M.",
      care:     'Machine wash gentle cold. Tumble dry low. Iron while slightly damp.',
    },
  },
  {
    id: 'nadia-occasion-dress',
    name: 'Nadia Occasion Dress',
    category: 'Occasion Wear',
    price: 'LKR 22,000',
    images: [
      'https://images.pexels.com/photos/29099688/pexels-photo-29099688.jpeg',
      'https://images.pexels.com/photos/35497962/pexels-photo-35497962/free-photo-of-elegant-woman-in-white-lace-dress-and-hijab-indoors.jpeg',
      'https://images.pexels.com/photos/16786332/pexels-photo-16786332/free-photo-of-woman-in-a-white-dress-holding-a-bouquet.jpeg',
    ],
    image: 'https://images.pexels.com/photos/29099688/pexels-photo-29099688.jpeg',
    colors: [
      { name: 'Antique Gold',  hex: '#C6A75E' },
      { name: 'Dusty Rose',    hex: '#C4A09A' },
      { name: 'Midnight Navy', hex: '#1B2A4A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Conceived for celebration, the Nadia Occasion Dress is draped in silk-blend chiffon with delicate embroidered detailing at the cuffs. Fluid, luminous, and effortlessly elegant.',
    details: {
      material: 'Silk-blend chiffon with embroidered trim',
      fit:      "Floor-length, flared skirt. Model is 5'7\" wearing size S.",
      care:     'Dry clean only. Store on padded hanger.',
    },
  },
  {
    id: 'sofiyah-modest-dress',
    name: 'Sofiya Modest Dress',
    category: 'Modest Dresses',
    price: 'LKR 16,800',
    images: [
      'https://images.pexels.com/photos/17290211/pexels-photo-17290211.jpeg',
      'https://images.pexels.com/photos/14696275/pexels-photo-14696275.jpeg',
      'https://images.pexels.com/photos/35344028/pexels-photo-35344028.jpeg',
    ],
    image: 'https://images.pexels.com/photos/17290211/pexels-photo-17290211.jpeg',
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a' },
      { name: 'Mocha',          hex: '#8B6F56' },
      { name: 'Ivory Sand',     hex: '#F6F1E8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'The Sofiya Modest Dress is a wardrobe anchor — understated in form, exceptional in feel. Cut from our signature matte jersey for a smooth, non-clingy drape that moves beautifully.',
    details: {
      material: 'Matte jersey — Stretch-woven for comfort and shape retention',
      fit:      "Relaxed A-line silhouette. Model is 5'6\" wearing size S.",
      care:     'Machine wash cold. Hang to dry. Do not bleach.',
    },
  },
  {
    id: 'hana-evening-abaya',
    name: 'Hana Evening Abaya',
    category: 'Abayas',
    price: 'LKR 24,500',
    images: [
      'https://images.pexels.com/photos/13791572/pexels-photo-13791572.jpeg',
      'https://images.pexels.com/photos/32178223/pexels-photo-32178223/free-photo-of-elegant-portrait-of-woman-in-stylish-abaya.jpeg',
      'https://images.pexels.com/photos/35324621/pexels-photo-35324621.jpeg',
    ],
    image: 'https://images.pexels.com/photos/13791572/pexels-photo-13791572.jpeg',
    colors: [
      { name: 'Midnight Black', hex: '#1a1a1a' },
      { name: 'Deep Emerald',   hex: '#0F3D2E' },
      { name: 'Antique Gold',   hex: '#C6A75E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Reserved for evenings that deserve something exceptional. The Hana Evening Abaya is rendered in premium satin-back crepe — a fabric that holds its form through the night while retaining an ethereal luminosity.',
    details: {
      material: 'Satin-back crepe — Lustrous, fluid, and weighty',
      fit:      "Structured shoulders, full-length. Model is 5'8\" wearing size M.",
      care:     'Dry clean only. Do not wring or twist.',
    },
  },
  {
    id: 'leila-wrap-dress',
    name: 'Leila Wrap Dress',
    category: 'Modest Dresses',
    price: 'LKR 13,900',
    images: [
      'https://images.pexels.com/photos/35461298/pexels-photo-35461298.jpeg',
      'https://images.pexels.com/photos/8350510/pexels-photo-8350510.jpeg',
      'https://images.pexels.com/photos/17893405/pexels-photo-17893405.jpeg',
    ],
    image: 'https://images.pexels.com/photos/35461298/pexels-photo-35461298.jpeg',
    colors: [
      { name: 'Dusty Rose', hex: '#C4A09A' },
      { name: 'Sage',       hex: '#8A9E85' },
      { name: 'Ivory Sand', hex: '#F6F1E8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'The Leila Wrap Dress is your daily companion — a forgiving wrap silhouette in soft viscose that flatters every form. Modest without compromise, effortless without effort.',
    details: {
      material: 'Viscose-blend — Soft, breathable, and drapes beautifully',
      fit:      "Adjustable wrap tie. Model is 5'6\" wearing size S.",
      care:     'Hand wash cold. Lay flat to dry. Iron on low.',
    },
  },
];

// Both names point to same data — no duplication
export const shopProducts = products;