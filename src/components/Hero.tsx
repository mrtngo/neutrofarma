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

  if (loading) {
    return (
      <section className="relative min-h-[85vh] w-full bg-[#0A192F] animate-pulse" />
    );
  }

  if (banners.length === 0) {
    return null;
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
