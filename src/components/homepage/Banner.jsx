"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const router = useRouter();

  const handleFindGift = () => {
    if (category && occasion) {
      router.push(`/all-product?category=${category}&occasion=${occasion}`);
    }
  };

  return (
    <section className="px-4 py-10 lg:px-24 bg-white">
      {/* Banner Container */}
      <div className="relative w-full h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-xl">
        <Image
          src="/images/banner1.png"
          alt="Gift Image"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Text Content */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white max-w-xl space-y-6 z-10">
          <p className="text-sm font-semibold text-pink-300 uppercase">
            The Best Gift Shop
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Creating Happiness <br />
            <span className="text-pink-400">For Your Loved Ones</span>
          </h1>
          <p className="text-lg">
            Browse our beautiful collection of gifts to brighten your special
            moments.
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-lg font-semibold text-white shadow">
            Choose A Gift
          </button>
        </div>

        {/* "Need A Gift Now?" Box - Positioned in middle-bottom */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-6 z-10">
          <div className="flex flex-col  lg:flex-row items-center gap-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 whitespace-nowrap lg:ml-6">
              Need A Gift Now?
            </h3>

            <div className="flex flex-col md:flex-row gap-4 w-full justify-center lg:ml-60">
              <div className="relative w-full md:w-64">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Corporate">Corporate</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Birthday">Anniversary</option>
                  <option value="toys">Toys</option>
                </select>
              </div>

              <div className="relative w-full md:w-64">
                <select
                  onChange={(e) => setOccasion(e.target.value)}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Occasion
                  </option>
                  <option value="Corporate">Corporate</option>
                  <option value="for him">For Him</option>
                  <option value="for her">For Her</option>
                  <option value="wedding">Wedding</option>
                </select>
              </div>

              <button
                onClick={handleFindGift}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Find A Gift Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
