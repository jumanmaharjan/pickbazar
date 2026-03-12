import React, { useState, useEffect } from "react";
import { supabase } from "../../SupabaseClient";
import { Link } from "react-router-dom";

function GetAllProductByCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("productCategory")
        .select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const getImageUrl = (path) => {
    return supabase.storage.from("food").getPublicUrl(path).data.publicUrl;
  };

  return (
    <div className="container text-center mt-8 mb-16 flex justify-center gap-5 flex-wrap">
      {categories.length === 0 ? (
        <p>No category found</p>
      ) : (
        categories.map((p) => (
          <Link to={`/categories/${p.id}`} key={p.id}>
            {p.imageName && (
              <img
                src={getImageUrl(p.imageName)}
                alt={p.productCat}
                className="w-30 h-30 rounded-full object-cover bg-gray-200 mx-auto mb-2 overflow-hidden hover:scale-[110%] transition"
              />
            )}

            <h3 className="text-center capitalize">{p.productCat}</h3>
          </Link>
        ))
      )}
    </div>
  );
}

export default GetAllProductByCategory;
