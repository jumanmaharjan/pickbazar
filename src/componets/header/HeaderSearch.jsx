import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { UseSearch } from "../../context/SearchContext";
import Card from "../../admin/product/compoments/productCards/Card";

function HeaderSearch() {
  const {
    showSearch,
    openSearch,
    closeSearch,
    query,
    setQuery,
    results,
    loading,
  } = UseSearch();

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

  return (
    <div className="leading-none">
      {/* Search Icon */}
      <button onClick={openSearch}>
        <IoSearch className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex flex-col items-center pt-20"
          onClick={closeSearch}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-3 pr-10 border w-full rounded bg-white"
            />
            <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Loading */}
          {loading && <p className="mt-6 text-white">Searching...</p>}

          {/* No Results */}
          {!loading && query && results.length === 0 && (
            <p className="mt-6 text-white">No products found</p>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div
              className="mt-6 w-full max-w-5xl grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {results.map((product) => (
                <Card
                  key={product.product_id}
                  productInfo={product} // <-- Pass as productInfo
                  setSelectedProduct={() => {}} // optional if you don't use quick view
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <IoIosClose
            onClick={closeSearch}
            className="absolute top-6 right-6 text-3xl cursor-pointer text-white"
          />
        </div>
      )}
    </div>
  );
}

export default HeaderSearch;
