"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import useProducts from "../hooks/useProducts";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AllProducts() {
  const { data, isLoading, error } = useProducts();
  const products = data?.products || [];

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedOccasion = searchParams.get("occasion");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (selectedOccasion) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.occasion?.toLowerCase() === selectedOccasion.toLowerCase()
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOption === "priceLowHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1022] to-[#1a1f3d]">
        <Loader2 className="w-12 h-12 animate-spin text-red-400" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1022] to-[#1a1f3d] p-4">
        <div className="bg-red-900/30 border border-red-500 rounded-2xl p-8 max-w-md mx-auto text-center backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-red-300 mb-2">Oops!</h3>
          <p className="text-red-200 mb-4">
            Failed to load products. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-sm btn-error gap-2 mx-auto flex items-center"
          >
            <RefreshCw size={18} />
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1022] to-[#1a1f3d] text-white p-6">
      <div className="">
        <div className="md:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl w-full sm:w-1/2 shadow-lg backdrop-blur-md">
              <Search className="text-gray-300 w-5 h-5 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-white outline-none w-full placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-red-400 ml-2 font-bold hover:underline"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="sort" className="text-sm">
                Sort By:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="select select-sm bg-[#1e2a4a] text-white border-white/20 shadow-inner"
              >
                <option value="default">Default</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm mt-2">
            {selectedCategory && (
              <span className="bg-green-700/40 px-3 py-1 rounded-full text-green-200 font-medium">
                Category: {selectedCategory}
              </span>
            )}
            {selectedOccasion && (
              <span className="bg-blue-700/40 px-3 py-1 rounded-full text-blue-200 font-medium">
                Occasion: {selectedOccasion}
              </span>
            )}
            {(selectedCategory || selectedOccasion) && (
              <button
                onClick={() => (window.location.href = "/products")}
                className="ml-auto underline text-red-400 hover:text-red-500 font-semibold"
              >
                Clear Filters
              </button>
            )}
          </div>

          <p className="text-gray-400 text-sm mt-1">
            {filteredProducts.length} products found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
