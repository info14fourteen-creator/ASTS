import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASTS app.site.ru",
    short_name: "ASTS",
    description:
      "AI tender operations workspace for primary-source procurement, pre-win funnel, and post-win execution.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f6f8",
    theme_color: "#142126",
    categories: ["business", "productivity"],
    lang: "ru",
    icons: [
      {
        src: "/icons/asts-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/asts-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
