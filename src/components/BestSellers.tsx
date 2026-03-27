"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, Product } from "@/lib/firestore";
import { formatCOP } from "@/lib/currency";
import { useCartStore } from "@/lib/store";

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCartStore();

  useEffect(() => {
    getFeaturedProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  if (products.length === 0) {
    return (
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 mb-16">
          <span className="text-[#0A192F] font-black text-xs tracking-[0.3em] uppercase mb-3 block">
            Stacks Esenciales
          </span>
          <h3
            className="text-4xl lg:text-5xl font-black text-[#0A192F]"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Los Más Buscados
          </h3>
        </div>
        <div className="container mx-auto px-6 text-center py-20 border-t border-slate-100">
           <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">inventory_2</span>
           <h3 className="text-xl font-bold text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
             Aún no hay productos destacados
           </h3>
           <p className="text-slate-500 mt-2 text-sm">
             Añade productos desde el admin y márcalos como "Destacado en homepage" para que aparezcan aquí.
           </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[#0A192F] font-black text-xs tracking-[0.3em] uppercase mb-3 block">
            Stacks Esenciales
          </span>
          <h3
            className="text-4xl lg:text-5xl font-black text-[#0A192F]"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Los Más Buscados
          </h3>
        </div>
        <div className="flex gap-3">
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90" aria-label="Anterior">
            <span className="material-symbols-outlined text-[#0A192F]">arrow_back_ios_new</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90" aria-label="Siguiente">
            <span className="material-symbols-outlined text-[#0A192F]">arrow_forward_ios</span>
          </button>
        </div>
      </div>

      <div className="hide-scrollbar flex overflow-x-auto gap-10 px-6 pb-12">
        {products.map((product) => (
          <Link href={`/tienda/${product.id}`} key={product.id} className="min-w-[340px] group cursor-pointer block">
            <div className="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-8 relative transition-all duration-500 border border-slate-100 group-hover:border-[#0A192F]/20 group-hover:shadow-xl group-hover:bg-white">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              {product.badge && (
                <div className="absolute top-5 right-5">
                  <span className="bg-[#0A192F] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                {product.category}
              </p>
              <h4
                className="font-extrabold text-2xl text-[#0A192F]"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                {product.name}
              </h4>
              <div className="flex justify-between items-center pt-2">
                <span className="text-2xl font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                  {formatCOP(product.price)}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product);
                  }}
                  className="bg-[#0A192F] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg active:scale-95"
                  aria-label={`Agregar ${product.name} al carrito`}
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
