import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0A192F]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e3a5f_0%,_#0A192F_60%)] opacity-50" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase text-[10px]">
              Marca Premium de Suplementos
            </span>
          </div>

          <h2
            className="text-5xl lg:text-8xl font-black text-white leading-[1] tracking-tight"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            CIENCIA PURA.<br />
            <span className="gradient-text">VITALIDAD MÁXIMA.</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
            NEUTROFARMA entrega nutrición de grado clínico para el estilo de vida de alto rendimiento. Precisión científica, pureza verificada.
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <button
              className="bg-white text-[#0A192F] px-10 py-5 font-black rounded-full shadow-2xl hover:bg-slate-100 transition-all active:scale-95 uppercase text-sm tracking-wider cursor-pointer"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              Ver Colección
            </button>
            <button
              className="border border-white/30 text-white px-10 py-5 font-black rounded-full hover:bg-white/10 transition-all uppercase text-sm tracking-wider cursor-pointer"
              style={{ fontFamily: "var(--font-lexend, Lexend)" }}
            >
              Nuestro Protocolo
            </button>
          </div>
        </div>

        {/* Product image */}
        <div className="relative group">
          <div className="absolute inset-0 bg-white/5 rounded-full blur-[120px] scale-125" />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBljd-jw2nyzsDH-b4Oi9lI7dW3dV9KxtycnCdLwiTVxIj5OAxBWAVPaVjEzvGLsk9TAZZgceeud3TdlyQqIA2cwX9FC26WtgT2fg12rLee2KCfOGQWgtFFKdHYaHIKHvaAgelJWjroUg7xfXXn-InDuiYX3dKwhVkD9LONYGZeqTHPutA8TFKuop6ysaht3F6EdSIdOmix5VjHJre93v2aIRLt-ojQCjVoEyckos-iro2R7hwdsJLDMwreVDbQ--PGkQLK2Z4uSs0"
            alt="Suplemento premium NEUTROFARMA"
            width={600}
            height={600}
            className="relative z-10 w-full h-auto drop-shadow-[0_50px_80px_rgba(0,0,0,0.6)] transform -rotate-2 group-hover:rotate-0 transition-transform duration-1000 ease-out"
            unoptimized
            priority
          />
        </div>
      </div>

      {/* Decorative text */}
      <div
        className="absolute -bottom-10 left-10 text-[18rem] font-black text-white/[0.03] select-none leading-none pointer-events-none"
        style={{ fontFamily: "var(--font-lexend, Lexend)" }}
      >
        PURO
      </div>
    </section>
  );
}
