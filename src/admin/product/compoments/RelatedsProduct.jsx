import React from "react";
import GetAllProduct from "../GetallProduct";

function RelatedsProduct({ productCategoryid }) {
  return (
    <>
      <div className="container mt-12">
        <h3 className="text-3xl mb-5 primary-color font-bold">
          Related product
        </h3>
        <GetAllProduct limit={4} category_id={productCategoryid} />
      </div>
    </>
  );
}

export default RelatedsProduct;
