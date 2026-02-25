import React from "react";
import { UseCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, cartCount, amount, updateQuantity, removeFromCart } =
    UseCart();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Shopping Cart ({cartCount})
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          Your cart is empty 🛒
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={item.product_img}
                  alt={item.product_name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.product_name}</h3>
                  <p className="text-gray-500 mt-1">
                    ${item.product_price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-semibold">
                    ${(item.quantity * item.product_price).toFixed(2)}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700 text-sm"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${amount.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax & Fees</span>
              <span>${(amount.total - amount.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${amount.total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary-color text-white py-3 rounded hover:bg-primary-color-dark transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
