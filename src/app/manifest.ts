import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "لعبة البعاتي",
    short_name: "البعاتي",
    description:
      "البعاتي لعبة أدوار اجتماعية سودانية. العب مع أصدقائك واكشف البعاتي قبل فوات الأوان.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a2e",
    theme_color: "#c75b39",
    lang: "ar",
    dir: "rtl",
    categories: ["games", "entertainment", "social"],
    icons: [
      {
        src: "/icon1.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon1.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
