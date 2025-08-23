"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 max-w-[1650px]">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900 drop-shadow-md">
            About GiftMaker
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
            We believe that every gift should tell a story and create lasting
            memories. Since 2020, we&apos;ve been helping people find the
            perfect gifts for their loved ones.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
            Our carefully curated collection features unique, high-quality items
            that are sure to bring joy to any recipient. From personalized
            treasures to luxury experiences, we have something special for
            everyone.
          </p>

          {/* Stats */}
          <div className="flex gap-12">
            <div className="bg-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default">
              <p className="text-3xl font-bold text-purple-700">10K+</p>
              <p className="text-purple-600 text-sm mt-1">Happy Customers</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default">
              <p className="text-3xl font-bold text-purple-700">500+</p>
              <p className="text-purple-600 text-sm mt-1">Unique Products</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
          <Image
            src={"/images/about2.webp"}
            alt="Gift Shop"
            width={800}
            height={450}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
