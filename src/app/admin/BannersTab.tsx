"use client";

import { useState, useEffect, useCallback, useRef, DragEvent } from "react";
import Image from "next/image";
import { getBanners, addBanner, deleteBanner, updateBanner, Banner } from "@/lib/firestore";
import { uploadProductImage } from "@/lib/storage";

type UploadState = "idle" | "uploading" | "done" | "error";

interface Props {
  showMessage: (text: string, ok?: boolean) => void;
}

export default function BannersTab({ showMessage }: Props) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Create form
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadBanners = useCallback(async () => {
    setLoading(true);
    try {
      setBanners(await getBanners());
    } catch {
      showMessage("Error al cargar banners", false);
    } finally {
      setLoading(false);
    }
  }, [showMessage]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  // ── File Helpers ──
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      showMessage("Selecciona una imagen para el banner", false);
      return;
    }
    setSubmitting(true);
    try {
      setUploadState("uploading");
      setUploadProgress(0);
      const imageUrl = await uploadProductImage(imageFile, setUploadProgress);
      setUploadState("done");

      await addBanner({
        imageUrl,
        title: title.trim(),
        active,
      });
      
      showMessage("Banner agregado ✓");
      setTitle("");
      setActive(true);
      clearImage();
      await loadBanners();
    } catch (err) {
      console.error(err);
      setUploadState("error");
      showMessage("Error al subir el banner", false);
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(banner: Banner) {
    try {
      await updateBanner(banner.id, { active: !banner.active });
      showMessage(`Banner ${!banner.active ? "activado" : "desactivado"} ✓`);
      await loadBanners();
    } catch {
      showMessage("Error al actualizar estado", false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteBanner(id);
      setDeleteConfirm(null);
      showMessage("Banner eliminado ✓");
      await loadBanners();
    } catch {
      showMessage("Error al eliminar", false);
    }
  }

  return (
    <div className="space-y-12">
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          Subir Nuevo Banner
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drop zone */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">
              Imagen del Banner * (Desktop o panorámica recomendada)
            </label>
            {imagePreview ? (
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 rounded-full p-1.5 shadow transition-colors"
                >
                  <span className="material-symbols-outlined text-xl leading-none">close</span>
                </button>
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
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-[21/9] lg:aspect-[3/1] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all select-none
                  ${dragging ? "border-[#0A192F] bg-slate-100" : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"}`}
              >
                <span className="material-symbols-outlined text-slate-400 text-5xl">burst_mode</span>
                <div className="text-center">
                  <p className="font-bold text-slate-600 text-sm">Arrastra la imagen del banner aquí</p>
                  <p className="text-xs text-slate-400 mt-1">Alta resolución ideal (ej. 1920x800px)</p>
                </div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Título del Hero (Opcional - aparece sobre la imagen)
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Rendimiento de Elite"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              />
            </div>
            
            <div className="flex items-center gap-3 mb-3 md:justify-end">
              <span className="text-sm font-bold text-slate-600">Activo</span>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`relative w-12 h-6 rounded-full transition-colors ${active ? "bg-[#0A192F]" : "bg-slate-200"}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${active ? "translate-x-6" : ""}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#0A192F] text-white px-8 py-3 rounded-full font-black text-xs tracking-widest uppercase hover:bg-slate-800 transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            {submitting ? "Subiendo..." : "Agregar Banner"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-black text-[#0A192F] mb-6" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          Banners Registrados ({banners.length})
        </h2>
        
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-bold">Cargando…</div>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center text-slate-400 font-bold border border-slate-100">
            Aún no hay banners para el slideshow.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="relative w-full aspect-[21/9] bg-slate-50 border-b border-slate-100">
                  <Image src={b.imageUrl} alt="Banner" fill className="object-cover" unoptimized />
                  {!b.active && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-[#0A192F] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Inactivo
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-[#0A192F] truncate text-sm" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
                      {b.title || "Sin título"}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => toggleActive(b)} className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors" aria-label="Cambiar estado">
                      <span className={`material-symbols-outlined text-xl ${b.active ? "text-emerald-500" : "text-slate-400"}`}>
                        {b.active ? "toggle_on" : "toggle_off"}
                      </span>
                    </button>
                    <button onClick={() => setDeleteConfirm(b.id)} className="p-2.5 rounded-full border border-red-100 hover:bg-red-50 transition-colors" aria-label="Eliminar">
                      <span className="material-symbols-outlined text-red-500 text-xl">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6">
            <span className="material-symbols-outlined text-red-500 text-5xl">warning</span>
            <h3 className="font-black text-xl text-[#0A192F]" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>¿Eliminar banner?</h3>
            <p className="text-slate-500 text-sm">El slideshow dejará de mostrar esta imagen.</p>
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
