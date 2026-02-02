import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const paymentImages = [
    "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/payment-1.webp",
    "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/payment-2.webp",
    "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/payment-3.webp",
    "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/payment-4.webp",
    "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/payment-5.webp",
  ];

  return (
    <footer className="bg-white text-white">
      {/* Newsletter Section */}
      <div className="px-6 pt-20 pb-32 bg-white">
        <div className="max-w-6xl mx-auto relative">
          {/* Gradient Container */}
          <div className="relative bg-gradient-to-r from-[#ff5f7a] via-[#e040fb] to-[#448aff] rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-visible min-h-[320px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              {/* Left Content */}
              <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-3 leading-[1.15]">
                  Join Now for Special
                  <br />
                  Deals
                  <br />& Updates
                </h2>

                <p className="text-white/95 mb-8 text-base">
                  Get early access to exclusive deals, offers, and updates.
                </p>

                {/* Email Form */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3.5 rounded-full bg-white/25 border border-white/30 placeholder-white/90 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  />
                  <button className="px-8 py-3.5 bg-[#ff7a6e] hover:bg-[#ff6b5e] text-white font-semibold rounded-full transition-all duration-300 shadow-lg whitespace-nowrap text-sm">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Right Side - Empty on desktop for image overlap */}
              <div className="hidden lg:block"></div>
            </div>

            {/* Person Image - Positioned to stick out of top */}
            <div className="absolute -top-16 right-0 lg:right-4 w-72 h-80 lg:w-80 lg:h-96 z-20 hidden md:block">
              <Image
                src="https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/cta1-img-1.webp"
                alt="Subscribe"
                fill
                className="object-cover object-top"
                sizes="320px"
                unoptimized
              />
            </div>
          </div>

          {/* Mobile Image (below on small screens) */}
          <div className="lg:hidden flex justify-center -mt-20 relative z-30">
            <div className="relative w-64 h-72">
              <Image
                src="https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/cta1-img-1.webp"
                alt="Subscribe"
                fill
                className="object-cover object-top"
                sizes="256px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer Section */}
      <div className="bg-[#0a0a0a] px-6 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src="https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/logo-2.svg"
                  alt="PrintNest"
                  width={140}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                  unoptimized
                />
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Stay connected for updates, exclusive deals, helpful tips, &
                printing inspiration.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                Useful Links
                <span className="w-4 h-0.5 bg-orange-500"></span>
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Start a Return
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                Information
                <span className="w-4 h-0.5 bg-orange-500"></span>
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing Plan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Faq
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Other Pages */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                Other Pages
                <span className="w-4 h-0.5 bg-orange-500"></span>
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact & Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Keep In Touch */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                Keep In Touch
                <span className="w-4 h-0.5 bg-orange-500"></span>
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-orange-500" />
                  <span>
                    2118 Thornridge Cir. Syracuse,
                    <br />
                    Connecticut 35624
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="w-4 h-4 flex-shrink-0 text-orange-500" />
                  <span>tranhtuy.nute@gmail.com</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-4 h-4 flex-shrink-0 text-orange-500" />
                  <span>(252) 555-0126</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 ThemeXriver - PrintNest. All rights reserved.
            </p>

            {/* Payment Images */}
            <div className="flex items-center gap-2">
              {paymentImages.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt={`Payment ${idx + 1}`}
                  width={45}
                  height={28}
                  className="h-7 w-auto object-contain"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
