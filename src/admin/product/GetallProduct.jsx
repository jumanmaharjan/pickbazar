import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import ProductPopupModel from "./compoments/ProductPopupModel";
import Card from "./compoments/productCards/card";
import SkeletonCards from "./compoments/skeleton/SkeletonCards";

function GetAllProduct({ limit = null }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      setLoading(true);
      let query = supabase.from("productDetail").select("*");

      if (limit !== null) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) setError(error.message);
      else setProducts(data);
      setLoading(false);
    };

    fetchProductInfo();
  }, [limit]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="">
      {loading ? (
        <SkeletonCards />
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 ">
          {products.map((product) => (
            <Card
              key={product.product_id}
              productInfo={product}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* popup Modal */}
      {selectedProduct && (
        <ProductPopupModel
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

export default GetAllProduct;
