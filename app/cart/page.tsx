"use client";

import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    total,
    shipping,
    tax,
    finalTotal,
  } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-10">

      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">Your cart is empty 🛒</p>

          <Link
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT - ITEMS */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-xl p-4 bg-white shadow-sm"
              >

                {/* IMAGE */}
                <Image
                  src={item.images?.[0]}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="rounded-lg object-cover"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {item.price} EGP
                  </p>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-2 mt-3">

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      -
                    </button>

                    <span className="w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* PRICE + REMOVE */}
                <div className="text-right">
                  <p className="font-bold">
                    {item.price * item.quantity} EGP
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="border rounded-xl p-6 h-fit sticky top-28 bg-white shadow-md">

            <h2 className="text-lg font-bold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">

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

              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} EGP</span>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="mt-6 space-y-3">

              <Link
                href="/checkout"
                className="block text-center bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Checkout
              </Link>

              <Link
                href="/products"
                className="block text-center border py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}