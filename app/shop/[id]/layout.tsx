// app/shop/[id]/layout.tsx  ← new file, no 'use client'
import { shopProducts } from '../../../lib/products';
import { buildProductMetadata } from '../../../config/seo.config';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = shopProducts.find(p => p.id === params.id);
  if (!product) return {};

  return buildProductMetadata({
    name:        product.name,
    description: product.description,
    slug:        product.id,
    images:      product.images.map((img: string) => ({ url: img })),
    price:       product.price,
    inStock:     true,
  });
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}