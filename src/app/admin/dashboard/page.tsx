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
} from "lucide-react";
import db from "@/app/db.json";

interface UserData {
  id: string;
  name: string;
  email: string;
  cartCount: number;
  wishlistCount: number;
  cart?: any[];
  wishlist?: any[];
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  userId: string;
  items: any[];
  customer?: any;
}

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  users: UserData[];
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "orders">(
    "dashboard",
  );
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [viewType, setViewType] = useState<"cart" | "wishlist" | "both">(
    "both",
  );

  useEffect(() => {
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
  }, [user, isAuthenticated, router]);

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
        alert("User deleted successfully!");
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
        alert(`Order status updated to ${newStatus}!`);
        fetchStats();
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      alert("Error updating order status");
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
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
            Admin Panel
          </h1>
          <div className="h-1.5 w-20 bg-linear-to-r from-purple-500 to-teal-400 rounded-full mb-10"></div>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-6 py-2.5 rounded-full shadow-sm border border-slate-100">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900">Admin Dashboard</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome, Administrator {user?.name}!
            </h3>
            <p className="text-slate-500">
              Manage users, monitor revenue, and track orders from this
              dashboard.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === "users"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Users ({stats.totalUsers})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === "orders"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Orders ({stats.totalOrders})
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                    <DollarSign size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${stats.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stats.totalOrders}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="p-4 bg-teal-50 text-teal-600 rounded-xl">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stats.totalUsers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-xl font-bold text-slate-900">
                    Recent Transactions
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-widest">
                      <tr>
                        <th className="px-8 py-4">Order ID</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Items</th>
                        <th className="px-8 py-4">Total</th>
                        <th className="px-8 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stats.recentOrders.slice(0, 5).map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-8 py-5 text-sm font-mono text-purple-600 font-medium">
                            #{order.id.slice(-8).toUpperCase()}
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-600">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-8 py-5 text-sm text-slate-600">
                            {order.items.length} Products
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-slate-900">
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
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">
                  User Management
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Name</th>
                      <th className="px-8 py-4">Email</th>
                      <th className="px-8 py-4">Cart Items</th>
                      <th className="px-8 py-4">Wishlist</th>
                      <th className="px-8 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.users.map((userData) => (
                      <tr
                        key={userData.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-8 py-5 text-sm font-medium text-slate-900">
                          {userData.name}
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">
                          {userData.email}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <ShoppingCart size={16} className="text-blue-600" />
                            <span className="text-sm font-medium">
                              {userData.cartCount}
                            </span>
                            {userData.cartCount > 0 && (
                              <button
                                onClick={() => {
                                  setSelectedUser(userData);
                                  setViewType("cart");
                                }}
                                className="text-xs text-purple-600 hover:underline ml-2"
                              >
                                View
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <Heart size={16} className="text-red-600" />
                            <span className="text-sm font-medium">
                              {userData.wishlistCount}
                            </span>
                            {userData.wishlistCount > 0 && (
                              <button
                                onClick={() => {
                                  setSelectedUser(userData);
                                  setViewType("wishlist");
                                }}
                                className="text-xs text-purple-600 hover:underline ml-2"
                              >
                                View
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <button
                            onClick={() => setDeleteConfirm(userData.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-medium"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">
                  Order Management
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Order ID</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4">Customer</th>
                      <th className="px-8 py-4">Items</th>
                      <th className="px-8 py-4">Total</th>
                      <th className="px-8 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-8 py-5 text-sm font-mono text-purple-600 font-medium">
                          #{order.id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">
                          {order.customer?.email || "N/A"}
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600">
                          {order.items.length} Products
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-900">
                          ${order.total}
                        </td>
                        <td className="px-8 py-5">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-purple-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDeleteUser(deleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header - Fixed */}
            <div className="flex justify-between items-start p-8 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedUser.name}'s Items
                </h3>
                <p className="text-sm text-slate-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {selectedUser.cartCount > 0 &&
                (viewType === "cart" || viewType === "both") && (
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <ShoppingCart size={18} className="text-blue-600" />
                      Cart Items ({selectedUser.cartCount})
                    </h4>
                    <div className="space-y-2">
                      {selectedUser.cart?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <Package size={16} className="text-slate-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-slate-500">
                              Qty: {item.quantity} × ${item.price}
                            </p>
                          </div>
                          <p className="font-bold text-sm">
                            ${item.totalPrice}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {selectedUser.wishlistCount > 0 &&
                (viewType === "wishlist" || viewType === "both") && (
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <Heart size={18} className="text-red-600" />
                      Wishlist Items ({selectedUser.wishlistCount})
                    </h4>
                    <div className="space-y-2">
                      {selectedUser.wishlist?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <Package size={16} className="text-slate-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.title}</p>
                          </div>
                          <p className="font-bold text-sm">${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Footer - Fixed */}
            <div className="p-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
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
