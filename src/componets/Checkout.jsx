import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import { UseCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems, amount, refreshCart } = UseCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Profile + Address only
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const { data: address } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const fullName = [profile?.first_name, profile?.last_name]
        .filter(Boolean)
        .join(" ");

      setFormData({
        fullName,
        email: user.email ?? "",
        address: address?.address_line1 ?? "",
        city: address?.city ?? "",
        state: address?.state ?? "",
        zip: address?.zip ?? "",
        country: address?.country ?? "",
      });
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 Place Order
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      //Create Order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            full_name: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
            payment_method: paymentMethod,
            total_amount: amount.total,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert Order Items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product_price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // update quantity
      for (const item of cartItems) {
        const { data: product, error: fetchError } = await supabase
          .from("productDetail")
          .select("stock")
          .eq("product_id", item.product_id)
          .single();
        if (fetchError) throw fetchError;

        const newStock = product.stock - item.quantity;
        if (newStock < 0) {
          alert(`Not enough stock for ${item.product_name}`);
          throw new Error("Insufficient stock");
        }

        const { error: updateError } = await supabase
          .from("productDetail")
          .update({ stock: newStock })
          .eq("product_id", item.product_id);

        if (updateError) throw updateError;
      }

      // Clear Cart
      await supabase.from("cart_items").delete().eq("user_id", user.id);

      // Refresh cart context
      await refreshCart(user);

      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Form */}
        <div className="flex-1 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Shipping Information</h3>

          <div className="space-y-4">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border px-3 py-2 text-sm border-gray-300 rounded"
              />
            ))}

            <h3 className="font-bold mt-4">Payment Method</h3>

            <select
              className="w-full border px-3 py-2 border-gray-300 rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          {cartItems.map((item) => (
            <div key={item.product_id} className="flex justify-between mb-2">
              <span>
                {item.product_name} x {item.quantity}
              </span>
              <span>${(item.product_price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${amount.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>${(amount.subtotal * 0.05).toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total</span>
            <span>${amount.total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 mt-4 rounded hover:bg-green-700 transition"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
