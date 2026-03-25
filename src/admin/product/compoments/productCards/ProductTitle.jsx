import React from "react";

function ProductTitle({ title }) {
  return (
    <h4 className="font-bold text-lg md:text-xl mb-1.5 capitalize text-center hover:text-[#04a282]">
      {title}
    </h4>
  );
}

export default ProductTitle;
