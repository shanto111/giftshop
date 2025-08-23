"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data.orders || []))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}`, { status });
      setOrders(
        orders.map((order) => (order._id === id ? { ...order, status } : order))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  console.log("orders", orders);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 ">🛠 Manage Orders</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Cusmoter Name</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center border-t">
                <td className="p-2">{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-2">{order.userEmail}</td>
                <td className="p-2">${order.total}</td>
                <td className="p-2">{order.paymentMethod}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2 space-x-2">
                  {order.status !== "Confirmed" && (
                    <button
                      onClick={() => updateStatus(order._id, "Confirmed")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    >
                      Confirm
                    </button>
                  )}
                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => updateStatus(order._id, "Shipped")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Ship
                    </button>
                  )}
                  {order.status === "Shipped" && (
                    <button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
