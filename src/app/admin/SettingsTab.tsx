"use client";

import { useState, useEffect, useRef } from "react";
import { getHomepageSettings, saveHomepageSettings, HomepageSettings } from "@/lib/settings";
import { uploadProductImage } from "@/lib/storage";
import Image from "next/image";

function ImageUploader({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string; }) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploadState("uploading");
    try {
      const url = await uploadProductImage(file, setUploadProgress);
      onChange(url);
      setUploadState("idle");
    } catch (err) {
      console.error(err);
      setUploadState("error");
    }
  };

  return (
    <div className="space-y-1.5 md:col-span-2">
      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{label}</label>
      {value ? (
        <div className="relative w-full aspect-[5/3] md:aspect-[3/1] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
          <Image src={value} alt="Preview" fill className="object-cover opacity-60" unoptimized />
          <button type="button" onClick={() => onChange("")} className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 rounded-full p-2 shadow-lg transition-colors z-10" aria-label="Quitar">
            <span className="material-symbols-outlined text-xl leading-none">delete</span>
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const file = e.dataTransfer.files?.[0]; if (file) handleFile(file); }}
          onClick={() => uploadState !== "uploading" && fileInputRef.current?.click()}
          className={`w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all select-none
            ${dragging ? "border-[#0A192F] bg-slate-100" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
        >
          {uploadState === "uploading" ? (
            <div className="flex flex-col items-center gap-2 w-full px-12">
              <span className="material-symbols-outlined text-[#0A192F] text-4xl animate-bounce">cloud_upload</span>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0A192F] transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-xs font-bold text-slate-500">Subiendo... {uploadProgress}%</p>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-slate-400 text-4xl">add_photo_alternate</span>
              <div className="text-center">
                <p className="font-bold text-slate-600 text-sm">Arrastra una imagen aquí o haz clic</p>
                {uploadState === "error" && <p className="text-xs text-red-500 mt-1">Error al subir imagen</p>}
              </div>
            </>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { handleFile(file); e.target.value = ""; } }} className="hidden" />
        </div>
      )}
    </div>
  );
}

interface SettingsTabProps {
  showMessage: (text: string, ok?: boolean) => void;
}

export default function SettingsTab({ showMessage }: SettingsTabProps) {
  const [settings, setSettings] = useState<HomepageSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHomepageSettings().then(setSettings).catch(() => showMessage("Error al cargar configuración", false));
  }, [showMessage]);

  if (!settings) return <div className="text-center py-20 text-slate-400 font-bold">Cargando configuración...</div>;

  const handleChange = (field: keyof HomepageSettings, value: string) => {
    setSettings((s) => s ? { ...s, [field]: value } : s);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveHomepageSettings(settings);
      showMessage("Configuración guardada ✓");
    } catch {
      showMessage("Error al guardar", false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* SEO Section */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          SEO (Metadatos Web)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título del Sitio (Pestaña del Navegador)</label>
            <input
              value={settings.siteTitle}
              onChange={(e) => handleChange("siteTitle", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Descripción del Sitio (Google y Redes Sociales)</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange("siteDescription", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              rows={2}
            />
          </div>
          <ImageUploader 
            label="Logo Principal del Sitio" 
            value={settings.siteLogo || ""} 
            onChange={(url) => handleChange("siteLogo", url)} 
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          Sección: Testimonio (Socio Elite)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Frase (Cita)</label>
            <textarea
              value={settings.testimonialQuote}
              onChange={(e) => handleChange("testimonialQuote", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Valor Métrica 1</label>
            <input
              value={settings.testimonialStat1Value}
              onChange={(e) => handleChange("testimonialStat1Value", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="99.9%"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Etiqueta Métrica 1</label>
            <input
              value={settings.testimonialStat1Label}
              onChange={(e) => handleChange("testimonialStat1Label", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="Bio-Disponibilidad"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Descripción Métrica 1</label>
            <input
              value={settings.testimonialStat1Desc}
              onChange={(e) => handleChange("testimonialStat1Desc", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
            />
          </div>
          {/* Stat 2 */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Valor Métrica 2</label>
            <input
              value={settings.testimonialStat2Value}
              onChange={(e) => handleChange("testimonialStat2Value", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="0.00%"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Etiqueta Métrica 2</label>
            <input
              value={settings.testimonialStat2Label}
              onChange={(e) => handleChange("testimonialStat2Label", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="Rellenos Artificiales"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Descripción Métrica 2</label>
            <input
              value={settings.testimonialStat2Desc}
              onChange={(e) => handleChange("testimonialStat2Desc", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          Sección: Categorías (Cuadros de Protocolos)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 bg-slate-50 p-6 rounded-2xl">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título de la Sección</label>
            <input value={settings.protocolsTitle} onChange={(e) => handleChange("protocolsTitle", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subtítulo de la Sección</label>
            <input value={settings.protocolsSubtitle} onChange={(e) => handleChange("protocolsSubtitle", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
        </div>
        
        {/* Cat 1 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">1. Cuadro Principal (Izquierda)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Link Categoría (?c=)</label>
            <input value={settings.cat1Link || ""} onChange={(e) => handleChange("cat1Link", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat1Title} onChange={(e) => handleChange("cat1Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subtítulo</label>
            <input value={settings.cat1Subtitle} onChange={(e) => handleChange("cat1Subtitle", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Texto del Botón (Opcional)</label>
            <input value={settings.cat1ButtonText || ""} onChange={(e) => handleChange("cat1ButtonText", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <ImageUploader 
            label="Imagen de Fondo (Desktop)" 
            value={settings.cat1Image} 
            onChange={(url) => handleChange("cat1Image", url)} 
          />
          <ImageUploader 
            label="Imagen de Fondo (Celular)" 
            value={settings.cat1MobileImage || ""} 
            onChange={(url) => handleChange("cat1MobileImage", url)} 
          />
        </div>

        {/* Cat 2 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">2. Cuadro Arriba Derecha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Link Categoría (?c=)</label>
            <input value={settings.cat2Link || ""} onChange={(e) => handleChange("cat2Link", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat2Title} onChange={(e) => handleChange("cat2Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subtítulo</label>
            <input value={settings.cat2Subtitle} onChange={(e) => handleChange("cat2Subtitle", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Texto del Botón (Opcional)</label>
            <input value={settings.cat2ButtonText || ""} onChange={(e) => handleChange("cat2ButtonText", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <ImageUploader 
            label="Imagen de Fondo (Desktop)" 
            value={settings.cat2Image} 
            onChange={(url) => handleChange("cat2Image", url)} 
          />
          <ImageUploader 
            label="Imagen de Fondo (Celular)" 
            value={settings.cat2MobileImage || ""} 
            onChange={(url) => handleChange("cat2MobileImage", url)} 
          />
        </div>

        {/* Cat 3 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">3. Cuadro Abajo Derecha (Izquierdo)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Link Categoría (?c=)</label>
            <input value={settings.cat3Link || ""} onChange={(e) => handleChange("cat3Link", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat3Title} onChange={(e) => handleChange("cat3Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Texto del Botón (Opcional)</label>
            <input value={settings.cat3ButtonText || ""} onChange={(e) => handleChange("cat3ButtonText", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <ImageUploader 
            label="Imagen de Fondo (Desktop)" 
            value={settings.cat3Image || ""} 
            onChange={(url) => handleChange("cat3Image", url)} 
          />
          <ImageUploader 
            label="Imagen de Fondo (Celular)" 
            value={settings.cat3MobileImage || ""} 
            onChange={(url) => handleChange("cat3MobileImage", url)} 
          />
        </div>

        {/* Cat 4 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">4. Cuadro Abajo Derecha (Derecho)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Link Categoría (?c=)</label>
            <input value={settings.cat4Link || ""} onChange={(e) => handleChange("cat4Link", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat4Title} onChange={(e) => handleChange("cat4Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Texto del Botón (Opcional)</label>
            <input value={settings.cat4ButtonText || ""} onChange={(e) => handleChange("cat4ButtonText", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <ImageUploader 
            label="Imagen de Fondo (Desktop - Opcional)" 
            value={settings.cat4Image || ""} 
            onChange={(url) => handleChange("cat4Image", url)} 
          />
          <ImageUploader 
            label="Imagen de Fondo (Celular - Opcional)" 
            value={settings.cat4MobileImage || ""} 
            onChange={(url) => handleChange("cat4MobileImage", url)} 
          />
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          Pie de Página (Footer)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((colNum) => {
             const titleKey = `footerCol${colNum}Title` as keyof HomepageSettings;
             const linksKey = `footerCol${colNum}Links` as keyof HomepageSettings;
             const links = (settings[linksKey] as {label: string, url: string}[]) || [];
             
             return (
               <div key={colNum} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <h3 className="font-bold text-slate-700 pb-2 border-b">Columna {colNum}</h3>
                 <div className="space-y-1.5">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título de Columna</label>
                   <input
                     value={settings[titleKey] as string || ""}
                     onChange={(e) => handleChange(titleKey, e.target.value)}
                     className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                   />
                 </div>
                 <div className="space-y-3 pt-2">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Enlaces (Hasta 3)</label>
                   {[0, 1, 2].map((idx) => (
                     <div key={idx} className="flex gap-2">
                       <input
                         placeholder="Texto"
                         value={links[idx]?.label || ""}
                         onChange={(e) => {
                           const newLinks = [...links];
                           if (!newLinks[idx]) newLinks[idx] = { label: "", url: "" };
                           newLinks[idx].label = e.target.value;
                           handleChange(linksKey, newLinks as any);
                         }}
                         className="w-1/2 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                       />
                       <input
                         placeholder="URL (/...)"
                         value={links[idx]?.url || ""}
                         onChange={(e) => {
                           const newLinks = [...links];
                           if (!newLinks[idx]) newLinks[idx] = { label: "", url: "" };
                           newLinks[idx].url = e.target.value;
                           handleChange(linksKey, newLinks as any);
                         }}
                         className="w-1/2 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                       />
                     </div>
                   ))}
                 </div>
               </div>
             );
          })}
        </div>
      </section>

      {/* Tracking Section */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#0A192F] mb-8" style={{ fontFamily: "var(--font-lexend, Lexend)" }}>
          Tracking & Analítica
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Google Tag Manager ID (GTM-XXXXXXX)</label>
            <input
              value={settings.gtmId || ""}
              onChange={(e) => handleChange("gtmId", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="GTM-XXXXXXX"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Google Analytics 4 ID (G-XXXXXXX)</label>
            <input
              value={settings.gaId || ""}
              onChange={(e) => handleChange("gaId", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="G-XXXXXXX"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Meta Pixel ID</label>
            <input
              value={settings.metaPixelId || ""}
              onChange={(e) => handleChange("metaPixelId", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
              placeholder="123456789012345"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0A192F] text-white px-10 py-4 rounded-full font-black text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors disabled:opacity-50"
          style={{ fontFamily: "var(--font-lexend, Lexend)" }}
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
}
