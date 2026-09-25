import type { Metadata } from "next";
import React from "react";
import { getProductBySlug } from "@/lib/data/products";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı | BAGGY STREET",
    };
  }

  const title = `${product.name} | BAGGY STREET`;
  const description = `${product.shortDescription} 460 GSM saf pamuk, tavizsiz boxy kalıp. 2.000 ₺ üzeri ücretsiz kargo güvencesiyle.`;
  const imageUrl = product.images[0] || "/images/products/drill-logo-hoodie.webp";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
      type: "website",
      siteName: "BAGGY STREET",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "BAGGY STREET",
        },
        offers: {
          "@type": "Offer",
          url: `https://baggystreet.com/product/${product.slug}`,
          priceCurrency: "TRY",
          price: product.price,
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: product.sizes && product.sizes.length > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "BAGGY STREET",
          },
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
