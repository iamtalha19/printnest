import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Choose the Right Material for Your Prints",
    image:
      "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/b1-img-1.webp", // Replace with your image path
    author: {
      name: "Printnest",
      avatar:
        "https://secure.gravatar.com/avatar/71a77267f30008ab3eef4b020e1b29155945405731d0f1e44dbc349e0ac7723e?s=50&d=mm&r=g",
    },
    date: "May 17, 2025",
    readTime: "2 min read",
  },
  {
    id: 2,
    title: "The Power of Personalization in Modern Printing",
    image:
      "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/b1-img-2.webp", // Replace with your image path
    author: {
      name: "Printnest",
      avatar:
        "https://secure.gravatar.com/avatar/71a77267f30008ab3eef4b020e1b29155945405731d0f1e44dbc349e0ac7723e?s=50&d=mm&r=g",
    },
    date: "May 17, 2025",
    readTime: "2 min read",
  },
  {
    id: 3,
    title: "Why Custom Merchandise Can Elevate Your Brand",
    image:
      "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/b1-img-3.webp", // Replace with your image path
    author: {
      name: "Printnest",
      avatar:
        "https://secure.gravatar.com/avatar/71a77267f30008ab3eef4b020e1b29155945405731d0f1e44dbc349e0ac7723e?s=50&d=mm&r=g",
    },
    date: "January 10, 2024",
    readTime: "2 min read",
  },
];

export default function LatestNews() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">
              // Latest News //
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Latest from the
              <br />
              <span className="text-rose-400 underline decoration-2 underline-offset-8">
                Print Desk
              </span>
            </h2>
          </div>
          <div className="lg:text-right lg:max-w-md">
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              Stay informed with expert tips, trends, and print industry
              updates.
            </p>
            <button className="bg-linear-to-r from-indigo-500 to-teal-400 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md inline-flex items-center gap-2">
              More Blog
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
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
          ))}
        </div>
      </div>
    </section>
  );
}
