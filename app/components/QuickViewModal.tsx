"use client";

import Image from "next/image";
import { Product } from "../products";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState<string>("");

  const [loading, setLoading] = useState(false);

  // عند فتح المنتج
  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (!product) return null;

  const imageSrc = mainImage || product.images?.[0] || "/placeholder.jpg";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60" />

      {/* MODAL */}
      <div
        className="relative bg-white w-[95%] max-w-6xl h-[90vh] rounded-2xl p-6 flex gap-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          ✖
        </button>

        {/* IMAGE SECTION */}
        <div className="flex-1">
          <div className="relative w-full h-[500px]">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 mt-3">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className="w-16 h-16 object-cover rounded cursor-pointer border hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold mt-6">
              {product.price} EGP
            </p>
          </div>

          <button
            onClick={async () => {
              setLoading(true);
              await new Promise((r) => setTimeout(r, 400));

              addToCart(product);
              setLoading(false);
              onClose();
            }}
            className="bg-black text-white py-4 rounded-xl flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}