"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HeroBanner: React.FC = () => {
  const fullText = "Dnd Design";
  const [text, setText] = useState("");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  // typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMouse({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-[700px] bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-banner.jpg')",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* 🔥 STRONG SPOTLIGHT (MAIN EFFECT) */}
      <div
        className="absolute w-[1000px] h-[1000px] rounded-full opacity-80 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 25%, rgba(255,255,255,0.1) 45%, transparent 70%)",
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* floating soft glow */}
      <div className="absolute w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full animate-float" />

      {/* CONTENT */}
      <div className="relative text-center text-white px-4 animate-fadeUp">

        {/* title typing */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-wide">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="mt-4 text-gray-200">
          Premium Fashion Collection 2026
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8">
          <Link
            href="/products"
            className="px-8 py-3 bg-white text-black rounded-full font-medium
            hover:scale-105 transition transform duration-300 shadow-lg"
          >
            Shop Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;