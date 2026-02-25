import React from "react";
import { UserAuth } from "../../../../context/AuthContext";

function ProductPrice({ price, salePrice }) {
  const { currencySymbol } = UserAuth();

  const hasSale =
    salePrice !== null && salePrice !== undefined && salePrice !== "";

  return (
    <div className="price-area">
      {hasSale ? (
        <div className="sale-price">
          <span className="font-bold">{currencySymbol(salePrice)}</span>

          <span className="ml-1.5 text-gray-400 text-xs relative inline-block after:absolute after:left-0 after:bottom-1/2 after:h-px after:w-full after:bg-gray-400">
            {currencySymbol(price)}
          </span>
        </div>
      ) : (
        <span className="current font-bold">{currencySymbol(price)}</span>
      )}
    </div>
  );
}

export default ProductPrice;
