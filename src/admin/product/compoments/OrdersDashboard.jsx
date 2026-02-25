import { useEffect, useState } from "react";
import { supabase } from "../../../SupabaseClient";
import { Link } from "react-router-dom";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center mt-10">Loading orders...</p>;
  }

  if (!orders || orders.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No orders found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Orders Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            {/* Header: Order ID and Status */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm truncate">
                #{order.id.slice(0, 8)}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer Info */}
            <div className="mb-3 space-y-1">
              <p className="font-medium">{order.full_name}</p>
              <p className="text-gray-500 text-sm">{order.email}</p>
              <p className="text-gray-500 text-sm">
                {order.address}, {order.city} {order.state} {order.zip},{" "}
                {order.country}
              </p>
            </div>

            {/* Payment and Total */}
            <div className="mb-3 space-y-1">
              <p className="text-gray-600 text-sm">
                Payment: {order.payment_method}
              </p>
              <p className="text-gray-800 font-semibold text-lg">
                Total: ${order.total_amount.toFixed(2)}
              </p>
            </div>

            {/* Footer / Actions */}
            <div className="mt-auto flex justify-end">
              <Link
                to={`/orders/${order.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
