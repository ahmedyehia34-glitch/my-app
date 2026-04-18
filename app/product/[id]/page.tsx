"use client";

import { useParams } from "next/navigation";
import { allProducts } from "../../products";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const product = allProducts.find(
    (p) => p.id === Number(params.id)
  );

  if (!product) {
    return (
      <div className="pt-32 text-center text-xl">
        Product not found ❌
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-10 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div className="relative w-full h-[500px]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="100vw"
          className="object-cover rounded-xl"
        />
      </div>

      {/* INFO */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-500 mt-3">
          {product.description}
        </p>

        <p className="text-2xl font-semibold mt-6">
          {product.price} EGP
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-black text-white px-6 py-3 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}