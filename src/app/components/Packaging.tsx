"use client";

import React from "react";
import db from "@/app/db.json";
import { motion } from "framer-motion";

const packagingHeroData = db.packaging;

export default function PackagingHero() {
  const { header, video } = packagingHeroData;
  const fadeUpVariant: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: delay,
      },
    }),
  };

  return (
    <section className="relative pl-20 pr-20 bg-white min-h-screen font-sans">
      <div
        className="pt-16 pb-48 lg:pb-64 px-6 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${header.backgroundImage})`,
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start ml-8 gap-8">
            <div className="lg:w-1/2">
              <motion.span
                custom={0}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                className="inline-block text-s font-medium text-white uppercase mb-4"
              >
                {header.label}
              </motion.span>

              <motion.h1
                custom={0.2}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight"
              >
                {header.title.main}
                <br />
                <span className="text-rose-400 underline decoration-2 underline-offset-8">
                  {header.title.highlight}
                </span>
              </motion.h1>
            </div>

            <div className="lg:w-1/3 lg:pt-12">
              <motion.p
                custom={0.4}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                className="text-white/90 text-sm md:text-[17px] leading-relaxed mb-6 max-w-sm lg:ml-auto"
              >
                {header.description}
              </motion.p>

              <motion.button
                custom={0.6}
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-10 py-4 ml-8 rounded-full cursor-pointer text-lg font-bold text-white transition-all duration-200 ease-in-out bg-linear-to-r from-blue-600 to-cyan-500 shadow-[5px_5px_0px_0px_rgba(160,130,250,1)] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75"
              >
                {header.buttonText}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative px-6 -mt-32 lg:-mt-48 max-w-7xl mx-auto z-10"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black">
          <div className="relative w-full aspect-video lg:aspect-21/9">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.div>
      <div className="h-32 lg:h-48" />
    </section>
  );
}
