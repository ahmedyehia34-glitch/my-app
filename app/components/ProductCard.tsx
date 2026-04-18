"use client";

import { Product } from "../products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addToCart } = useCart();
  const { toggleWishlist, isLiked } = useWishlist();

  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    addToCart(product);
    setLoading(false);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md">

      {/* IMAGE */}
      <div className="relative w-full h-[450px] overflow-hidden">

        {/* CLICKABLE IMAGE */}
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

        {/* ICONS */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-30">

          <button
            onClick={() => toggleWishlist(product)}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow
            translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition"
          >
            <FaHeart className={isLiked(product.id) ? "text-red-500" : "text-gray-400"} />
          </button>

          <button
            onClick={() => onQuickView?.(product)}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow
            translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition delay-75"
          >
            <FaEye />
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow
            translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition delay-150"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaShoppingCart />
            )}
          </button>

        </div>

        {/* SELECT OPTIONS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]
          translate-y-10 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition duration-300 z-20"
        >
          <button
            onClick={() => onQuickView?.(product)}
            className="w-full bg-white py-3 rounded-full font-medium shadow-lg"
          >
            Select Options
          </button>
        </div>

      </div>

      {/* INFO */}
      <div className="p-4 text-center">
        <h2 className="font-semibold">{product.name}</h2>
        <p className="text-gray-500">{product.price} EGP</p>
      </div>

    </div>
  );
}