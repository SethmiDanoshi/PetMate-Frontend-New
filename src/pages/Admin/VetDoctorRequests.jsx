// src/pages/Admin/VetDoctorRequests.jsx
import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const VetDoctorRequests = () => {
  // Mock data for testing (replace with API fetch later)
  const mockRequests = [
    { id: 1, name: "Sethmi Danoshi", license: "Sethmi.pdf", date: "2025/03/04" },
    { id: 2, name: "Hansi Pathirana", license: "Hansi.pdf", date: "2025/03/06" },
    { id: 3, name: "Dileepa Dassanayake", license: "Dileepa.pdf", date: "2025/03/06" },
    { id: 4, name: "Chathumi Janandhi", license: "Chathumi.pdf", date: "2025/03/07" },
    { id: 5, name: "Naveen Karallyadda", license: "Naveen.pdf", date: "2025/03/19" },
    { id: 6, name: "Asela Maduwathan", license: "Asela.pdf", date: "2025/03/19" },
  ];

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Later: Fetch from DB
    setRequests(mockRequests);
  }, []);

  const handleView = (id) => {
    alert(`Viewing details for request ID: ${id}`);
  };

  const handleAccept = (id) => {
    alert(`Accepted request ID: ${id}`);
  };

  const handleDecline = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
    alert(`Declined request ID: ${id}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 mt-3" style={{ fontFamily: "Irish Grover" }}>Vet Doctor Requests :</h1>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">License</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{req.id}</td>
                  <td className="p-3 border">{req.name}</td>
                  <td className="p-3 border">
                    <a
                      href={`/${req.license}`} // later: replace with actual file path
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:underline"
                    >
                      {req.license}
                    </a>
                  </td>
                  <td className="p-3 border">{req.date}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleView(req.id)}
                      className="bg-sky-400 text-white px-4 py-1 rounded hover:bg-sky-500"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(req.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No requests available.
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

export default VetDoctorRequests;
