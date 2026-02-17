"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Star,
  ShoppingBag,
  DollarSign,
  ChevronRight,
  Trash2,
  ShoppingCart,
  Heart,
  Package,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Search,
  Eye,
  X,
  MapPin,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  MessageSquare,
  User as UserIcon,
} from "lucide-react";
import AdminReviewList from "../components/AdminReviewList";
import db from "@/app/data/db.json";

interface UserData {
  id: string;
  name: string;
  email: string;
  cartCount: number;
  wishlistCount: number;
  cart?: any[];
  wishlist?: any[];
  createdAt?: string;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  userId: string;
  items: OrderItem[];
  customer?: {
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  paymentMethod?: string;
}

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  users: UserData[];
  products: any[];
  topProducts: any[];
  revenueData: any[];
  ratingDistribution: Record<string, number>;
  topReviewedProducts: { name: string; image: string; count: number }[];
  totalReviews: number;
  productSentiment: {
    name: string;
    image: string;
    good: number;
    bad: number;
    neutral: number;
    total: number;
  }[];
}

const PageHeader = ({ title, breadcrumb }: any) => (
  <div className="relative w-full h-175 z-0">
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute inset-0 bg-linear-to-b from-amber-50/50 via-teal-50/30 to-white z-10 mix-blend-multiply" />
      <Image
        src={db.shop.backgroundImage}
        alt="Background"
        fill
        className="object-fill opacity-80"
        priority
      />
      <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-white to-transparent z-20" />
    </div>

    <div className="relative z-10 pt-80 flex flex-col items-center justify-center pb-10">
      <h1 className="text-6xl font-bold text-slate-900 tracking-tight mb-4 capitalize">
        {title}
      </h1>
      <div className="h-1.5 w-20 bg-linear-to-r from-purple-500 to-teal-400 rounded-full mb-10"></div>
      <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-6 py-2.5 rounded-full shadow-sm border border-slate-100">
        <Link href="/" className="hover:text-purple-600 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-900">{breadcrumb}</span>
      </div>
    </div>
  </div>
);

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all mb-1 relative overflow-hidden group ${
      active
        ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-300/50"
        : "text-slate-600 hover:bg-linear-to-r hover:from-slate-50 hover:to-purple-50/30"
    }`}
  >
    {!active && (
      <span className="absolute inset-0 bg-linear-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    )}
    <span
      className={active ? "" : "group-hover:scale-110 transition-transform"}
    >
      {icon}
    </span>
    <span className="relative z-10">{label}</span>
    {active && (
      <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
    )}
  </button>
);

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="relative overflow-hidden group cursor-pointer">
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all duration-500 relative z-10">
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div
          className={`p-4 rounded-2xl bg-linear-to-br ${color} shadow-lg relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
          <Icon
            size={28}
            className="text-white relative z-10"
            strokeWidth={2}
          />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-4xl font-black bg-linear-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
          {value}
        </h3>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    Pending: {
      bg: "bg-linear-to-r from-amber-100 to-orange-100",
      text: "text-amber-700",
      border: "border-amber-300",
      icon: Clock,
    },
    Accepted: {
      bg: "bg-linear-to-r from-blue-100 to-cyan-100",
      text: "text-blue-700",
      border: "border-blue-300",
      icon: Package,
    },
    Completed: {
      bg: "bg-linear-to-r from-emerald-100 to-green-100",
      text: "text-emerald-700",
      border: "border-emerald-300",
      icon: CheckCircle,
    },
    Cancelled: {
      bg: "bg-linear-to-r from-rose-100 to-red-100",
      text: "text-rose-700",
      border: "border-rose-300",
      icon: X,
    },
  };

  const config = styles[status] || {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: null,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${config.bg} ${config.text} ${config.border}`}
    >
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      <span>{status}</span>
    </span>
  );
};

export default function AdminDashboard() {
  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "orders" | "products" | "reviews"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewType, setViewType] = useState<"cart" | "wishlist" | "both">(
    "both",
  );
  const ITEMS_PER_PAGE = 5;
  const [userPage, setUserPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    image: "",
    badge: "",
  });
  const [productDeleteConfirm, setProductDeleteConfirm] = useState<any>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (user && !user.isAdmin) {
      router.push("/account");
      return;
    }
    if (user?.isAdmin) {
      fetchStats();
    }
  }, [user, isAuthenticated, isAuthLoading, router]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch admin stats");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchStats();
        setDeleteConfirm(null);
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchStats();
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: "",
      price: "",
      oldPrice: "",
      image: "",
      badge: "",
    });
    setIsProductModalOpen(true);
  };
  const openEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title || "",
      price: product.price?.toString().replace("$", "") || "",
      oldPrice: product.oldPrice?.toString().replace("$", "") || "",
      image: product.image || "",
      badge: product.badge || "",
    });
    setIsProductModalOpen(true);
  };
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newProductData = {
      title: productForm.title,
      price: `$${parseFloat(productForm.price).toFixed(2)}`,
      oldPrice: productForm.oldPrice
        ? `$${parseFloat(productForm.oldPrice).toFixed(2)}`
        : null,
      image: productForm.image,
      badge: productForm.badge || null,
      printText: "We print with",
    };
    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : `/api/admin/products`;
      const res = await fetch(url, {
        method: editingProduct ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
      });
      if (res.ok) {
        await fetchStats();
        setIsProductModalOpen(false);
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      alert("Error saving product");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchStats();
        setProductDeleteConfirm(null);
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const filteredUsers = stats?.users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const paginatedUsers = filteredUsers?.slice(
    (userPage - 1) * ITEMS_PER_PAGE,
    userPage * ITEMS_PER_PAGE,
  );
  const totalUserPages =
    Math.ceil((filteredUsers?.length || 0) / ITEMS_PER_PAGE) || 1;

  const filteredOrders = stats?.recentOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const paginatedOrders = filteredOrders?.slice(
    (orderPage - 1) * ITEMS_PER_PAGE,
    orderPage * ITEMS_PER_PAGE,
  );
  const totalOrderPages =
    Math.ceil((filteredOrders?.length || 0) / ITEMS_PER_PAGE) || 1;

  const filteredProducts = stats?.products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const paginatedProducts = filteredProducts?.slice(
    (productPage - 1) * ITEMS_PER_PAGE,
    productPage * ITEMS_PER_PAGE,
  );
  const totalProductPages =
    Math.ceil((filteredProducts?.length || 0) / ITEMS_PER_PAGE) || 1;

  if (isAuthLoading || loading || !stats) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/20 to-slate-50 font-sans">
        <PageHeader title="Admin Panel" breadcrumb="Dashboard" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-32 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50/20 to-slate-50 font-sans text-slate-800">
      <PageHeader title="Admin Panel" breadcrumb="Dashboard" />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 line-clamp-1">
                    {user?.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    Administrator
                  </p>
                </div>
              </div>
              <nav className="p-2">
                <NavButton
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                  icon={<LayoutDashboard size={18} />}
                  label="Overview"
                />
                <NavButton
                  active={activeTab === "products"}
                  onClick={() => setActiveTab("products")}
                  icon={<Package size={18} />}
                  label={`Products (${stats.products.length})`}
                />
                <NavButton
                  active={activeTab === "reviews"}
                  onClick={() => setActiveTab("reviews")}
                  icon={<MessageSquare size={18} />}
                  label={`Reviews (${stats.totalReviews})`}
                />
                <NavButton
                  active={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                  icon={<Users size={18} />}
                  label={`Users (${stats.totalUsers})`}
                />
                <NavButton
                  active={activeTab === "orders"}
                  onClick={() => setActiveTab("orders")}
                  icon={<ClipboardList size={18} />}
                  label={`Orders (${stats.totalOrders})`}
                />
                <Link
                  href="/account"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl mb-1 transition-colors"
                >
                  <UserIcon size={18} /> Switch to User View
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl mt-2 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </Link>
              </nav>
            </div>
          </div>

          <div className="lg:flex-1">
            {["users", "orders", "products", "reviews"].includes(activeTab) && (
              <div className="mb-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition duration-300" />
                  <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 group-focus-within:border-purple-400 transition-all duration-300">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors duration-300"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl focus:outline-none text-slate-800 placeholder:text-slate-400"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <X size={16} className="text-slate-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="animate-in fade-in duration-300">
                <AdminReviewList />
              </div>
            )}
            {activeTab === "overview" && (
              <div
                key="overview"
                className="space-y-6 animate-in fade-in duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-purple-600 bg-purple-600"
                  />
                  <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    color="text-blue-600 bg-blue-600"
                  />
                  <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="text-teal-600 bg-teal-600"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      Revenue Overview (Last 7 Days)
                      <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-300" />
                    </h3>
                    <div className="flex items-end gap-3 h-48 w-full">
                      {stats.revenueData.map((d: any, i: number) => {
                        const maxRev =
                          Math.max(
                            ...stats.revenueData.map((d: any) => d.revenue),
                          ) || 1;
                        const height = `${(d.revenue / maxRev) * 100}%`;
                        return (
                          <div
                            key={i}
                            className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                          >
                            <div className="w-full bg-slate-50 rounded-t-lg relative flex items-end h-[85%] border-b-2 border-slate-100">
                              <div
                                className="w-full bg-linear-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all duration-700 ease-out group-hover:from-purple-700 group-hover:to-blue-600 shadow-lg group-hover:shadow-xl"
                                style={{
                                  height: height === "0%" ? "5%" : height,
                                }}
                              ></div>
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-bold whitespace-nowrap shadow-xl">
                                ${d.revenue.toFixed(2)}
                              </div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">
                              {new Date(d.date).toLocaleDateString(undefined, {
                                weekday: "short",
                              })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6">
                      Top Selling Products
                    </h3>
                    <div className="space-y-4">
                      {stats.topProducts.length === 0 ? (
                        <p className="text-sm text-slate-400 italic">
                          No sales data yet.
                        </p>
                      ) : (
                        stats.topProducts.map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative shrink-0 group-hover:border-purple-200 transition-colors">
                                {p.image ? (
                                  <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    className="object-contain p-1"
                                  />
                                ) : (
                                  <Package className="m-auto text-slate-300 w-full h-full p-3" />
                                )}
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-800 line-clamp-1">
                                  {p.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {p.quantity} items sold
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-black text-purple-600 shrink-0">
                              ${p.revenue.toFixed(2)}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      Review Rating Distribution
                      <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-200" />
                    </h3>
                    <div className="space-y-4">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = stats.ratingDistribution?.[rating] || 0;
                        const totalReviews = Object.values(
                          stats.ratingDistribution || {},
                        ).reduce((a, b) => a + b, 0);
                        const percentage = totalReviews
                          ? (count / totalReviews) * 100
                          : 0;

                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="flex items-center gap-1 w-12 text-sm font-medium text-slate-600">
                              {rating}{" "}
                              <Star
                                size={12}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            </span>
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-500 w-12 text-right">
                              {count} ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                        );
                      })}
                      <div className="pt-4 text-center">
                        <div className="text-3xl font-bold text-slate-700">
                          {(
                            Object.entries(
                              stats.ratingDistribution || {},
                            ).reduce(
                              (acc, [stars, count]) =>
                                acc + Number(stars) * count,
                              0,
                            ) /
                            (Object.values(
                              stats.ratingDistribution || {},
                            ).reduce((a, b) => a + b, 0) || 1)
                          ).toFixed(1)}
                        </div>

                        <div className="flex justify-center text-yellow-400 gap-0.5 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i <
                                Math.round(
                                  Object.entries(
                                    stats.ratingDistribution || {},
                                  ).reduce(
                                    (acc, [stars, count]) =>
                                      acc + Number(stars) * count,
                                    0,
                                  ) /
                                    (Object.values(
                                      stats.ratingDistribution || {},
                                    ).reduce((a, b) => a + b, 0) || 1),
                                )
                                  ? "fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-400">Average Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      Top Reviewed Products
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-200" />
                    </h3>
                    <div className="space-y-4">
                      {stats.topReviewedProducts?.map((product, index) => {
                        const maxReviews =
                          Math.max(
                            ...(stats.topReviewedProducts?.map(
                              (p) => p.count,
                            ) || [0]),
                          ) || 1;
                        const percentage = (product.count / maxReviews) * 100;

                        return (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">
                                  ?
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700 line-clamp-1">
                                  {product.name}
                                </span>
                                <span className="font-bold text-slate-900">
                                  {product.count}
                                </span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {(!stats.topReviewedProducts ||
                        stats.topReviewedProducts.length === 0) && (
                        <p className="text-center text-slate-400 text-sm py-8">
                          No reviews yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 mb-6 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    Product Review Sentiment
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-200" />
                  </h3>
                  <div className="space-y-6">
                    {stats.productSentiment?.map((item, index) => {
                      const goodPercent = (item.good / item.total) * 100;
                      const badPercent = (item.bad / item.total) * 100;
                      const neutralPercent = (item.neutral / item.total) * 100;

                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded bg-slate-100 overflow-hidden relative shrink-0">
                                {item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                    ?
                                  </div>
                                )}
                              </div>
                              <span className="font-medium text-slate-700">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-slate-500 text-xs">
                              {item.total} reviews
                            </span>
                          </div>
                          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                            {goodPercent > 0 && (
                              <div
                                style={{ width: `${goodPercent}%` }}
                                className="h-full bg-green-500 hover:bg-green-600 transition-colors"
                                title={`Good: ${item.good}`}
                              />
                            )}
                            {neutralPercent > 0 && (
                              <div
                                style={{ width: `${neutralPercent}%` }}
                                className="h-full bg-gray-400 hover:bg-gray-500 transition-colors"
                                title={`Neutral: ${item.neutral}`}
                              />
                            )}
                            {badPercent > 0 && (
                              <div
                                style={{ width: `${badPercent}%` }}
                                className="h-full bg-red-500 hover:bg-red-600 transition-colors"
                                title={`Bad: ${item.bad}`}
                              />
                            )}
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 px-1">
                            <span className="text-green-600">
                              Good: {item.good}
                            </span>
                            <span className="text-red-500">
                              Bad: {item.bad}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {(!stats.productSentiment ||
                      stats.productSentiment.length === 0) && (
                      <p className="text-center text-slate-400 text-sm py-8">
                        No sentiment data available.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      Order Status Distribution
                      <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-300" />
                    </h3>
                    <div className="flex flex-col items-center">
                      <div className="relative w-48 h-48 mb-6">
                        <svg
                          viewBox="0 0 200 200"
                          className="w-full h-full -rotate-90"
                        >
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="40"
                            strokeDasharray={`${(stats.recentOrders.filter((o) => o.status === "Pending").length / stats.totalOrders) * 502.4} 502.4`}
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="40"
                            strokeDasharray={`${(stats.recentOrders.filter((o) => o.status === "Accepted").length / stats.totalOrders) * 502.4} 502.4`}
                            strokeDashoffset={`-${(stats.recentOrders.filter((o) => o.status === "Pending").length / stats.totalOrders) * 502.4}`}
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="40"
                            strokeDasharray={`${(stats.recentOrders.filter((o) => o.status === "Completed").length / stats.totalOrders) * 502.4} 502.4`}
                            strokeDashoffset={`-${((stats.recentOrders.filter((o) => o.status === "Pending").length + stats.recentOrders.filter((o) => o.status === "Accepted").length) / stats.totalOrders) * 502.4}`}
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="40"
                            strokeDasharray={`${(stats.recentOrders.filter((o) => o.status === "Cancelled").length / stats.totalOrders) * 502.4} 502.4`}
                            strokeDashoffset={`-${((stats.recentOrders.filter((o) => o.status === "Pending").length + stats.recentOrders.filter((o) => o.status === "Accepted").length + stats.recentOrders.filter((o) => o.status === "Completed").length) / stats.totalOrders) * 502.4}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-slate-900">
                              {stats.totalOrders}
                            </p>
                            <p className="text-xs text-slate-500">Total</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 w-full text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <span className="text-slate-600">
                            Pending (
                            {
                              stats.recentOrders.filter(
                                (o) => o.status === "Pending",
                              ).length
                            }
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-slate-600">
                            Accepted (
                            {
                              stats.recentOrders.filter(
                                (o) => o.status === "Accepted",
                              ).length
                            }
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-slate-600">
                            Completed (
                            {
                              stats.recentOrders.filter(
                                (o) => o.status === "Completed",
                              ).length
                            }
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500" />
                          <span className="text-slate-600">
                            Cancelled (
                            {
                              stats.recentOrders.filter(
                                (o) => o.status === "Cancelled",
                              ).length
                            }
                            )
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      Average Order Value Trend
                      <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-300" />
                    </h3>
                    <div className="h-48 flex flex-col justify-between">
                      <div className="flex-1 relative">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 300 150"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient
                              id="aovGradient"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#f59e0b"
                                stopOpacity="0.3"
                              />
                              <stop
                                offset="100%"
                                stopColor="#f59e0b"
                                stopOpacity="0.05"
                              />
                            </linearGradient>
                          </defs>
                          {(() => {
                            const aovData = stats.revenueData.map(
                              (d: any, i: number) => {
                                const ordersOnDay =
                                  stats.recentOrders.filter(
                                    (o: any) =>
                                      new Date(o.date).toDateString() ===
                                      new Date(d.date).toDateString(),
                                  ).length || 1;
                                return {
                                  value: d.revenue / ordersOnDay,
                                  date: d.date,
                                };
                              },
                            );
                            const maxAOV =
                              Math.max(...aovData.map((d) => d.value)) || 100;
                            const points = aovData
                              .map((d, i) => {
                                const x = (i / (aovData.length - 1)) * 300;
                                const y = 150 - (d.value / maxAOV) * 140;
                                return `${x},${y}`;
                              })
                              .join(" ");
                            const areaPoints = `0,150 ${points} 300,150`;
                            return (
                              <>
                                <polyline
                                  points={areaPoints}
                                  fill="url(#aovGradient)"
                                  stroke="none"
                                />
                                <polyline
                                  points={points}
                                  fill="none"
                                  stroke="#f59e0b"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="drop-shadow-lg"
                                />
                                {aovData.map((d, i) => {
                                  const x = (i / (aovData.length - 1)) * 300;
                                  const y = 150 - (d.value / maxAOV) * 140;
                                  return (
                                    <g key={i}>
                                      <circle
                                        cx={x}
                                        cy={y}
                                        r="4"
                                        fill="#f59e0b"
                                        className="hover:r-6 transition-all cursor-pointer"
                                      />
                                      <circle
                                        cx={x}
                                        cy={y}
                                        r="8"
                                        fill="white"
                                        fillOpacity="0.3"
                                        className="opacity-0 hover:opacity-100 transition-opacity"
                                      />
                                    </g>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mt-4">
                        {stats.revenueData.map((d: any, i: number) => (
                          <div key={i} className="text-center">
                            <span className="text-xs text-slate-500 font-medium">
                              {
                                new Date(d.date).toLocaleDateString(undefined, {
                                  weekday: "short",
                                })[0]
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between px-2">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 font-medium">
                            Min AOV
                          </p>
                          <p className="text-sm font-bold text-amber-600">
                            $
                            {Math.min(
                              ...stats.revenueData.map((d: any) => {
                                const orders =
                                  stats.recentOrders.filter(
                                    (o: any) =>
                                      new Date(o.date).toDateString() ===
                                      new Date(d.date).toDateString(),
                                  ).length || 1;
                                return d.revenue / orders;
                              }),
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 font-medium">
                            Avg AOV
                          </p>
                          <p className="text-sm font-bold text-amber-600">
                            $
                            {(stats.totalRevenue / stats.totalOrders).toFixed(
                              2,
                            )}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 font-medium">
                            Max AOV
                          </p>
                          <p className="text-sm font-bold text-amber-600">
                            $
                            {Math.max(
                              ...stats.revenueData.map((d: any) => {
                                const orders =
                                  stats.recentOrders.filter(
                                    (o: any) =>
                                      new Date(o.date).toDateString() ===
                                      new Date(d.date).toDateString(),
                                  ).length || 1;
                                return d.revenue / orders;
                              }),
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    Product Sales Performance
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-300" />
                  </h3>
                  <div className="space-y-4">
                    {stats.topProducts.length > 0 ? (
                      stats.topProducts
                        .slice(0, 5)
                        .map((product: any, i: number) => {
                          const maxSales = Math.max(
                            ...stats.topProducts.map(
                              (p: any) => p.quantity || 0,
                            ),
                          );
                          const percentage =
                            maxSales > 0
                              ? (product.quantity / maxSales) * 100
                              : 0;
                          return (
                            <div key={i} className="space-y-2 group">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-700 truncate group-hover:text-purple-600 transition-colors">
                                  {product.name}
                                </span>
                                <span className="font-bold text-purple-600 group-hover:scale-110 transition-transform">
                                  {product.quantity} sold
                                </span>
                              </div>
                              <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                <div
                                  className="h-full bg-linear-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out group-hover:from-purple-600 group-hover:to-blue-600 shadow-sm"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-sm text-slate-400 italic text-center py-4">
                        No sales data available yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "products" && (
              <div
                key="products"
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-300"
              >
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-xl font-bold">Product Management</h3>
                  <button
                    onClick={openAddProduct}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                  >
                    <Plus size={16} /> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-8 py-4">Product Info</th>
                        <th className="px-8 py-4">Price</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedProducts?.length === 0 ? (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-8 py-10 text-center text-slate-500 italic"
                          >
                            No products found.
                          </td>
                        </tr>
                      ) : (
                        paginatedProducts?.map((p) => (
                          <tr
                            key={p.id}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="px-8 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg border overflow-hidden relative bg-white">
                                  {p.image ? (
                                    <Image
                                      src={p.image}
                                      alt={p.title}
                                      fill
                                      className="object-contain p-1"
                                    />
                                  ) : (
                                    <Package className="w-full h-full p-3 text-slate-300" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-slate-800">
                                    {p.title}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {p.badge || "Standard Item"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-sm text-slate-800">
                                  {p.price}
                                </span>
                                {p.oldPrice && (
                                  <span className="text-xs text-slate-400 line-through">
                                    {p.oldPrice}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditProduct(p)}
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => setProductDeleteConfirm(p)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between px-8 py-4 border-t bg-slate-50">
                    <button
                      disabled={productPage === 1}
                      onClick={() => setProductPage((p) => p - 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                      Page {productPage} of {totalProductPages}
                    </span>
                    <button
                      disabled={
                        productPage === totalProductPages ||
                        totalProductPages === 0
                      }
                      onClick={() => setProductPage((p) => p + 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <AdminReviewList onReviewDeleted={fetchStats} />
            )}
            {activeTab === "users" && (
              <div
                key="users"
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-300"
              >
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xl font-bold">User Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-8 py-4">User</th>
                        <th className="px-8 py-4">Storage</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedUsers?.map((u) => (
                        <tr
                          key={u.id}
                          className="group hover:bg-slate-50/80 transition-all duration-200"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-700 font-bold">
                                {u.name[0]}
                              </div>
                              <div>
                                <p className="font-bold text-sm">{u.name}</p>
                                <p className="text-xs text-slate-500">
                                  {u.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex gap-4">
                              <button
                                onClick={() => {
                                  setSelectedUser(u);
                                  setViewType("cart");
                                }}
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200"
                              >
                                <ShoppingCart
                                  size={14}
                                  className="text-blue-500"
                                />{" "}
                                Cart ({u.cartCount})
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(u);
                                  setViewType("wishlist");
                                }}
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200"
                              >
                                <Heart size={14} className="text-red-500" />{" "}
                                Wishlist ({u.wishlistCount})
                              </button>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button
                              onClick={() => setDeleteConfirm(u.id)}
                              className="text-slate-400 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between px-8 py-4 border-t bg-slate-50">
                    <button
                      disabled={userPage === 1}
                      onClick={() => setUserPage((p) => p - 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                      Page {userPage} of {totalUserPages}
                    </span>
                    <button
                      disabled={
                        userPage === totalUserPages || totalUserPages === 0
                      }
                      onClick={() => setUserPage((p) => p + 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "orders" && (
              <div
                key="orders"
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-300"
              >
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xl font-bold">Order Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-8 py-4">Order Info</th>
                        <th className="px-8 py-4">Customer</th>
                        <th className="px-8 py-4">Total</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedOrders?.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50">
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="font-mono text-sm font-bold text-slate-700">
                                #{o.id.slice(-8).toUpperCase()}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(o.date).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            {o.customer?.name ? (
                              <>
                                <div className="text-sm text-slate-700 font-medium">
                                  {o.customer.name}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {o.customer.email}
                                </div>
                              </>
                            ) : (
                              <span className="text-sm text-red-600 font-medium italic">
                                Deleted Account
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-5 font-bold text-sm">
                            ${o.total}
                          </td>
                          <td className="px-8 py-5">
                            <select
                              value={o.status}
                              onChange={(e) =>
                                handleStatusChange(o.id, e.target.value)
                              }
                              className="bg-transparent text-sm font-bold py-1 border rounded px-2 focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button
                              onClick={() => setSelectedOrder(o)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg hover:bg-purple-600"
                            >
                              <Eye size={14} /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between px-8 py-4 border-t bg-slate-50">
                    <button
                      disabled={orderPage === 1}
                      onClick={() => setOrderPage((p) => p - 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                      Page {orderPage} of {totalOrderPages}
                    </span>
                    <button
                      disabled={
                        orderPage === totalOrderPages || totalOrderPages === 0
                      }
                      onClick={() => setOrderPage((p) => p + 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold mb-1.5 text-slate-700">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={productForm.title}
                  onChange={(e) =>
                    setProductForm({ ...productForm, title: e.target.value })
                  }
                  placeholder="e.g., Premium Cotton T-Shirt"
                  className="w-full px-4 py-3 border rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-slate-700">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-slate-700">
                    Old Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.oldPrice}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        oldPrice: e.target.value,
                      })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-3 border rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5 text-slate-700">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={productForm.image}
                  onChange={(e) =>
                    setProductForm({ ...productForm, image: e.target.value })
                  }
                  placeholder="https://example.com/image.png"
                  className="w-full px-4 py-3 border rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5 text-slate-700">
                  Badge
                </label>
                <input
                  type="text"
                  value={productForm.badge}
                  onChange={(e) =>
                    setProductForm({ ...productForm, badge: e.target.value })
                  }
                  placeholder="e.g., Sale, New, Hot"
                  className="w-full px-4 py-3 border rounded-xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedUser && (
        <div
          onClick={() => setSelectedUser(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            <div className="p-6 border-b flex justify-between items-start bg-slate-50">
              <div>
                <h3 className="text-xl font-black">
                  {selectedUser.name}'s Storage
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {selectedUser.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-slate-200 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
              {(viewType === "cart"
                ? selectedUser.cart
                : selectedUser.wishlist
              )?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 p-3 bg-slate-50 rounded-xl border"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 border relative overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <Package size={20} className="text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">
                      {item.name || item.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {viewType === "cart" && `Qty: ${item.quantity} × `}$
                      {item.price}
                    </p>
                  </div>
                  {viewType === "cart" && (
                    <p className="font-bold text-sm text-purple-600">
                      ${item.totalPrice}
                    </p>
                  )}
                </div>
              ))}
              {(viewType === "cart" ? selectedUser.cart : selectedUser.wishlist)
                ?.length === 0 && (
                <p className="text-center text-slate-400 italic py-4">
                  No items found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
          >
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                  <ClipboardList size={22} />
                </div>
                <div>
                  <h3 className="font-black text-lg">
                    Order #{selectedOrder.id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {new Date(selectedOrder.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-slate-200 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                    Status
                  </p>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold">${selectedOrder.total}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold mb-4 text-sm uppercase">
                    <Users size={16} className="text-purple-500" /> Customer
                    Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Name</span>
                      {selectedOrder.customer?.name ? (
                        <span className="font-medium">
                          {selectedOrder.customer.name}
                        </span>
                      ) : (
                        <span className="text-red-600 italic">
                          Deleted Account
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-slate-500">Email</span>
                      <span className="font-medium">
                        {selectedOrder.customer?.email || "—"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold mb-4 text-sm uppercase">
                    <MapPin size={16} className="text-purple-500" /> Shipping
                    Info
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-600 leading-relaxed border">
                    {selectedOrder.customer?.address ? (
                      <>
                        {selectedOrder.customer.address}
                        <br />
                        {selectedOrder.customer.city},{" "}
                        {selectedOrder.customer.country}
                      </>
                    ) : (
                      <span className="italic text-slate-400">
                        No shipping address provided
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="flex items-center gap-2 font-bold mb-4 text-sm uppercase">
                  <Package size={16} className="text-purple-500" /> Order Items
                  ({selectedOrder.items.length})
                </h4>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3 text-center">Qty</th>
                        <th className="px-4 py-3 text-right">Price</th>
                        <th className="px-4 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-md relative overflow-hidden">
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt=""
                                    fill
                                    className="object-cover"
                                  />
                                )}
                              </div>
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            ${item.price}
                          </td>
                          <td className="px-4 py-3 text-right font-bold">
                            ${item.totalPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {productDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Delete Product?</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Remove "{productDeleteConfirm.title}" from store?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setProductDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(productDeleteConfirm.id)}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Delete User?</h3>
            <p className="text-slate-500 mb-6 text-sm">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirm)}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
