import React, { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import { UseCart } from "../../context/CartContext";

function HeaderCart() {
  const { cartItems, cartCount, amount, removeFromCart } = UseCart();
  const [close, setClose] = useState(false);

  return (
    <div className="cart-icon-wrapper flex items-center gap-x-1.5">
      <div className="icon-wrapper relative" onClick={() => setClose(true)}>
        <MdOutlineShoppingBag className="w-5 h-5" />
        <span className="shop-item-no bg-primary-color text-white absolute -top-1 -right-1 text-xs min-w-4 min-h-4 p-0.5 rounded-[20px] flex items-center justify-center">
          {cartCount}
        </span>
      </div>

      <span className="cart-icon-name hidden lg:inline-block">Cart</span>

      {close && (
        <div
          className="cartpopupmodel fixed inset-0 bg-[#00000099] flex items-center justify-center z-50"
          onClick={() => setClose(false)}
        >
          <div
            className="bg-white px-5 py-3 w-87.5 flex flex-col absolute top-0 right-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-semibold mb-3 capitalize">
              Shopping Cart
            </h3>

            <button
              className="absolute top-4 right-3 text-gray-600 font-bold"
              onClick={() => setClose(false)}
            >
              ✖
            </button>

            <ul className="py-4 px-3 grow overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <li key={item.product_id} className="flex gap-2.5 mb-3">
                    <figure className="w-20 h-20">
                      <img
                        src={item.product_img}
                        alt={item.product_name}
                        className="object-cover w-full h-full"
                      />
                    </figure>

                    <div className="grow">
                      <Link to={`/product/${item.product_id}`}>
                        <h5 className="font-semibold capitalize">
                          {item.product_name}
                        </h5>
                      </Link>

                      <p>Quantity: {item.quantity}</p>

                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <span>
                      ${(item.product_price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))
              )}
            </ul>

            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>${amount.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Tax (5%)</span>
                <span>${(amount.subtotal * 0.05).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${amount.total.toFixed(2)}</span>
              </div>

              <div className="flex gap-4 mt-4">
                <Link
                  to="/cart"
                  className="primary-button"
                  onClick={() => setClose(false)}
                >
                  Cart
                </Link>

                <Link
                  to="/checkout"
                  className="primary-button"
                  onClick={() => setClose(false)}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderCart;
