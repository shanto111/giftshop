"use client";

import Link from "next/link";
import Image from "next/image";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const categories = [
  { name: "Birthday Gifts", image: "/images/cake.png", slug: "birthday" },
  {
    name: "Anniversary Gifts",
    image: "/images/chocolate.webp",
    slug: "anniversary",
  },
  { name: "Corporate", image: "/images/flower.webp", slug: "corporate" },
  { name: "Watch", image: "/images/watch.webp", slug: "watch" },
  { name: "Flowers", image: "/images/flower.webp", slug: "flowers" },
  { name: "Teddy Bears", image: "/images/plushies.webp", slug: "teddy" },
  {
    name: "Personalized Gifts",
    image: "/images/flower.webp",
    slug: "personalized",
  },
  { name: "Perfumes", image: "/images/watch.webp", slug: "perfume" },
  { name: "Jewelry", image: "/images/flower.webp", slug: "jewelry" },
  { name: "Chocolates", image: "/images/chocolate.webp", slug: "chocolates" },
];

const GiftCategory = () => {
  return (
    <section className="px-4 py-20 lg:px-20 ">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 animate-fadeIn">
          🎁 Shop by Category
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Find the perfect gift for every occasion
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        loop={true}
        className="max-w-[1850px] mx-auto"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`/all-product?category=${category.slug}`}
              className="group block rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white/70 backdrop-blur-lg"
            >
              {/* Image Container */}
              <div className="w-full h-36 flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-br from-pink-400 to-purple-500 transition-opacity duration-300 rounded-2xl"></div>
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Category Name */}
              <h3 className="mt-4 text-center text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                {category.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GiftCategory;
