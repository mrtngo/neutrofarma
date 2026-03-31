import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import FAB from "@/components/FAB";
import { getHomepageSettings } from "@/lib/settings";
import TrackingScripts from "@/components/TrackingScripts";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-lexend",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getHomepageSettings();
  
  return {
    title: settings.siteTitle,
    description: settings.siteDescription,
    keywords: ["suplementos", "proteínas", "vitaminas", "bienestar", "nutrición deportiva", "neutrofarma"],
    openGraph: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getHomepageSettings();

  return (
    <html lang="es" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={`${lexend.variable} ${manrope.variable} antialiased`}>
        {settings.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {settings.metaPixelId && (
          <noscript>
            <img height="1" width="1" style={{ display: "none" }}
                 src={`https://www.facebook.com/tr?id=${settings.metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        <TrackingScripts gtmId={settings.gtmId} gaId={settings.gaId} metaPixelId={settings.metaPixelId} />
        {children}
        <CartDrawer />
        <FAB />
      </body>
    </html>
  );
}
