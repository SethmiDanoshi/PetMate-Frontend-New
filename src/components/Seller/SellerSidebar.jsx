import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package, PlusCircle } from "lucide-react";

const SellerSidebar = ({ name, email }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-1/4 bg-[#640D56] text-white flex flex-col items-center py-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8 pt-8">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white object-cover"
        />
        <h2
          className="mt-3 text-4xl"
          style={{ fontFamily: "Italianno" }}
        >
          {name || "Seller"}
        </h2>
        <p className="text-sm text-gray-200">{email || "seller@example.com"}</p>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-5 w-full px-6 pt-3">
        <button
          onClick={() => navigate("/seller/orders")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Orders</span>
        </button>

        <button
          onClick={() => navigate("/seller/products")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <Package className="w-5 h-5" />
          <span>Products</span>
        </button>

        <button
          onClick={() => navigate("/seller/All-pets")}
          className="flex items-center space-x-3 py-2 px-4 rounded-lg bg-[#640D56] hover:bg-purple-600 text-xl"
          style={{ fontFamily: "Inria Serif" }}
        >
          <PlusCircle className="w-5 h-5" />
          <span>Sell Pets</span>
        </button>
      </nav>
    </aside>
  );
};

export default SellerSidebar;
