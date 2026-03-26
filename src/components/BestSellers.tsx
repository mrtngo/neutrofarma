import Image from "next/image";

const products = [
  {
    id: 1,
    category: "Alto Rendimiento Clínico",
    name: "Iso-Whey Platinum",
    price: "$65.00",
    badge: "Nuevo",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCDx3iw7CwO8HojHV88VnhPwItNajGbLZNCkOpGmImhrva3xrBNIJ_Yj45BqbXj9Ifrm3O-v3pK1sP5pCp3CK12QN8ItPYZR3BqXpV7ORaZ0Hmg99n98WeV2_fF-GwLTpesuRbKbzAz0vLqDR4c7PS7jjkfP4SoDLhfHEkhfXuqoG72bznclqDiIs-5hrEjQZkqwJ9jPMkIkjpKFhNsEZRLBO2QV47GRs8_f7Z_1d7ex1PASec6DgdrVU6VjyuGGVmS8V4bdKEinI",
    alt: "Frasco de suplemento estilo farmacéutico con tipografía limpia",
  },
  {
    id: 2,
    category: "Neuro-Cognitivo",
    name: "Ignition Pre-Entrenamiento",
    price: "$49.00",
    badge: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBB6nCBzNe_ObFU3l2LeYFzUZC3lhR6E_dbKiU7q3CYqTIJ9PMFxMd6sjoBu6NIB0glr_DldBFM7XCUA8lIVb3hJ1IdOPDpVZKm0-OJ3SirOSdY1qDuoQd793rhSm7UNxbvYhZD05tGKQJLNrQ6b7Zth2qP35B2QZv7pyLJzABlOLeFey6YyS9tzlWgrgosIz9YzjATRG-81elwrW58qY6qD3Zibja8FKlj-dl6dxa0QmcPd8RtGnUWbGIJtXaKOrrw-ztN_WFqfM",
    alt: "Contenedor de pre-entrenamiento de alta calidad con marca premium",
  },
  {
    id: 3,
    category: "Salud Fundamental",
    name: "Bio-Multi Diario",
    price: "$35.00",
    badge: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ob6y97G-kshenK0NSsn0ijq1CyC0JKUkAkMfMRexokbzVC4U_wPMjB2hh_hZcLB67vjT3i-f7esRWwK4AgnAhrPdb3ESEZA_6XHYZTiEW9jGbe5jcfVdRRwo7AkEV4Kc9bOsXR1JvWNgPv6fKjYRDb71fodc80aqZgdAojyOiLX2T4jm_Px8_0sJcZXUWLHXGJQT4quJkw17gxfhfPXpotT6ZEfITFoD9A6R38MtvKcsztOO0DtGjX8QvHpQTjMhrFDBCWdlgr4",
    alt: "Fotografía artística de suplementos sobre superficie de diseñador",
  },
];

export default function BestSellers() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[#0A192F] font-black text-xs tracking-[0.3em] uppercase mb-3 block">
            Stacks Esenciales
          </span>
          <h3
            className="text-4xl lg:text-5xl font-black text-[#0A192F]"
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Los Más Buscados
          </h3>
        </div>
        <div className="flex gap-3">
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90 cursor-pointer" aria-label="Anterior">
            <span className="material-symbols-outlined text-[#0A192F]">arrow_back_ios_new</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90 cursor-pointer" aria-label="Siguiente">
            <span className="material-symbols-outlined text-[#0A192F]">arrow_forward_ios</span>
          </button>
        </div>
      </div>

      {/* Scrollable product cards */}
      <div className="hide-scrollbar flex overflow-x-auto gap-10 px-6 pb-12">
        {products.map((product) => (
          <div key={product.id} className="min-w-[340px] group cursor-pointer">
            <div className="aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-8 relative transition-all duration-500 border border-slate-100 group-hover:border-[#0A192F]/20 group-hover:shadow-xl group-hover:bg-white">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              {product.badge && (
                <div className="absolute top-5 right-5">
                  <span className="bg-[#0A192F] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                {product.category}
              </p>
              <h4
                className="font-extrabold text-2xl text-[#0A192F]"
                style={{ fontFamily: "var(--font-lexend, Lexend)" }}
              >
                {product.name}
              </h4>
              <div className="flex justify-between items-center pt-2">
                <span
                  className="text-2xl font-black text-[#0A192F]"
                  style={{ fontFamily: "var(--font-lexend, Lexend)" }}
                >
                  {product.price}
                </span>
                <button
                  className="bg-[#0A192F] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg active:scale-95 cursor-pointer"
                  aria-label={`Agregar ${product.name} al carrito`}
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
