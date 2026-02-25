import React, { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    sale_price: "",
    stock: "",
    category_id: "",
    tag: "",
    image_url: "",
    on_sale: false,
    is_hot: false,
    is_new: true,
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("productCategory")
        .select("id, productCat")
        .order("productCat");

      if (!error) setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // IMAGE UPLOAD FUNCTION
  const uploadImage = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error } = await supabase.storage
      .from("product_image")
      .upload(filePath, imageFile);

    if (error) throw error;

    const { data } = supabase.storage
      .from("product_image")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ⬅️ Upload image first
      const imageUrl = await uploadImage();

      const { error } = await supabase.from("productDetail").insert([
        {
          product_name: product.name,
          product_desc: product.description,
          product_price: Number(product.price),
          sale_price: product.sale_price ? Number(product.sale_price) : null,
          stock: Number(product.stock),
          product_category_id: product.category_id,
          tags: product.tag,
          product_img: imageUrl, // 👈 uploaded image URL
          on_sale: product.on_sale,
          is_hot: product.is_hot,
          is_new: product.is_new,
        },
      ]);

      if (error) throw error;

      alert("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        price: "",
        sale_price: "",
        stock: "",
        category_id: "",
        tag: "",
        image_url: "",
        on_sale: false,
        is_hot: false,
        is_new: true,
      });

      setImageFile(null);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-250 mx-auto p-6 space-y-3 add-product-section"
    >
      <h2 className="text-xl font-bold">Add Product</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product.name}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          value={product.price}
        />
        <input
          name="sale_price"
          type="number"
          placeholder="Sale Price"
          onChange={handleChange}
          value={product.sale_price}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          value={product.stock}
        />

        {/* Category Select */}
        <select
          name="category_id"
          value={product.category_id}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.productCat}
            </option>
          ))}
        </select>

        <input
          name="tag"
          placeholder="Tag"
          onChange={handleChange}
          value={product.tag}
        />

        {/* ✅ IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        {/* Image preview */}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="h-24 object-cover rounded"
          />
        )}

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="on_sale"
              checked={product.on_sale}
              onChange={handleChange}
            />{" "}
            On Sale
          </label>
          <label>
            <input
              type="checkbox"
              name="is_hot"
              checked={product.is_hot}
              onChange={handleChange}
            />{" "}
            Hot
          </label>
          <label>
            <input
              type="checkbox"
              name="is_new"
              checked={product.is_new}
              onChange={handleChange}
            />{" "}
            New
          </label>
        </div>
      </div>
      <button disabled={loading} className="bg-black text-white px-4 py-2">
        {loading ? "Saving..." : "Add Product"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default AddProduct;
