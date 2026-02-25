import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import EditProductModal from "./compoments/EditProductModal";
import DeleteConfirmModal from "./compoments/DeleteConfirmModal";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      const { data, error } = await supabase.from("productDetail").select("*");
      if (error) setError(error.message);
      else setProducts(data);
    };
    fetchProductInfo();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div
            key={product.product_id}
            className="border grid grid-cols-5 items-center p-3 mb-2 rounded"
          >
            <figure className="w-25 h-25">
              <img src={product.product_img} alt={product.product_name} />
            </figure>

            <h4 className="font-semibold">{product.product_name}</h4>
            <p>${product.product_price}</p>

            <div className="flex gap-2">
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => setSelectedProduct(product)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => setDeleteProduct(product)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* 🔥 Modals */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={setProducts}
        />
      )}

      {deleteProduct && (
        <DeleteConfirmModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onDeleted={setProducts}
        />
      )}
    </div>
  );
}

export default UpdateProduct;
