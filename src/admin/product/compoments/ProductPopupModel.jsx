import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../SupabaseClient";

function ProductPopupModel({ selectedProduct, setSelectedProduct }) {
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const getOrCreateCart = async (userId) => {
    const { data: cart, error } = await supabase
      .from("carts")
      .select("cart_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    if (cart) return cart.cart_id;

    const { data: newCart, error: insertError } = await supabase
      .from("carts")
      .insert({ user_id: userId })
      .select()
      .single();

    if (insertError) throw insertError;

    return newCart.cart_id;
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const cartId = await getOrCreateCart(user.id);
      const price = selectedProduct.sale_price ?? selectedProduct.product_price;

      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("cart_item_id, quantity")
        .eq("cart_id", cartId)
        .eq("product_id", selectedProduct.product_id)
        .maybeSingle();

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({
            quantity: quantity,
          })
          .eq("cart_item_id", existingItem.cart_item_id);
      } else {
        await supabase.from("cart_items").insert({
          cart_id: cartId,
          user_id: user.id,
          product_id: selectedProduct.product_id,
          quantity,
          price,
        });
      }

      alert("Product added to cart!");
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#00000099] flex items-center justify-center z-50"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="bg-white p-6 rounded max-w-250 w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 font-bold"
          onClick={() => setSelectedProduct(null)}
        >
          ✖
        </button>

        <div className="product-detail flex gap-6">
          <figure className="basis-[40%]">
            <img
              src={selectedProduct.product_img || "/assets/img/default-img.png"}
              alt={selectedProduct.product_name}
              className="h-48 w-full object-cover rounded"
            />
          </figure>

          <div className="basis-[60%] flex flex-col items-start gap-3">
            <h3 className="text-4xl capitalize font-bold">
              {selectedProduct.product_name}
            </h3>

            <div className="price-area">
              {selectedProduct.sale_price ? (
                <div>
                  <span className="font-bold text-xl">
                    ${selectedProduct.sale_price}
                  </span>
                  <span className="ml-2 text-gray-300 line-through">
                    ${selectedProduct.product_price}
                  </span>
                </div>
              ) : (
                <span>${selectedProduct.product_price}</span>
              )}
            </div>

            <form
              onSubmit={handleAddToCart}
              className="flex items-center gap-3 "
            >
              <input
                type="number"
                min="1"
                value={quantity}
                className="border border-gray-500 rounded max-w-20 h-full p-1 text-center font-semibold"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                type="submit"
                className="text-white bg-primary-color p-2 px-4 font-semibold rounded"
              >
                Add to cart
              </button>
            </form>

            <p>{selectedProduct.product_desc}</p>

            <Link
              to={`/product/${selectedProduct.product_id}`}
              className="text-white self-start px-4 font-semibold bg-black p-2 rounded"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopupModel;
