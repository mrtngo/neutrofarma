import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Quote */}
          <div className="space-y-12">
            <div className="flex items-center gap-1.5 text-[#0A192F]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span className="ml-4 text-xs font-black tracking-widest uppercase">
                Socio Elite Certificado
              </span>
            </div>

            <blockquote
              className="text-3xl md:text-5xl font-extrabold text-[#0A192F] leading-tight italic"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              &ldquo;En medicina profesional, la transparencia es innegociable. NEUTROFARMA establece el estándar de oro en eficacia clínica.&rdquo;
            </blockquote>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-10 rounded-3xl space-y-4 border border-slate-100">
              <p
                className="text-5xl font-black text-[#0A192F]"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                99.9%
              </p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                Bio-Disponibilidad
              </p>
              <p className="text-sm font-medium leading-relaxed pt-2">
                Tasa de absorción máxima verificada mediante análisis de suero clínico de terceros.
              </p>
            </div>
            <div className="bg-[#0A192F] p-10 rounded-3xl space-y-4 shadow-xl">
              <p
                className="text-5xl font-black text-white"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                0.00%
              </p>
              <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">
                Rellenos Artificiales
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/80 pt-2">
                Nuestro compromiso con la ciencia limpia significa cero aditivos, cero rellenos, cero compromisos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
