import React, { useState, useEffect } from "react";
import { supabase } from "../../../SupabaseClient";
import { Link, useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";

function GetSingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

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
      const price = product.sale_price ?? product.product_price;

      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("cart_item_id, quantity")
        .eq("cart_id", cartId)
        .eq("product_id", product.product_id)
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
          product_id: product.product_id,
          quantity,
          price,
        });
      }

      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("productDetail")
        .select(` * , productCategory (*)`)
        .eq("product_id", id)
        .single();

      if (!error) setProduct(data);
    };

    fetchProduct();
  }, [id]);
  console.log(product);
  if (!product) return <div>Product not found</div>;
  return (
    <>
      <div className="site-content container grid md:grid-cols-2 gap-10 items-center">
        <div className="image-section">
          <img
            src={product.product_img || "/assets/img/default-img.png"}
            alt={product.product_name}
            className="min-h-48 w-full object-cover rounded"
          />
        </div>
        <div className="entry-summery ">
          <h2 className="text-5xl font-semibold capitalize mb-3 semi-bold">
            {product.product_name}
          </h2>
          <div className="price-area mb-2">
            {product.sale_price ? (
              <div>
                <span className="font-bold text-2xl">
                  ${product.sale_price}
                </span>
                <span className="ml-2 line-through">
                  ${product.product_price}
                </span>
              </div>
            ) : (
              <span>${product.product_price}</span>
            )}
          </div>
          <h5 className="mb-2">
            {product.stock > 0 ? (
              <>
                <span className="text-md font-semibold">Stock:</span>{" "}
                <span className="ml-1">{product.stock}</span>
              </>
            ) : (
              <span className="text-red-500 font-semibold">Out of stock</span>
            )}
          </h5>

          <p>
            <span className="text-md font-semibold">Categories:</span>{" "}
            <Link
              to={`/categories/${product.productCategory.product_id}`}
              className="capitalize"
            >
              {product.productCategory.productCat}
            </Link>
          </p>

          <form
            onSubmit={handleAddToCart}
            className="flex items-center my-3 gap-3 "
          >
            <input
              type="number"
              min="1"
              value={quantity}
              className="border border-gray-400 text-center rounded px-1.5 w-16 h-10 flex items-center justify-center font-semibold"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              type="submit"
              className="text-white bg-primary-color p-2 px-4 font-semibold rounded"
            >
              Add to cart
            </button>
          </form>

          <p>{product.product_desc}</p>
        </div>
      </div>
      <ProductDescription />
    </>
  );
}

export default GetSingleProduct;
