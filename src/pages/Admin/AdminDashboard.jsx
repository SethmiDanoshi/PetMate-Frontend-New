
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSellers: 0,
    totalBuyers: 0,
    totalVetDoctors: 0,
    totalRequests: 0,
    sellerRequests: 0,
    vetDoctorRequests: 0,
  });

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/dashboard"); // Update API URL
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1
            className="text-4xl font-bold mt-3"
            style={{ fontFamily: "Irish Grover" }}
          >
            Hello  ....
          </h1>
        </div>

        {/* Banner Image */}
        <div className="mt-6 flex justify-center">
          <img
            src="/pet.png"
            alt="Pets"
            className="rounded-xl w-full max-w-3xl"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Total Sellers */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-600">Total Sellers</p>
            <p className="text-xl font-bold text-blue-600">
              {stats.totalSellers}
            </p>
          </div>

          {/* Total Buyers */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-600">Total Buyers</p>
            <p className="text-xl font-bold text-cyan-600">
              {stats.totalBuyers}
            </p>
          </div>

          {/* Total Vet Doctors */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-600">Total Vet Doctors</p>
            <p className="text-xl font-bold text-purple-600">
              {stats.totalVetDoctors}
            </p>
          </div>

          {/* Total Requests */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-600">Total Requests</p>
            <p className="text-xl font-bold text-green-600">
              {stats.totalRequests}
            </p>
          </div>

          {/* Seller Requests */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-600">Seller Requests</p>
            <p className="text-xl font-bold text-yellow-600">
              {stats.sellerRequests}
            </p>
          </div>

          {/* Vet Doctor Requests */}
          <div className="bg-white shadow-md rounded-xl p-4">
            <p className="text-gray-600">Vet Doctor Requests</p>
            <p className="text-xl font-bold text-red-600">
              {stats.vetDoctorRequests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
