import Image from "next/image";

export default function Categories() {
  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h3
            className="text-4xl font-black text-[#0A192F] mb-6"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Protocolos por Diseño
          </h3>
          <p className="text-slate-500 font-medium text-lg">
            Sistemas curados para resultados fisiológicos específicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-8 h-auto md:h-[700px]">
          {/* Proteins — large */}
          <div className="md:col-span-8 md:row-span-2 relative overflow-hidden group rounded-3xl bg-[#0A192F]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRth1ub7kSzNcQlzkQD3TfwIAgIp0SVJrsqXUmAggFvXG0ICf7KglopBNJDsx6-BBpDkZViP61t5CTSO3pEu4o_AmMgqsBK7Z30j2GlGb6yAqbueb85E5X4Ns6xQqeWW3XKUDI5mHjNQS6X8R8wCHH-04xIIDbMiaqCG6c_nWbMduYRJoJfTrwfRCTriVCM0uIIBWzfNMYaL4psQbT595uKiq2YaZ5JvRdQmJtLkBmrvCxQVOawcewQA6UMQqBHAewMxkYC4ZFFhw"
              alt="Imágenes de fitness de alto contraste"
              fill
              className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <span className="text-white/70 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">
                Bloques Constructores
              </span>
              <h4
                className="text-4xl lg:text-5xl font-black text-white mb-6"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Proteínas Estructurales
              </h4>
              <button
                className="bg-white text-[#0A192F] px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase flex items-center gap-3 group-hover:gap-5 transition-all cursor-pointer"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Explorar Bio-Blends{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Vitamins */}
          <div className="md:col-span-4 bg-white relative overflow-hidden group rounded-3xl border border-slate-200 shadow-sm min-h-[300px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhWoiGEsgK59tXjDgBv6SUAsD44IlV7MTxj7sgLIarTdgOBIP3VedDKVC2UOY2FslHskr6jUS5QHDVB-RuQjOy0R_MbpYG0qtbQG9MVYzfSfYR8esR2dpV7q8sUkC2RzPNfZWf7Z-i2739BS_XiUTuvFUOv52BN8gf70ahp74U8L_3Z0eKqrsLzz2OgyPeztry7Vl76H4zL2EN7gMPQBDxXifxmGF0FL1lkL7glv0L39EMGQSSFPQRtFcseo4LAISY1rELbccA"
              alt="Imágenes médicas minimalistas"
              fill
              className="object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000"
              unoptimized
            />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <h4
                className="text-2xl font-black text-[#0A192F]"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Micronutrientes
              </h4>
              <p className="text-slate-500 font-medium mt-2">Soporte diario de grado clínico.</p>
            </div>
          </div>

          {/* Wellness */}
          <div className="md:col-span-2 bg-white relative overflow-hidden group rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center p-6 hover:bg-[#0A192F] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[#0A192F] group-hover:text-white text-5xl mb-4 transition-colors">
              psychology
            </span>
            <h4
              className="text-sm font-black text-[#0A192F] group-hover:text-white transition-colors uppercase tracking-widest"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              Bienestar
            </h4>
          </div>

          {/* Gear */}
          <div className="md:col-span-2 bg-[#0A192F] relative overflow-hidden group rounded-3xl flex flex-col items-center justify-center text-center p-6 cursor-pointer">
            <span className="material-symbols-outlined text-white text-5xl mb-4">fitness_center</span>
            <h4
              className="text-sm font-black text-white uppercase tracking-widest"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              Equipamiento
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
