"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const stored = localStorage.getItem("orders");

        if (!stored) {
          setOrders([]);
          return;
        }

        const parsed = JSON.parse(stored);
        setOrders(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.log("Orders parse error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Delivered":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">

      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      <div className="space-y-8">

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-4 md:p-6 shadow-sm"
            >

              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">

                <div>
                  <h2 className="font-semibold">
                    Order # {order.id}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "No date"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(
                    order.status || "Pending"
                  )}`}
                >
                  {order.status || "Pending"}
                </span>

              </div>

              {/* ITEMS */}
              <div className="space-y-4">

                {order.items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-3 gap-3"
                  >

                    <div className="flex items-center gap-4">

                      {/* 🖼 IMAGE SAFE FIX */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border bg-gray-100 shrink-0">

                        {item.images?.[0] || item.image ? (
                          <Image
                            src={item.images?.[0] || item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                            No Image
                          </div>
                        )}

                      </div>

                      {/* INFO */}
                      <div>
                        <p className="font-medium text-sm md:text-base">
                          {item.name}
                        </p>

                        <p className="text-xs md:text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                    </div>

                    {/* PRICE */}
                    <p className="font-semibold text-sm md:text-base">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </p>

                  </div>
                ))}

              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-4 pt-4 border-t font-bold">
                <span>Total</span>
                <span>{order.total?.toFixed(2) || 0} EGP</span>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}