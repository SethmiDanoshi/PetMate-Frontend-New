import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerSidebar from "../../components/Seller/SellerSidebar";

const SellerPetAccessories = () => {
  const navigate = useNavigate();

  // Mock data for testing (replace with API fetch later)
  const mockData = [
    { id: 1, name: "Feeding Bowls", amount: 1500 },
    { id: 2, name: "Collars & Leashes", amount: 700 },
    { id: 3, name: "Dog Belt", amount: 850 },
    { id: 4, name: "Training Aids", amount: 1040 },
    { id: 5, name: "ID Tags", amount: 530 },
    { id: 6, name: "Beds & Blankets", amount: 10500 },
  ];

  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    // Later: Fetch from DB
    setAccessories(mockData);
  }, []);

  const handleDelete = (id) => {
    // Delete logic (API call)
    setAccessories(accessories.filter((item) => item.id !== id));
  };

  const handleUpdate = (id) => {
    // Update logic (navigate or modal)
    alert(`Update accessory with ID: ${id}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SellerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pet Accessories</h1>
          <button
            onClick={() => navigate("/seller-AddPetAccessories")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600"
          >
            Add New Pet Accessories <span className="ml-2 text-xl">+</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Item ID</th>
                <th className="p-3 border">Item Name</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accessories.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">Rs.{item.amount}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {accessories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                    No accessories available.
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

export default SellerPetAccessories;
