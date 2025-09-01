// src/pages/Admin/AdminSellerList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminSellerList = () => {
  const navigate = useNavigate();

  // Mock data for testing (replace with API fetch later)
  const mockSellers = [
    { id: 1, name: "Sethmi Danoshi", products: 8, joined: "2025/03/04" },
    { id: 2, name: "Hansi Pathirana", products: 10, joined: "2025/03/06" },
    { id: 3, name: "Dileepa Dassanayake", products: 6, joined: "2025/03/06" },
    { id: 4, name: "Chathumi Janandhi", products: 2, joined: "2025/03/07" },
    { id: 5, name: "Naveen Karallyadda", products: 20, joined: "2025/03/19" },
    { id: 6, name: "Asela Maduwathan", products: 13, joined: "2025/03/19" },
  ];

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    // Later: Fetch from DB
    setSellers(mockSellers);
  }, []);

  const handleRemove = (id) => {
    // Delete logic (API call)
    setSellers(sellers.filter((seller) => seller.id !== id));
  };

  const handleViewDetails = (id) => {
    // Navigate to seller detail page
    navigate(`/admin/seller/${id}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 mt-3" style={{ fontFamily: "Irish Grover" }}>Sellers List :</h1>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">No of Products</th>
                <th className="p-3 border">Joined Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{seller.id}</td>
                  <td className="p-3 border">{seller.name}</td>
                  <td className="p-3 border">{seller.products}</td>
                  <td className="p-3 border">{seller.joined}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleViewDetails(seller.id)}
                      className="bg-sky-400 text-white px-4 py-1 rounded hover:bg-sky-500"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemove(seller.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {sellers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No sellers available.
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

export default AdminSellerList;
