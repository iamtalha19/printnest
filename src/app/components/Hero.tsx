import Image from "next/image";
import db from "@/app/db.json";

export default function Hero() {
  const heroData = db.hero;
  const { assets, content } = heroData;
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 min-h-screen flex flex-col justify-between font-sans pl-30 pr-30">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src={assets.background}
          alt="Hero Background"
          fill
          className="object-bottom"
          priority
          quality={90}
        />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-24 lg:h-56 bg-white z-10"
        style={{ clipPath: "ellipse(55% 90% at 50% 100%)" }}
      ></div>
      <div className="container mx-auto px-4 pt-60 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start space-y-4 order-2 lg:order-1 lg:mt-24 animate-in slide-in-from-left-4 duration-700">
            <div className="flex -space-x-4">
              {assets.avatars.map((url, index) => (
                <div
                  key={index}
                  className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-300"
                >
                  <Image
                    src={url}
                    alt={`User ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-extrabold tracking-tight text-black">
                {content.statsLeft.count}
              </h3>
              <p className="text-sm font-medium opacity-80 text-black leading-tight">
                {content.statsLeft.label}
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col items-center text-center text-black space-y-8 order-1 lg:order-2">
            <div className="relative w-fit mx-auto">
              <div className="hidden lg:block absolute -left-73 w-20 h-20 z-10">
                <Image
                  src={assets.floating.find((f) => f.name === "cap")?.url || ""}
                  alt="Cap"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden lg:block absolute -right-73 w-18 h-18 z-10">
                <Image
                  src={
                    assets.floating.find((f) => f.name === "prism")?.url || ""
                  }
                  alt="Prism"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden lg:block absolute -left-73 top-125 w-13 h-13 z-10">
                <Image
                  src={
                    assets.floating.find((f) => f.name === "prism1")?.url || ""
                  }
                  alt="Prism1"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-[28px] md:text-[34px] lg:text-[52px] font-bold tracking-tight leading-[1.1] drop-shadow-xl text-black">
                {content.heroText.titlePart1} <br className="hidden md:block" />
                {content.heroText.titlePart2}
                <span className="relative inline-block underline decoration-4 decoration-[#FF6B6B] underline-offset-4 ml-3 text-[#f86464]">
                  {content.heroText.highlight}
                </span>
              </h1>
            </div>
            <p className="text-[15px] md:text-[17px] font-normal text-slate-900 max-w-2xl mx-auto pl-18 pr-18 leading-relaxed">
              {content.heroText.descriptionPart1}
              <br className="hidden md:block" />
              {content.heroText.descriptionPart2}
            </p>
            <button className="group flex items-center gap-3 px-10 py-4 rounded-full cursor-pointer text-lg font-bold text-white transition-all duration-200 ease-in-out bg-linear-to-r from-blue-600 to-cyan-500 shadow-[5px_5px_0px_0px_rgba(167,139,250,1)] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75">
              {content.heroText.buttonLabel}
            </button>
          </div>
          <div className="lg:col-span-2 flex justify-center order-3 lg:mt-24 ">
            <div className="bg-linear-to-br from-blue-500 to-cyan-400 text-white rounded-4xl p-6 w-full max-w-60 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-6 relative z-10">
                {content.statsRight.map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-4xl font-bold tracking-tight drop-shadow-sm">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-blue-50 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-4xl mx-auto h-85 lg:h-120 mt-4 z-30 pointer-events-none select-none">
        <div className="absolute top-16 right-[9%] w-[40%] z-10 transition-transform duration-500 hover:scale-105">
          <img
            src={assets.products.right}
            alt="Custom Sweatshirt Right"
            className="w-full"
            style={{ transform: "rotate(4deg)" }}
          />
        </div>
        <div className="absolute top-34 left-[11%] w-[40%] z-10 transition-transform duration-500 hover:scale-105">
          <img
            src={assets.products.left}
            alt="Custom Sweatshirt Left"
            className="w-full"
            style={{ transform: "rotate(1deg)" }}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[45%] z-20 transition-transform duration-500 hover:scale-105">
          <img
            src={assets.products.center}
            alt="Custom T-Shirt Center"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
