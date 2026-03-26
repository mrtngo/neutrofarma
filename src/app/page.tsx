import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import FAB from "@/components/FAB";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <BestSellers />
        <Categories />
        <Testimonial />
        <Footer />
      </main>
      <BottomNav />
      <FAB />
    </>
  );
}
