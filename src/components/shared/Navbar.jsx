"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-md">
      <nav className="px-4 py-3 lg:px-24 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            alt="Giftoria Logo"
            src="/logo.png"
            className="rounded-md"
          />
          <span className="text-2xl font-bold text-pink-600 tracking-wide">
            Giftoria
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-gray-700 font-medium">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-pink-500 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative btn btn-circle btn-sm bg-pink-100 hover:bg-pink-200 text-pink-600"
          >
            <ShoppingCart size={28} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Only */}
          {!session && (
            <Link
              href="/login"
              className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-1 shadow-md"
            >
              <LogIn size={16} /> Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden btn btn-ghost"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md p-4 space-y-2 text-center">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block hover:text-pink-500"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
