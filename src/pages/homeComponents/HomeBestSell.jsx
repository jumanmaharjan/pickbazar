import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import GetAllProduct from "../../admin/product/getallProduct";
import { Link } from "react-router-dom";
function HomeBestSell() {
  return (
    <div className="container">
      <div className="flex gap-4 items-center justify-between mb-6">
        <h6 className="text-2xl font-semibold primary-color">
          Weekly Best Sales
        </h6>
        <div className=" primary-color relative after:content-[''] after:block after:w-full after:h-px after:bg-[#019376] ">
          <Link
            to={"/allproducts"}
            className="flex text-sm gap-1 items-center capitalize"
          >
            view more
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
      <GetAllProduct limit={10} />
    </div>
  );
}

export default HomeBestSell;
