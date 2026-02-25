import React, { useState } from "react";
import ProductImage from "./ProductImage";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";
import AddToCartButton from "./AddToCartButton";
import { UseCart } from "../../../../context/CartContext";
import ProductQuickViewIcon from "./image-icons/ProductQuickViewIcon";
import ProductWishlistIcon from "./image-icons/ProductWishlistIcon";
import { Link } from "react-router-dom";
import ProductAddedToast from "./ProductAddedToast";
import { UserAuth } from "../../../../context/AuthContext";

function Card({ productInfo, setSelectedProduct }) {
  const { addToCart } = UseCart();
  const [showToast, setShowToast] = useState(false);

  const { session } = UserAuth();
  const user = session?.user;
  // If productInfo is undefined, render nothing or a placeholder
  if (!productInfo) return null;

  const {
    product_img,
    product_name,
    product_id,
    product_price,
    sale_price,
    is_hot,
    is_new,
    is_sale,
  } = productInfo;

  return (
    <div className="border border-[#d6d6d6] rounded-lg py-3 px-2.5 flex flex-col justify-between items-center gap-2 cursor-pointer hover:shadow-lg">
      <figure className="relative group rounded-lg overflow-hidden">
        <ProductImage
          src={product_img || "/assets/img/default-img.png"} // default image
          alt={product_name || "Product"}
        />
        <div className="absolute inset-0 flex gap-2 justify-center items-center duration-200 opacity-0 group-hover:opacity-100 bg-[#00000030]">
          <ProductWishlistIcon />
          <ProductQuickViewIcon
            productInfo={productInfo}
            setSelectedProduct={setSelectedProduct}
          />
        </div>

        <div className="absolute top-1 left-1 z-2 flex gap-1 flex-col">
          {is_hot && (
            <span className="px-4 py-1 capitalize text-sm font-semibold bg-red-400 leading-none text-white rounded">
              hot
            </span>
          )}
          {is_new && (
            <span className="px-4 py-1 capitalize text-sm font-semibold bg-amber-300 leading-none text-white rounded">
              new
            </span>
          )}
          {is_sale && (
            <span className="px-4 py-1 capitalize text-sm font-semibold bg-green-500 leading-none text-white rounded">
              sale
            </span>
          )}
        </div>
      </figure>

      <div className="text-center">
        <Link to={`/product/${product_id}`}>
          <ProductTitle title={product_name || "Loading..."} />
        </Link>

        <ProductPrice
          price={product_price ?? 0}
          salePrice={sale_price ?? null}
        />

        <AddToCartButton
          onClick={async (e) => {
            e.stopPropagation();
            await addToCart({
              productId: product_id,
              quantity: 1,
              price: sale_price ?? product_price ?? 0,
            });
            console.log("Added to cart:", productInfo);
            if (user) setShowToast(true);
          }}
        />
        <ProductAddedToast
          show={showToast}
          onClose={() => setShowToast(false)}
          message={`${product_name} added to cart`}
        />
      </div>
    </div>
  );
}

export default Card;
