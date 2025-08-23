"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "animate.css";

export default function AddProduct() {
  const { register, handleSubmit, reset } = useForm();
  const [imageLinks, setImageLinks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [size, setSize] = useState([]);
  const [gender, setGender] = useState("");
  const [customizable, setCustomizable] = useState(false);

  const handleSizeChange = (s) => {
    setSize((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 3 - imageLinks.length;

    if (files.length > remainingSlots) {
      Swal.fire(`❌ You can only upload ${remainingSlots} more image(s).`);
      return;
    }

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_API}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.success) {
          setImageLinks((prev) => [...prev, data.data.display_url]);
        } else {
          Swal.fire("❌ Failed to upload image");
        }
      } catch (err) {
        console.error("Upload error:", err);
        Swal.fire("❌ Image upload error");
      }
    }

    setUploading(false);
    e.target.value = "";
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      size,
      gender,
      images: imageLinks,
      customizable,
    };

    try {
      const res = await fetch("/api/product/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productData }),
      });

      if (res.ok) {
        Swal.fire("✅ Product Added Successfully!");
        reset();
        setImageLinks([]);
        setSize([]);
        setGender("");
        setCustomizable(false);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (err) {
      Swal.fire("❌ Error", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1022] text-black">
      <div className="p-8 rounded-2xl shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold text-amber-500 mb-6 border-b border-blue-600 pb-2">
          🛍️ Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name + Brand */}
          <div className="grid md:grid-cols-3 gap-6">
            <input
              {...register("name", { required: true })}
              placeholder="Product Name"
              className="input w-full"
            />
            <input
              {...register("category", { required: true })}
              placeholder="Category (e.g. birthday)"
              className="input w-full"
            />
            <input
              {...register("brandName", { required: true })}
              placeholder="Brand Name"
              className="input w-full"
            />
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input w-full"
              disabled={uploading || imageLinks.length >= 3}
              multiple
            />
            <p className="text-xs mt-1 text-white">
              {imageLinks.length}/3 images uploaded
            </p>

            {imageLinks.length > 0 && (
              <div className="flex gap-4 mt-2">
                {imageLinks.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <textarea
            {...register("description", { required: true })}
            placeholder="Product Description"
            className="textarea w-full"
            rows={4}
          />

          {/* Size and Gender */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Size:</label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSizeChange(s)}
                    className={`btn btn-sm text-white ${
                      size.includes(s) ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label>Gender:</label>
              <div className="flex gap-3 mt-2">
                {["Men", "Women", "Unisex"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGender(g)}
                    className={`btn btn-sm text-white ${
                      gender === g ? "btn-accent" : "btn-outline"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price, Stock, Color */}
          <div className="grid md:grid-cols-3 gap-6">
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              className="input w-full"
            />
            <input
              {...register("stock", { required: true })}
              type="number"
              placeholder="Stock"
              className="input w-full"
            />
            <input
              {...register("color")}
              placeholder="Color"
              className="input w-full"
            />
          </div>

          {/* Discount & DiscountType */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              {...register("discount")}
              type="number"
              placeholder="Discount (%)"
              className="input w-full"
            />
            <select {...register("discountType")} className="select w-full">
              <option value="">Select Discount Type</option>
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          {/* Occasion */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              {...register("occasion")}
              placeholder="Occasion (e.g. Wedding, Party)"
              className="input w-full"
            />
            <input
              {...register("returnPolicy")}
              placeholder="Return Policy (e.g. 7 days)"
              className="input w-full"
            />
          </div>

          {/* Return Policy + rating */}
          <div className="grid grid-cols-2 ">
            {/* Rating */}
            <div className="">
              <label
                className="block mb-1 text-white font-medium"
                htmlFor="rating"
              >
                Rating (1 to 5)
              </label>
              <select
                {...register("rating")}
                id="rating"
                defaultValue=""
                className="select w-full max-w-xs"
              >
                <option value="" disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                onChange={(e) => setCustomizable(e.target.checked)}
              />
              Customizable Product?
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-left">
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
