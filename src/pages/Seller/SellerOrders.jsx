import React, { useEffect, useState } from "react";
import SellerSidebar from "../../components/Seller/SellerSidebar";
import { fetchOrdersBySeller, updateOrderStatus } from "../../apis/orderApi";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sellerId] = useState("688a42e52e7e3840530b61cc"); // Replace with logged-in seller’s ID

  // Fetch orders 
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrdersBySeller(sellerId);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [sellerId]);

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update locally
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Update backend
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Filter by search (id, buyerId, status)
  const filteredOrders = orders.filter(
    (order) =>
      String(order.id).toLowerCase().includes(search.toLowerCase()) ||
      String(order.buyerId).toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SellerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 mt-3">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ fontFamily: "Irish Grover" }}
        >
          Manage Orders
        </h1>

        {/* Search */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => setSearch("")}
            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
          >
            All Orders
          </button>
          <input
            type="text"
            placeholder="Search by Order ID, Buyer ID, or Status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 flex-1"
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading orders...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No orders found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Buyer ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Currency</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.buyerId}</td>
                    <td className="px-4 py-2">Rs.{order.amount}</td>
                    <td className="px-4 py-2">{order.currency}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={`px-2 py-1 rounded-md text-sm font-semibold
                          ${
                            order.status === "PENDING"
                              ? "bg-yellow-200 text-yellow-800"
                              : order.status === "PACKED"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                          }`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PACKED">Packed</option>
                        <option value="DELIVERED">Delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
