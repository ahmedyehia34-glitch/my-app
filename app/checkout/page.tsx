"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, total } = useCart();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Cairo");
  const [phone, setPhone] = useState("");

  const shipping = city === "Cairo" ? 40 : 80;
  const tax = total * 0.14;
  const finalTotal = total + shipping + tax;

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!email || !firstName || !lastName || !address || !phone) {
      alert("Please fill all required fields");
      return;
    }

    // هنا تقدر تبعت الداتا لـ API أو Stripe بعدين
    console.log("Order placed:", {
      email,
      firstName,
      lastName,
      address,
      city,
      phone,
      cart,
      finalTotal,
    });

    alert("Payment successful 🎉");
  };

  return (
    <div className="min-h-screen bg-white pt-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          <h1 className="text-xl font-semibold">Contact</h1>

          <input
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h1 className="text-xl font-semibold mt-6">Delivery</h1>

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First name"
              className="border p-3 rounded-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              placeholder="Last name"
              className="border p-3 rounded-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            placeholder="Address"
            className="w-full border p-3 rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-3">
            <select
              className="border p-3 rounded-lg col-span-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option>Cairo</option>
              <option>Giza</option>
              <option>Alexandria</option>
            </select>

            <input
              placeholder="Postal"
              className="border p-3 rounded-lg"
            />
          </div>

          <input
            placeholder="Phone"
            className="w-full border p-3 rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" />
            Save this information for next time
          </label>

        </div>

        {/* RIGHT SIDE */}
        <div className="border-l pl-8 space-y-6">

          {/* PRODUCTS */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg" />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="text-sm">
                  {(item.price * item.quantity).toFixed(2)} EGP
                </p>
              </div>
            ))}
          </div>

          {/* DISCOUNT */}
          <div className="flex gap-2 pt-4">
            <input
              placeholder="Discount code"
              className="flex-1 border p-3 rounded-lg"
            />
            <button className="bg-black text-white px-4 rounded-lg">
              Apply
            </button>
          </div>

          {/* SUMMARY */}
          <div className="pt-4 space-y-2 text-sm">
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
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{finalTotal.toFixed(2)} EGP</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePayment}
            className="w-full bg-black text-white py-3 rounded-xl hover:opacity-80"
          >
            Pay now
          </button>

        </div>

      </div>
    </div>
  );
}