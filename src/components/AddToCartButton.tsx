"use client";

import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/firestore";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full bg-[#0A192F] text-white py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-xl active:scale-[0.98]"
      style={{ fontFamily: "var(--font-lexend, Lexend)" }}
    >
      <span className="material-symbols-outlined">shopping_bag</span>
      Agregar al Carrito
    </button>
  );
}
