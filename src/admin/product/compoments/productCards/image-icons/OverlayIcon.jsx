import React from "react";
import ProductWishlistIcon from "./ProductWishlistIcon";
import ProductQuickViewIcon from "./ProductQuickViewIcon";

function OverlayIcon() {
  return (
    <>
      <div className=" absolute inset-0 flex gap-2 justify-center items-center duration-200 opacity-0 group-hover:opacity-100 bg-[#00000030] ">
        <ProductWishlistIcon />
        <ProductQuickViewIcon />
      </div>
    </>
  );
}

export default OverlayIcon;
