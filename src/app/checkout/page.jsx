"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data: session, status } = useSession();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const total = storedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);
    const order = {
      userEmail: session?.user?.email,
      customerInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
      shipping: {
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
      paymentMethod: paymentMethod,
      items: cartItems,
      total: totalPrice,
      status: "Pending",
      createdAt: new Date(),
    };
    try {
      const res = await axios.post("/api/orders", order);
      if (res) {
        alert("Order placed!");
        reset();
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Side */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Customer Details
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Customer Info */}
              <div className="grid gap-6 mb-6 w-full lg:w-3/4 mx-auto">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("firstName", { required: true })}
                    type="text"
                    placeholder="Enter First Name"
                    className="input input-bordered w-full p-3 mt-1 rounded-md"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      First name is required
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("lastName", { required: true })}
                    type="text"
                    placeholder="Enter Last Name"
                    className="input input-bordered w-full p-3 mt-1 rounded-md"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      Last name is required
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter Email Address"
                    className="input input-bordered w-full p-3 mt-1 rounded-md"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      Email is required
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    type="tel"
                    placeholder="Enter Phone Number"
                    className="input input-bordered w-full p-3 mt-1 rounded-md"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      Phone number is required
                    </span>
                  )}
                </div>
              </div>

              {/* Shipping Info */}
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full lg:w-3/4 mx-auto">
                {/* Address */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    placeholder="Enter Shipping Address"
                    className="input input-bordered input-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm mt-1">
                      Address is required
                    </span>
                  )}
                </div>

                {/* City */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("city", { required: true })}
                    type="text"
                    placeholder="Enter City"
                    className="input input-bordered input-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm mt-1">
                      City is required
                    </span>
                  )}
                </div>

                {/* State */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("state", { required: true })}
                    type="text"
                    placeholder="Enter State"
                    className="input input-bordered input-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  {errors.state && (
                    <span className="text-red-500 text-sm mt-1">
                      State is required
                    </span>
                  )}
                </div>

                {/* Zip Code */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">
                      Zip Code <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    {...register("zipCode", { required: true })}
                    type="text"
                    placeholder="Enter Zip Code"
                    className="input input-bordered input-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  {errors.zipCode && (
                    <span className="text-red-500 text-sm mt-1">
                      Zip Code is required
                    </span>
                  )}
                </div>
              </div>

              {/* Payment Method Selection */}
              <h3 className="text-xl font-semibold mb-4 text-center">
                Payment Method
              </h3>
              <div className="flex justify-center gap-6 mb-6 w-full lg:w-3/4 mx-auto">
                <label
                  className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg border ${
                    paymentMethod === "cod"
                      ? "bg-blue-100 border-blue-500 shadow"
                      : "bg-white border-gray-300"
                  } transition-all duration-200`}
                >
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="hidden"
                  />
                  <span className="font-medium text-gray-700">
                    Cash on Delivery
                  </span>
                </label>

                <label
                  className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg border ${
                    paymentMethod === "online"
                      ? "bg-blue-100 border-blue-500 shadow"
                      : "bg-white border-gray-300"
                  } transition-all duration-200`}
                >
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="hidden"
                  />
                  <span className="font-medium text-gray-700">
                    Online Payment
                  </span>
                </label>
              </div>

              {/* Conditional Payment Info */}
              {paymentMethod === "online" && (
                <>
                  <h3 className="text-xl font-semibold mb-4">
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full lg:w-3/4 mx-auto">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("cardNumber", {
                          required: paymentMethod === "online",
                        })}
                        type="text"
                        placeholder="Enter Card Number"
                        className="input input-bordered w-full p-3 mt-1 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiration Date (MM/YY){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("expirationDate", {
                          required: paymentMethod === "online",
                        })}
                        type="text"
                        placeholder="MM/YY"
                        className="input input-bordered w-full p-3 mt-1 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("cvv", {
                          required: paymentMethod === "online",
                        })}
                        type="text"
                        placeholder="Enter CVV"
                        className="input input-bordered w-full p-3 mt-1 rounded-md"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full mt-6 p-3 rounded-md"
              >
                Complete Purchase
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <>
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
