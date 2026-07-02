import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// Google Analytics 4 measurement ID. Override with NEXT_PUBLIC_GA_ID if needed.
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-141C8EGZXW";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";
const metadataBase = new URL(siteUrl);

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "لعبة البعاتي | لعبة أدوار اجتماعية سودانية",
    template: "%s | البعاتي",
  },
  applicationName: "البعاتي",
  description:
    "البعاتي لعبة جماعية مستوحاة من التراث السوداني. العب مع أصدقائك، اكتشف الأدوار السرية، واكشف البعاتي قبل فوات الأوان! متوفرة على iOS و Android.",
  keywords: [
    // Brand
    "لعبة البعاتي",
    "البعاتي",
    "بعاتي",
    "تحميل لعبة البعاتي",
    "لعبة البعاتي اونلاين",
    "لعبة البعاتي تنزيل",
    // Genre — Arabic
    "لعبة أدوار",
    "لعبة أدوار سرية",
    "لعبة اجتماعية",
    "لعبة سودانية",
    "ألعاب سودانية",
    "ألعاب جماعية",
    "العاب جماعية اونلاين",
    "لعبة صوتية",
    "العاب صوتية جماعية",
    "لعبة مافيا",
    "لعبة مافيا عربية",
    "لعبة مافيا صوتية",
    "لعبة الذئاب",
    "لعبة الجاسوس",
    "من هو الجاسوس",
    "لعبة قروب",
    "العاب مع الاصدقاء",
    "العاب مع الاصحاب",
    "ألعاب أونلاين",
    "لعبة تخمين الأدوار",
    // Roles / in-game terms
    "العمدة",
    "الكاشف",
    "ابو جنزير",
    "وَد الزلط",
    "شيخ الدمازين",
    "بله اب سيف",
    // English
    "Alba3ati",
    "Alba3ati game",
    "download Alba3ati",
    "Mafia game",
    "Arabic mafia game",
    "social deduction game",
    "hidden roles game",
    "voice chat party game",
    "party game",
    "Sudanese game",
    "werewolf game",
  ],
  authors: [{ name: "البعاتي", url: siteUrl }],
  creator: "البعاتي",
  publisher: "البعاتي",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "البعاتي - لعبة جماعية مستوحاة من التراث السوداني",
    description:
      "البعاتي لعبة جماعية مستوحاة من التراث السوداني. العب مع أصدقائك، اكتشف الأدوار السرية، واكشف البعاتي قبل فوات الأوان!",
    url: "/",
    siteName: "البعاتي",
    locale: "ar_SD",
    type: "website",
    // Image comes from the file-based `opengraph-image.tsx` (1200×630).
  },
  twitter: {
    card: "summary_large_image",
    title: "لعبة البعاتي | لعبة أدوار اجتماعية سودانية",
    description:
      "العب مع أصدقائك، اكتشف الأدوار السرية، واكشف البعاتي قبل فوات الأوان.",
    // Image comes from the file-based `twitter-image.tsx` (1200×630).
  },
  icons: {
    icon: "/icon1.png",
    apple: "/icon1.png",
    shortcut: "/icon1.png",
  },
  manifest: "/manifest.webmanifest",
  category: "games",
  // Set GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION in the environment
  // to emit the verification <meta> tags for Search Console & Bing Webmaster.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${reemKufi.variable} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  );
}
