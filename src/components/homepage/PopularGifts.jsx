"use client";

import useProducts from "@/app/hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PopularGifts = () => {
  const { data: popularProducts, isLoading, error } = useProducts();

  if (isLoading) return <>Loading...</>;
  if (error) return <>Failed to load products.</>;

  const products = popularProducts?.products || [];

  return (
    <section className="px-4 py-16 lg:py-24 lg:px-20 max-w-[1850px] mx-auto">
      {/* Title & Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c1c1c]">
          Best Selling Products
        </h2>
        <button
          className="px-8 py-3 bg-[#1f1c59] text-white rounded-full hover:bg-[#2b276f] transition duration-300 font-semibold shadow-lg"
          aria-label="View All Products"
        >
          View All Collection
        </button>
      </div>

      {/* Swiper Carousel */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="pb-8"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div
          className="
            custom-prev
            absolute
            top-1/2
            -left-14
            transform
            -translate-y-1/2
           text-black
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            cursor-pointer
          "
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </div>
        <div
          className="
            custom-next
            absolute
            top-1/2
            -right-14
            transform
            -translate-y-1/2
            text-black
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            cursor-pointer
           
          "
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </div>
      </div>
    </section>
  );
};

export default PopularGifts;
