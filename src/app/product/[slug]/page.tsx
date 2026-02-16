"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/CartSlice";
import { toggleWishlist } from "@/app/redux/WishListSlice";
import { RootState } from "@/app/redux/Store";
import Toast from "@/app/components/products/Toast";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description?: string;
  category?: string;
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "add" | "remove";
  }>({
    show: false,
    message: "",
    type: "add",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/public/content?section=products");
        const data = await response.json();

        const foundProduct = data.products.find(
          (p: Product) => p.title.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const showToast = (message: string, type: "add" | "remove") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const priceNumber = parseFloat(
      product.price.toString().replace(/[^0-9.]/g, ""),
    );

    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: priceNumber,
        image: product.image,
        quantity,
      }),
    );
    showToast(`Added ${quantity} ${product.title} to cart!`, "add");
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    const priceNumber = parseFloat(
      product.price.toString().replace(/[^0-9.]/g, ""),
    );

    const wasInWishlist = wishlistItems.some((item) => item.id === product.id);
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: priceNumber,
        image: product.image,
      }),
    );
    if (wasInWishlist) {
      showToast(`${product.title} removed from wishlist`, "remove");
    } else {
      showToast(`${product.title} added to wishlist!`, "add");
    }
  };

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product not found</h1>
            <Link href="/shop" className="text-blue-500 hover:underline">
              Return to shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-800">
      <div className="absolute top-0 left-0 w-full h-175 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-amber-50/50 via-teal-50/30 to-white z-10 mix-blend-multiply" />
        <Image
          src="https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/breadcrumb-bg.webp"
          alt="Product Background"
          fill
          className="object-fill opacity-80"
          priority
        />
        <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-white to-transparent z-20" />
      </div>

      <div className="relative z-10 pt-80">
        <div className="w-full pb-10 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-slate-900 tracking-tight mb-4 text-center px-4">
            {product.title}
          </h1>
          <div className="h-1.5 w-20 bg-linear-to-r from-purple-500 to-teal-400 rounded-full mb-10" />
          <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-6 py-2.5 rounded-full shadow-sm border border-slate-100">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <div className="flex text-purple-400">
              <ChevronRight size={14} strokeWidth={2.5} />
              <ChevronRight size={14} className="-ml-2" strokeWidth={2.5} />
            </div>
            <Link
              href="/shop"
              className="hover:text-purple-600 transition-colors"
            >
              Shop
            </Link>
            <div className="flex text-purple-400">
              <ChevronRight size={14} strokeWidth={2.5} />
              <ChevronRight size={14} className="-ml-2" strokeWidth={2.5} />
            </div>
            <span className="text-slate-900 truncate max-w-[200px]">
              {product.title}
            </span>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-4 pb-32 mt-12">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-black mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  {quantity > 1 && (
                    <span className="text-lg font-semibold text-purple-600 mt-1">
                      Total: $
                      {(
                        parseFloat(
                          product.price.toString().replace(/[^0-9.]/g, ""),
                        ) * quantity
                      ).toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
                  In Stock
                </span>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description ||
                  "Premium quality product perfect for your needs. Customizable and high-quality printing."}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-black">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-full hover:shadow-lg transition-all"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`px-6 py-3 font-bold rounded-full transition-all ${
                      isInWishlist
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "border-2 border-gray-300 text-black hover:border-red-500"
                    }`}
                  >
                    {isInWishlist ? "♥ Wishlist" : "♡ Wishlist"}
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600 border-t pt-8">
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span className="font-semibold">PROD-{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold">
                    {product.category || "Featured"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold">Free on orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-bold text-black mb-4">
                Product Features
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Premium quality materials</li>
                <li>✓ Customizable design</li>
                <li>✓ Fast turnaround time</li>
                <li>✓ Eco-friendly options</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-bold text-black mb-4">
                Shipping & Returns
              </h2>
              <p className="text-gray-600 mb-4">
                We offer free shipping on orders over $50. Products can be
                returned within 30 days for a full refund.
              </p>
              <Link href="/contact" className="text-blue-500 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </section>

        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      </div>
    </div>
  );
}
