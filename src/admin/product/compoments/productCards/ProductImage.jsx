import React from "react";

function ProductImage({ src, alt }) {
  return (
    <img
      src={src?.trim() || "/assets/img/default-img.png"}
      alt={alt}
      className=" w-full  max-h-[200px] object-cover"
    />
  );
}

export default ProductImage;
