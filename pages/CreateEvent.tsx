
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CORPORATE_TEMPLATES, BIRTHDAY_TEMPLATES, WEDDING_TEMPLATES, FESTIVAL_TEMPLATES } from '../constants';
import { EventType } from '../types';
import { useEvents } from '../context/EventContext';
import { useSettings } from '../context/SettingsContext';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const { subscriptionTier } = useSettings();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: '' as EventType | '', template: '', name: '', date: '', budget: '', guests: '' });

  const handleTemplateSelect = (id: string, name: string) => {
    // Monetization Check
    if (id.startsWith('premium_') && subscriptionTier === 'FREE') {
        alert("This is a Premium Template. Please upgrade to Pro to use it.");
        return;
    }
    setFormData({ ...formData, template: id, name: name });
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      id: `e${Date.now()}`,
      name: formData.name,
      type: formData.type as EventType,
      date: formData.date,
      location: 'TBD',
      budget: parseInt(formData.budget),
      spent: 0,
      tasks: [{ id: 't1', title: 'Setup', completed: false }],
      guests: [],
      vendors: [],
      sustainabilityScore: 0,
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800'
    });
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Plan New Event</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit}>
              {step === 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.values(EventType).map(t => (
                          <button type="button" key={t} onClick={()=>{setFormData({...formData, type: t}); setStep(2)}} className="p-6 border rounded-xl hover:bg-orange-50 font-bold">{t}</button>
                      ))}
                  </div>
              )}
              
              {step === 2 && (
                  <div className="space-y-4">
                      {subscriptionTier === 'FREE' && (
                          <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center text-sm">
                              <span>🔓 Unlock Premium Templates with Pro</span>
                              <Link to="/subscription" className="font-bold text-blue-700">Upgrade</Link>
                          </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                              {id: 'basic', name: 'Standard Setup', premium: false},
                              {id: 'premium_royal', name: '👑 Royal Wedding (Pro)', premium: true},
                              ...CORPORATE_TEMPLATES.map(t => ({ ...t, premium: false }))
                          ].map(t => (
                              <button 
                                key={t.id} 
                                type="button"
                                onClick={() => handleTemplateSelect(t.id, t.name)}
                                className={`p-4 border rounded-xl text-left ${t.premium && subscriptionTier==='FREE' ? 'opacity-60 bg-gray-50' : 'hover:border-orange-500'}`}
                              >
                                  <div className="font-bold">{t.name}</div>
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {step === 3 && (
                  <div className="space-y-4 max-w-lg">
                      <input required className="w-full border p-2 rounded" placeholder="Event Name" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                      <input required type="date" className="w-full border p-2 rounded" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} />
                      <input required type="number" className="w-full border p-2 rounded" placeholder="Budget" value={formData.budget} onChange={e=>setFormData({...formData, budget: e.target.value})} />
                      <div className="flex justify-between pt-4">
                          <button type="button" onClick={()=>setStep(2)}>Back</button>
                          <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold">Create</button>
                      </div>
                  </div>
              )}
          </form>
      </div>
    </div>
  );
};

export default CreateEvent;
