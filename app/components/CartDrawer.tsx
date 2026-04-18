"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    total,
    shipping,
    tax,
    finalTotal,
    isOpen,
    setIsOpen,
  } = useCart();

  const router = useRouter();

  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setConfirmId(id);
  };

  const confirmDelete = (id: number) => {
    setRemovingId(id);

    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
      setConfirmId(null);
    }, 300);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible backdrop-blur-sm bg-black/40"
            : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-white z-50 shadow-2xl
        transition-transform duration-500 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black transition"
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
              Cart is empty 🛒
            </p>
          ) : (
            cart.map((item: any) => (
              <div
                key={item.id}
                className={`flex gap-3 items-center border-b pb-4 transition-all duration-300
                ${removingId === item.id ? "opacity-0 translate-x-10" : ""}`}
              >
                {/* IMAGE */}
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-xl object-cover"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {item.price} EGP
                  </p>

                  {/* COUNTER */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 transition active:scale-95"
                    >
                      -
                    </button>

                    <span className="text-sm w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 transition active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full transition"
                >
                  <FaTrash size={14} />
                </button>

                {/* CONFIRM POPUP */}
                {confirmId === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="bg-white p-4 rounded-2xl shadow-lg text-center w-[220px] animate-fadeIn">
                      <p className="text-sm mb-3">Delete item?</p>

                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setConfirmId(null)}
                          className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t bg-white">
          <div className="space-y-1 text-sm mb-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{total.toFixed(2)} EGP</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping.toFixed(2)} EGP</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>{tax.toFixed(2)} EGP</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{finalTotal.toFixed(2)} EGP</span>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}