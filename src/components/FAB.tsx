import Link from "next/link";

export default function FAB() {
  return (
    <Link 
      href="https://wa.me/573052300587?text=Hola,%20estoy%20buscando%20asesor%C3%ADa%20sobre%20los%20suplementos%20Neutrofarma." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 hidden md:flex bg-[#25D366] text-white w-16 h-16 rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group border border-white/20 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12.031 0C5.385 0 .002 5.385.002 12.031c0 2.126.554 4.195 1.606 6.015L0 24l6.111-1.603a12.023 12.023 0 005.92.1.558 12.031 12.031 0 000-24zm0 20.089c-1.782 0-3.524-.482-5.056-1.393l-.36-.215-3.755.986.995-3.662-.236-.375c-.996-1.583-1.52-3.411-1.52-5.285 0-5.59 4.549-10.14 10.138-10.14 5.589 0 10.138 4.55 10.138 10.14 0 5.59-4.549 10.14-10.138 10.14zM17.6 14.113c-.305-.153-1.802-.888-2.08-.99-.279-.101-.482-.153-.685.153-.203.305-.785.99-.963 1.194-.178.203-.357.228-.662.076-2.584-1.295-3.755-2.28-5.35-4.99-.178-.305.025-.457.178-.61.127-.127.305-.355.457-.533.153-.178.203-.305.305-.508.101-.203.051-.381-.026-.533-.076-.153-.685-1.651-.938-2.261-.25-.595-.503-.514-.685-.522-.178-.008-.381-.008-.584-.008-.203 0-.533.076-.812.381C5.228 5.86 4.34 6.8 4.34 8.704c0 1.905 1.194 3.733 1.346 3.937.153.203 2.693 4.113 6.525 5.614 3.832 1.5 3.832.99 4.517.914.685-.076 2.21-.914 2.515-1.778.305-.888.305-1.625.203-1.778-.101-.152-.381-.228-.685-.381z" />
      </svg>
      <span className="absolute right-full mr-4 bg-white text-[#0A192F] px-6 py-3 rounded-2xl text-xs font-black tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl translate-x-4 group-hover:translate-x-0">
        Asesórate
      </span>
    </Link>
  );
}
