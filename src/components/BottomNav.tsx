import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 flex justify-around items-center px-6 py-4 bg-[#0A192F] rounded-full z-50 shadow-2xl border border-white/10 backdrop-blur-md">
      <Link href="/" className="text-white bg-white/10 p-2 rounded-full transition-all" aria-label="Inicio">
        <span className="material-symbols-outlined text-2xl">home</span>
      </Link>
      <Link href="/tienda" className="text-white/60 hover:text-white p-2 transition-all" aria-label="Categorías">
        <span className="material-symbols-outlined text-2xl">grid_view</span>
      </Link>
      <Link href="/buscar" className="text-white/60 hover:text-white p-2 transition-all" aria-label="Buscar">
        <span className="material-symbols-outlined text-2xl">search</span>
      </Link>
      <Link href="/carrito" className="text-white/60 hover:text-white p-2 transition-all" aria-label="Carrito">
        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
      </Link>
      <Link href="/cuenta" className="text-white/60 hover:text-white p-2 transition-all" aria-label="Cuenta">
        <span className="material-symbols-outlined text-2xl">account_circle</span>
      </Link>
    </nav>
  );
}
