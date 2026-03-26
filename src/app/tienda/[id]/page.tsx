import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/firestore";
import { formatCOP } from "@/lib/currency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import ProductTabs from "@/components/ProductTabs";

export const dynamic = "force-dynamic";

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

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
              
              {/* Title & Rating */}
              <div className="mb-3">
                <h1 
                  className="text-4xl md:text-5xl font-black text-[#0A192F] leading-tight tracking-tighter uppercase"
                  style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                >
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-amber-400 text-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                  </div>
                  <span className="text-xs font-bold text-[#0A192F] tracking-wide mt-0.5">
                    4.9 basado en 255 reseñas
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              {product.subtitle && (
                <h2 className="text-base font-black text-[#0A192F] uppercase tracking-wide leading-snug mb-3 max-w-lg">
                  {product.subtitle}
                </h2>
              )}

              {/* Price & Promos */}
              <div className="flex items-end gap-4 mb-4">
                <span className="text-3xl font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                  {formatCOP(product.price)}
                </span>
                <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-1 rounded mb-1">
                  15% OFF EN CARRITO
                </span>
              </div>

              {/* Trust Badge Line */}
              <div className="flex items-center gap-2 mb-8 pb-8 border-b border-slate-200">
                <span className="material-symbols-outlined text-[#0A192F] text-[18px]">verified</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  FÓRMULA CLÍNICA AVALADA
                </span>
              </div>

              {/* Dynamic Tabs (Benefits / Description) */}
              <ProductTabs benefits={product.benefits} description={product.description} />

              {/* Add to Cart Actions */}
              <div className="flex flex-col gap-4">
                <AddToCartButton product={product} />
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
