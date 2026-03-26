"use client";

import { useCartStore } from "@/lib/store";
import { formatCOP } from "@/lib/currency";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch from persisted localStorage
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Hola Neutrofarma! Quisiera realizar el siguiente pedido:\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${formatCOP(item.product.price)})\n`;
    });
    
    message += `\n*TOTAL: ${formatCOP(getTotalPrice())}*\n\nPor favor indíquenme los pasos para el pago.`;
    
    // Replace 573000000000 with the actual phone number
    const waLink = `https://wa.me/573000000000?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0A192F]/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            Tu Carrito
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-slate-400 hover:text-[#0A192F] hover:bg-slate-50 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <span className="material-symbols-outlined leading-none">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <span className="material-symbols-outlined text-6xl">shopping_cart_off</span>
              <p className="font-bold text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                Tu carrito está vacío.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[#0A192F] text-sm leading-tight truncate" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{formatCOP(item.product.price)}</p>
                    </div>

                    {/* Quantity & Remove controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-slate-50 rounded-full p-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total</span>
              <span className="text-2xl font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                {formatCOP(getTotalPrice())}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#0A192F] text-white py-4 rounded-full font-black text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors shadow-xl active:scale-95 flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              Comprar vía WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
