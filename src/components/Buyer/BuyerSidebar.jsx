
import React from "react";
import { useNavigate } from "react-router-dom";
import {  Calendar, ShoppingCart, User } from "lucide-react";

const BuyerSidebar = ({ name, email }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-1/4 bg-[#640D56] text-white flex flex-col items-center py-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8 pt-8">
        <img
          src="/Buyerprofile.png"
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white object-cover"
        />
        <h2
          className="mt-3 text-4xl"
          style={{ fontFamily: "Italianno" }}
        >
          {name}
        </h2>
        <p className="text-sm text-gray-200">{email}</p>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-5 w-full px-6 pt-3">
        <button
          onClick={() => navigate("/buyer-dashboard")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <User className="w-5 h-5" />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => navigate("/appointments")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <Calendar className="w-5 h-5" />
          <span>Appointments</span>
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
        </button>
      </nav>
    </aside>
  );
};

export default BuyerSidebar;
