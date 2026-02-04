"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
        const response = await fetch("/api/products");
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
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/shop"
          className="text-blue-500 hover:underline mb-8 inline-block"
        >
          ← Back to shop
        </Link>

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
              <span className="text-3xl font-bold text-blue-600">
                {product.price}
              </span>
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
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={handleCloseToast}
      />
    </section>
  );
}
