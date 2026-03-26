"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "@/lib/firestore";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  imageUrl: "",
  badge: "",
  featured: true,
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const showMessage = (text: string, ok = true) => {
    setMessage({ text, ok });
    setTimeout(() => setMessage(null), 3000);
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      showMessage("Error al cargar productos", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed, loadProducts]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      imageUrl: p.imageUrl,
      badge: p.badge ?? "",
      featured: p.featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = {
        name: form.name.trim(),
        category: form.category.trim(),
        price: parseFloat(form.price),
        imageUrl: form.imageUrl.trim(),
        badge: form.badge.trim() || undefined,
        featured: form.featured,
      };
      if (editingId) {
        await updateProduct(editingId, data);
        showMessage("Producto actualizado ✓");
      } else {
        await addProduct(data);
        showMessage("Producto agregado ✓");
      }
      cancelEdit();
      await loadProducts();
    } catch {
      showMessage("Error al guardar el producto", false);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      showMessage("Producto eliminado ✓");
      await loadProducts();
    } catch {
      showMessage("Error al eliminar", false);
    }
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-12 w-full max-w-sm shadow-2xl space-y-6"
        >
          <h1 className="text-2xl font-black text-[#0A192F] uppercase tracking-widest text-center" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            Admin
          </h1>
          <p className="text-slate-500 text-sm text-center">Ingresa la contraseña para continuar</p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Contraseña"
            className="w-full border border-slate-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A192F] text-sm"
          />
          {authError && (
            <p className="text-red-500 text-xs text-center">Contraseña incorrecta</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#0A192F] text-white py-3 rounded-full font-black text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  // ── Admin dashboard ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#0A192F] text-white px-8 py-5 flex items-center justify-between">
        <h1 className="text-lg font-black uppercase tracking-widest" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          NEUTROFARMA — Admin
        </h1>
        <button
          onClick={() => setAuthed(false)}
          className="text-white/60 text-xs font-bold hover:text-white transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Toast */}
        {message && (
          <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all ${message.ok ? "bg-[#0A192F] text-white" : "bg-red-500 text-white"}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-[#0A192F] mb-6" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            {editingId ? "Editar Producto" : "Agregar Nuevo Producto"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Nombre *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Iso-Whey Platinum"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Categoría *</label>
              <input
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Alto Rendimiento Clínico"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>
            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Precio (USD) *</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="65.00"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>
            {/* Badge */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Badge (opcional)</label>
              <input
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                placeholder="Nuevo"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>
            {/* Image URL */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">URL de imagen *</label>
              <input
                required
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>
            {/* Featured */}
            <div className="flex items-center gap-3 md:col-span-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, featured: !form.featured })}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.featured ? "bg-[#0A192F]" : "bg-slate-200"}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-6" : ""}`} />
              </button>
              <span className="text-sm font-bold text-slate-600">Destacado en homepage</span>
            </div>
            {/* Actions */}
            <div className="flex gap-4 md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#0A192F] text-white px-8 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-800 transition-colors disabled:opacity-50"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                {submitting ? "Guardando..." : editingId ? "Actualizar" : "Agregar Producto"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="border border-slate-200 text-slate-600 px-8 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-50 transition-colors"
                  style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Products table */}
        <section>
          <h2 className="text-xl font-black text-[#0A192F] mb-6" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            Productos ({products.length})
          </h2>

          {loading ? (
            <div className="text-center py-20 text-slate-400 font-bold">Cargando...</div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center text-slate-400 font-bold border border-slate-100">
              No hay productos aún. ¡Agrega el primero!
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6">
                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-50 flex-shrink-0"
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>{p.name}</h3>
                      {p.badge && (
                        <span className="bg-[#0A192F] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                          {p.badge}
                        </span>
                      )}
                      {p.featured && (
                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                          Destacado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{p.category}</p>
                    <p className="text-lg font-black text-[#0A192F] mt-1">${p.price.toFixed(2)}</p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => startEdit(p)}
                      className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                      aria-label="Editar"
                    >
                      <span className="material-symbols-outlined text-[#0A192F] text-xl">edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(p.id)}
                      className="p-2.5 rounded-full border border-red-100 hover:bg-red-50 transition-colors"
                      aria-label="Eliminar"
                    >
                      <span className="material-symbols-outlined text-red-500 text-xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6">
            <span className="material-symbols-outlined text-red-500 text-5xl">warning</span>
            <h3 className="font-black text-xl text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
              ¿Eliminar producto?
            </h3>
            <p className="text-slate-500 text-sm">Esta acción no se puede deshacer.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-slate-200 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-50"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-red-600"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
