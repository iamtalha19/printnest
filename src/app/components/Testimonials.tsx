"use client";
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arlene McCoy",
      role: "Web Designer",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-1.webp",
      content:
        "Our company has been using this service for over a year now, and it transformed how we handle branded merchandise.",
    },
    {
      name: "Brooklyn Simmons",
      role: "Web Designer",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-2.webp",
      content:
        "This printing service helped elevate my brand to the next level. I needed cost-effective yet premium-quality prints.",
    },
    {
      name: "Guy Hawkins",
      role: "Marketing Manager",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-3.webp",
      content:
        "I've used several print services in the past, but none have matched the level of professionalism and consistency.",
    },
    {
      name: "Jane Cooper",
      role: "Creative Director",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-1.webp",
      content:
        "The attention to detail in their packaging is second to none. Every order arrives in pristine condition.",
    },
    {
      name: "Robert Fox",
      role: "Entrepreneur",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-2.webp",
      content:
        "Finding a reliable printing partner was a challenge until we found PrintNest. Their dashboard makes tracking easy.",
    },
    {
      name: "Cody Fisher",
      role: "Store Owner",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-3.webp",
      content:
        "The quality of the prints for our custom apparel exceeded our expectations. The colors are crisp and vibrant.",
    },
    {
      name: "Esther Howard",
      role: "Brand Strategist",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-1.webp",
      content:
        "Working with PrintNest has streamlined our entire production process. Their tools are incredibly intuitive.",
    },
    {
      name: "Dianne Russell",
      role: "Product Designer",
      image:
        "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-2.webp",
      content:
        "The turnaround time is incredible without sacrificing quality. They delivered ahead of schedule for our show.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;
  const totalItems = testimonials.length;
  const maxIndex = totalItems - itemsToShow;
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  const progressPercentage = ((currentIndex + itemsToShow) / totalItems) * 100;

  return (
    <section className="py-24 px-6 bg-[#f8fbff] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#3b82f6] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            // CLIENT'S FEEDBACK //
          </span>
          <h2 className="text-5xl font-extrabold text-[#111827]">
            Success Stories From <br />
            <span className="text-[#ff6b6b] relative inline-block mt-2">
              Our Customers
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ff6b6b]"></span>
            </span>
          </h2>
        </div>
        <div className="relative mb-16 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / totalItems)}%)`,
              width: `${(totalItems / itemsToShow) * 100}%`,
            }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="px-3"
                style={{ width: `${100 / totalItems}%` }}
              >
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-[#111827] leading-none">
                        {item.name}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-10 grow">
                    {item.content}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill="#FFB800"
                          className="text-[#FFB800]"
                        />
                      ))}
                    </div>
                    <Quote
                      size={32}
                      className="text-[#111827] rotate-180 opacity-80"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#1e1b4b] flex items-center justify-center text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#1e1b4b] flex items-center justify-center text-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grow w-full h-0.5 bg-gray-200 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#1e1b4b] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
