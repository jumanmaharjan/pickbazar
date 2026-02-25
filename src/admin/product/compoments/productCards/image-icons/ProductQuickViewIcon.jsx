import React from "react";
import { FaEye } from "react-icons/fa";

function ProductQuickViewIcon({ productInfo, setSelectedProduct }) {
  return (
    <>
      <span
        className=" w-8 h-8 text-center flex justify-center items-center rounded-full transition text-[#383838]  bg-white hover:bg-[#019376] hover:text-white"
        onClick={() => setSelectedProduct(productInfo)}
      >
        <FaEye className="w-3.5 h-3.5" />
      </span>
    </>
  );
}

export default ProductQuickViewIcon;
