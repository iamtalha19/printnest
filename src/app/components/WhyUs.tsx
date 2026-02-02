import React from "react";
import { Printer, Settings2, Headset, PenTool } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  colorClass,
  bgColor,
}: any) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center p-8 text-center transition-transform hover:scale-105 duration-300">
    <div
      className={`w-full h-24 absolute top-0 left-0 rounded-t-2xl opacity-20 ${bgColor}`}
      style={{ clipPath: "ellipse(70% 50% at 50% 0%)" }}
    />
    <div
      className={`relative z-10 p-4 rounded-full mb-6 ${colorClass} text-white shadow-lg`}
    >
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
      {title}
    </h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: Printer,
      title: "Premium Print Quality",
      description:
        "We use top-tier materials and high-resolution printing for a finish every time.",
      colorClass: "bg-purple-400",
      bgColor: "bg-purple-200",
    },
    {
      icon: Settings2,
      title: "Customization Options",
      description:
        "From t-shirts to photo books, choose your product, design, colors, and finishes.",
      colorClass: "bg-teal-400",
      bgColor: "bg-teal-200",
    },
    {
      icon: Headset,
      title: "Expert Support Team",
      description:
        "Friendly customer service ready to assist with design orders, & more.",
      colorClass: "bg-pink-400",
      bgColor: "bg-pink-200",
    },
    {
      icon: PenTool,
      title: "Modern Design Tools",
      description:
        "Easy-to-use online design tools to help you personalize product in minutes.",
      colorClass: "bg-amber-400",
      bgColor: "bg-amber-200",
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#f8fbff]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">
            // Why Choose Us //
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
            Why Clients Love Working <br />
            <span className="relative inline-block mt-2">
              <span className="text-red-400">With Us</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-200 rounded-full"></span>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="relative pt-4">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
