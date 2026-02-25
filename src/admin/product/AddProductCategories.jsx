import React, { useState } from "react";
import { supabase } from "../../SupabaseClient";

function AddProductCategories() {
  const [cvalue, setCvalue] = useState("");
  const [imageFile, setImageFile] = useState(null);

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
    e.preventDefault(); // stop page refresh
    const imageUrl = await uploadImage();
    const { data, error } = await supabase
      .from("productCategory")
      .insert([{ productCat: cvalue, imageName: imageUrl }]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Inserted data:", data);
      setCvalue("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cvalue}
          onChange={(e) => setCvalue(e.target.value)}
          placeholder="Enter category"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="h-24 object-cover rounded"
          />
        )}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProductCategories;
