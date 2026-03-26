"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <nav className="flex items-center justify-between px-6 h-20 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <button
              className="p-2 hover:bg-slate-50 rounded-full transition-colors active:scale-95"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <span className="material-symbols-outlined text-[#0A192F]">menu_open</span>
            </button>
            <Link href="/">
              <h1 className="text-xl font-black text-[#0A192F] tracking-tighter uppercase" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                NEUTROFARMA
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-[#0A192F] font-extrabold text-sm tracking-wide border-b-2 border-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Inicio
            </Link>
            <Link href="/tienda" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Tienda
            </Link>
            <Link href="/vitaminas" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Vitaminas
            </Link>
            <Link href="/bienestar" className="text-slate-500 hover:text-[#0A192F] font-bold text-sm tracking-wide transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              Bienestar
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-slate-50 rounded-full transition-colors active:scale-95" aria-label="Buscar">
              <span className="material-symbols-outlined text-[#0A192F]">search</span>
            </button>
            <button className="p-2.5 hover:bg-slate-50 rounded-full transition-colors active:scale-95 relative" aria-label="Carrito">
              <span className="material-symbols-outlined text-[#0A192F]">local_mall</span>
              <span className="absolute top-2 right-2 bg-[#0A192F] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">2</span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-6 flex flex-col gap-5">
            <Link href="/" className="text-[#0A192F] font-extrabold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="/tienda" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Tienda</Link>
            <Link href="/vitaminas" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Vitaminas</Link>
            <Link href="/bienestar" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Bienestar</Link>
          </div>
        )}
      </header>
    </>
  );
}
