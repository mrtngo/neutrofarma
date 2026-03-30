import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface HomepageSettings {
  // Testimonial
  testimonialQuote: string;
  testimonialStat1Value: string;
  testimonialStat1Label: string;
  testimonialStat1Desc: string;
  testimonialStat2Value: string;
  testimonialStat2Label: string;
  testimonialStat2Desc: string;

  // Categories (Bento)
  cat1Title: string;
  cat1Subtitle: string;
  cat1Image: string;
  cat1Link: string;

  cat2Title: string;
  cat2Subtitle: string;
  cat2Image: string;
  cat2Link: string;

  cat3Title: string;
  cat3Link: string;

  cat4Title: string;
  cat4Link: string;
}

const DEFAULT_SETTINGS: HomepageSettings = {
  testimonialQuote: "En medicina profesional, la transparencia es innegociable. NEUTROFARMA establece el estándar de oro en eficacia clínica.",
  testimonialStat1Value: "99.9%",
  testimonialStat1Label: "Bio-Disponibilidad",
  testimonialStat1Desc: "Tasa de absorción máxima verificada mediante análisis de suero clínico de terceros.",
  testimonialStat2Value: "0.00%",
  testimonialStat2Label: "Rellenos Artificiales",
  testimonialStat2Desc: "Nuestro compromiso con la ciencia limpia significa cero aditivos, cero rellenos, cero compromisos.",
  
  cat1Title: "Proteínas Estructurales",
  cat1Subtitle: "Bloques Constructores",
  cat1Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRth1ub7kSzNcQlzkQD3TfwIAgIp0SVJrsqXUmAggFvXG0ICf7KglopBNJDsx6-BBpDkZViP61t5CTSO3pEu4o_AmMgqsBK7Z30j2GlGb6yAqbueb85E5X4Ns6xQqeWW3XKUDI5mHjNQS6X8R8wCHH-04xIIDbMiaqCG6c_nWbMduYRJoJfTrwfRCTriVCM0uIIBWzfNMYaL4psQbT595uKiq2YaZ5JvRdQmJtLkBmrvCxQVOawcewQA6UMQqBHAewMxkYC4ZFFhw",
  cat1Link: "/tienda?c=Proteína",

  cat2Title: "Micronutrientes",
  cat2Subtitle: "Soporte diario de grado clínico.",
  cat2Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhWoiGEsgK59tXjDgBv6SUAsD44IlV7MTxj7sgLIarTdgOBIP3VedDKVC2UOY2FslHskr6jUS5QHDVB-RuQjOy0R_MbpYG0qtbQG9MVYzfSfYR8esR2dpV7q8sUkC2RzPNfZWf7Z-i2739BS_XiUTuvFUOv52BN8gf70ahp74U8L_3Z0eKqrsLzz2OgyPeztry7Vl76H4zL2EN7gMPQBDxXifxmGF0FL1lkL7glv0L39EMGQSSFPQRtFcseo4LAISY1rELbccA",
  cat2Link: "/tienda?c=Vitaminas",

  cat3Title: "Bienestar",
  cat3Link: "/tienda?c=Bienestar",
  
  cat4Title: "Equipamiento",
  cat4Link: "/tienda?c=Equipamiento",
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
