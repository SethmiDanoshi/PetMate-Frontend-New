// src/pages/Foods.jsx
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

const Foods = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch foods from API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();

        // Only keep products where type === "Food"
        const foodProducts = data.data.filter((item) => item.type === "foods");
        setFoods(foodProducts);
        setFilteredFoods(foodProducts);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Filter by category + search
  useEffect(() => {
    let updatedFoods = foods;

    if (selectedCategory !== "All") {
      updatedFoods = updatedFoods.filter(
        (food) => food.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      updatedFoods = updatedFoods.filter((food) =>
        food.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    }

    setFilteredFoods(updatedFoods);
  }, [selectedCategory, searchTerm, foods]);

  return (
    <div className="bg-[#a3d7f5] min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow">
        {/* Back Button */}
        <FaArrowLeft
          onClick={() => navigate("/BuyerDashboard")}
          className="text-4xl cursor-pointer"
        />

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/BuyPets")}
            className="px-4 pt-4 pb-2 font-semibold text-xl"
            style={{ fontFamily: "Inika" }}
          >
            Pets
          </button>
          <button
            onClick={() => navigate("/accessories")}
            className="px-4 pt-4 pb-2 font-semibold text-xl"
            style={{ fontFamily: "Inika" }}
          >
            Accessories
          </button>
          <button
            onClick={() => navigate("/foods")}
            className="px-4 pt-4 pb-2 border-b-4 border-[#640D56] font-semibold text-xl"
            style={{ fontFamily: "Inika" }}
          >
            Foods
          </button>
        </div>

        {/* Cart Icon */}
        <FaShoppingCart
          onClick={() => navigate("/cart")}
          className="text-4xl cursor-pointer"
        />
      </div>

      {/* Title */}
      <h2
        className="text-center text-pink-600 mt-4 text-3xl md:text-4xl font-semibold"
        style={{ fontFamily: "Instrument Serif" }}
      >
        Premium Pet Foods for Health & Happiness 🐾
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search a pet food..."
          className="w-3/4 md:w-1/2 p-2 rounded-full text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-2 p-2 bg-white rounded-full">
          <FaSearch />
        </button>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`flex flex-col items-center rounded-xl p-6 transition ${
            selectedCategory === "All" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
          }`}
        >
          <GiSittingDog size={100} />
          <span>All</span>
        </button>
        <button
          onClick={() => setSelectedCategory("dog")}
          className={`flex flex-col items-center rounded-xl p-6 transition ${
            selectedCategory === "dog" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
          }`}
        >
          <FaDog size={100} />
          <span>Dogs</span>
        </button>
        <button
          onClick={() => setSelectedCategory("cat")}
          className={`flex flex-col items-center rounded-xl p-6 transition ${
            selectedCategory === "cat" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
          }`}
        >
          <FaCat size={100} />
          <span>Cats</span>
        </button>
        <button
          onClick={() => setSelectedCategory("bird")}
          className={`flex flex-col items-center rounded-xl p-6 transition ${
            selectedCategory === "bird" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
          }`}
        >
          <FaDove size={100} />
          <span>Birds</span>
        </button>
      </div>

      {/* Food Products */}
      <h3
        className="text-2xl font-bold px-6 mt-8"
        style={{ fontFamily: "Inria Serif" }}
      >
        Popular
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {loading ? (
          <p className="col-span-3 text-center text-gray-600">Loading...</p>
        ) : filteredFoods.length === 0 ? (
          <p className="col-span-3 text-center text-gray-600">
            No food products found.
          </p>
        ) : (
          filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center"
            >
              <img
                src={food.imageUrls?.[0]}
                alt={food.productName}
                className="w-40 h-40 object-cover rounded-xl"
              />
              <h4 className="text-xl font-semibold mt-2">{food.productName}</h4>
              <p className="text-gray-600">{food.brand || "Varies"}</p>
              <p className="mt-1 font-medium">LKR {food.price.toFixed(2)}</p>
              <button className="mt-3 bg-[#640D56] text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600">
                BUY NOW
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Foods;
