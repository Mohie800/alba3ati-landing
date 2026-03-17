import type { Metadata } from "next";
import { Cairo, Reem_Kufi } from "next/font/google";
import "./globals.css";

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
  title: "لعبة البعاتي",
  description:
    "البعاتي لعبة جماعية مستوحاة من التراث السوداني. العب مع أصدقائك، اكتشف الأدوار السرية، واكشف البعاتي قبل فوات الأوان! متوفرة على iOS و Android.",
  openGraph: {
    title: "البعاتي - لعبة جماعية مستوحاة من التراث السوداني",
    description:
      "البعاتي لعبة جماعية مستوحاة من التراث السوداني. العب مع أصدقائك، اكتشف الأدوار السرية، واكشف البعاتي قبل فوات الأوان!",
    locale: "ar",
    type: "website",
  },
  icons: "/icon1.png",
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
