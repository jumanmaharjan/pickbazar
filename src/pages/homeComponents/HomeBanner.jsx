import React, { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { UseSearch } from "../../context/SearchContext";
import { Link } from "react-router-dom";

function HomeBanner() {
  const { showSearch, closeSearch, query, setQuery, results, loading } =
    UseSearch();

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeSearch();
    };

    if (showSearch) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [showSearch]);

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
            <h2 className="primary-color lg:text-6xl md:text-5xl sm:text-3xl font-extrabold capitalize pt-6 pb-9">
              {bannertext}
            </h2>
            <p className="mb-10">{banenrparagraph}</p>
            <form className="relative">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking......"
                className=" px-3 py-2.5 pr-8.25 border w-full text-x1 rounded bg-white border-gray-900/60"
              />
              <button className="absolute min-w-8 top-0 right-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none text-gray-700/50">
                <IoIosSearch />
              </button>
            </form>

            {loading && query.length <= 0 && (
              <p className="mt-6 text-white">Searching...</p>
            )}

            {!loading && query && results.length === 0 && (
              <p className="mt-6 text-white">No products found</p>
            )}

            {!loading && results.length > 0 && (
              <div
                className="mt-6 w-full bg-white rounded p-3"
                onClick={(e) => e.stopPropagation()}
              >
                {results.map((product) => (
                  <Link to={`/product/${product.product_id}`}>
                    <div
                      key={product.product_id}
                      className="flex items-center justify-start capitalize gap-1.5"
                    >
                      <figure className="w-12.5 h-12.5 shrink-0 flex items-center justify-center rounded">
                        <img
                          src={
                            product.product_img || "/assets/img/default-img.png"
                          }
                          alt={product.product_name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </figure>
                      <span className="text-sm font-medium">
                        {product.product_name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBanner;
