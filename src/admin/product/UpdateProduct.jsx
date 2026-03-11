import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import EditProductModal from "./compoments/EditProductModal";
import DeleteConfirmModal from "./compoments/DeleteConfirmModal";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductInfo = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("productDetail")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setProducts(data);

      setLoading(false);
    };

    fetchProductInfo();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (loading)
    return (
      <p className="text-gray-500 text-center mt-10">Loading products...</p>
    );

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={product.product_img || "/assets/img/default-img.png"}
                  alt={product.product_name}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h4 className="font-semibold text-lg truncate">
                  {product.product_name}
                </h4>

                <p className="text-gray-700 font-medium">
                  ${Number(product.product_price).toFixed(2)}
                </p>

                {/* Status badges */}
                <div className="flex gap-2">
                  {product.is_new && (
                    <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded">
                      New
                    </span>
                  )}
                  {product.is_sale && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      Sale
                    </span>
                  )}
                  {product.is_hot && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                      Hot
                    </span>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteProduct(product)}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
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
