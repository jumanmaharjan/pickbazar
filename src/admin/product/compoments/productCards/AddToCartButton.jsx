import React from "react";

function AddToCartButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-3 px-3.75 py-3 text-xs font-bold capitalize leading-none transition bg-[#019376] hover:bg-[#04a282] text-white rounded"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
