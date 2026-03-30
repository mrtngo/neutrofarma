"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getTotalItems, setIsOpen } = useCartStore();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <nav className="flex items-center justify-between px-6 h-20 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <button
              className="p-2 hover:bg-slate-50 rounded-full transition-colors active:scale-95 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span className="material-symbols-outlined text-[#0A192F]">menu_open</span>
            </button>
            <Link href="/" className="flex items-center gap-2.5">
              <Image 
                src="/logo.jpg" 
                alt="Neutrofarma Logo" 
                width={36} 
                height={36} 
                className="rounded-full shadow-sm"
              />
              <h1 className="text-xl font-black text-[#0A192F] tracking-tighter uppercase" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                NEUTROFARMA
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#0A192F] font-extrabold text-sm tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Inicio
            </Link>
            <Link href="/tienda?c=Melatonina" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Melatonina
            </Link>
            <Link href="/tienda?c=Magnesio" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Magnesio
            </Link>
            <Link href="/tienda?c=Creatina" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Creatina
            </Link>
            <Link href="/tienda" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Suplementos
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-slate-50 rounded-full transition-colors active:scale-95" aria-label="Buscar">
              <span className="material-symbols-outlined text-[#0A192F]">search</span>
            </button>
            <button 
              className="p-2.5 hover:bg-slate-50 rounded-full transition-colors active:scale-95 relative" 
              aria-label="Carrito"
              onClick={() => setIsOpen(true)}
            >
              <span className="material-symbols-outlined text-[#0A192F]">local_mall</span>
              {mounted && getTotalItems() > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#0A192F] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-6 flex flex-col gap-6 shadow-xl">
            <Link href="/" className="text-[#0A192F] font-extrabold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="/tienda?c=Melatonina" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Melatonina</Link>
            <Link href="/tienda?c=Magnesio" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Magnesio</Link>
            <Link href="/tienda?c=Creatina" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Creatina</Link>
            <Link href="/tienda" className="text-slate-500 font-bold text-base tracking-wide border-b border-slate-100 pb-4" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Suplementos</Link>
            
            <a 
              href="https://wa.me/573052300587?text=Hola,%20estoy%20buscando%20asesor%C3%ADa%20sobre%20los%20suplementos%20Neutrofarma."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#25D366] font-extrabold text-base tracking-wide bg-[#25D366]/10 px-4 py-3 rounded-2xl w-max"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              onClick={() => setMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 0C5.385 0 .002 5.385.002 12.031c0 2.126.554 4.195 1.606 6.015L0 24l6.111-1.603a12.023 12.023 0 005.92.1.558 12.031 12.031 0 000-24zm0 20.089c-1.782 0-3.524-.482-5.056-1.393l-.36-.215-3.755.986.995-3.662-.236-.375c-.996-1.583-1.52-3.411-1.52-5.285 0-5.59 4.549-10.14 10.138-10.14 5.589 0 10.138 4.55 10.138 10.14 0 5.59-4.549 10.14-10.138 10.14zM17.6 14.113c-.305-.153-1.802-.888-2.08-.99-.279-.101-.482-.153-.685.153-.203.305-.785.99-.963 1.194-.178.203-.357.228-.662.076-2.584-1.295-3.755-2.28-5.35-4.99-.178-.305.025-.457.178-.61.127-.127.305-.355.457-.533.153-.178.203-.305.305-.508.101-.203.051-.381-.026-.533-.076-.153-.685-1.651-.938-2.261-.25-.595-.503-.514-.685-.522-.178-.008-.381-.008-.584-.008-.203 0-.533.076-.812.381C5.228 5.86 4.34 6.8 4.34 8.704c0 1.905 1.194 3.733 1.346 3.937.153.203 2.693 4.113 6.525 5.614 3.832 1.5 3.832.99 4.517.914.685-.076 2.21-.914 2.515-1.778.305-.888.305-1.625.203-1.778-.101-.152-.381-.228-.685-.381z" />
              </svg>
              Asesoría en Línea
            </a>
          </div>
        )}
      </header>
    </>
  );
}
