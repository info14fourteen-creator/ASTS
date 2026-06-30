import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.site.ru"),
  title: {
    default: "ASTS app.site.ru",
    template: "%s | ASTS app.site.ru",
  },
  description:
    "AI tender operations workspace for primary-source procurement, pre-win funnel, and post-win execution.",
  applicationName: "ASTS",
  openGraph: {
    title: "ASTS app.site.ru",
    description:
      "AI tender operations workspace for primary-source procurement, pre-win funnel, and post-win execution.",
    siteName: "ASTS",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#142126",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
