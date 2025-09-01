// src/pages/SellerOrders.jsx
import React, { useEffect, useState } from "react";
import SellerSidebar from "../../components/Seller/SellerSidebar";

// Mock data for testing 
const mockOrders = [
  {
    id: 1,
    userId: 3,
    totalAmount: 1500,
    items: "1x Dog Belt",
    status: "Pending",
  },
  {
    id: 2,
    userId: 3,
    totalAmount: 6700,
    items: "3x Dog Bowl",
    status: "Packed",
  },
  {
    id: 3,
    userId: 6,
    totalAmount: 850,
    items: "1x Dog Biscuits",
    status: "Pending",
  },
  {
    id: 4,
    userId: 1,
    totalAmount: 10400,
    items: "4x Pedigree dry dog food, 2x Beef",
    status: "Delivered",
  },
  {
    id: 5,
    userId: 2,
    totalAmount: 5000,
    items: "2x Pedigree dry dog food, 1x Dog Belt",
    status: "Packed",
  },
  {
    id: 6,
    userId: 2,
    totalAmount: 3500,
    items: "1x Dog Belt, 1x Dog Bowl",
    status: "Pending",
  },
];

const SellerOrders = () => {
  const [orders, setOrders] = useState(mockOrders); // use mock initially
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch orders from backend
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders"); // your API endpoint
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update locally first
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Call backend API to update
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Filter orders by search
  const filteredOrders = orders.filter(
    (order) =>
      order.items.toLowerCase().includes(search.toLowerCase()) ||
      String(order.id).includes(search) ||
      String(order.userId).includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SellerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 mt-3">
        <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Irish Grover' }}>Manage Orders</h1>

        {/* Search */}
        <div className="flex items-center mb-4">
          <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2">
            All Orders
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 flex-1"
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.userId}</td>
                  <td className="px-4 py-2">Rs.{order.totalAmount}</td>
                  <td className="px-4 py-2">{order.items}</td>
                  <td className="px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-md text-sm font-semibold
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "Packed"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-green-200 text-green-800"
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Packed">Packed</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
