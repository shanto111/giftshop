"use client";

import { Truck, Award, Headphones, RotateCcw } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Features() {
  const features = [
    {
      icon: <Truck size={32} />,
      title: "Lightning Fast Delivery",
      desc: "Express shipping nationwide with free delivery on orders over $50. Your gifts arrive exactly when you need them.",
      linkText: "24-48 hours delivery",
    },
    {
      icon: <Award size={32} />,
      title: "Premium Quality",
      desc: "Every product is carefully curated and quality-tested. We partner with artisans and premium brands worldwide.",
      linkText: "100% Authentic",
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Support",
      desc: "Our gift experts are always here to help you find the perfect present. Chat, call, or email us anytime.",
      linkText: "Always Available",
    },
    {
      icon: <RotateCcw size={32} />,
      title: "Hassle-Free Returns",
      desc: "Not completely satisfied? Our generous 30-day return policy ensures your peace of mind with every purchase.",
      linkText: "30-day guarantee",
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Support",
      desc: "Our gift experts are always here to help you find the perfect present. Chat, call, or email us anytime.",
      linkText: "Always Available",
    },
    {
      icon: <Truck size={32} />,
      title: "Lightning Fast Delivery",
      desc: "Express shipping nationwide with free delivery on orders over $50. Your gifts arrive exactly when you need them.",
      linkText: "24-48 hours delivery",
    },
    {
      icon: <RotateCcw size={32} />,
      title: "Hassle-Free Returns",
      desc: "Not completely satisfied? Our generous 30-day return policy ensures your peace of mind with every purchase.",
      linkText: "30-day guarantee",
    },
  ];

  return (
    <section className="bg-purple-50 py-20">
      <div className=" px-6">
        <h2 className="text-4xl font-extrabold text-center mb-14 text-purple-700 tracking-wide">
          Why Choose Us?
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 4, spaceBetween: 40 },
          }}
          loop
          className="group"
        >
          {features.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col items-center text-center p-10 rounded-3xl bg-white
                  shadow-md hover:shadow-lg transition-transform duration-500 ease-in-out hover:-translate-y-3"
              >
                <div
                  className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-7 rounded-full mb-8 flex items-center justify-center
                  shadow-lg transition-transform duration-400 group-hover:scale-110"
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-extrabold mb-4 text-gray-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-[280px]">
                  {item.desc}
                </p>
                <span className="text-purple-600 text-sm font-semibold cursor-pointer hover:underline">
                  {item.linkText}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
