import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ChevronDown, ChevronUp, ClipboardList } from "lucide-react";

const AdminSidebar = ({ name, email }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="w-1/4 bg-[#640D56] text-white flex flex-col items-center py-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8 pt-8">
        <img
          src="/seller.png"
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white object-cover"
        />
        <h2
          className="mt-3 text-4xl"
          style={{ fontFamily: "Italianno" }}
        >
          {name || "Keyan Fernando"}
        </h2>
        <p className="text-sm text-gray-200">{email || "keyanfernando@gmail.com"}</p>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-5 w-full px-6 pt-3">
        {/* Vet Doctor Requests */}
        <button
          onClick={() => navigate("/Admin/VetDoctorRequests")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <ClipboardList className="w-5 h-5" />
          <span>Vet Doctor Requests</span>
        </button>

        {/* Handle Users Dropdown */}
        <div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
            style={{ fontFamily: "Inria Serif" }}
          >
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Handle Users</span>
            </div>
            {dropdownOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {dropdownOpen && (
            <div className="ml-10 mt-2 flex flex-col space-y-2">
              <button
                onClick={() => navigate("/Admin/SellerList")}
                className="text-left py-1 px-3 rounded-lg hover:bg-purple-500 text-lg"
                style={{ fontFamily: "Inria Serif" }}
              >
                Sellers
              </button>
              <button
                onClick={() => navigate("/Admin/VetDoctorList")}
                className="text-left py-1 px-3 rounded-lg hover:bg-purple-500 text-lg"
                style={{ fontFamily: "Inria Serif" }}
              >
                Vet Doctors
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
