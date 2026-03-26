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
              className="p-2 hover:bg-slate-50 rounded-full transition-colors active:scale-95"
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
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-6 flex flex-col gap-5">
            <Link href="/" className="text-[#0A192F] font-extrabold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="/tienda?c=Melatonina" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Melatonina</Link>
            <Link href="/tienda?c=Magnesio" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Magnesio</Link>
            <Link href="/tienda?c=Creatina" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Creatina</Link>
            <Link href="/tienda" className="text-slate-500 font-bold text-base tracking-wide" style={{ fontFamily: "var(--font-lexend, Lexend)" }} onClick={() => setMenuOpen(false)}>Suplementos</Link>
          </div>
        )}
      </header>
    </>
  );
}
