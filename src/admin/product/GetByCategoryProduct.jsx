import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import ProductPopupModel from "./compoments/ProductPopupModel";
import Card from "./compoments/productCards/Card";
import { useParams, Link } from "react-router-dom";

function GetByCategoryProduct() {
  const { id: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!categoryId) return;
    async function fetchProductInfo() {
      try {
        const { data, error } = await supabase
          .from("productDetail")
          .select("*")
          .eq("product_category_id", categoryId);

        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchProductInfo();
  }, [categoryId]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from("productCategory")
        .select("*");

      if (error) throw error;

      setCategories(data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  const getImageUrl = (path) => {
    if (!path) return "";
    return supabase.storage.from("food").getPublicUrl(path).data.publicUrl;
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="container">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="grid  grid-cols-[20%_auto] items-start ">
          <div className="mr-5">
            {categories.length === 0 ? (
              <p>No category found</p>
            ) : (
              categories.map((category) => (
                <Link
                  to={`/categories/${category.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 mb-1 capitalize text-sm font-semibold border border-[#d6d6d6] rounded-lg  hover:bg-[#f3f3f3]"
                  key={category.id}
                >
                  <img
                    src={getImageUrl(category.imageName)}
                    alt={category.productCat}
                    className="w-10 h-10 rounded "
                  />
                  {category.productCat}
                </Link>
              ))
            )}
          </div>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2">
                {products.map((product) => (
                  <Card
                    key={product.product_id}
                    productInfo={product}
                    setSelectedProduct={setSelectedProduct}
                  />
                ))}
              </div>
            </>
          )}

          {/* popup Modal */}
          {selectedProduct && (
            <ProductPopupModel
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default GetByCategoryProduct;
