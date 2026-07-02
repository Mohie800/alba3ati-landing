import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق لعبة البعاتي — للدعم، الاقتراحات، الإبلاغ عن المشاكل، أو الاستفسارات. نسعد بسماع رأيك.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "تواصل معنا | البعاتي",
    description:
      "تواصل مع فريق البعاتي للدعم والاقتراحات والاستفسارات.",
    url: "/contact",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteUrl}/contact/#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteUrl}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "تواصل معنا",
      item: `${siteUrl}/contact`,
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
