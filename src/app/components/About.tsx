import Image from "next/image";
import { aboutData } from "@/app/data/about";
// Import Lucide icons
import { Check, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -bottom-10 -left-10 z-0 opacity-40">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <pattern
                  id="dots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="2"
                    cy="2"
                    r="2"
                    className="text-blue-200"
                    fill="currentColor"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#dots)" />
              </svg>
            </div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-[55%] relative">
                <div className="relative h-120 w-full rounded-t-[10rem] rounded-b-4xl overflow-hidden shadow-2xl">
                  <Image
                    src={aboutData.mainImage}
                    alt="Main Feature"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-[45%] flex flex-col gap-6">
                <div className="relative h-40 w-full rounded-[3rem] overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src={aboutData.secondaryImages[0]}
                    alt="Detail 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 w-full rounded-t-[8rem] rounded-b-4xl overflow-hidden shadow-xl border-4 border-white bg-orange-100">
                  <Image
                    src={aboutData.secondaryImages[1]}
                    alt="Detail 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-10">
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
                {aboutData.sectionLabel}
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                {aboutData.headingFirst}{" "}
                <span className="text-[#FF7F7F] underline decoration-4 underline-offset-4 decoration-[#FF7F7F]/30">
                  {aboutData.headingHighlight}
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {aboutData.description}
              </p>
            </div>

            <div className="space-y-8 mb-10">
              {aboutData.features.map((item, idx) => (
                <div key={idx} className="flex group">
                  <div className="shrink-0 mr-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:bg-slate-900 transition-colors duration-300">
                      <Check size={24} strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group flex items-center gap-3 px-10 py-4 text-white font-bold rounded-full bg-linear-to-r from-blue-500 to-cyan-400 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              See Our Products
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
