import React from "react";
import { useNavigate } from "react-router-dom";
import SellerSidebar from "../../components/Seller/SellerSidebar";

// Mock Data (replace later with API/database call)
const pets = [
  {
    id: 1,
    name: "Dexter",
    type: "Labrador retriever",
    age: "6 Months",
    image: "https://placedog.net/400/300?id=1",
  },
  {
    id: 2,
    name: "Luna",
    type: "Ragdoll Cat",
    age: "3 Years",
    image: "https://cdn2.thecatapi.com/images/9jf.jpg",
  },
  {
    id: 3,
    name: "Tweety",
    type: "Parrot",
    age: "1 Year",
    image:
      "/bird.jpg",
  },
];

const SellerAllPets = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Sidebar */}
      <SellerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 mt-4" style={{ fontFamily: 'Irish Grover' }}>All Pets</h1>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold">{pet.name}</h2>
              <p className="text-gray-600">{pet.type}</p>
              <p className="text-gray-500">{pet.age}</p>
              <button className="mt-4 bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900">
                Take me Home
              </button>
            </div>
          ))}
        </div>

        {/* Add New Pet Button (separate row, below pets) */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/seller-AddNewPet")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            + Add New Pet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerAllPets;
