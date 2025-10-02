// src/pages/BuyPets.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDog, FaCat, FaDove, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import { getAllPets } from "../../apis/petApi";
// imports at top of BuyPets.jsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentModal from "./PaymnetModal";
import { enqueueSnackbar } from "notistack";


// create stripePromise using publishable key (from env)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


const BuyPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Fetch pets from API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await getAllPets();
        setPets(response.data || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets =
    selectedCategory === "All"
      ? pets
      : pets.filter((pet) => pet.type === selectedCategory);

  return (
    <div className="bg-[#a3d7f5] min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <FaArrowLeft
          onClick={() => navigate("/BuyerDashboard")}
          className="text-4xl cursor-pointer"
        />

        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/pets")}
            className="px-4 pt-4 pb-2 border-b-4 border-[#640D56] font-semibold text-xl"
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
            className="px-4 pt-4 pb-2 font-semibold text-xl"
            style={{ fontFamily: "Inika" }}
          >
            Foods
          </button>
        </div>

        <FaShoppingCart
          onClick={() => navigate("/cart")}
          className="text-4xl cursor-pointer"
        />
      </div>

      {/* Title */}
      <h2
        className="text-center text-pink-600 mt-4 text-4xl font-semibold"
        style={{ fontFamily: "Instrument Serif" }}
      >
        Find the best pet for you...
      </h2>

      {/* Categories */}
      <div className="flex justify-center gap-6 mt-6 py-10">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`flex flex-col items-center rounded-xl p-6 ${selectedCategory === "All" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
            }`}
        >
          <GiSittingDog size={100} />
          <span style={{ fontFamily: "Inria Serif" }}>All</span>
        </button>
        <button
          onClick={() => setSelectedCategory("Dog")}
          className={`flex flex-col items-center rounded-xl p-6 ${selectedCategory === "Dog" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
            }`}
        >
          <FaDog size={100} />
          <span style={{ fontFamily: "Inria Serif" }}>Dogs</span>
        </button>
        <button
          onClick={() => setSelectedCategory("Cat")}
          className={`flex flex-col items-center rounded-xl p-6 ${selectedCategory === "Cat" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
            }`}
        >
          <FaCat size={100} />
          <span style={{ fontFamily: "Inria Serif" }}>Cats</span>
        </button>
        <button
          onClick={() => setSelectedCategory("Bird")}
          className={`flex flex-col items-center rounded-xl p-6 ${selectedCategory === "Bird" ? "bg-white shadow-lg" : "bg-[#c7e6f9]"
            }`}
        >
          <FaDove size={100} />
          <span style={{ fontFamily: "Inria Serif" }}>Birds</span>
        </button>
      </div>

      {/* Pets Section */}
      <h3
        className="text-2xl font-bold px-6 mt-6"
        style={{ fontFamily: "Inria Serif" }}
      >
        Popular
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {loading ? (
          <p className="col-span-3 text-center text-gray-600">Loading pets...</p>
        ) : filteredPets.length === 0 ? (
          <p className="col-span-3 text-center text-gray-600">
            No pets available in this category.
          </p>
        ) : (
          filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={pet.imageUrls?.[0]}
                alt={pet.name}
                className="w-40 h-40 object-cover rounded-xl"
              />
              <h4 className="text-xl font-semibold mt-2 text-black">
                {pet.name}
              </h4>
              <p className="text-[#444043]">{pet.breed}</p>
              <p className="text-[#444043]">{pet.age}</p>
              <p className="text-pink-600 font-bold">LKR {pet.price.toFixed(2)}</p>
              <button className="mt-3 bg-[#640D56] text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600"
                onClick={() => { setSelectedPet(pet); setShowPaymentModal(true); }}
              >
                Take me Home
              </button>
            </div>
          ))
        )}
      </div>
      {showPaymentModal && selectedPet && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            open={showPaymentModal}
            onClose={() => { setShowPaymentModal(false); setSelectedPet(null); }}
            pet={selectedPet}
            onSuccess={(paymentIntent) => { 
              enqueueSnackbar("Payment successful!", { variant: "success" });
              
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default BuyPets;
