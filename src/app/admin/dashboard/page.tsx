"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/Store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
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
} from "lucide-react";
import db from "@/app/data/db.json";

interface UserData {
  id: string;
  name: string;
  email: string;
  cartCount: number;
  wishlistCount: number;
  cart?: any[];
  wishlist?: any[];
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
    "overview" | "users" | "orders" | "products"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewType, setViewType] = useState<"cart" | "wishlist" | "both">(
    "both",
  );
  const [userPage, setUserPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [productPage, setProductPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const method = editingProduct ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
      });

      if (res.ok) {
        await fetchStats();
        setIsProductModalOpen(false);
      } else {
        const errorData = await res.json();
        alert(`Failed to save product: ${errorData.message}`);
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

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4 shrink-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-slate-200 to-slate-300 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-linear-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
                    <div className="h-3 bg-linear-to-r from-slate-200 to-slate-300 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 bg-linear-to-r from-slate-100 to-slate-200 rounded-xl animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white relative overflow-hidden"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="h-14 w-14 bg-linear-to-br from-slate-200 to-slate-300 rounded-2xl animate-pulse" />
                      <div className="h-6 w-16 bg-linear-to-r from-slate-200 to-slate-300 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-linear-to-r from-slate-200 to-slate-300 rounded w-1/2 animate-pulse" />
                      <div className="h-8 bg-linear-to-r from-slate-200 to-slate-300 rounded w-3/4 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8">
                <div className="h-6 bg-linear-to-r from-slate-200 to-slate-300 rounded w-1/4 mb-6 animate-pulse" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-linear-to-r from-slate-100 to-slate-200 rounded-xl animate-pulse"
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
                  href="/api/auth/logout"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl mt-2 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </Link>
              </nav>
            </div>
          </div>

          <div className="lg:flex-1">
            {(activeTab === "users" ||
              activeTab === "orders" ||
              activeTab === "products") && (
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

            {activeTab === "overview" && (
              <div key="overview" className="space-y-6">
                {/* Stat Cards */}
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
                  {/* Revenue Chart Widget */}
                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                      Revenue Overview (Last 7 Days)
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
                                className="w-full bg-linear-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-80"
                                style={{
                                  height: height === "0%" ? "5%" : height,
                                }}
                              ></div>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-bold whitespace-nowrap shadow-lg">
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

                  {/* Top Selling Products Widget */}
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

                {/* Order Status Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">
                    Order Status Distribution
                  </h3>
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full"
                      style={{
                        width: `${(stats.recentOrders.filter((o) => o.status === "Pending").length / stats.totalOrders) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-blue-500 h-full"
                      style={{
                        width: `${(stats.recentOrders.filter((o) => o.status === "Accepted").length / stats.totalOrders) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-emerald-500 h-full"
                      style={{
                        width: `${(stats.recentOrders.filter((o) => o.status === "Completed").length / stats.totalOrders) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-rose-500 h-full"
                      style={{
                        width: `${(stats.recentOrders.filter((o) => o.status === "Cancelled").length / stats.totalOrders) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />{" "}
                      Pending
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />{" "}
                      Accepted
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                      Completed
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />{" "}
                      Cancelled
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-xl">
                      Recent Transactions
                    </h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-purple-600 font-medium hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                        <tr>
                          <th className="px-8 py-4">Order ID</th>
                          <th className="px-8 py-4">Date</th>
                          <th className="px-8 py-4">Amount</th>
                          <th className="px-8 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {stats.recentOrders.slice(0, 5).map((order) => (
                          <tr
                            key={order.id}
                            className="group cursor-pointer transition-all duration-200 border-b border-slate-100 last:border-0 hover:bg-slate-50/80"
                          >
                            <td className="px-8 py-5 font-mono text-sm font-bold text-purple-600 group-hover:text-purple-700">
                              #{order.id.slice(-8).toUpperCase()}
                            </td>
                            <td className="px-8 py-5 text-sm text-slate-500 group-hover:text-slate-700">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-5 text-sm font-bold text-slate-800 group-hover:text-purple-600">
                              ${order.total}
                            </td>
                            <td className="px-8 py-5">
                              <StatusBadge status={order.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div
                key="products"
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
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
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedProducts?.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
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
                                <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 overflow-hidden relative shrink-0">
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
                                  <p className="font-bold text-slate-800 text-sm">
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
                                <span className="font-bold text-slate-800 text-sm">
                                  {p.price}
                                </span>
                                {p.oldPrice && (
                                  <span className="text-xs text-slate-400 line-through">
                                    {p.oldPrice}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                In Stock
                              </span>
                            </td>
                            <td className="px-8 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditProduct(p)}
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => setProductDeleteConfirm(p)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
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
                  {/* Pagination Control for Products */}
                  <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100 bg-slate-50">
                    <button
                      disabled={productPage === 1}
                      onClick={() => setProductPage((prev) => prev - 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors shadow-sm"
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
                      onClick={() => setProductPage((prev) => prev + 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div
                key="users"
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
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
                          className="group hover:bg-slate-50/80 backdrop-blur-sm transition-all duration-200"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-700 font-bold">
                                {u.name[0]}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm">
                                  {u.name}
                                </p>
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
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
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
                                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                              >
                                <Heart size={14} className="text-red-500" />{" "}
                                Wishlist ({u.wishlistCount})
                              </button>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button
                              onClick={() => setDeleteConfirm(u.id)}
                              className="text-slate-400 hover:text-red-600 transition-colors p-2.5 hover:bg-red-50 rounded-xl group-hover:bg-white shadow-sm"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination Control for Users */}
                  <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100 bg-slate-50">
                    <button
                      disabled={userPage === 1}
                      onClick={() => setUserPage((prev) => prev - 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors shadow-sm"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                      Page {userPage} of {totalUserPages}
                    </span>
                    <button
                      disabled={userPage === totalUserPages}
                      onClick={() => setUserPage((prev) => prev + 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div
                key="orders"
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
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
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm text-red-600 font-medium italic">
                                  Deleted Account
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-8 py-5 font-bold text-slate-800 text-sm">
                            ${o.total}
                          </td>
                          <td className="px-8 py-5">
                            <select
                              value={o.status}
                              onChange={(e) =>
                                handleStatusChange(o.id, e.target.value)
                              }
                              className="bg-transparent text-sm font-bold py-1 pr-2 cursor-pointer focus:outline-none focus:text-purple-600 border border-slate-200 rounded px-2 hover:bg-white"
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
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
                            >
                              <Eye size={14} /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination Control for Orders */}
                  <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100 bg-slate-50">
                    <button
                      disabled={orderPage === 1}
                      onClick={() => setOrderPage((prev) => prev - 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors shadow-sm"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                      Page {orderPage} of {totalOrderPages}
                    </span>
                    <button
                      disabled={orderPage === totalOrderPages}
                      onClick={() => setOrderPage((prev) => prev + 1)}
                      className="px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors shadow-sm"
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

      {/* --- MODALS SECTION --- */}

      {/* Add/Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                  className="w-full px-4 py-3 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                    className="w-full px-4 py-3 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Old Price ($){" "}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
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
                    className="w-full px-4 py-3 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
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
                  className="w-full px-4 py-3 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Badge{" "}
                  <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={productForm.badge}
                  onChange={(e) =>
                    setProductForm({ ...productForm, badge: e.target.value })
                  }
                  placeholder="e.g., Sale, New, Hot"
                  className="w-full px-4 py-3 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-md shadow-purple-200 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>{" "}
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Delete Confirmation Modal */}
      {productDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete Product?
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-800">
                "{productDeleteConfirm.title}"
              </span>
              ? This action removes it from the store.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setProductDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(productDeleteConfirm.id)}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div
          onClick={() => setSelectedUser(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100/50 flex justify-between items-start bg-linear-to-br from-purple-50/50 to-transparent">
              <div>
                <h3 className="text-xl font-black bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {selectedUser.name}'s Storage
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {selectedUser.email}
                </p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                {(viewType === "cart"
                  ? selectedUser.cart
                  : selectedUser.wishlist
                )?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt=""
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <Package size={20} className="text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
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
                {(viewType === "cart"
                  ? selectedUser.cart
                  : selectedUser.wishlist
                )?.length === 0 && (
                  <p className="text-center text-slate-400">No items found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-slate-100/50 flex justify-between items-center bg-linear-to-br from-slate-50/50 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-linear-to-br from-purple-100 to-blue-100 text-purple-600 rounded-xl shadow-sm">
                  <ClipboardList size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-black text-lg bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    Order #{selectedOrder.id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {new Date(selectedOrder.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <StatusBadge status={selectedOrder.status} />
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${selectedOrder.total}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                    <Users size={16} className="text-purple-500" /> Customer
                    Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Name</span>
                      {selectedOrder.customer?.name ? (
                        <span className="font-medium text-slate-800">
                          {selectedOrder.customer.name}
                        </span>
                      ) : (
                        <span className="text-red-600 italic">
                          Deleted Account
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Email</span>
                      <span className="font-medium text-slate-800">
                        {selectedOrder.customer?.email || "—"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                    <MapPin size={16} className="text-purple-500" /> Shipping
                    Info
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-600 leading-relaxed border border-slate-100">
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
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                  <Package size={16} className="text-purple-500" /> Order Items
                  ({selectedOrder.items.length})
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3 text-center">Qty</th>
                        <th className="px-4 py-3 text-right">Price</th>
                        <th className="px-4 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-md shrink-0 overflow-hidden relative">
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt=""
                                    fill
                                    className="object-cover"
                                  />
                                )}
                              </div>
                              <span className="font-medium text-slate-800 line-clamp-1">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-slate-600">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            ${item.price}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-slate-800">
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

      {/* User Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete User?
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirm)}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-200"
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
