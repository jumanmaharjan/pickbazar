import React, { useState } from "react";
import { supabase } from "../../../SupabaseClient";

function EditProductModal({ product, onClose, onUpdated }) {
  const [form, setForm] = useState({
    product_name: product.product_name ?? "",
    product_desc: product.product_desc ?? "",
    product_price: product.product_price ?? "",
    sale_price: product.sale_price ?? "",
    stock: product.stock ?? "",
    on_sale: product.on_sale ?? false,
    is_hot: product.is_hot ?? false,
    is_new: product.is_new ?? false,
    product_img: product.product_img ?? "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(product.product_img ?? "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const getFilePathFromUrl = (url) => {
    if (!url) return null;
    return url.split("/product_image/")[1];
  };

  const removeOldImage = async () => {
    const oldPath = getFilePathFromUrl(product.product_img);

    if (!oldPath) return;

    const { error } = await supabase.storage
      .from("product_image")
      .remove([oldPath]);

    if (error) {
      console.error("Image delete failed:", error.message);
    }
  };
  // IMAGE UPLOAD FUNCTION
  const uploadImage = async () => {
    if (!imageFile) return form.product_img;

    // remove old image first
    await removeOldImage();
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

  const handleUpdate = async () => {
    try {
      const imageUrl = await uploadImage();

      const { error } = await supabase
        .from("productDetail")
        .update({
          ...form,
          product_img: imageUrl,
          product_price: Number(form.product_price),
          sale_price: form.sale_price ? Number(form.sale_price) : null,
          stock: form.stock ? Number(form.stock) : null,
        })
        .eq("product_id", product.product_id);

      if (error) throw error;

      onUpdated((prev) =>
        prev.map((p) =>
          p.product_id === product.product_id
            ? { ...p, ...form, product_img: imageUrl }
            : p,
        ),
      );

      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-105 space-y-2">
        <h3 className="font-bold mb-3">Edit Product</h3>

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded border"
          />
        )}

        {/* Image Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border w-full p-1"
        />

        <input
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          placeholder="Product name"
          className="border w-full p-1"
        />

        <textarea
          name="product_desc"
          value={form.product_desc}
          onChange={handleChange}
          placeholder="Description"
          className="border w-full p-1"
        />

        <input
          name="product_price"
          type="number"
          value={form.product_price}
          onChange={handleChange}
          placeholder="Price"
          className="border w-full p-1"
        />

        <input
          name="sale_price"
          type="number"
          value={form.sale_price}
          onChange={handleChange}
          placeholder="Sale price"
          className="border w-full p-1"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border w-full p-1"
        />

        <div className="flex gap-4 text-sm">
          <label>
            <input
              type="checkbox"
              name="on_sale"
              checked={form.on_sale}
              onChange={handleChange}
            />{" "}
            On Sale
          </label>

          <label>
            <input
              type="checkbox"
              name="is_hot"
              checked={form.is_hot}
              onChange={handleChange}
            />{" "}
            Hot
          </label>

          <label>
            <input
              type="checkbox"
              name="is_new"
              checked={form.is_new}
              onChange={handleChange}
            />{" "}
            New
          </label>
        </div>

        <div className="flex gap-3 justify-end pt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-black text-white px-3 py-1 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
