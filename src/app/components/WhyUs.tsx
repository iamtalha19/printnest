import React from "react";
import db from "@/app/db.json";
const whyChooseUsData = db.whyus;
import { Printer, Settings2, Headset, PenTool, HelpCircle } from "lucide-react";

export default function WhyChooseUs() {
  const { header, features } = whyChooseUsData;

  return (
    <section
      id="services"
      className="scroll-mt-24 py-20 px-4 bg-[#f8fbff] font-sans"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">
            {header.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
            {header.titleMain} <br />
            <span className="relative inline-block mt-2">
              <span className="text-red-400">{header.titleHighlight}</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-200 rounded-full"></span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="relative pt-4">
              <FeatureCard item={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const iconMap: Record<string, any> = {
  Printer,
  Settings2,
  Headset,
  PenTool,
};

function resolveIcon(icon: any) {
  if (!icon) return HelpCircle;
  if (typeof icon === "string") {
    return (iconMap as any)[icon] ?? HelpCircle;
  }
  return icon;
}

const FeatureCard = ({ item }: { item: any }) => {
  const Icon = resolveIcon(item.icon);

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center p-8 text-center transition-transform hover:scale-105 duration-300 h-full overflow-hidden">
      <div
        className={`w-full h-24 absolute top-0 left-0 rounded-t-2xl opacity-20 ${item.theme.accent}`}
        style={{ clipPath: "ellipse(70% 50% at 50% 0%)" }}
      />
      <div
        className={`relative z-10 p-4 rounded-full mb-6 ${item.theme.iconBg} text-white shadow-lg`}
      >
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
        {item.title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {item.description}
      </p>
    </div>
  );
};
