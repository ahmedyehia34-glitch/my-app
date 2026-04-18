"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../products";

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isLiked: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isLiked = (id: number) => {
    return wishlist.some((p) => p.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isLiked }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return ctx;
};