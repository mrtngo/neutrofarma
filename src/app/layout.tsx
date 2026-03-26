import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "NEUTROFARMA | Nutrición Clínica de Elite",
  description:
    "NEUTROFARMA entrega nutrición de grado clínico para el estilo de vida de alto rendimiento. Precisión científica, pureza verificada.",
  keywords: ["suplementos", "proteínas", "vitaminas", "bienestar", "nutrición deportiva", "neutrofarma"],
  openGraph: {
    title: "NEUTROFARMA | Nutrición Clínica de Elite",
    description: "Ciencia pura. Vitalidad máxima.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={`${lexend.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
