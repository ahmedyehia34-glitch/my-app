"use client";

import { useWishlist } from "./../context/WishlistContext";
import ProductCard from ".././components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="p-6">
      {wishlist.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}