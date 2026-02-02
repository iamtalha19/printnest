import { howItWorksData } from "@/app/data/howitworks";
import { Play } from "lucide-react";

export default function HowItWorks() {
  const {
    sectionLabel,
    headingMain,
    headingHighlight,
    assets,
    steps,
    footerContent,
  } = howItWorksData;

  return (
    <section className="py-20 lg:py-32 bg-[#F8FAFC] overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="max-w-3xl mb-16 lg:mb-24 relative z-10">
          <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">
            {sectionLabel}
          </p>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
            {headingMain} <br />
            <span className="relative inline-block text-[#FF7F7F] mt-2 pb-2 border-b-4 border-[#FF7F7F] rounded-sm">
              {headingHighlight}
            </span>
          </h2>
        </div>
        <div className="relative lg:h-200 w-full flex flex-col gap-10 lg:block">
          <div className="hidden lg:block absolute top-[5%] left-[22%] w-[20%] z-0 pointer-events-none select-none">
            <img
              src={assets.arrowOne}
              alt=""
              className="w-full h-auto object-contain opacity-80"
            />
          </div>
          <div className="hidden lg:block absolute top-[36%] left-[24%] w-[18%] z-0 pointer-events-none select-none">
            <img
              src={assets.arrowTwo}
              alt=""
              className="w-full h-auto object-contain opacity-80"
            />
          </div>
          {steps.map((step) => (
            <StepCard key={step.id} data={step} />
          ))}
          <div className="lg:absolute lg:top-145 lg:right-[5%] lg:max-w-112.5 text-center lg:text-left z-20 mt-10 lg:mt-0">
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              {footerContent.text}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <button className="px-10 py-4 bg-linear-to-r from-[#4F86F9] to-[#2CC4E0] text-white font-bold rounded-full shadow-lg shadow-blue-300/50 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                {footerContent.btnText}
              </button>

              <button className="flex items-center gap-3 group cursor-pointer">
                <div className="w-14 h-14 flex items-center justify-center relative">
                  <div className="w-full h-full rounded-full border border-red-300 absolute"></div>
                  <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform z-10">
                    <Play
                      size={16}
                      fill="white"
                      className="text-white ml-0.5"
                    />
                  </div>
                </div>
                <span className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                  {footerContent.videoText}
                </span>
              </button>
            </div>
          </div>
          <div className="hidden lg:block absolute top-[25%] right-[5%] w-24 h-24 rounded-full bg-linear-to-br from-[#FF9CA4] to-[#FF5E6C] shadow-2xl shadow-red-300 z-0"></div>
        </div>
      </div>
    </section>
  );
}
function StepCard({ data }: { data: any }) {
  const Icon = data.icon;
  const { bg, hoverBorder, hoverShadow, iconBg, iconShadow } = data.theme;

  return (
    <div
      className={`
        lg:absolute w-full lg:w-[320px] p-10 rounded-4xl 
        hover:bg-white border border-transparent transition-all duration-300 
        text-center z-10 group
        ${data.positionClass} 
        ${bg} ${hoverBorder} ${hoverShadow}
      `}
    >
      <div
        className={`
        w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center 
        text-white shadow-lg group-hover:scale-110 transition-transform
        ${iconBg} ${iconShadow}
      `}
      >
        <Icon size={36} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{data.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
