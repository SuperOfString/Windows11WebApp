import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarApp: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const changeMonth = (offset: number) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + offset, 1));
  };

  const renderCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const calendarDays = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10" />);
    }

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = isCurrentMonth && today.getDate() === i;
      calendarDays.push(
        <div key={i} className={`h-10 w-10 flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors ${isToday ? 'bg-blue-600 text-white font-bold shadow-md' : 'hover:bg-gray-200 text-gray-700'}`}>
          {i}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="flex h-full bg-white">
        {/* Left Panel: Details */}
        <div className="w-64 bg-[#f3f3f3] p-6 flex flex-col border-r border-gray-200">
            <h1 className="text-3xl font-light text-gray-800 mb-1">
                {date.toLocaleDateString('en-US', { weekday: 'long' })}
            </h1>
            <h2 className="text-xl font-semibold text-blue-600 mb-8">
                {date.getDate()}
            </h2>

            <button className="flex items-center justify-center w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors font-medium mb-6">
                <Plus className="w-5 h-5 mr-2" /> New Event
            </button>

            <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Today's Events</h3>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-2 border-l-4 border-l-blue-500">
                    <div className="text-xs text-gray-500 mb-1">10:00 AM - 11:30 AM</div>
                    <div className="font-medium text-gray-800 text-sm">Project Review</div>
                </div>
                 <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 border-l-4 border-l-purple-500">
                    <div className="text-xs text-gray-500 mb-1">2:00 PM - 3:00 PM</div>
                    <div className="font-medium text-gray-800 text-sm">Team Sync</div>
                </div>
            </div>
        </div>

        {/* Right Panel: Month View */}
        <div className="flex-1 p-8 flex flex-col items-center">
            <div className="flex justify-between items-center w-full max-w-md mb-8">
                <h2 className="text-xl font-semibold text-gray-800">
                    {monthNames[date.getMonth()]} {date.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-4 w-full max-w-md text-center mb-2">
                {days.map(day => (
                    <div key={day} className="text-xs font-bold text-gray-500 uppercase">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-4 w-full max-w-md justify-items-center">
                {renderCalendarDays()}
            </div>
        </div>
    </div>
  );
};

export default CalendarApp;
