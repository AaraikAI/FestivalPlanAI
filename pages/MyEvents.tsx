
import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useSettings } from '../context/SettingsContext';
import { formatCurrency, t } from '../utils/localization';
import SustainabilityBadge from '../components/SustainabilityBadge';

const MyEvents: React.FC = () => {
  const { events } = useEvents();
  const { currency, language } = useSettings();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('events', language)}</h1>
          <p className="text-gray-500">Manage and track all your upcoming celebrations.</p>
        </div>
        <Link 
          to="/create-event" 
          className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <span>➕</span> {t('planNew', language)}
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <span className="text-6xl mb-4 block">📅</span>
            <h3 className="text-xl font-bold text-gray-900">No events planned yet</h3>
            <p className="text-gray-500 mb-6">Start planning your first big celebration today!</p>
            <Link to="/create-event" className="text-orange-600 font-bold hover:underline">Get Started →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => {
             const progress = Math.min((event.spent / event.budget) * 100, 100);
             
             return (
              <Link 
                to={`/event/${event.id}`} 
                key={event.id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                   <img 
                     src={event.image} 
                     alt={event.name} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                   />
                   <div className="absolute top-4 right-4">
                      <SustainabilityBadge score={event.sustainabilityScore} size="sm" />
                   </div>
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <p className="font-bold text-lg truncate">{event.name}</p>
                      <p className="text-xs opacity-90">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
                   </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold uppercase text-gray-600">{event.type}</span>
                          <span className="text-gray-500 text-xs">{event.guests.length} Guests</span>
                      </div>

                      <div>
                          <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                              <span>Budget Utilized</span>
                              <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${progress > 90 ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{ width: `${progress}%` }}
                              ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1 text-gray-400">
                              <span>{formatCurrency(event.spent, currency)}</span>
                              <span>{formatCurrency(event.budget, currency)}</span>
                          </div>
                      </div>
                   </div>

                   <div className="mt-6 flex items-center text-orange-600 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                       Manage Details <span>→</span>
                   </div>
                </div>
              </Link>
             );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
