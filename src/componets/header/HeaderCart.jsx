import React, { useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
function HeaderCart() {
  const [itemNo, setItemNo] = useState(0);
  setItemNo;
  return (
    <>
      <div className="cart-icon-wrapper flex item-center gap-x-1.5">
        <div className="icon-wrapper  relative">
          <MdOutlineShoppingBag className="w-5 h-5" />
          <span className="shop-item-no bg-primary-color text-white absolute -top-1 -right-1 text-xs min-w-4 min-h-4 p-0.5 rounded-[20px] flex items-center justify-center ">
            {itemNo}
          </span>
        </div>
        <span className="cart-icon-name hidden lg:inline-block">Cart</span>
      </div>
    </>
  );
}

export default HeaderCart;
