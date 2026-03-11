import React from "react";
import { supabase } from "../../../SupabaseClient";

function DeleteConfirmModal({ product, onClose, onDeleted }) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("productDetail")
      .delete()
      .eq("product_id", product.product_id);

    if (error) {
      alert(error.message);
      return;
    }

    // optimistic UI
    onDeleted((prev) =>
      prev.filter((p) => p.product_id !== product.product_id),
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[350px]">
        <h3 className="font-bold mb-4">Delete "{product.product_name}"?</h3>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-red-600 text-white px-3" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
