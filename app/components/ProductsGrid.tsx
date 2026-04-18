"use client";

import { useState } from "react";
import { allProducts, Product } from "../products";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function ProductsGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 👇 Show More state
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const visibleProducts = allProducts.slice(0, visibleCount);

  const handleShowMore = async () => {
    setLoading(true);

    await new Promise((res) => setTimeout(res, 500));

    setVisibleCount((prev) => prev + 8);

    setLoading(false);
  };

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {visibleProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={setSelectedProduct}
          />
        ))}
      </div>

      {/* SHOW MORE */}
      {visibleCount < allProducts.length && (
        <div className="flex justify-center pb-10">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="px-8 py-3 bg-black text-white rounded-full"
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}