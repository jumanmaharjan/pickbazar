import React, { useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";

function HeaderSearch() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="header-search">
        <div
          className={
            showSearch
              ? "fixed flex justify-center items-center inset-0 h-full w-full  bg-gray-700/70 z-10"
              : "hidden"
          }
          onClick={(e) => {
            e.preventDefault();
            setShowSearch(false);
          }}
        >
          <form
            className="relative w-11/12 search-form"
            role="search"
            method="get"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type="text"
              placeholder="Search....."
              name="serch-item"
              id="serch-item"
              className=" px-3 py-2.5 border w-full text-x1 rounded bg-white border-gray-900/60"
            />
            <GrFormSearch className="absolute top-1/2 right-1 text-gray-500 -translate-y-1/2 " />
          </form>
          <IoIosClose
            onClick={(e) => {
              e.preventDefault();
              setShowSearch(false);
            }}
            className="serch-close-icon absolute top-5 right-5 text-2xl cursor-pointer text-red-500"
          />
        </div>
        <button
          className="search-icon cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setShowSearch(true);
          }}
        >
          <GrFormSearch className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default HeaderSearch;
