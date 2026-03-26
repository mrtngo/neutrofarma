"use client";

import { useState, useEffect, useCallback, useRef, DragEvent } from "react";
import Image from "next/image";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "@/lib/firestore";
import { uploadProductImage } from "@/lib/storage";
import { formatCOP } from "@/lib/currency";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  badge: "",
  subtitle: "",
  description: "",
  benefits: "",
  featured: true,
};

type UploadState = "idle" | "uploading" | "done" | "error";

export default function AdminPage() {
  // ── Auth ────────────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // ── Products ─────────────────────────────────────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // ── Form ──────────────────────────────────────────────────────────────────
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Image upload ──────────────────────────────────────────────────────────
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // existing URL when editing
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── UI ────────────────────────────────────────────────────────────────────
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const showMessage = (text: string, ok = true) => {
    setMessage({ text, ok });
    setTimeout(() => setMessage(null), 3500);
  };

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      setProducts(await getProducts());
    } catch {
      showMessage("Error al cargar productos", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed, loadProducts]);

  // ── File helpers ──────────────────────────────────────────────────────────
  function acceptFile(file: File) {
    if (!file.type.startsWith("image/")) {
      showMessage("Solo se aceptan imágenes", false);
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadState("idle");
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) acceptFile(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) acceptFile(file);
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
    setUploadState("idle");
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setAuthError(true);
    }
  }

  // ── CRUD ──────────────────────────────────────────────────────────────────
  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      badge: p.badge ?? "",
      subtitle: p.subtitle ?? "",
      description: p.description ?? "",
      benefits: p.benefits?.join("\n") ?? "",
      featured: p.featured,
    });
    setImageFile(null);
    setImagePreview(p.imageUrl); // show existing image
    setUploadState("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    clearImage();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Require an image for new products
    if (!editingId && !imageFile) {
      showMessage("Selecciona una imagen para el producto", false);
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = imagePreview ?? ""; // keep existing URL when editing without new file

      // Upload new image if one was selected
      if (imageFile) {
        setUploadState("uploading");
        setUploadProgress(0);
        imageUrl = await uploadProductImage(imageFile, setUploadProgress);
        setUploadState("done");
      }

      const data: Omit<Product, "id" | "createdAt"> = {
        name: form.name.trim(),
        category: form.category.trim(),
        price: parseInt(form.price.replace(/\D/g, ""), 10),
        imageUrl,
        featured: form.featured,
      };
      
      const badgeText = form.badge.trim();
      if (badgeText) data.badge = badgeText;
      
      const subText = form.subtitle.trim();
      if (subText) data.subtitle = subText;
      
      const descText = form.description.trim();
      if (descText) data.description = descText;

      const benText = form.benefits.trim();
      if (benText) {
        data.benefits = benText.split("\n").map(b => b.trim()).filter(b => b.length > 0);
      }

      if (editingId) {
        await updateProduct(editingId, data);
        showMessage("Producto actualizado ✓");
      } else {
        await addProduct(data);
        showMessage("Producto agregado ✓");
      }
      cancelEdit();
      await loadProducts();
    } catch (err) {
      console.error(err);
      setUploadState("error");
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
          {authError && <p className="text-red-500 text-xs text-center">Contraseña incorrecta</p>}
          <button type="submit" className="w-full bg-[#0A192F] text-white py-3 rounded-full font-black text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#0A192F] text-white px-8 py-5 flex items-center justify-between">
        <h1 className="text-lg font-black uppercase tracking-widest" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          NEUTROFARMA — Admin
        </h1>
        <button onClick={() => setAuthed(false)} className="text-white/60 text-xs font-bold hover:text-white transition-colors">
          Cerrar sesión
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Toast */}
        {message && (
          <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl ${message.ok ? "bg-[#0A192F] text-white" : "bg-red-500 text-white"}`}>
            {message.text}
          </div>
        )}

        {/* ── Form ──────────────────────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            {editingId ? "Editar Producto" : "Agregar Nuevo Producto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image drop zone */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">
                Imagen del Producto {!editingId && "*"}
              </label>

              {imagePreview ? (
                /* Preview */
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                  <Image src={imagePreview} alt="Vista previa" fill className="object-contain p-4" unoptimized />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 rounded-full p-1.5 shadow transition-colors"
                    aria-label="Quitar imagen"
                  >
                    <span className="material-symbols-outlined text-xl leading-none">close</span>
                  </button>
                  {/* Upload progress */}
                  {uploadState === "uploading" && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                      <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-white text-sm font-bold">{uploadProgress}%</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Drop zone */
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full aspect-[3/2] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all select-none
                    ${dragging ? "border-[#0A192F] bg-slate-100" : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"}`}
                >
                  <span className="material-symbols-outlined text-slate-400 text-5xl">cloud_upload</span>
                  <div className="text-center">
                    <p className="font-bold text-slate-600 text-sm">Arrastra una imagen aquí</p>
                    <p className="text-xs text-slate-400 mt-1">o haz clic para seleccionar un archivo</p>
                    <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-wider">JPG, PNG, WEBP, GIF</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </div>

            {/* Text fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Categoría *</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] appearance-none bg-white"
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  <option value="Melatonina">Melatonina</option>
                  <option value="Magnesio">Magnesio</option>
                  <option value="Creatina">Creatina</option>
                  <option value="Suplementos">Suplementos</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Precio (COP) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    value={form.price}
                    onChange={(e) => {
                      // Keep only digits
                      const raw = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, price: raw });
                    }}
                    placeholder="150000"
                    className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
                  />
                </div>
                {form.price && (
                  <p className="text-xs text-slate-400">{formatCOP(parseInt(form.price, 10))}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Badge (opcional)</label>
                <input
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="Nuevo"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subtítulo (opcional)</label>
              <input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="PROVEN SIZE, STRENGTH & PERFORMANCE ENHANCER"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Descripción (opcional)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Texto descriptivo del producto..."
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Beneficios (Uno por línea)</label>
                <textarea
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  placeholder="Boosts Strength...&#10;Promotes Muscle...&#10;Enhances Endurance..."
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm flex-nowrap whitespace-pre focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
                />
              </div>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3">
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
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#0A192F] text-white px-8 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-800 transition-colors disabled:opacity-50"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                {submitting
                  ? uploadState === "uploading"
                    ? `Subiendo imagen ${uploadProgress}%…`
                    : "Guardando…"
                  : editingId ? "Actualizar" : "Agregar Producto"}
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

        {/* ── Products table ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-black text-[#0A192F] mb-6" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
            Productos ({products.length})
          </h2>

          {loading ? (
            <div className="text-center py-20 text-slate-400 font-bold">Cargando…</div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center text-slate-400 font-bold border border-slate-100">
              No hay productos. ¡Agrega el primero!
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <Image src={p.imageUrl} alt={p.name} fill className="object-cover" unoptimized />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>{p.name}</h3>
                      {p.badge && (
                        <span className="bg-[#0A192F] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">{p.badge}</span>
                      )}
                      {p.featured && (
                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Destacado</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{p.category}</p>
                    <p className="text-base font-black text-[#0A192F] mt-1">{formatCOP(p.price)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 flex-shrink-0">
                    <button onClick={() => startEdit(p)} className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors" aria-label="Editar">
                      <span className="material-symbols-outlined text-[#0A192F] text-xl">edit</span>
                    </button>
                    <button onClick={() => setDeleteConfirm(p.id)} className="p-2.5 rounded-full border border-red-100 hover:bg-red-50 transition-colors" aria-label="Eliminar">
                      <span className="material-symbols-outlined text-red-500 text-xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6">
            <span className="material-symbols-outlined text-red-500 text-5xl">warning</span>
            <h3 className="font-black text-xl text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>¿Eliminar producto?</h3>
            <p className="text-slate-500 text-sm">Esta acción no se puede deshacer.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-50" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                Cancelar
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 text-white py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-red-600" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
