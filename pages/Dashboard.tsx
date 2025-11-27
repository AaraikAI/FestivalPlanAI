
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CALENDAR_EVENTS } from '../constants';
import SustainabilityBadge from '../components/SustainabilityBadge';
import BudgetChart from '../components/BudgetChart';
import CalendarModal from '../components/CalendarModal';
import { useEvents } from '../context/EventContext';
import { useSettings } from '../context/SettingsContext';
import { formatCurrency, t } from '../utils/localization';

const Dashboard: React.FC = () => {
  const { events } = useEvents();
  const { currency, language } = useSettings();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const totalBudget = events.reduce((acc, e) => acc + e.budget, 0);
  const totalSpent = events.reduce((acc, e) => acc + e.spent, 0);
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} events={MOCK_CALENDAR_EVENTS} />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('welcome', language)}, Jay Deep! 🙏</h2>
          <p className="text-gray-500">{events.length} upcoming events.</p>
        </div>
        <Link to="/create-event" className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
          ➕ {t('planNew', language)}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">{t('budgetOverview', language)}</h3>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{t('totalBudget', language)}: {formatCurrency(totalBudget, currency)}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
               <div className="w-56 h-56 flex-shrink-0"><BudgetChart total={totalBudget} spent={totalSpent} /></div>
               <div className="flex-1 space-y-4 w-full">
                  {events.map(event => (
                    <Link to={`/event/${event.id}`} key={event.id} className="block group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="flex justify-between text-sm mb-1 group-hover:text-orange-600 transition-colors">
                        <span className="font-medium">{event.name}</span>
                        <span>{formatCurrency(event.spent, currency)} / {formatCurrency(event.budget, currency)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.min((event.spent / event.budget) * 100, 100)}%` }}></div>
                      </div>
                    </Link>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold mb-4">{t('culturalCalendar', language)}</h3>
             {MOCK_CALENDAR_EVENTS.slice(0, 3).map(ev => (
                 <div key={ev.id} className="flex gap-3 mb-3">
                    <div className="bg-orange-100 text-orange-800 rounded px-2 text-center text-xs py-1"><b className="block text-lg">{new Date(ev.date).getDate()}</b></div>
                    <div><p className="font-bold text-sm">{ev.name}</p><p className="text-xs text-gray-500">{ev.description}</p></div>
                 </div>
             ))}
             <button onClick={() => setIsCalendarOpen(true)} className="text-xs text-orange-600 font-bold w-full text-center">View Full</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
