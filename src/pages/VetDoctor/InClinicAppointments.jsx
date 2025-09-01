import React, { useEffect, useState } from 'react';
import { vetDoctorApi } from '../../apis/vetDoctorApi';

const statusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-700 text-white';
    case 'Pending':
      return 'bg-yellow-400 text-white';
    default:
      return 'bg-gray-300 text-gray-800';
  }
};

const Row = ({ ap }) => (
  <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1 text-sm">
        <div className="flex"><span className="w-40 font-semibold">Appointment ID</span>: {ap.id}</div>
        <div className="flex"><span className="w-40 font-semibold">Pet Owner Name</span>: {ap.owner}</div>
        <div className="flex"><span className="w-40 font-semibold">Type of the pet</span>: {ap.petType}</div>
        <div className="flex"><span className="w-40 font-semibold">Symptoms of the pet</span>: {ap.symptoms}</div>
        <div className="flex"><span className="w-40 font-semibold">Contact number</span>: {ap.contact}</div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex"><span className="w-40 font-semibold">Type of the Booking</span>: {ap.bookingType}</div>
        <div className="flex"><span className="w-40 font-semibold">Date</span>: {ap.date}</div>
        <div className="flex"><span className="w-40 font-semibold">Time Slot</span>: {ap.time}</div>
      </div>
    </div>
    <div className="mt-4 flex justify-end">
      <span className={`px-4 py-1 rounded-full text-sm ${statusClass(ap.status)}`}>{ap.status}</span>
    </div>
  </div>
);

const InClinicAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await vetDoctorApi.getInClinicAppointments();
        if (mounted) setItems(data);
      } catch (e) {
        setError('Failed to load appointments');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Irish Grover' }}>In-Clinic Appointments :</h1>

      {loading && <div className="space-y-4">{[1,2,3].map(k => <div key={k} className="animate-pulse h-36 bg-gray-100 rounded-2xl" />)}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {!loading && !error && (
        <div className="space-y-5">
          {items.map((ap) => (<Row key={ap.id} ap={ap} />))}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-white bg-[#640D56] rounded-lg py-2">
        PetMate © 2024  Terms of Service  Data Policy
      </div>
    </div>
  );
};

export default InClinicAppointments;
