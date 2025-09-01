import React, { useState } from 'react';
import { Search, Play, CheckCircle } from 'lucide-react';

const AppointmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample appointment history data
  const appointmentHistory = [
    {
      id: 1,
      petOwnerName: 'Sethmi',
      typeOfPet: 'Dog',
      typeOfBooking: 'In-Clinic',
      date: '2025/03/04',
      timeSlot: '10.30 AM',
      status: 'Completed'
    },
    {
      id: 2,
      petOwnerName: 'Hansi',
      typeOfPet: 'Cat',
      typeOfBooking: 'Home Visit',
      date: '2025/03/06',
      timeSlot: '14.30 PM',
      status: 'Completed'
    },
    {
      id: 3,
      petOwnerName: 'Naveen',
      typeOfPet: 'Dog',
      typeOfBooking: 'In-Clinic',
      date: '2025/03/07',
      timeSlot: '10.30 AM',
      status: 'Completed'
    },
    {
      id: 4,
      petOwnerName: 'Sanuli',
      typeOfPet: 'Cat',
      typeOfBooking: 'Home Visit',
      date: '2025/03/19',
      timeSlot: '14.30 PM',
      status: 'Completed'
    },
    {
      id: 5,
      petOwnerName: 'Chathumi',
      typeOfPet: 'Bird',
      typeOfBooking: 'In-Clinic',
      date: '2025/03/21',
      timeSlot: '10.30 AM',
      status: 'Completed'
    },
    {
      id: 6,
      petOwnerName: 'Dileepa',
      typeOfPet: 'Dog',
      typeOfBooking: 'Home Visit',
      date: '2025/03/25',
      timeSlot: '14.30 PM',
      status: 'Completed'
    }
  ];

  const filteredHistory = appointmentHistory.filter(appointment =>
    appointment.petOwnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.typeOfPet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.id.toString().includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointment History</h2>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Play className="h-4 w-4" />
            <span>All Appointments</span>
          </button>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#640D56] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Appointment History Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App. ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pet Owner Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type Of the Pet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type Of Booking
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Slot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredHistory.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {appointment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.petOwnerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.typeOfPet}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.typeOfBooking}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.timeSlot}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No appointment history found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Appointments: {filteredHistory.length}</span>
          <span>All appointments completed successfully</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistory;
