import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.app";
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
    "لعبة البعاتي",
    "البعاتي",
    "لعبة أدوار",
    "لعبة اجتماعية",
    "لعبة سودانية",
    "ألعاب جماعية",
    "لعبة صوتية",
    "Mafia game",
    "social deduction game",
    "Sudanese game",
  ],
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
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
    images: [
      {
        url: "/icon1.png",
        width: 512,
        height: 512,
        alt: "شعار لعبة البعاتي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "لعبة البعاتي | لعبة أدوار اجتماعية سودانية",
    description:
      "العب مع أصدقائك، اكتشف الأدوار السرية، واكشف البعاتي قبل فوات الأوان.",
    images: ["/icon1.png"],
  },
  icons: {
    icon: "/icon1.png",
    apple: "/icon1.png",
    shortcut: "/icon1.png",
  },
  manifest: "/manifest.webmanifest",
  category: "games",
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
    </html>
  );
}
