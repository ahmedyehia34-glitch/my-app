"use client";

import { useState, useMemo } from "react";
import { allProducts, Product } from "../products";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function ProductsGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  // 🚀 memoized (prevents unnecessary recalculation)
  const visibleProducts = useMemo(() => {
    return allProducts.slice(0, visibleCount);
  }, [visibleCount]);

  const hasMore = visibleCount < allProducts.length;

  const handleShowMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    await new Promise((res) => setTimeout(res, 400));

    setVisibleCount((prev) => prev + 8);

    setLoading(false);
  };

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-3 sm:p-6">

        {visibleProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuickView={setSelectedProduct}
          />
        ))}

      </div>

      {/* SHOW MORE */}
      {hasMore && (
        <div className="flex justify-center pb-10">

          <button
            onClick={handleShowMore}
            disabled={loading}
            className={`px-8 py-3 rounded-full transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:opacity-80"
            }`}
          >
            {loading ? "Loading..." : "Show More"}
          </button>

        </div>
      )}

      {/* QUICK VIEW */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}