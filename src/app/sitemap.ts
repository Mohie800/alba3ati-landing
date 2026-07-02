import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alba3ati.mohyeldeen.dev";

const routes = [
  "",
  "how-to-play",
  "privacy",
  "community",
  "contact",
  "delete-data",
];

// Role artwork — surfaced in Google Images via the sitemap image extension.
const roleImages = [
  "RoleBa3ati",
  "RoleBa3atiKabeer",
  "RoleAl3omda",
  "RoleDamazeen",
  "RoleSitAlwada3",
  "RoleBallahAbuSeif",
  "RoleAbuJanzeer",
  "RoleJenabu",
  "RoleWadAlzalat",
].map((name) => `${siteUrl}/roles/${name}.png`);

// Extra images to associate with specific routes.
const routeImages: Record<string, string[]> = {
  "": [`${siteUrl}/opengraph-image`, `${siteUrl}/icon1.png`, ...roleImages],
  "how-to-play": [`${siteUrl}/icon1.png`, ...roleImages],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
    ...(routeImages[route] ? { images: routeImages[route] } : {}),
  }));
}
