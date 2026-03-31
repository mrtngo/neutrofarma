"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FAB() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <Link 
      href="https://wa.me/573052300587?text=Hola,%20estoy%20buscando%20asesor%C3%ADa%20sobre%20los%20suplementos%20Neutrofarma." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 flex w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 group cursor-pointer bg-transparent border-0"
      aria-label="WhatsApp"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl drop-shadow-2xl">
        <Image src="/whatsapp-logo.png" alt="WhatsApp" fill className="object-contain" unoptimized />
      </div>
      <span className="absolute right-full mr-4 bg-white text-[#0A192F] px-6 py-3 rounded-2xl text-xs font-black tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl translate-x-4 group-hover:translate-x-0">
        Asesórate
      </span>
    </Link>
  );
}
