"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function MyOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`/api/orders?email=${session.user.email}`)
        .then((res) => setOrders(res.data.orders || []))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [session]);

  // Status color map for smooth UI
  const statusClasses = {
    Pending: "badge badge-warning",
    Confirmed: "badge badge-info",
    Shipped: "badge badge-primary",
    Delivered: "badge badge-success",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📦 My Orders
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">😕 No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`${statusClasses[order.status] || "badge"}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                  <strong className="text-gray-700">Total:</strong>{" "}
                  <span className="text-blue-600">${order.total}</span>
                </p>
                <p>
                  <strong className="text-gray-700">Payment:</strong>{" "}
                  {order.paymentMethod}
                </p>
              </div>

              {/* Order Tracker */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  {["Pending", "Confirmed", "Shipped", "Delivered"].map(
                    (step, index) => (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full border-2 ${
                            step === order.status ||
                            (step === "Delivered" &&
                              order.status === "Delivered")
                              ? "bg-green-500 border-green-500"
                              : step === "Shipped" &&
                                ["Delivered", "Shipped"].includes(order.status)
                              ? "bg-blue-500 border-blue-500"
                              : step === "Confirmed" &&
                                ["Confirmed", "Shipped", "Delivered"].includes(
                                  order.status
                                )
                              ? "bg-sky-400 border-sky-400"
                              : "border-gray-300"
                          }`}
                        ></div>
                        <span className="mt-1">{step}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-2 h-1 bg-gray-300 rounded-full relative">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      order.status === "Pending"
                        ? "w-[5%] bg-yellow-400"
                        : order.status === "Confirmed"
                        ? "w-[33%] bg-sky-400"
                        : order.status === "Shipped"
                        ? "w-[66%] bg-blue-500"
                        : "w-full bg-green-500"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
