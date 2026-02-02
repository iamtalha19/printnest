import Image from "next/image";
import { heroData } from "@/app/data/hero";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { assets, content } = heroData;
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 min-h-screen flex flex-col justify-between font-sans">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src={assets.background}
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-24 lg:h-56 bg-white z-10"
        style={{ clipPath: "ellipse(55% 90% at 50% 100%)" }}
      ></div>

      <div className="container mx-auto px-4 pt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-white space-y-6 order-2 lg:order-1">
            <div className="flex -space-x-4">
              {assets.avatars.map((url, index) => (
                <div
                  key={index}
                  className="relative w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-300"
                >
                  <Image
                    src={url}
                    alt={`User ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              ))}
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-5xl font-extrabold tracking-tight drop-shadow-sm text-black">
                {content.statsLeft.count}
              </h3>
              <p className="text-lg font-medium opacity-90 drop-shadow-sm text-black flex items-center gap-2">
                {content.statsLeft.label}
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col items-center text-center text-black space-y-8 order-1 lg:order-2">
            <h1 className="text-3xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl text-slate-900">
              {content.heroText.titlePart1} <br className="hidden md:block" />
              {content.heroText.titlePart2}
              <span className="relative inline-block underline ml-3 text-[#FF6B6B]">
                {content.heroText.highlight}
              </span>
            </h1>
            <p className="text-xl font-medium text-slate-600 max-w-xl mx-auto leading-relaxed">
              {content.heroText.description}
            </p>
            <button className="group flex items-center gap-3 px-10 py-4 text-lg font-bold text-white transition-all bg-linear-to-r from-blue-600 to-cyan-500 rounded-full hover:scale-105 shadow-lg shadow-blue-500/25 cursor-pointer">
              {content.heroText.buttonLabel}
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
          <div className="lg:col-span-3 flex justify-center lg:justify-end order-3">
            <div className="bg-linear-to-br from-blue-600/90 to-cyan-500/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 text-white w-full max-w-[320px] text-left shadow-2xl">
              <div className="space-y-10">
                {content.statsRight.map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-6xl font-extrabold tracking-tight drop-shadow-md">
                      {stat.value}
                    </h3>
                    <p className="text-xl font-medium text-blue-50 mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-4xl mx-auto h-112.5 lg:h-150 mt-12 z-30 pointer-events-none select-none">
        <div className="absolute top-12 right-[5%] lg:right-[18%] w-[40%] lg:w-[32%] z-10 transition-transform duration-500 hover:scale-105">
          <img
            src={assets.products.right}
            alt="Custom Sweatshirt Right"
            className="w-full drop-shadow-2xl"
            style={{ transform: "rotate(12deg)" }}
          />
        </div>
        <div className="absolute top-16 left-[5%] lg:left-[18%] w-[40%] lg:w-[32%] z-10 transition-transform duration-500 hover:scale-105">
          <img
            src={assets.products.left}
            alt="Custom Sweatshirt Left"
            className="w-full drop-shadow-2xl"
            style={{ transform: "rotate(-12deg)" }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] lg:w-[45%] z-20 transition-transform duration-500 hover:scale-105">
          <img
            src={assets.products.center}
            alt="Custom T-Shirt Center"
            className="w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
