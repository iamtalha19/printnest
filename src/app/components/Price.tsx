"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";

const PricingCard = ({ plan, isAnnual }: { plan: any; isAnnual: boolean }) => {
  return (
    <div
      className="relative p-10 rounded-[2.5rem] border border-gray-100 bg-white transition-all duration-500 group cursor-default 
      hover:bg-linear-to-br hover:from-[#6366f1] hover:to-[#06b6d4] hover:-translate-y-2 hover:shadow-2xl"
    >
      <span className="inline-block px-5 py-1.5 rounded-full text-xs font-bold mb-6 bg-black text-white group-hover:bg-white/20 transition-colors">
        {plan.name}
      </span>
      <p className="text-sm mb-8 leading-relaxed text-gray-500 group-hover:text-white transition-colors">
        {plan.description}
      </p>
      <div className="flex items-baseline gap-1 mb-8 group-hover:text-white transition-colors">
        <span className="text-5xl font-black">
          ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
        </span>
        <span className="text-sm font-medium text-gray-400 group-hover:text-white/80 transition-colors">
          / Per {isAnnual ? "Year" : "Month"}
        </span>
      </div>
      <button className="w-full py-4 rounded-full border border-gray-200 font-bold text-sm mb-10 transition-all bg-white text-gray-900 group-hover:border-transparent group-hover:bg-white/95">
        Get Started
      </button>
      <div className="space-y-4">
        {plan.features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-3">
            <Check
              size={18}
              className="text-gray-800 group-hover:text-white transition-colors"
            />
            <span className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description:
        "Ideal for growing teams needing essential features at affordable rates.",
      monthlyPrice: 250,
      yearlyPrice: 750,
      features: [
        "Free licensed icons",
        "Task delivered one-by-one",
        "Updates via dashboard & slack",
        "50k design & prints",
        "Printing programs tailored company",
        "24/7 business support",
      ],
    },
    {
      name: "Premium",
      description:
        "Unlock advanced features, support, and maximum scalability growth.",
      monthlyPrice: 375,
      yearlyPrice: 975,
      features: [
        "Free licensed icons",
        "Task delivered one-by-one",
        "Updates via dashboard & slack",
        "50k design & prints",
        "Printing programs tailored company",
        "24/7 business support",
      ],
    },
  ];

  return (
    <section className="py-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex flex-col items-start">
          <span className="text-[#3b82f6] font-bold tracking-widest text-xs uppercase mb-4 block">
            // PRICING & PLAN //
          </span>
          <h2 className="text-5xl font-extrabold text-[#111827] leading-[1.1] mb-6">
            Flexible Pricing for <br />
            <span className="text-[#ff6b6b] relative inline-block">
              Every Need
              <span className="absolute -bottom-1 left-0 w-full h-0.75 bg-[#ff6b6b]/30 rounded-full"></span>
            </span>
          </h2>
          <p className="text-gray-500 mb-10 max-w-xs leading-relaxed">
            Select from best plans, ensuring a perfect match. Need more or less?
            Customize your subscription for a seamless fit!
          </p>
          <div className="flex items-center gap-4 mb-10">
            <span
              className={`text-sm font-bold ${!isAnnual ? "text-[#111827]" : "text-gray-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-[#4f46e5] rounded-full relative p-1 transition-all"
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${isAnnual ? "translate-x-7" : "translate-x-0"}`}
              />
            </button>
            <span
              className={`text-sm font-bold ${isAnnual ? "text-[#111827]" : "text-gray-400"}`}
            >
              Annually
            </span>
          </div>
          <button className="bg-linear-to-r from-[#6366f1] to-[#06b6d4] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity">
            Contact Us
          </button>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
}
