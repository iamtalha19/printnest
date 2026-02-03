import Image from "next/image";
import db from "@/app/db.json";
const socialData = db.social;
import { Sparkles } from "lucide-react";

export default function Social() {
  const { title, logos } = socialData;

  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>
        <div className="relative flex items-center justify-center mb-10 w-full max-w-4xl mx-auto">
          <div className="grow border-t border-slate-200"></div>
          <span className="shrink-0 mx-4 text-slate-300">
            <Sparkles size={20} strokeWidth={2.5} fill="currentColor" />
          </span>
          <div className="grow border-t border-slate-200"></div>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-16 lg:gap-24">
          {logos.map((brand, index) => (
            <div
              key={index}
              className="relative w-40 h-12 md:w-44 md:h-16 transition-opacity duration-300"
            >
              <Image
                src={brand.url}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 144px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
