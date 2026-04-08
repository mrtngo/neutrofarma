"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getHomepageSettings, HomepageSettings } from "@/lib/settings";

export default function Footer() {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);

  useEffect(() => {
    getHomepageSettings().then(setSettings).catch(console.error);
  }, []);
  return (
    <footer className="bg-[#0A192F] text-white pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 pb-20 border-b border-white/10">
          {/* Newsletter */}
          <div className="space-y-8">
            <h3
              className="text-5xl font-black leading-none"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              ÚNETE AL<br />
              <span className="gradient-text">CÍRCULO ELITE.</span>
            </h3>
            <p className="text-slate-400 max-w-md text-lg font-medium">
              Obtén acceso anticipado a investigaciones científicas, lanzamientos de productos y protocolos de rendimiento exclusivos.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-8 py-4 text-white focus:ring-2 focus:ring-white/40 focus:outline-none transition-all placeholder:text-white/30"
              />
              <button
                type="submit"
                className="bg-white text-[#0A192F] px-10 py-4 font-black rounded-full hover:bg-slate-100 transition-colors uppercase text-xs tracking-widest"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Suscribirse
              </button>
            </form>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            {[1, 2, 3].map((colNum) => {
              if (!settings) return null;
              const titleKey = `footerCol${colNum}Title` as keyof HomepageSettings;
              const linksKey = `footerCol${colNum}Links` as keyof HomepageSettings;
              const title = settings[titleKey] as string;
              const links = (settings[linksKey] as {label: string, url: string}[]) || [];
              
              if (!title && links.length === 0) return null;
              
              return (
                <div key={colNum} className="space-y-6">
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">{title}</h4>
                  <ul className="space-y-4 font-bold text-sm">
                    {links.map((link, idx) => link.label ? (
                      <li key={idx}>
                        <Link href={link.url || "#"} className="hover:text-slate-400 transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ) : null)}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xl font-black uppercase tracking-tighter" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            NEUTROFARMA
          </p>
          <p className="text-xs font-medium text-white/40">© 2026 NEUTROFARMA. PARA LA ELITE.</p>
        </div>
      </div>
    </footer>
  );
}
