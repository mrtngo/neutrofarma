import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface HomepageSettings {
  // SEO & Branding
  siteTitle: string;
  siteDescription: string;
  siteLogo: string;

  // Testimonial
  testimonialQuote: string;
  testimonialStat1Value: string;
  testimonialStat1Label: string;
  testimonialStat1Desc: string;
  testimonialStat2Value: string;
  testimonialStat2Label: string;
  testimonialStat2Desc: string;

  // Protocols Section
  protocolsTitle: string;
  protocolsSubtitle: string;

  // Categories (Bento)
  cat1Title: string;
  cat1Subtitle: string;
  cat1Image: string;
  cat1MobileImage?: string;
  cat1Link: string;
  cat1ButtonText?: string;

  cat2Title: string;
  cat2Subtitle: string;
  cat2Image: string;
  cat2MobileImage?: string;
  cat2Link: string;
  cat2ButtonText?: string;

  cat3Title: string;
  cat3Image?: string;
  cat3MobileImage?: string;
  cat3Link: string;
  cat3ButtonText?: string;

  cat4Title: string;
  cat4Image?: string;
  cat4MobileImage?: string;
  cat4Link: string;
  cat4ButtonText?: string;

  // Footer
  footerTagline?: string;
  footerCol1Title: string;
  footerCol1Links: { label: string; url: string }[];
  footerCol2Title: string;
  footerCol2Links: { label: string; url: string }[];
  footerCol3Title: string;
  footerCol3Links: { label: string; url: string }[];

  // Tracking
  gtmId?: string;
  gaId?: string;
  metaPixelId?: string;
}

const DEFAULT_SETTINGS: HomepageSettings = {
  siteTitle: "NEUTROFARMA | Nutrición Clínica de Elite",
  siteDescription: "NEUTROFARMA entrega nutrición de grado clínico para el estilo de vida de alto rendimiento. Precisión científica, pureza verificada.",
  siteLogo: "/logo.jpg",

  testimonialQuote: "En medicina profesional, la transparencia es innegociable. NEUTROFARMA establece el estándar de oro en eficacia clínica.",
  testimonialStat1Value: "99.9%",
  testimonialStat1Label: "Bio-Disponibilidad",
  testimonialStat1Desc: "Tasa de absorción máxima verificada mediante análisis de suero clínico de terceros.",
  testimonialStat2Value: "0.00%",
  testimonialStat2Label: "Rellenos Artificiales",
  testimonialStat2Desc: "Nuestro compromiso con la ciencia limpia significa cero aditivos, cero rellenos, cero compromisos.",
  
  protocolsTitle: "Protocolos por Diseño",
  protocolsSubtitle: "Sistemas curados para resultados fisiológicos específicos.",

  cat1Title: "Proteínas Estructurales",
  cat1Subtitle: "Bloques Constructores",
  cat1Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRth1ub7kSzNcQlzkQD3TfwIAgIp0SVJrsqXUmAggFvXG0ICf7KglopBNJDsx6-BBpDkZViP61t5CTSO3pEu4o_AmMgqsBK7Z30j2GlGb6yAqbueb85E5X4Ns6xQqeWW3XKUDI5mHjNQS6X8R8wCHH-04xIIDbMiaqCG6c_nWbMduYRJoJfTrwfRCTriVCM0uIIBWzfNMYaL4psQbT595uKiq2YaZ5JvRdQmJtLkBmrvCxQVOawcewQA6UMQqBHAewMxkYC4ZFFhw",
  cat1MobileImage: "",
  cat1Link: "/tienda?c=Proteína",
  cat1ButtonText: "Explorar Colección",

  cat2Title: "Vitaminas de Absorción Rápida",
  cat2Subtitle: "Disponibilidad Inmediata",
  cat2Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-W-1Z_H2a8W5z6sS4r0B29b5tY0a0l2F18y4Qv3D1H1-d6F0i4k9B-N5lQw3P3S6y4O9Y7-I3g6A3D4v8a7o6j6Q7O0l1E6f4S4G1W4s8M5g2v6f2b6i9W2E9V5b3S3-a2l2y8E7p8m8g1a2g5e9h0y0H3I3v3g0H9t6j5G0q8X7B8_p4S2l6b9U4",
  cat2MobileImage: "",
  cat2Link: "/tienda?c=Vitaminas",
  cat2ButtonText: "",

  cat3Title: "Salud Mental",
  cat3Image: "",
  cat3MobileImage: "",
  cat3Link: "/tienda?c=Salud%20Mental",
  cat3ButtonText: "",

  cat4Title: "Equipamiento",
  cat4Image: "",
  cat4MobileImage: "",
  cat4Link: "/tienda?c=Equipamiento",
  cat4ButtonText: "",

  footerTagline: "Obtén acceso anticipado a investigaciones científicas, lanzamientos de productos y protocolos de rendimiento exclusivos.",
  footerCol1Title: "Ciencia",
  footerCol1Links: [
    { label: "Ensayos Clínicos", url: "#" },
    { label: "Resultados de Lab", url: "#" },
    { label: "Consejo Asesor", url: "#" }
  ],
  footerCol2Title: "Tienda",
  footerCol2Links: [
    { label: "Proteínas", url: "/tienda" },
    { label: "Vitaminas", url: "/tienda" },
    { label: "Suscríbete y Ahorra", url: "/tienda" }
  ],
  footerCol3Title: "Social",
  footerCol3Links: [
    { label: "Instagram", url: "#" },
    { label: "Twitter", url: "#" },
    { label: "Strava", url: "#" }
  ],

  gtmId: "",
  gaId: "",
  metaPixelId: "",
};

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const snap = await getDoc(doc(db, "settings", "homepage"));
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() } as HomepageSettings;
    }
  } catch (e) {
    console.warn("Failed to fetch settings, using defaults.", e);
  }
  return DEFAULT_SETTINGS;
}

export async function saveHomepageSettings(settings: Partial<HomepageSettings>): Promise<void> {
  await setDoc(doc(db, "settings", "homepage"), settings, { merge: true });
}
