"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Product } from "../products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import QuickViewModal from "./QuickViewModal";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

export default function HeroSliderSection({
  products,
}: {
  products: Product[];
}) {
  const { addToCart } = useCart();
  const { toggleWishlist, isLiked } = useWishlist();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">

      {/* HERO IMAGE */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="hero"
          fill
          className="object-cover"
        />
      </div>

      {/* SLIDER */}
      <div className="max-w-6xl mx-auto mt-6 px-4">

        {mounted && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            navigation
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
            }}
          >
            {products.slice(0, 10).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group relative h-[550px] rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition">

                  {/* IMAGE */}
                  <div className="relative h-[400px] overflow-hidden">

                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

                    <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </div>

                    {/* ACTIONS */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

                      <button
                        onClick={() => toggleWishlist(product)}
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                      >
                        {isLiked(product.id) ? "❤️" : "🤍"}
                      </button>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                      >
                        👁️
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                      >
                        🛒
                      </button>

                    </div>

                    {/* BUTTON */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-white text-black py-2 rounded-full shadow"
                      >
                        Select Options
                      </button>
                    </div>

                  </div>

                  {/* INFO */}
                  <div className="p-3 flex flex-col justify-between h-[140px]">

                    <div>
                      <h3 className="text-sm font-semibold truncate">
                        {product.name}
                      </h3>

                      <p className="text-gray-500 text-xs mt-1">
                        Premium Product
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">
                        {product.price} EGP
                      </span>

                      <button
                        onClick={() => addToCart(product)}
                        className="text-xs bg-black text-white px-3 py-1.5 rounded-full"
                      >
                        Add
                      </button>
                    </div>

                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* VIEW ALL */}
        <div className="flex justify-center mt-8">
          <Link
            href="/products"
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            View All
          </Link>
        </div>

      </div>

      {/* QUICK VIEW MODAL (SAFE RENDER) */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}