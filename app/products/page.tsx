"use client";

import { useState } from "react";
import { allProducts, Product } from "../products";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

const categories = ["All", "T-Shirts", "Hoodies", "Shoes", "Accessories"];

export default function ProductsPage() {
  const [selected, setSelected] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  // 👇 Quick View state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered =
    selected === "All"
      ? allProducts
      : allProducts.filter(
          (p) => p.category?.toLowerCase() === selected.toLowerCase()
        );

  const visibleProducts = filtered.slice(0, visibleCount);

  const handleShowMore = async () => {
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1000));

    setVisibleCount((prev) => prev + 8);

    setLoading(false);

    setToast(true);
    setTimeout(() => setToast(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-10 flex gap-8">

      {/* SIDEBAR */}
      <aside className="w-[250px] hidden md:block sticky top-28 h-fit">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                setVisibleCount(8);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selected === cat
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* PRODUCTS */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8">All Products</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setSelectedProduct}
            />
          ))}
        </div>

        {/* SHOW MORE */}
        {visibleCount < filtered.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-full flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </>
              ) : (
                "Show More"
              )}
            </button>
          </div>
        )}

        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg">
            More products loaded 🛍️
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}