"use client";

import { useState } from "react";
import { allProducts } from "../products";

export default function SearchBar({ onResults }: any) {
  const [value, setValue] = useState("");

  const handleSearch = (v: string) => {
    setValue(v);

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(v.toLowerCase())
    );

    onResults(filtered);
  };

  return (
    <input
      value={value}
      onChange={e => handleSearch(e.target.value)}
      placeholder="Search..."
      className="w-full p-2 border rounded mb-4"
    />
  );
}