import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";

export const metadata: Metadata = {
  title: "حذف الحساب والبيانات",
  description:
    "تعليمات حذف حسابك وبياناتك من لعبة البعاتي — اطلب إزالة معلوماتك بشكل دائم وتعرّف على البيانات التي يتم حذفها.",
  alternates: { canonical: "/delete-data" },
  openGraph: {
    title: "حذف الحساب والبيانات | البعاتي",
    description:
      "تعليمات حذف حسابك وبياناتك بشكل دائم من لعبة البعاتي.",
    url: "/delete-data",
    type: "article",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${siteUrl}/delete-data/#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteUrl}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "حذف الحساب والبيانات",
      item: `${siteUrl}/delete-data`,
    },
  ],
};

export default function DeleteDataLayout({
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
