"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();

        const foundPost = data.posts.find(
          (p: BlogPost) => p.title.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        setPost(foundPost || null);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <article className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">Loading...</div>
        </div>
      </article>
    );
  }

  if (!post) {
    return (
      <article className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link href="/" className="text-blue-500 hover:underline">
              Return to home
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-500 hover:underline mb-4 inline-block"
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-black">{post.author.name}</p>
              <p className="text-sm">
                {post.date} • {post.readTime}
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed mb-6">
            This is an exciting article about print design and customization
            trends. Our team of experts shares insights on how to choose the
            right materials and techniques for your printing projects.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">
            Key Takeaways
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Quality materials make a difference in print longevity</li>
            <li>Personalization increases customer engagement</li>
            <li>Modern printing techniques offer endless possibilities</li>
            <li>Brand consistency is crucial for professional appearance</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mt-6">
            Whether you're starting a business or enhancing your brand,
            understanding these principles will help you make informed decisions
            about your printing needs.
          </p>
        </div>

        <div className="border-t pt-8">
          <h3 className="text-xl font-bold text-black mb-4">
            Share this article
          </h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Share on Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
              Share on Twitter
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
