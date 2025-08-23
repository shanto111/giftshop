"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateQuantity = (index, amount) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += amount;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {cartItems?.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                cartItems?.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          {/* ${item?.price?.toFixed(2)} */}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <FaMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <FaPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-16 h-fit sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-lg font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="pt-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Apply Coupon
                </button>
              </div>

              <button
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                disabled={cartItems.length === 0}
              >
                <Link href={"/checkout"}>Checkout Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
