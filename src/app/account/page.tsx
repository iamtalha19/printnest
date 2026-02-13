"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Eye,
  EyeOff,
  Package,
  Heart,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  User as UserIcon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/Store";
import { loginSuccess, logout } from "@/app/redux/AuthSlice";
import { addToCart } from "@/app/redux/CartSlice";
import { useRouter } from "next/navigation";
import QuickViewModal from "@/app/components/products/QuickViewModal";
import db from "@/app/db.json";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
}

export default function MyAccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
  });

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (isAuthenticated && !user?.isAdmin) {
      fetchOrders();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "Pakistan",
      });
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch orders");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      if (data.user.isAdmin) {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(logout());
    setActiveTab("dashboard");
    setOrders([]);
    router.push("/login");
  };

  const handleAddToCart = (product: any, quantity = 1) => {
    const priceVal =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
        : product.price;
    dispatch(
      addToCart({
        id: product.id,
        name: product.title || product.name,
        price: priceVal,
        image: product.image,
        quantity: quantity,
      }),
    );
    alert(`Added ${quantity} x "${product.title || product.name}" to cart!`);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      if (res.ok) {
        alert("Profile updated successfully!");
        dispatch(
          loginSuccess({ user: { ...user, ...profileForm }, token: "active" }),
        );
      }
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-white font-sans text-slate-800">
        <PageHeader title="My Account" breadcrumb="Account" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-32 pt-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Login to your account
            </h2>
            <form
              onSubmit={handleLogin}
              className="border border-slate-200 rounded-xl p-8 bg-white shadow-xl"
            >
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-linear-to-r from-purple-600 to-blue-500 text-white font-bold shadow-lg"
                >
                  {loading ? "Signing in..." : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <PageHeader
          title={`Order ${selectedOrder.id}`}
          breadcrumb="Order Details"
        />
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16">
          <button
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Order Details
                </h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {selectedOrder.date}
                  </span>
                  <span className="flex items-center gap-1">
                    {selectedOrder.status === "Completed" ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <Clock size={14} className="text-orange-500" />
                    )}{" "}
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Order Total</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${selectedOrder.total.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-slate-900 mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 py-4 border-b last:border-0"
                  >
                    <div className="h-20 w-20 bg-slate-50 rounded-lg relative overflow-hidden border">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-300">
                          No Img
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-lg">
                        {item.name}
                      </h4>
                      <p className="text-slate-500 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">${item.price}</p>
                      <p className="text-xs text-purple-600 font-medium">
                        Total: ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
      <PageHeader
        title={`Welcome, ${user?.name || "User"}`}
        breadcrumb="Dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1">
                    {user?.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {user?.email}
                  </p>
                </div>
              </div>
              <nav className="p-2">
                <NavButton
                  active={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                />
                <NavButton
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                  icon={<UserIcon size={18} />}
                  label="Edit Profile"
                />
                <NavButton
                  active={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  icon={<Package size={18} />}
                  label={`Orders (${orders.length})`}
                />
                <NavButton
                  active={activeTab === "wishlist"}
                  onClick={() => setActiveTab("wishlist")}
                  icon={<Heart size={18} />}
                  label={`Wishlist (${wishlistItems.length})`}
                />
                <NavButton
                  active={activeTab === "cart"}
                  onClick={() => setActiveTab("cart")}
                  icon={<ShoppingCart size={18} />}
                  label={`Cart (${cartItems.length})`}
                />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl mt-2 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </div>
          </div>
          <div className="lg:flex-1">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    label="Total Orders"
                    value={orders.length.toString()}
                    icon={<Package className="text-blue-500" />}
                    bg="bg-blue-50"
                  />
                  <StatCard
                    label="Wishlist Items"
                    value={wishlistItems.length.toString()}
                    icon={<Heart className="text-pink-500" />}
                    bg="bg-pink-50"
                  />
                  <StatCard
                    label="Cart Items"
                    value={cartItems.length.toString()}
                    icon={<ShoppingCart className="text-orange-500" />}
                    bg="bg-orange-50"
                  />
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border">
                  <h3 className="text-xl font-bold mb-4">
                    Hello, {user?.name}!
                  </h3>
                  <p className="text-slate-500">
                    From your account dashboard you can view your{" "}
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-purple-600 underline"
                    >
                      recent orders
                    </button>
                    ,{" "}
                    <button
                      onClick={() => setActiveTab("cart")}
                      className="text-purple-600 underline"
                    >
                      cart items
                    </button>
                    , and edit your profile.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold">Order History</h3>
                </div>
                {orders.length === 0 ? (
                  <div className="p-16 text-center">
                    <Package size={64} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">No orders yet</p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                        <tr>
                          <th className="px-8 py-4 text-left">Order ID</th>
                          <th className="px-8 py-4 text-left">Date</th>
                          <th className="px-8 py-4 text-left">Status</th>
                          <th className="px-8 py-4 text-left">Total</th>
                          <th className="px-8 py-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50">
                            <td className="px-8 py-5 text-sm font-mono text-purple-600">
                              #{order.id.slice(-8).toUpperCase()}
                            </td>
                            <td className="px-8 py-5 text-sm text-slate-600">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-5">
                              <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="px-8 py-5 text-sm font-bold">
                              
                            </td>
                            <td className="px-8 py-5">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="text-purple-600 hover:underline text-sm font-medium"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold">My Wishlist</h3>
                </div>
                {wishlistItems.length === 0 ? (
                  <div className="p-16 text-center">
                    <Heart size={64} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">
                      Your wishlist is empty
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item: any) => (
                      <div
                        key={item.id}
                        className="border rounded-xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 bg-slate-50 rounded-lg mb-4 overflow-hidden">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-2"
                            />
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-purple-600 font-bold text-lg mb-4">
                          
                        </p>
                        <button
                          onClick={() => setQuickViewProduct(item)}
                          className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Quick View
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "cart" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold">Shopping Cart</h3>
                </div>
                {cartItems.length === 0 ? (
                  <div className="p-16 text-center">
                    <ShoppingCart
                      size={64}
                      className="mx-auto text-slate-300 mb-4"
                    />
                    <p className="text-slate-500 text-lg">Your cart is empty</p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="p-8 space-y-4">
                      {cartItems.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 py-4 border-b last:border-0"
                        >
                          <div className="h-20 w-20 bg-slate-50 rounded-lg relative overflow-hidden border">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-2"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-slate-500">
                              Qty: {item.quantity} × 
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600 text-lg">
                              
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-8 bg-slate-50 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-2xl font-bold text-purple-600">
                          $
                          {cartItems
                            .reduce(
                              (sum: number, item: any) => sum + item.totalPrice,
                              0,
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href="/checkout"
                        className="block w-full py-3 bg-purple-600 text-white font-bold rounded-lg text-center hover:bg-purple-700 transition-colors"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "profile" && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border">
                <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
                <form
                  onSubmit={handleUpdateProfile}
                  className="space-y-6 max-w-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                        value={profileForm.address}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-purple-500"
                        value={profileForm.city}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold">Order History</h3>
                </div>
                {orders.length === 0 ? (
                  <div className="p-16 text-center">
                    <Package size={64} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">No orders yet</p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                        <tr>
                          <th className="px-8 py-4 text-left">Order ID</th>
                          <th className="px-8 py-4 text-left">Date</th>
                          <th className="px-8 py-4 text-left">Status</th>
                          <th className="px-8 py-4 text-left">Total</th>
                          <th className="px-8 py-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50">
                            <td className="px-8 py-5 text-sm font-mono text-purple-600">
                              #{order.id.slice(-8).toUpperCase()}
                            </td>
                            <td className="px-8 py-5 text-sm text-slate-600">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-5">
                              <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="px-8 py-5 text-sm font-bold">
                              
                            </td>
                            <td className="px-8 py-5">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="text-purple-600 hover:underline text-sm font-medium"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold">My Wishlist</h3>
                </div>
                {wishlistItems.length === 0 ? (
                  <div className="p-16 text-center">
                    <Heart size={64} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">
                      Your wishlist is empty
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item: any) => (
                      <div
                        key={item.id}
                        className="border rounded-xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-48 bg-slate-50 rounded-lg mb-4 overflow-hidden">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-contain p-2"
                            />
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-purple-600 font-bold text-lg mb-4">
                          
                        </p>
                        <button
                          onClick={() => setQuickViewProduct(item)}
                          className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Quick View
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "cart" && (
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold">Shopping Cart</h3>
                </div>
                {cartItems.length === 0 ? (
                  <div className="p-16 text-center">
                    <ShoppingCart
                      size={64}
                      className="mx-auto text-slate-300 mb-4"
                    />
                    <p className="text-slate-500 text-lg">Your cart is empty</p>
                    <Link
                      href="/shop"
                      className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="p-8 space-y-4">
                      {cartItems.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 py-4 border-b last:border-0"
                        >
                          <div className="h-20 w-20 bg-slate-50 rounded-lg relative overflow-hidden border">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-2"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-slate-500">
                              Qty: {item.quantity} × 
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-purple-600 text-lg">
                              
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-8 bg-slate-50 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-2xl font-bold text-purple-600">
                          $
                          {cartItems
                            .reduce(
                              (sum: number, item: any) => sum + item.totalPrice,
                              0,
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href="/checkout"
                        className="block w-full py-3 bg-purple-600 text-white font-bold rounded-lg text-center hover:bg-purple-700 transition-colors"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all mb-1 ${active ? "bg-purple-600 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"}`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ label, value, icon, bg }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
    <div
      className={`h-12 w-12 rounded-xl flex items-center justify-center ${bg}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const PageHeader = ({ title, breadcrumb }: any) => (
  <div className="relative w-full h-175">
    <div className="absolute inset-0 bg-linear-to-b from-amber-50/50 to-white z-10" />
    <div className="relative z-10 pt-80 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4 capitalize">{title}</h1>
      <div className="inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full shadow-sm border">
        <Link href="/">Home</Link> <ChevronRight size={14} />{" "}
        <span className="text-slate-900">{breadcrumb}</span>
      </div>
    </div>
  </div>
);

const OrderStatusBadge = ({ status }: { status: string }) => {
  const colors: any = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colors[status] || "bg-slate-100 text-slate-700"}`}
    >
      {status}
    </span>
  );
};
