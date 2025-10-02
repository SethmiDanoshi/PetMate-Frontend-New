// src/pages/Accessories.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDog,
  FaCat,
  FaDove,
  FaShoppingCart,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";

const Accessories = () => {
  const navigate = useNavigate();

  const [accessories, setAccessories] = useState([]);
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
          const accessoriesOnly = result.data.filter(
            (item) => item.type === "accessories"
          );
          setAccessories(accessoriesOnly);
          setFilteredAccessories(accessoriesOnly);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply category & search filters
  useEffect(() => {
    let filtered = accessories;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (acc) => acc.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((acc) =>
        acc.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAccessories(filtered);
  }, [selectedCategory, searchTerm, accessories]);

  return (
    <div className="bg-[#a3d7f5] min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <FaArrowLeft
          onClick={() => navigate("/BuyerDashboard")}
          className="text-4xl cursor-pointer hover:text-gray-600 transition"
        />

        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/BuyPets")}
            className="px-4 pt-4 pb-2 font-semibold text-xl hover:text-pink-600"
            style={{ fontFamily: "Inika" }}
          >
            Pets
          </button>
          <button
            onClick={() => navigate("/accessories")}
            className="px-4 pt-4 pb-2 border-b-4 border-[#640D56] font-semibold text-xl"
            style={{ fontFamily: "Inika" }}
          >
            Accessories
          </button>
          <button
            onClick={() => navigate("/foods")}
            className="px-4 pt-4 pb-2 font-semibold text-xl hover:text-pink-600"
            style={{ fontFamily: "Inika" }}
          >
            Foods
          </button>
        </div>

        <FaShoppingCart
          onClick={() => navigate("/cart")}
          className="text-4xl cursor-pointer hover:text-pink-600 transition"
        />
      </div>

      {/* Title */}
      <h2
        className="text-center text-pink-500 mt-6 text-4xl md:text-4xl font-semibold"
        style={{ fontFamily: "Instrument Serif" }}
      >
        Pamper Your Pet with Stylish & Durable Accessories! ❤️
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search a pet accessory..."
          className="w-3/4 md:w-1/2 p-3 rounded-full text-black shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-2 p-3 bg-white rounded-full shadow hover:bg-gray-100">
          <FaSearch />
        </button>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-6 mt-8">
        {[
          { label: "All", icon: <GiSittingDog size={90} /> },
          { label: "Dog", icon: <FaDog size={90} /> },
          { label: "Cat", icon: <FaCat size={90} /> },
          { label: "Bird", icon: <FaDove size={90} /> },
        ].map((cat) => (
          <button
            key={cat.label}
            onClick={() => setSelectedCategory(cat.label)}
            className={`flex flex-col items-center rounded-xl p-6 shadow-md transition ${
              selectedCategory === cat.label
                ? "bg-white border-2 border-[#640D56]"
                : "bg-[#c7e6f9] hover:bg-[#e8f6ff]"
            }`}
          >
            {cat.icon}
            <span className="mt-2 font-semibold">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Accessories Section */}
      <h3
        className="text-2xl font-bold px-6 mt-10"
        style={{ fontFamily: "Inria Serif" }}
      >
        Popular
      </h3>

      {loading && (
        <p className="text-center text-lg mt-6 text-gray-700">
          Loading accessories...
        </p>
      )}

      {error && (
        <p className="text-center text-lg mt-6 text-red-500">{error}</p>
      )}

      {!loading && !error && filteredAccessories.length === 0 && (
        <p className="text-center text-lg mt-6 text-gray-500">
          No accessories found for this category/search.
        </p>
      )}

      {!loading && !error && filteredAccessories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {filteredAccessories.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-xl transition"
            >
              <img
                src={acc.imageUrls?.[0]}
                alt={acc.productName}
                className="w-40 h-40 object-cover rounded-xl"
              />
              <h4 className="text-xl font-semibold mt-3">
                {acc.productName}
              </h4>
              <p className="mt-1 text-gray-600">{acc.brand}</p>
              <p className="mt-1 font-medium text-lg text-[#640D56]">
                LKR {acc.price.toFixed(2)}
              </p>
              <button className="mt-4 bg-[#640D56] text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
                BUY NOW
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accessories;
