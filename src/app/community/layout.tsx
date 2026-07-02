import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";

export const metadata: Metadata = {
  title: "إرشادات المجتمع",
  description:
    "إرشادات مجتمع البعاتي — قواعد السلوك والاحترام داخل اللعبة لضمان تجربة ممتعة وآمنة لجميع اللاعبين.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "إرشادات المجتمع | البعاتي",
    description:
      "قواعد السلوك والاحترام داخل لعبة البعاتي لتجربة لعب ممتعة وآمنة للجميع.",
    url: "/community",
    type: "article",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteUrl}/community/#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteUrl}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "إرشادات المجتمع",
      item: `${siteUrl}/community`,
    },
  ],
};

export default function CommunityLayout({
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
