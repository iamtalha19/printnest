"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Eye, EyeOff } from "lucide-react";

const pageData = {
  title: "My account",
  backgroundImage:
    "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/breadcrumb-bg.webp",
  breadcrumbs: {
    home: "Home",
    current: "My account",
  },
};

export default function MyAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-800">
      <div className="absolute top-0 left-0 w-full h-175 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-amber-50/50 via-teal-50/30 to-white" />
        <Image
          src={pageData.backgroundImage}
          alt="Background"
          fill
          className="object-fill opacity-100"
          priority
        />

        <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 pt-80">
        <PageHeader />

        <div className="max-w-7xl mx-auto mt-50 px-4 lg:px-8 pb-32">
          <div className="max-w-3xl mr-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Login</h2>

            <form
              onSubmit={handleSubmit}
              className="border border-slate-300 rounded-sm p-8 lg:p-12 bg-white"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-slate-600 mb-2"
                  >
                    Username or email address{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded-md px-4 py-3.5 text-slate-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-600 mb-2"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full border border-slate-300 rounded-md px-4 py-3.5 text-slate-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition-all pr-12"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500 cursor-pointer"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rememberMe: e.target.checked,
                        })
                      }
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-medium text-slate-600 cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Submit Button & Lost Password */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  <button
                    type="submit"
                    className="px-10 py-3.5 rounded-full bg-linear-to-r from-[#8B5CF6] to-[#2DD4BF] text-white font-bold text-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    Log in
                  </button>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-slate-500 hover:text-purple-600 transition-colors"
                  >
                    Lost your password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="w-full pb-10 flex flex-col items-center justify-center">
      {/* Centered Title */}
      <h1 className="text-6xl font-bold text-slate-900 tracking-tight mb-4">
        {pageData.title}
      </h1>

      {/* Gradient Underline (Matches the image style) */}
      <div className="h-1.5 w-20 bg-linear-to-r from-purple-500 to-teal-400 rounded-full mb-10"></div>

      {/* Breadcrumbs Pill */}
      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-6 py-2.5 rounded-full shadow-sm border border-slate-100">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          {pageData.breadcrumbs.home}
        </Link>
        <div className="flex text-blue-400">
          <ChevronRight size={14} strokeWidth={2.5} />
          <ChevronRight size={14} className="-ml-2" strokeWidth={2.5} />
        </div>
        <span className="text-slate-900">{pageData.breadcrumbs.current}</span>
      </div>
    </div>
  );
}
