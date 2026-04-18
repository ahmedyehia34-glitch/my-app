"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { FaShoppingCart, FaHeart, FaBars, FaTimes, FaSearch } from "react-icons/fa";

export default function Header() {
  const { cartCount, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // scroll shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Orders", href: "/orders" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6">

          {/* LOGO */}
          <Link
            href="/"
            className={`font-bold tracking-widest transition-all duration-300 ${
              scrolled ? "text-xl" : "text-2xl"
            }`}
          >
            DND
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex gap-10 text-lg font-semibold">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group transition ${
                  pathname === link.href
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {link.name}

                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:scale-110 transition"
            >
              <FaSearch className="text-lg" />
            </button>

            {/* WISHLIST */}
            <Link href="/wishlist">
              <FaHeart className="text-lg hover:scale-110 transition" />
            </Link>

            {/* CART */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative hover:scale-110 transition"
            >
              <FaShoppingCart className="text-lg" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-xl"
            >
              <FaBars />
            </button>

          </div>
        </div>

        {/* 🔍 SEARCH BAR */}
        {searchOpen && (
          <div className="max-w-6xl mx-auto px-6 mt-3 animate-fadeUp">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border shadow-sm focus:outline-none"
            />
          </div>
        )}
      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-6 text-lg font-medium">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-black"
            >
              {link.name}
            </Link>
          ))}

        </div>
      </div>

      <CartDrawer />
    </>
  );
}