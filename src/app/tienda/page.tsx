import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/firestore";
import { formatCOP } from "@/lib/currency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Force dynamic fetch so we get live products
export const dynamic = "force-dynamic";

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="mb-16">
            <span className="text-[#0A192F] font-black text-xs tracking-[0.3em] uppercase mb-3 block">
              Catálogo Completo
            </span>
            <h1 
              className="text-4xl lg:text-5xl font-black text-[#0A192F]" 
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              Nuestros Productos
            </h1>
          </div>

          {/* Grid */}
          {products.length === 0 ? (
            <div className="py-20 text-center border-t border-slate-100">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">inventory_2</span>
              <h3 className="text-xl font-bold text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                Aún no hay productos en la tienda
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {products.map((product) => (
                <Link href={`/tienda/${product.id}`} key={product.id} className="group cursor-pointer block">
                  <div className="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-6 relative transition-all duration-500 border border-slate-100 group-hover:border-[#0A192F]/20 group-hover:shadow-xl group-hover:bg-white">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#0A192F] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                      {product.category}
                    </p>
                    <h4
                      className="font-extrabold text-xl text-[#0A192F] leading-tight"
                      style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                    >
                      {product.name}
                    </h4>
                    <p className="text-xl font-black text-[#0A192F] pt-1" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                      {formatCOP(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
