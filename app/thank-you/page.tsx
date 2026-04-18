"use client";

import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 200);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white">

      {/* CIRCLE ANIMATION */}
      <div
        className={`w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center transition-all duration-700 ${
          show ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* check mark */}
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* TEXT */}
      <h1
        className={`text-3xl font-bold mt-6 transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Thank You 🎉
      </h1>

      <p
        className={`text-gray-500 mt-2 transition-all duration-700 delay-150 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        Your order has been placed successfully
      </p>

      {/* BUTTON */}
      <a
        href="/orders"
        className={`mt-6 bg-black text-white px-6 py-2 rounded-lg transition-all duration-700 delay-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        View Orders
      </a>

    </div>
  );
}