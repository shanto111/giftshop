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
  User,
} from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminPanelLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0c1022] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111936] flex flex-col">
        <div className="text-2xl font-bold text-center py-6 border-b border-[#1f2a40]">
          ECOMMERCE
        </div>
        <nav className="flex flex-col p-4 gap-2 text-[15px]">
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/admin/add-product"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300 hover:text-black"
          >
            <Package size={18} />
            <span>Add Products</span>
          </Link>
          <Link
            href="/dashboard/admin/manage-product"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300  hover:text-black"
          >
            <Package size={18} />
            <span>Manage Products</span>
          </Link>
          <Link
            href="/dashboard/admin/manage-category"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300  hover:text-black"
          >
            <Package size={18} />
            <span>Manage Products</span>
          </Link>
          <Link
            href="/dashboard/admin/manage-user"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300  hover:text-black"
          >
            <User size={18} />
            <span>Manage User</span>
          </Link>
          <Link
            href="/dashboard/admin/category"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300  hover:text-black"
          >
            <ListOrdered size={18} />
            <span>Category</span>
          </Link>
          <Link
            href="/dashboard/admin/manage-orders"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300  hover:text-black"
          >
            <ShoppingCart size={18} />
            <span>Manage Orders</span>
          </Link>
          <Link
            href="/dashboard/admin/banner"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300  hover:text-black"
          >
            <Image size={18} />
            <span>Home Banner Slides</span>
          </Link>
        </nav>
        <div className="p-4 mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 bg-[#0e76fd] hover:bg-[#0c65d1] text-white py-2 rounded"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#111936] px-6 py-4 border-b border-[#1f2a40] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Menu size={22} />
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="pl-10 pr-4 py-2 bg-[#1a223f] rounded text-white outline-none placeholder:text-gray-400"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Bell size={20} />
            <Avatar className="rounded-full w-8 h-8 overflow-hidden">
              <AvatarImage src="https://i.pravatar.cc/40" />
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 overflow-y-auto">
          {/* Render Routed Page Content */}
          <section className="bg-[#111936]rounded-lg">{children}</section>
        </main>
      </div>
    </div>
  );
}
