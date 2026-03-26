"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getActiveBanners, Banner } from "@/lib/firestore";

export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const configured = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    getActiveBanners()
      .then((data) => setBanners(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [configured]);

  // Fallback to static Hero if no banners exist or while loading
  if (loading || banners.length === 0) {
    return (
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0A192F]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e3a5f_0%,_#0A192F_60%)] opacity-50" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
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
              <Link
                href="/tienda"
                className="bg-white text-[#0A192F] px-10 py-5 font-black rounded-full shadow-2xl hover:bg-slate-100 transition-all active:scale-95 uppercase text-sm tracking-wider cursor-pointer"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                Ver Colección
              </Link>
            </div>
          </div>

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

        <div
          className="absolute -bottom-10 left-10 text-[18rem] font-black text-white/[0.03] select-none leading-none pointer-events-none"
          style={{ fontFamily: "var(--font-lexend, Lexend)" }}
        >
          PURO
        </div>
      </section>
    );
  }

  // Dynamic Banners Slider
  return (
    <section className="relative min-h-[85vh] h-[85vh] w-full overflow-hidden bg-[#0A192F]">
      <div className="overflow-hidden w-full h-full absolute inset-0 bg-[#0A192F]" ref={emblaRef}>
        <div className="flex touch-pan-y w-full h-full relative">
          {banners.map((banner) => (
            <div key={banner.id} className="relative flex-[0_0_100%] min-w-0 w-full h-full">
              <Image 
                src={banner.imageUrl} 
                alt={banner.title || "Banner Neutrofarma"} 
                fill 
                className="object-cover object-center lg:object-[center_30%]"
                priority
                unoptimized
              />
              {/* Overlay shadow for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,25,47,0.9)] via-[rgba(10,25,47,0.3)] to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 pb-24 md:pb-32 z-10">
                {banner.title && (
                  <h2 
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter uppercase mb-8 drop-shadow-2xl max-w-4xl"
                    style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                  >
                    {banner.title}
                  </h2>
                )}
                <div>
                  <Link
                    href="/tienda"
                    className="inline-flex bg-white text-[#0A192F] px-10 py-5 font-black rounded-full shadow-2xl hover:bg-slate-100 transition-all active:scale-95 uppercase text-sm tracking-widest cursor-pointer"
                    style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                  >
                    Ir a la Tienda
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
