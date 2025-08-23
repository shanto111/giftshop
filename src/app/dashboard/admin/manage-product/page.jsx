"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useProducts from "@/app/hooks/useProducts";
import { Pencil, Trash2, Search } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function ManageProducts() {
  const { data, isLoading, error } = useProducts();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  console.log(data);

  const products = data?.products || [];

  // 🔍 Filter products by search term
  const filteredProducts = products.filter((prod) =>
    prod.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/admin/product/${id}`);
      if (response.status === 200) {
        alert("Product deleted successfully");
        queryClient.invalidateQueries(["products"]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (isLoading) return <p className="text-center p-4">Loading products...</p>;
  if (error)
    return (
      <p className="text-center p-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Products</h2>

      {/* 🔍 Search Bar + Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-md w-full md:w-1/2">
          <Search className="text-gray-950 mr-2" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name..."
            className="w-full text-black outline-none bg-transparent"
          />
        </div>
        <p className="">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* 🔲 Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => (
              <tr key={prod._id} className="border-t">
                <td className="px-4 py-3">
                  <div className="relative w-20 h-20">
                    <Image
                      src={prod.images?.[0] || "/placeholder.jpg"}
                      alt="Product Image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">{prod.name}</td>
                <td className="px-4 py-3">{prod.category || "N/A"}</td>
                <td className="px-4 py-3">{prod.brandName || "N/A"}</td>
                <td className="px-4 py-3">{prod.stock ?? "N/A"}</td>
                <td className="px-4 py-3">৳ {prod.price}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/update-product/${prod._id}`)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No product found */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-6">No products found.</p>
        )}
      </div>
    </div>
  );
}
