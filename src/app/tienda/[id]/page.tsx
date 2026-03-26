import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/firestore";
import { formatCOP } from "@/lib/currency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

interface DetailsPageProps {
  params: { id: string };
}

export default async function ProductDetailsPage({ params }: DetailsPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-28 pb-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 max-w-7xl mb-8">
          <Link href="/tienda" className="text-xs font-bold text-slate-400 hover:text-[#0A192F] tracking-wide uppercase flex items-center gap-1 w-max transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Volver a la tienda
          </Link>
        </div>

        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Image */}
            <div className="relative aspect-square lg:aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                className="object-cover"
                unoptimized
              />
              {product.badge && (
                <div className="absolute top-6 right-6">
                  <span className="bg-[#0A192F] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mb-4">
                  {product.category}
                </p>
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A192F] leading-[1.1]"
                  style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                >
                  {product.name}
                </h1>
              </div>

              <div className="mb-8">
                <span className="text-3xl md:text-4xl font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                  {formatCOP(product.price)}
                </span>
                <p className="text-sm font-bold text-slate-400 mt-2">Envío gratis a partir de $200.000 COP</p>
              </div>

              <div className="w-full h-px bg-slate-100 mb-8" />

              {/* Description */}
              {product.description && (
                <div className="mb-10 prose prose-slate">
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Add to Cart Actions */}
              <div className="flex flex-col gap-4">
                <button
                  className="w-full bg-[#0A192F] text-white py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-xl active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Agregar al Carrito
                </button>
                <button className="w-full bg-slate-50 text-[#0A192F] py-5 rounded-full font-bold text-sm tracking-wider hover:bg-slate-100 transition-colors border border-slate-200">
                  Comprar con Asesoría
                </button>
              </div>

              {/* Trust markers */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-lg">verified</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Calidad Clínica Garantizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-lg">local_shipping</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Envíos a todo el país</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
