import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../SupabaseClient";
import ProductPopupModel from "./compoments/ProductPopupModel";
import Card from "./compoments/productCards/card";
import SkeletonCards from "./compoments/skeleton/SkeletonCards";

const PAGE_SIZE = 4;

function GetLimitProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from("productDetail")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      setProducts(data);
      setTotal(count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="container mt-4">
      {loading && <SkeletonCards />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <Card
              key={product.product_id}
              productInfo={product}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-6 justify-center items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className=" primary-button "
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
          className=" primary-button "
        >
          Next
        </button>
      </div>

      {selectedProduct && (
        <ProductPopupModel
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

export default GetLimitProduct;
