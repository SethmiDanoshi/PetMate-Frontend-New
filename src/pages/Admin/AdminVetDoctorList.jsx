// src/pages/Admin/AdminVetDoctorList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const AdminVetDoctorList = () => {
  const navigate = useNavigate();

  // Mock data (replace with API fetch later)
  const mockDoctors = [
    { id: 1, name: "Sethmi Danoshi", license: "Sethmi.pdf", joined: "2025/03/04" },
    { id: 2, name: "Hansi Pathirana", license: "Hansi.pdf", joined: "2025/03/06" },
    { id: 3, name: "Dileepa Dassanayake", license: "Dileepa.pdf", joined: "2025/03/06" },
    { id: 4, name: "Chathumi Janandhi", license: "Chathumi.pdf", joined: "2025/03/07" },
    { id: 5, name: "Naveen Karallyadda", license: "Naveen.pdf", joined: "2025/03/19" },
    { id: 6, name: "Asela Maduwathan", license: "Asela.pdf", joined: "2025/03/19" },
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Later: Fetch from DB
    setDoctors(mockDoctors);
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/admin/vet-doctor/${id}`);
  };

  const handleRemove = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 mt-3" style={{ fontFamily: "Irish Grover" }}>Vet Doctors List :</h1>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">License</th>
                <th className="p-3 border">Joined Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{doc.id}</td>
                  <td className="p-3 border">{doc.name}</td>
                  <td className="p-3 border">
                    <a
                      href={`/${doc.license}`} // later replace with actual file path
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:underline"
                    >
                      {doc.license}
                    </a>
                  </td>
                  <td className="p-3 border">{doc.joined}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleViewDetails(doc.id)}
                      className="bg-sky-400 text-white px-4 py-1 rounded hover:bg-sky-500"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemove(doc.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No doctors available.
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

export default AdminVetDoctorList;
