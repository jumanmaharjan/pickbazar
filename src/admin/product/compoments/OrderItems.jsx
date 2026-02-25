import React, { useEffect, useState } from "react";
import { supabase } from "../../../SupabaseClient";
import { useParams } from "react-router-dom";

export default function OrderItems() {
  const { id: orderId } = useParams();
  // const orderId = "ef457328-fbfe-4b94-bce8-981d8adcb8d4";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!orderId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("order_items")
        .select(
          `
          id,
          quantity,
          price,
          productDetail (
            product_name,
            product_img
          )
        `,
        )
        .eq("order_id", orderId); // ✅ now a string UUID

      if (error) {
        console.error("Error fetching order items:", error);
      } else {
        setItems(data);
      }
      setLoading(false);
    };

    fetchOrderItems();
  }, [orderId]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading items...</p>;

  if (!items || items.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No items found for this order.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Order Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center gap-3 hover:shadow-lg transition"
          >
            <div className="w-30 h-30 flex items-center justify-center bg-gray-100 rounded">
              <img
                src={
                  item.productDetail?.product_img ||
                  "/assets/img/default-img.png"
                }
                alt={item.productDetail?.product_name}
                className="max-w-full max-h-full object-contain rounded"
              />
            </div>

            <h3 className="text-gray-800 font-semibold text-center">
              {item.productDetail?.product_name}
            </h3>

            <div className="flex justify-between w-full text-gray-700 text-sm">
              <span>Qty: {item.quantity}</span>
              <span>Price: ${item.price.toFixed(2)}</span>
            </div>

            <div className="text-gray-800 font-semibold w-full text-right">
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg text-right text-lg font-bold">
        Total: $
        {items
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)}
      </div>
    </div>
  );
}
