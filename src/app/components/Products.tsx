"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import db from "@/app/db.json";
const productsData = db.products;
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/CartSlice";
import { toggleWishlist } from "@/app/redux/WishListSlice";
import { RootState } from "@/app/redux/Store";
import Toast from "@/app/components/products/Toast";
import ProductCard from "@/app/components/products/ProductCard";
import QuickViewModal from "@/app/components/products/QuickViewModal";
import CompareDrawer from "@/app/components/products/CompareDrawer";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [compareItems, setCompareItems] = useState<any[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "add" | "remove";
  }>({
    show: false,
    message: "",
    type: "add",
  });

  const showToast = (message: string, type: "add" | "remove") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  const handleAddToCart = (product: any, qty: number = 1) => {
    const priceNumber = parseFloat(
      product.price.toString().replace(/[^0-9.]/g, ""),
    );
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: priceNumber,
        image: product.image,
        quantity: qty,
      }),
    );
    showToast(`Added ${qty} ${product.title} to cart!`, "add");
  };

  const handleToggleWishlist = (id: number, title: string) => {
    const product = productsData.products.find((p) => p.id === id);
    if (product) {
      const wasInWishlist = wishlistItems.some((item) => item.id === id);
      dispatch(
        toggleWishlist({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        }),
      );
      if (wasInWishlist) {
        showToast(`${title} removed from wishlist`, "remove");
      } else {
        showToast(`${title} added to wishlist!`, "add");
      }
    }
  };

  const addToCompare = (product: any) => {
    if (compareItems.find((item) => item.id === product.id)) {
      setIsCompareOpen(true);
      return;
    }
    if (compareItems.length >= 3) {
      showToast("You can only compare 3 items", "remove");
      setIsCompareOpen(true);
      return;
    }
    setCompareItems([...compareItems, product]);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (id: number) => {
    const newItems = compareItems.filter((item) => item.id !== id);
    setCompareItems(newItems);
    if (newItems.length === 0) setIsCompareOpen(false);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress =
        maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (container) {
      const amount = 350;
      container.scrollBy({
        left: direction === "next" ? amount : -amount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section
      id="products"
      className="scroll-mt-24 py-20 lg:py-28 bg-white overflow-hidden relative"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3">
              {productsData.sectionLabel}
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {productsData.headingMain} <br />
              <span className="text-[#FF7F7F] border-b-4 border-[#FF7F7F]/30 pb-1">
                {productsData.headingHighlight}
              </span>
            </h2>
          </div>
          <a
            href={productsData.headerBtnLink}
            className="hidden lg:block px-8 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            {productsData.headerBtnText}
          </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-4 relative h-125 lg:h-150 rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <Image
              src={productsData.featuredImage}
              alt="Featured"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between h-full">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x pt-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {productsData.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistItems.some(
                    (item) => item.id === product.id,
                  )}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p: any) => {
                    setQuickViewProduct(p);
                    document.body.style.overflow = "hidden";
                  }}
                  onCompare={addToCompare}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={() => scroll("prev")}
                className="w-14 h-14 rounded-full border border-blue-500 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors bg-white shadow-sm group cursor-pointer"
              >
                <ChevronsLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scroll("next")}
                className="w-14 h-14 rounded-full border border-blue-300 text-blue-600 flex items-center justify-center bg-linear-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors shadow-inner group cursor-pointer"
              >
                <ChevronsRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="grow h-1.5 bg-blue-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-blue-700 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(10, scrollProgress)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => {
          setQuickViewProduct(null);
          document.body.style.overflow = "auto";
        }}
        onAddToCart={handleAddToCart}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        compareItems={compareItems}
        allProducts={productsData.products}
        onClose={() => {
          setIsCompareOpen(false);
          document.body.style.overflow = "auto";
        }}
        onRemoveItem={removeFromCompare}
        onAddItem={addToCompare}
        onAddToCart={handleAddToCart}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
}
