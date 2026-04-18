"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data);
  }, []);

  const updateStatus = (id: number, status: string) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const deleteOrder = (id: number) => {
    const filtered = orders.filter((order) => order.id !== id);

    setOrders(filtered);
    localStorage.setItem("orders", JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-white p-10">

      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-6">

        {orders.length === 0 && (
          <p className="text-gray-500">No orders yet</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-5 shadow-sm space-y-3"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {order.firstName} {order.lastName}
                </p>
              </div>

              <p className="font-semibold text-black">
                {order.total.toFixed(2)} EGP
              </p>

            </div>

            {/* STATUS */}
            <div className="flex items-center gap-3">

              <span className="text-sm">Status:</span>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order.id, e.target.value)
                }
                className="border p-2 rounded-lg"
              >
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>

            </div>

            {/* ITEMS */}
            <div className="text-sm text-gray-600">
              {order.items.map((item: any, i: number) => (
                <p key={i}>
                  • {item.name} × {item.quantity}
                </p>
              ))}
            </div>

            {/* ACTIONS */}
            <button
              onClick={() => deleteOrder(order.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete Order
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}