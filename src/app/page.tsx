import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Social from "@/app/components/Social";
import About from "@/app/components/About";
import Categories from "@/app/components/Categories";
import Products from "@/app/components/Products";
import HowItWorks from "@/app/components/HowItWorks";
// import WhyUs from "@/app/components/WhyUs";
export default function Home() {
  return (
    <main className="min-h-screen font-sans text-slate-800">
      <Navbar />
      <Hero />
      <Social />
      <About />
      <Categories />
      <HowItWorks />
      <Products />
      {/* <WhyUs /> */}
    </main>
  );
}
