import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية للعبة البعاتي — تعرّف على البيانات التي نجمعها، كيفية استخدامها، وحقوقك في التحكم بمعلوماتك داخل التطبيق.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "سياسة الخصوصية | البعاتي",
    description:
      "سياسة الخصوصية للعبة البعاتي — البيانات التي نجمعها وكيفية استخدامها وحماية خصوصيتك.",
    url: "/privacy",
    type: "article",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteUrl}/privacy/#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteUrl}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "سياسة الخصوصية",
      item: `${siteUrl}/privacy`,
    },
  ],
};

export default function PrivacyLayout({
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
