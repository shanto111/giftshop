"use client";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert price to number safely
  const priceNum = Number(product.price) || 0;
  const discountedPriceNum = product.discount
    ? (priceNum * (100 - product.discount)) / 100
    : priceNum;

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-400 bg-white group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge */}
      {product.discount && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 drop-shadow-lg">
          -{product.discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-64 overflow-hidden relative rounded-t-2xl">
        <Image
          src={product.images?.[0] || "https://placehold.co/400x300"}
          alt={product?.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          priority
        />
        {/* Quick View Overlay */}
        <div
          className={`absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col justify-between h-[180px]">
        <Link href={`/all-product/${product._id}`}>
          <h3
            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 truncate"
            title={product.name}
          >
            {product?.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-extrabold text-blue-600">
              ৳ {discountedPriceNum.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm text-gray-400 line-through select-none">
                ৳ {priceNum.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-yellow-400 space-x-0.5 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                product.rating > i
                  ? "fill-current text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1 select-none">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform duration-300 hover:scale-105"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
