import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import { vetDoctorApi } from '../../../apis/vetDoctorApi';

const AppointmentRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await vetDoctorApi.getAppointmentRequests();
        if (mounted) setRequests(data);
      } catch (e) {
        setError('Failed to load requests');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filteredRequests = requests.filter(request =>
    request.petOwnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.typeOfPet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.id.includes(searchTerm)
  );

  const handleAccept = (id) => {
    console.log('Accepted appointment:', id);
  };

  const handleDecline = (id) => {
    console.log('Declined appointment:', id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointment Requests</h2>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointment requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#640D56] focus:border-transparent"
          />
        </div>
      </div>

      {loading && <div className="space-y-4">{[1,2,3].map(k => <div key={k} className="animate-pulse h-36 bg-gray-100 rounded-2xl" />)}</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Appointment ID:</span>
                  <p className="text-gray-800 font-semibold">{request.id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Pet Owner Name:</span>
                  <p className="text-gray-800 font-semibold">{request.petOwnerName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Type of the pet:</span>
                  <p className="text-gray-800 font-semibold">{request.typeOfPet}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Contact number:</span>
                  <p className="text-gray-800 font-semibold">{request.contactNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Symptoms of the pet:</span>
                  <p className="text-gray-800">{request.symptoms}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Type of the Booking:</span>
                  <p className="text-gray-800 font-semibold">{request.typeOfBooking}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Date:</span>
                  <p className="text-gray-800 font-semibold">{request.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-600">Time Slot:</span>
                  <p className="text-gray-800 font-semibold">{request.timeSlot}</p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleDecline(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentRequests;
