// src/pages/Accessories.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDog, FaCat, FaDove, FaShoppingCart, FaArrowLeft, FaSearch } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";

// Mock data for accessories
const allAccessories = [
  { id: 1, name: "Dog Belt", type: "Dog", price: 4500, img: "/dogbelt.png" },
  { id: 2, name: "Dog Bowl", type: "Dog", price: 2350, img: "/dogbowl.png" },
  { id: 3, name: "Cat Collar", type: "Cat", price: 1200, img: "/catcollar.png" },
  { id: 4, name: "Bird Cage", type: "Bird", price: 8000, img: "/birdcage.png" },
];

const Accessories = () => {
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState(allAccessories);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = allAccessories;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(acc => acc.type === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(acc =>
        acc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setAccessories(filtered);
  }, [selectedCategory, searchTerm]);

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
      className="px-4 pt-4 pb-2 border-b-4 border-[#640D56] font-semibold text-xl"
      style={{ fontFamily: "Inika" }}
    >
      Accessories
    </button>
    <button
      onClick={() => navigate("/foods")}
      className="px-4 pt-4 pb-2 font-semibold text-xl"
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
      <h2 className="text-center text-pink-500 mt-4 text-4xl md:text-4xl font-semibold" style={{ fontFamily: 'Instrument Serif' }}>
        Pamper Your Pet with Stylish & Durable Accessories! ❤️
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search a pet Accessories..."
          className="w-3/4 md:w-1/2 p-2 rounded-full text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-2 p-2 bg-white rounded-full">
          <FaSearch />
        </button>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-6 mt-6" >
        <button
          onClick={() => setSelectedCategory("All")}
          className={`flex flex-col items-center rounded-xl p-6 ${
            selectedCategory === "All" ? "bg-white" : "bg-[#c7e6f9]"
          }` } 
        >
          <GiSittingDog size={100} />
          <span>All</span>
        </button>
        <button
          onClick={() => setSelectedCategory("Dog")}
          className={`flex flex-col items-center rounded-xl p-6 ${
            selectedCategory === "Dog" ? "bg-white" : "bg-[#c7e6f9]"
          }`}
        >
          <FaDog size={100} />
          <span>Dogs</span>
        </button>
        <button
          onClick={() => setSelectedCategory("Cat")}
          className={`flex flex-col items-center rounded-xl p-6 ${
            selectedCategory === "Cat" ? "bg-white" : "bg-[#c7e6f9]" 
          }`}
        >
          <FaCat size={100} />
          <span>Cats</span>
        </button>
        <button
          onClick={() => setSelectedCategory("Bird")}
          className={`flex flex-col items-center rounded-xl p-6 ${
            selectedCategory === "Bird" ? "bg-white" : "bg-[#c7e6f9]"
          }`}
        >
          <FaDove size={100} />
          <span>Birds</span>
        </button>
      </div>

      {/* Popular Accessories */}
      <h3 className="text-2xl font-bold px-6 mt-8" style={{ fontFamily: 'Inria Serif' }}>Popular</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {accessories.map((acc) => (
          <div key={acc.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
            <img src={acc.img} alt={acc.name} className="w-40 h-40 object-cover rounded-xl" />
            <h4 className="text-xl font-semibold mt-2">{acc.name}</h4>
            <p className="mt-1 font-medium">LKR {acc.price.toFixed(2)}</p>
            <button
              className="mt-3 bg-[#640D56] text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600"
              onClick={() => navigate("/accessories/1")}
            >
              BUY NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
