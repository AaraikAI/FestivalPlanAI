
import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
}

const CalendarModal: React.FC<Props> = ({ isOpen, onClose, events }) => {
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      setViewDate(new Date()); // Reset to today when opening
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const today = new Date();
  
  // Navigation Handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setViewDate(new Date());
  };

  const currentMonthName = viewDate.toLocaleString('default', { month: 'long' });
  const currentYear = viewDate.getFullYear();
  const daysInMonth = new Date(currentYear, viewDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentYear, viewDate.getMonth(), 1).getDay(); // 0 is Sunday

  // Generate calendar grid
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventForDay = (day: number) => {
    // Construct date string YYYY-MM-DD
    const dateStr = `${currentYear}-${(viewDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-4">
             <div>
                <h2 className="text-3xl font-bold w-48">{currentMonthName} {currentYear}</h2>
                <p className="text-orange-100 text-sm opacity-90">Today is {today.toLocaleDateString()}</p>
             </div>
             <div className="flex items-center bg-white/20 rounded-full p-1 backdrop-blur-md">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={handleToday}
                  className="px-4 text-sm font-bold hover:text-orange-200 transition-colors"
                >
                   Today
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
             </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-sm font-bold text-gray-400 uppercase tracking-wider">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const dayEvents = day ? getEventForDay(day) : [];
              const isToday = day === today.getDate() && viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();
              
              return (
                <div 
                  key={idx} 
                  className={`min-h-[100px] border border-gray-100 rounded-xl p-2 relative flex flex-col transition-colors ${
                    day ? 'hover:bg-orange-50/50' : 'bg-gray-50/30'
                  } ${isToday ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-200' : ''}`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                          isToday ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-700'
                        }`}>
                          {day}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 mt-2 overflow-y-auto max-h-[80px] scrollbar-hide">
                        {dayEvents.map(ev => (
                           <div 
                             key={ev.id} 
                             className={`text-[10px] md:text-xs font-medium px-2 py-1 rounded-md shadow-sm border border-transparent truncate hover:whitespace-normal hover:absolute hover:z-10 hover:w-[150%] hover:shadow-md transition-all ${
                               ev.type === 'festival' 
                               ? 'bg-orange-100 text-orange-800 border-orange-200' 
                               : 'bg-purple-100 text-purple-800 border-purple-200'
                             }`}
                             title={ev.description}
                           >
                             {ev.name}
                           </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
            <div className="flex gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span> 
                  <span className="text-gray-700 font-medium">Festival</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span> 
                  <span className="text-gray-700 font-medium">Muhurat</span>
                </span>
            </div>
            <button 
              onClick={onClose} 
              className="px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
            >
              Close Calendar
            </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
