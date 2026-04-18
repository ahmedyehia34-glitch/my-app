"use client";

import { useEffect } from "react";

export default function OrderInit() {
  useEffect(() => {
    const orders = localStorage.getItem("orders");

    if (orders === null) {
      localStorage.setItem("orders", JSON.stringify([]));
    }
  }, []);

  return null;
}