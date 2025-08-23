"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";
import useSingleProduct from "@/app/hooks/useSingleProduct";
import useSimilarProducts from "@/app/hooks/useSimilarProducts";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useSingleProduct(id);
  const {
    data: similarProducts,
    isLoading: similarLoading,
    error: similarError,
  } = useSimilarProducts(id);

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (isLoading || similarLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error || similarError) {
    return <div className="p-8 text-center text-red-500">সমস্যা হয়েছে!</div>;
  }

  const priceNum = Number(product.price) || 0;
  const discountedPriceNum = product.discount
    ? (priceNum * (100 - product.discount)) / 100
    : priceNum;

  const {
    name = "Product Name",
    price = 0,
    description = "No description available.",
    images = ["/placeholder.jpg"],
    colors = ["black", "red", "blue"],
    stock = 0,
  } = product;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* 🔷 Product Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* 🖼️ Product Images */}
        <div>
          <div className="group relative overflow-hidden rounded-xl border shadow-md">
            <img
              src={selectedImage || images[0]}
              alt="Main Product"
              className="w-full h-[450px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* 🔳 Thumbnail Images */}
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumbnail-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border transition hover:scale-105 ${
                  selectedImage === img ? "ring-2 ring-purple-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* 📝 Product Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
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
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* 🎨 Color Options */}
          {colors.length > 0 && (
            <div>
              <p className="font-medium">Color:</p>
              <div className="flex gap-2 mt-1">
                {colors.map((color, idx) => (
                  <span
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-purple-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  ></span>
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-500">
                  Selected color:{" "}
                  <span className="font-medium">{selectedColor}</span>
                </p>
              )}
            </div>
          )}

          {/* 🔢 Quantity Control */}
          <div>
            <p className="font-medium mb-1">Quantity:</p>
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 border rounded-md"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* 📦 Stock Info */}
          <div className="text-sm text-gray-600">
            {stock > 0 ? (
              <span>Stock available: {stock} items</span>
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </div>

          {/* 🛒 Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition">
              Add to Cart
            </button>
            <button className="flex items-center justify-center gap-2 border px-6 py-2 rounded-md hover:bg-gray-100 transition">
              <Heart size={16} /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* 🔻 Divider */}
      <hr className="my-10 border-t border-gray-300" />

      {/* 🧠 You Might Also Like Section */}
      <div className="mt-16">
        <h2 className="relative text-3xl font-bold text-center text-gray-800 mb-12">
          <span className="relative z-10 px-4 bg-white">
            You Might Also Like
          </span>
          <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-54 h-1 bg-pink-400 rounded-full"></div>
        </h2>

        {similarProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No similar products found.
          </p>
        )}
      </div>
    </div>
  );
}
