import Image from "next/image";
import db from "@/app/db.json";

const categoriesData = db.categories;
export default function Categories() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-900 uppercase tracking-widest mb-4">
              {categoriesData.sectionLabel}
            </p>
            <h2 className="text-4xl lg:text-5xl font-medium text-black leading-tight">
              {categoriesData.headingMain} <br />
              <span className="relative inline-block text-[#FF7F7F]">
                {categoriesData.headingHighlight}
                <span className="absolute left-0 bottom-1 w-full h-1 bg-[#FF7F7F] rounded-full"></span>
              </span>
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start lg:items-end gap-6">
            <p className="text-black text-base leading-relaxed ml-20">
              {categoriesData.description}
            </p>
            <a
              href={categoriesData.btnLink}
              className="inline-block px-8 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mr-55"
            >
              {categoriesData.btnText}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesData.categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-4/5 rounded-4xl overflow-hidden mb-8 z-0 shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>

              <div className="relative z-10 w-[85%] bg-slate-50/90 backdrop-blur-md py-4 rounded-full shadow-lg border border-white group-hover:border-blue-200 group-hover:ring-2 group-hover:ring-blue-100 transition-all duration-300 text-center">
                <span className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
