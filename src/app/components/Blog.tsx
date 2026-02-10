"use client";

import Image from "next/image";
import db from "@/app/db.json";
import Link from "next/link";
import { motion } from "framer-motion";

const BlindsImage = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) => {
  const bars = Array.from({ length: 31 }, (_, i) => i);

  return (
    <div className={`relative overflow-hidden h-full w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imgClassName}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 flex flex-col z-20 pointer-events-none">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 w-full bg-slate-200 border-b border-white/50"
            initial={{ opacity: 1, scaleY: 1 }}
            whileInView={{ opacity: 0, scaleY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.1,
              delay: delay + i * 0.1,
              ease: "easeInOut",
            }}
            style={{ originY: 0 }}
          />
        ))}
      </div>
    </div>
  );
};

export default function LatestNews() {
  const latestNewsData = db.blog;
  const { sectionInfo, posts } = latestNewsData;
  const headerVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="blog" className="scroll-mt-24 py-20 px-6 ml-20 mr-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div>
            <motion.span
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headerVariants}
              className="inline-block text-s tracking-widest text-blue-800 uppercase mb-3"
            >
              {sectionInfo.label}
            </motion.span>

            <motion.h2
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headerVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              {sectionInfo.headingMain}
              <br />
              <span className="text-rose-400 underline decoration-2 underline-offset-8">
                {sectionInfo.headingHighlight}
              </span>
            </motion.h2>
          </div>
          <div className="lg:text-right lg:max-w-md">
            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headerVariants}
              className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed"
            >
              {sectionInfo.description}
            </motion.p>

            <motion.button
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={headerVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-indigo-500 to-teal-400 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              {sectionInfo.buttonText}
            </motion.button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, index: number) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, index }: { post: any; index: number }) {
  const slug = post.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/blog/${slug}`}>
      <article className="group cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden rounded-2xl mb-5 aspect-4/3 bg-gray-100 shadow-sm">
          <BlindsImage
            src={post.image}
            alt={post.title}
            delay={index * 0.1}
            className="h-full w-full"
            imgClassName="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
        <div className="flex flex-col grow">
          <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug group-hover:text-rose-400 transition-colors">
            {post.title}
          </h3>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <div className="flex items-center gap-3 mt-auto">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {post.author.name}
              </span>
              <span className="text-xs text-gray-500">
                {post.date} · {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
