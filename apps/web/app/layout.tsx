import "./globals.css";

export const metadata = {
  title: "ASTS",
  description: "AI tender operations platform",
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
