import Link from "next/link";

export default function FAB() {
  return (
    <Link 
      href="https://wa.me/573000000000?text=Hola,%20estoy%20buscando%20asesor%C3%ADa%20sobre%20los%20suplementos%20Neutrofarma." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 hidden md:flex bg-[#25D366] text-white w-16 h-16 rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group border border-white/20 cursor-pointer"
    >
      <span className="material-symbols-outlined text-3xl">chat</span>
      <span className="absolute right-full mr-4 bg-white text-[#0A192F] px-6 py-3 rounded-2xl text-xs font-black tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl translate-x-4 group-hover:translate-x-0">
        Soporte Clínico
      </span>
    </Link>
  );
}
