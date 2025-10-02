import React, { useEffect, useState } from "react";
import BuyerSidebar from "../../components/Buyer/BuyerSidebar";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments for the logged-in user
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Replace with actual logged-in user ID (from auth/token)
        const userId = "688a42e52e7e3840530b61cc"; 
        const response = await fetch(
          `http://localhost:8080/api/appointments/user/${userId}`
        );
        const data = await response.json();

        if (data.status && Array.isArray(data.data)) {
          setAppointments(data.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <BuyerSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 pt-5 ml-3">
        <h1
          className="text-4xl font-bold text-center mb-10"
          style={{ fontFamily: "Inika" }}
        >
          All Appointments :
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-lg">No appointments found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-gray-50 shadow-md rounded-2xl p-6"
              >
                <p>
                  <strong>Appointment ID</strong> : {appt.id}
                </p>
                <p>
                  <strong>Pet Owner Name</strong> : {appt.userName}
                </p>
                <p>
                  <strong>Type of the pet</strong> : {appt.petType}
                </p>
                <p>
                  <strong>Symptoms of the pet</strong> : {appt.symptoms}
                </p>
                <p>
                  <strong>Contact number</strong> : {appt.userContactNumber}
                </p>
                <p>
                  <strong>Type of the Booking</strong> : {appt.appointmentType}
                </p>
                <p>
                  <strong>Date</strong> : {appt.date}
                </p>
                <p>
                  <strong>Time Slot</strong> : {appt.time}
                </p>
                <p>
                  <strong>Doctor</strong> : {appt.doctorName}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button className="bg-yellow-300 px-4 py-2 rounded-full hover:bg-yellow-400">
                    Edit Details
                  </button>
                  <button className="bg-sky-400 px-4 py-2 rounded-full hover:bg-sky-500 text-white">
                    Cancel Booking
                  </button>
                </div>

                {/* Status */}
                <p className="mt-3 font-semibold">
                  Appointment Status :{" "}
                  <span
                    className={
                      appt.status === "CONFIRMED"
                        ? "text-green-600"
                        : appt.status === "DECLINED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {appt.status}
                  </span>
                </p>

                {/* Book Again Button for Declined */}
                {appt.status === "DECLINED" && (
                  <button className="mt-3 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700">
                    Book Again
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
