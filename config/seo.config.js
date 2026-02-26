// seo.config.js
// ─────────────────────────────────────────────────────────────────────────────
// Central SEO configuration for ZAYRA CO.
// Includes per-route builders for: product, collection, static pages.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name:        'ZAYRA CO.',
  tagline:     'Luxury in Every Layer.',
  description: 'Premium modest wear fashion house from Sri Lanka. Discover curated collections crafted for the modern woman.',
  url:         'https://zayra-co.vercel.app',         // ← update to your live domain
  locale:      'en_US',

  ogImage: {
    url:    '/og-image.jpg',                  // place in /public — 1200×630px
    width:  1200,
    height: 630,
    alt:    'ZAYRA CO. — Luxury in Every Layer.',
  },

  twitter: {
    card:    'summary_large_image',
    site:    '@zayraco',                      // ← update
    creator: '@zayraco',
  },

  icons: {
    icon:    '/favicon.ico',
    shortcut:'/favicon-16x16.png',
    apple:   '/apple-touch-icon.png',
    other: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },

  robots: {
    index:    true,
    follow:   true,
    nocache:  false,
    googleBot: {
      index:             true,
      follow:            true,
      noimageindex:      false,
      'max-video-preview':  -1,
      'max-image-preview': 'large',
      'max-snippet':        -1,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Base builder — used by all routes
// ─────────────────────────────────────────────────────────────────────────────
export function buildMetadata({ title, description, path = '', image, type = 'website' } = {}) {
  const pageTitle       = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const pageDescription = description || siteConfig.description;
  const pageUrl         = `${siteConfig.url}${path}`;
  const pageImage       = image || siteConfig.ogImage;

  return {
    metadataBase: new URL(siteConfig.url),
    title:        pageTitle,
    description:  pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title:       pageTitle,
      description: pageDescription,
      url:         pageUrl,
      siteName:    siteConfig.name,
      locale:      siteConfig.locale,
      type,
      images:      [pageImage],
    },
    twitter: {
      card:        siteConfig.twitter.card,
      site:        siteConfig.twitter.site,
      creator:     siteConfig.twitter.creator,
      title:       pageTitle,
      description: pageDescription,
      images:      [pageImage.url],
    },
    icons:   siteConfig.icons,
    robots:  siteConfig.robots,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT route builder
// Pass the full product object fetched from your DB/API.
//
// Usage in app/shop/[slug]/page.jsx:
//   export async function generateMetadata({ params }) {
//     const product = await getProduct(params.slug);
//     return buildProductMetadata(product);
//   }
// ─────────────────────────────────────────────────────────────────────────────
export function buildProductMetadata(product) {
  const image = product.images?.[0];

  return {
    ...buildMetadata({
      title:       product.name,
      description: product.description,
      path:        `/shop/${product.slug}`,
      type:        'website',        // ← was 'product', not supported by Next.js
      image:       image
        ? {
            url:    image.url,
            width:  image.width  || 1200,
            height: image.height || 1200,
            alt:    product.name,
          }
        : undefined,
    }),

    openGraph: {
      ...buildMetadata({ path: `/shop/${product.slug}` }).openGraph,
      title:       `${product.name} | ${siteConfig.name}`,
      description: product.description,
      url:         `${siteConfig.url}/shop/${product.slug}`,
      type:        'website',        // ← was 'product', not supported by Next.js
      images:      image
        ? [{ url: image.url, width: image.width || 1200, height: image.height || 1200, alt: product.name }]
        : [siteConfig.ogImage],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION route builder
// Usage in app/collections/[slug]/page.jsx:
//   export async function generateMetadata({ params }) {
//     const collection = await getCollection(params.slug);
//     return buildCollectionMetadata(collection);
//   }
// ─────────────────────────────────────────────────────────────────────────────
export function buildCollectionMetadata(collection) {
  return buildMetadata({
    title:       collection.name,
    description: collection.description,
    path:        `/collections/${collection.slug}`,
    image:       collection.coverImage
      ? {
          url:    collection.coverImage.url,
          width:  collection.coverImage.width  || 1200,
          height: collection.coverImage.height || 630,
          alt:    collection.name,
        }
      : undefined,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD schema builders — use these in your page components as:
//   <script type="application/ld+json" dangerouslySetInnerHTML=
//     {{ __html: JSON.stringify(productJsonLd(product)) }} />
// ─────────────────────────────────────────────────────────────────────────────

// Organisation — used in root layout
export const orgJsonLd = {
  '@context':  'https://schema.org',
  '@type':     'ClothingStore',
  name:        'ZAYRA CO.',
  url:         siteConfig.url,
  logo:        `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  address: {
    '@type':          'PostalAddress',
    addressCountry:   'LK',
  },
  sameAs: [
    'https://www.instagram.com/zayraco',      // ← update
    'https://www.facebook.com/zayraco',       // ← update
  ],
};

// Product page
export function productJsonLd(product) {
  return {
    '@context':   'https://schema.org',
    '@type':      'Product',
    name:         product.name,
    description:  product.description,
    url:          `${siteConfig.url}/shop/${product.slug}`,
    image:        product.images?.map(img => img.url) || [],
    brand: {
      '@type': 'Brand',
      name:    'ZAYRA CO.',
    },
    offers: {
      '@type':         'Offer',
      priceCurrency:   'LKR',                 // ← update currency if needed
      price:           product.price,
      availability:    product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url:             `${siteConfig.url}/shop/${product.slug}`,
    },
  };
}

// Collection / ItemList page
export function collectionJsonLd(collection, products = []) {
  return {
    '@context':       'https://schema.org',
    '@type':          'ItemList',
    name:             collection.name,
    description:      collection.description,
    url:              `${siteConfig.url}/collections/${collection.slug}`,
    numberOfItems:    products.length,
    itemListElement:  products.map((p, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       p.name,
      url:        `${siteConfig.url}/shop/${p.slug}`,
      image:      p.images?.[0]?.url,
    })),
  };
}

// BreadcrumbList — pass an array of { name, path } steps
export function breadcrumbJsonLd(crumbs) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   crumbs.map((crumb, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       crumb.name,
      item:       `${siteConfig.url}${crumb.path}`,
    })),
  };
}