import React from "react";
import { IoIosSearch } from "react-icons/io";

function HomeBanner() {
  const bannerImageURL = "/assets/img/banner-4.webp";
  const bannertext = "Healthy vegetable that you deserve to eat fresh";
  const banenrparagraph =
    "We source and sell the very best beef, lamb and pork, sourced with the greatest care from farmer.";
  return (
    <>
      <div
        className="home-banner min-h-142.5  w-full bg-no-repeat bg-cover bg-center flex items-center justify-center flex-col"
        style={{
          backgroundImage: `url(${bannerImageURL})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="container">
          <div className="banner-text-wrapper text-center max-w-187.5 m-auto">
            <h2 className="text-3xl py-6">{bannertext}</h2>
            <p className="mb-9">{banenrparagraph}</p>
            <form className="relative">
              <input
                type="text"
                placeholder="What are you looking......"
                className=" px-3 py-2.5 pr-8.25 border w-full text-x1 rounded bg-white border-gray-900/60"
              />
              <button className="absolute min-w-8 top-0 right-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none text-gray-700/50">
                <IoIosSearch />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBanner;
