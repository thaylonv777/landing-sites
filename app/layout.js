import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://sites.atriomarketing.site"),
  title: "Átrio · Sites que aparecem no Google",
  description:
    "Criação de sites institucionais e landing pages com SEO profissional. Sites rápidos, sob medida e construídos para serem encontrados por quem procura pelo seu negócio.",
  keywords:
    "criação de sites, site com SEO, site profissional, landing page, agência de sites, site otimizado Google, Átrio Marketing",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sites.atriomarketing.site",
    title: "Átrio · Sites que aparecem no Google",
    description:
      "Sites rápidos, sob medida e com SEO profissional. Construídos para serem encontrados.",
    siteName: "Átrio",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0E1116",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
