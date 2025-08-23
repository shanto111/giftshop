"use client";
import {
  LayoutDashboard,
  Package,
  ListOrdered,
  ShoppingCart,
  Image,
  LogOut,
  Bell,
  Search,
  Menu,
  Users,
  Star,
} from "lucide-react";
import { useEffect } from "react";
export default function AdminPage() {
  return (
    <div>
      {/* Top Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          count="2"
          color="bg-gradient-to-r from-green-400 to-green-600"
          icon={<Users size={30} />}
        />
        <StatCard
          title="Total Orders"
          count="8"
          color="bg-gradient-to-r from-pink-400 to-pink-600"
          icon={<ShoppingCart size={30} />}
        />
        <StatCard
          title="Total Products"
          count="16"
          color="bg-gradient-to-r from-blue-400 to-blue-600"
          icon={<Package size={30} />}
        />
        <StatCard
          title="Total Reviews"
          count="5"
          color="bg-gradient-to-r from-yellow-400 to-yellow-500"
          icon={<Star size={30} />}
        />
      </section>
      {/* Best Selling Products Table */}
      <section className="bg-[#111936] p-6 rounded-lg mb-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Best Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a223f] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Brand</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((_, index) => (
                <tr key={index} className="hover:bg-[#1f2a40]">
                  <td className="px-4 py-3">Product Name</td>
                  <td className="px-4 py-3">Fashion</td>
                  <td className="px-4 py-3">GESCO</td>
                  <td className="px-4 py-3 text-red-400">
                    <span className="line-through text-gray-400">৳350</span>{" "}
                    ৳300
                  </td>
                  <td className="px-4 py-3 text-yellow-400">⭐⭐⭐⭐⭐</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="bg-green-500 px-2 py-1 rounded">
                        View
                      </button>
                      <button className="bg-yellow-500 px-2 py-1 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 px-2 py-1 rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// StatCard Component
function StatCard({ title, count, color, icon }) {
  return (
    <div
      className={`rounded-lg p-5 text-white flex justify-between items-center ${color}`}
    >
      <div>
        <p className="text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{count}</h3>
      </div>
      <div className="opacity-60">{icon}</div>
    </div>
  );
}
