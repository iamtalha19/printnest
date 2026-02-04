import Image from "next/image";
import db from "@/app/db.json";
import Link from "next/link";

const latestNewsData = db.blog;

export default function LatestNews() {
  const { sectionInfo, posts } = latestNewsData;

  return (
    <section id="blog" className="scroll-mt-24 py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              {sectionInfo.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {sectionInfo.headingMain}
              <br />
              <span className="text-rose-400 underline decoration-2 underline-offset-8">
                {sectionInfo.headingHighlight}
              </span>
            </h2>
          </div>
          <div className="lg:text-right lg:max-w-md">
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              {sectionInfo.description}
            </p>
            <button className="bg-linear-to-r from-indigo-500 to-teal-400 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md inline-flex items-center gap-2 cursor-pointer">
              {sectionInfo.buttonText}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: any }) {
  const slug = post.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/blog/${slug}`}>
      <article className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl mb-5 aspect-4/3 bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug group-hover:text-rose-400 transition-colors">
            {post.title}
          </h3>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
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
