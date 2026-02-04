"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Category {
  id: number;
  title: string;
  image: string;
  link: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();

        // Find the category that matches the slug
        const foundCategory = data.categories.find(
          (cat: Category) =>
            cat.title.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        setCategory(foundCategory || null);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategories();
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">Category not found</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-medium text-black mb-6">
            {category.title}
          </h1>

          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-black mb-4">
              Category Details
            </h2>
            <p className="text-gray-600">
              Explore our premium collection of {category.title.toLowerCase()}{" "}
              products. Each item is carefully crafted to ensure quality and
              satisfaction.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-black mb-4">Why Choose Us</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✓ High-quality products</li>
              <li>✓ Fast shipping</li>
              <li>✓ Easy customization</li>
              <li>✓ Customer support</li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-black mb-4">Get Started</h2>
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
