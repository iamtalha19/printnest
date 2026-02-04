"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/CartSlice";
import { toggleWishlist } from "@/app/redux/WishListSlice";
import { RootState } from "@/app/redux/Store";
import { ChevronRight, ChevronDown, ShoppingBag, Check } from "lucide-react";
import db from "@/app/db.json";
import Toast from "@/app/components/products/Toast";

const pageConfig = {
  title: "Shop",
  backgroundImage: db.shop.backgroundImage,
  breadcrumbs: db.shop.breadcrumbs,
};

export default function ShopPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  // Get cart items to check status
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const products = db.shop.productShop;

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "add" | "remove";
  }>({ show: false, message: "", type: "add" });

  const showToast = (message: string, type: "add" | "remove") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  const handleAddToCart = (product: any) => {
    const priceVal =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
        : product.price;

    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: priceVal,
        image: product.image,
        quantity: 1,
      }),
    );
    showToast(`Added "${product.title}" to cart!`, "add");
  };

  const handleToggleWishlist = (product: any) => {
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );
    showToast(
      isWishlisted
        ? `Removed "${product.title}" from wishlist`
        : `Added "${product.title}" to wishlist`,
      isWishlisted ? "remove" : "add",
    );
  };

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-800">
      <div className="absolute top-0 left-0 w-full h-175 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-amber-50/50 via-teal-50/30 to-white z-10 mix-blend-multiply" />
        <Image
          src={pageConfig.backgroundImage}
          alt="Shop Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-white to-transparent z-20" />
      </div>

      <div className="relative z-10 pt-40">
        <ShopHeader />

        <div className="max-w-7xl mx-auto mt-20 px-4 lg:px-8 pb-32">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
            <p className="text-sm font-semibold text-slate-500 pl-2">
              Showing 1-16 Of {products.length} Results
            </p>
            <div className="flex items-center gap-2 pr-2">
              <span className="text-sm font-medium text-slate-500">
                Sort By:
              </span>
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors">
                  Default Sorting <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <SimpleProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistItems.some(
                  (item) => item.id === product.id,
                )}
                // Check if product is already in cart
                isInCart={cartItems.some((item: any) => item.id === product.id)}
                onAddToCart={() => handleAddToCart(product)}
                onToggleWishlist={() => handleToggleWishlist(product)}
              />
            ))}
          </div>
          <div className="mt-16 flex justify-center items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white font-bold shadow-md hover:bg-blue-800 transition-all">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-purple-100 hover:text-purple-600 transition-all">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-purple-100 hover:text-purple-600 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

function ShopHeader() {
  return (
    <div className="w-full pb-10 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-slate-900 tracking-tight mb-4">
        {pageConfig.title}
      </h1>
      <div className="h-1.5 w-20 bg-linear-to-r from-purple-500 to-teal-400 rounded-full mb-10"></div>
      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-6 py-2.5 rounded-full shadow-sm border border-slate-100">
        <Link href="/" className="hover:text-purple-600 transition-colors">
          {pageConfig.breadcrumbs.home}
        </Link>
        <div className="flex text-purple-400">
          <ChevronRight size={14} strokeWidth={2.5} />
          <ChevronRight size={14} className="-ml-2" strokeWidth={2.5} />
        </div>
        <span className="text-slate-900">{pageConfig.breadcrumbs.current}</span>
      </div>
    </div>
  );
}

function SimpleProductCard({ product, onAddToCart, isInCart }: any) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-72 bg-[#F6F7FB] flex items-center justify-center p-6 group-hover:bg-[#ebf0f7] transition-colors">
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* --- HOVER OVERLAY BUTTONS --- */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/5">
          {isInCart ? (
            // State: Item is in Cart (Show two buttons)
            <>
              <button
                onClick={onAddToCart}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#2DD4BF] text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <ShoppingBag size={14} fill="currentColor" />
                Add to cart
                <Check size={14} className="ml-1" />
              </button>
              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#2DD4BF] text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                View cart
              </Link>
            </>
          ) : (
            // State: Default (Show single button)
            <button
              onClick={onAddToCart}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#2DD4BF] text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <ShoppingBag size={16} fill="currentColor" />
              Add to cart
            </button>
          )}
        </div>
      </div>

      <div className="p-4 text-center bg-white">
        <h3 className="font-bold text-slate-800 text-lg mb-2 truncate group-hover:text-purple-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-bold text-blue-900">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-red-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
        </div>
      </div>
    </div>
  );
}
