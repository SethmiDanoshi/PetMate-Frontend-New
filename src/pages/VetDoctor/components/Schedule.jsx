import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Sample calendar data
  const calendarEvents = [
    { date: '2025-02-26', type: 'holiday', title: 'Mahashivratri Day', color: 'bg-green-500' },
    { date: '2025-03-02', type: 'holiday', title: 'Ramadan Start', color: 'bg-green-500' },
    { date: '2025-03-04', type: 'appointment', title: 'Appointment No: 01', color: 'bg-blue-500' },
    { date: '2025-03-06', type: 'appointment', title: 'Appointment No: 02', color: 'bg-blue-500' },
    { date: '2025-09-06', type: 'appointment', title: 'Appointment No: 03', color: 'bg-blue-500' },
    { date: '2025-09-07', type: 'appointment', title: 'Appointment No: 05', color: 'bg-blue-500' },
    { date: '2025-03-13', type: 'holiday', title: 'Medin Full Moon Poya Day', color: 'bg-green-500' },
    { date: '2025-09-19', type: 'appointment', title: 'Appointment No: 06', color: 'bg-blue-500' },
    { date: '2025-09-21', type: 'appointment', title: 'Appointment No: 07', color: 'bg-red-500' },
    { date: '2025-09-21', type: 'appointment', title: 'Appointment No: 08', color: 'bg-red-500' },
    { date: '2025-09-22', type: 'appointment', title: 'Appointment No: 09', color: 'bg-red-500' },
    { date: '2025-09-26', type: 'appointment', title: 'Appointment No: 10', color: 'bg-red-500' },
    { date: '2025-09-28', type: 'appointment', title: 'Appointment No: 11', color: 'bg-red-500' },
    { date: '2025-03-31', type: 'holiday', title: 'Eid al-Fitr (tentative)', color: 'bg-green-500' },
    { date: '2025-10-03', type: 'appointment', title: 'Appointment No: 12', color: 'bg-red-500' }
  ];

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointment Schedule</h2>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToToday}
            className="bg-[#640D56] text-white px-4 py-2 rounded-lg hover:bg-[#4A0A41] transition-colors"
          >
            Today
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
        </div>

      
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((dayData, index) => {
            const events = getEventsForDate(dayData.date);
            const isToday = dayData.date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                  dayData.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  dayData.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${isToday ? 'text-blue-600' : ''}`}>
                  {dayData.date.getDate()}
                </div>
                
                {/* Events */}
                <div className="space-y-1">
                  {events.slice(0, 2).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Holidays</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Appointments</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Urgent</span>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
