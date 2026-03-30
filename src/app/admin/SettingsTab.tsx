"use client";

import { useState, useEffect } from "react";
import { getHomepageSettings, saveHomepageSettings, HomepageSettings } from "@/lib/settings";

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
        
        {/* Cat 1 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">1. Cuadro Principal (Izquierda)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat1Title} onChange={(e) => handleChange("cat1Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subtítulo</label>
            <input value={settings.cat1Subtitle} onChange={(e) => handleChange("cat1Subtitle", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">URL de Imagen</label>
            <input value={settings.cat1Image} onChange={(e) => handleChange("cat1Image", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
        </div>

        {/* Cat 2 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">2. Cuadro Arriba Derecha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat2Title} onChange={(e) => handleChange("cat2Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Subtítulo</label>
            <input value={settings.cat2Subtitle} onChange={(e) => handleChange("cat2Subtitle", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">URL de Imagen</label>
            <input value={settings.cat2Image} onChange={(e) => handleChange("cat2Image", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
        </div>

        {/* Cat 3 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">3. Cuadro Abajo Derecha (Izquierdo)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat3Title} onChange={(e) => handleChange("cat3Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Link Categoría (?c=)</label>
            <input value={settings.cat3Link} onChange={(e) => handleChange("cat3Link", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
        </div>

        {/* Cat 4 */}
        <h3 className="font-bold text-slate-700 mb-4 pb-2 border-b">4. Cuadro Abajo Derecha (Derecho)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Título</label>
            <input value={settings.cat4Title} onChange={(e) => handleChange("cat4Title", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Link Categoría (?c=)</label>
            <input value={settings.cat4Link} onChange={(e) => handleChange("cat4Link", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none" />
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
