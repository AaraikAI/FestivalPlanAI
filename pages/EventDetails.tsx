
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useSettings } from '../context/SettingsContext';
import { formatCurrency, t } from '../utils/localization';
import BudgetChart from '../components/BudgetChart';
import { ARDecorPreview, VRVenueTour, IoTControls } from '../components/ImmersiveTech';
import { SentimentTracker, WeatherRisk } from '../components/LiveAnalysis';
import { EventTask, Guest, Expense } from '../types';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEvent, updateEvent, vendors } = useEvents();
  const { currency, language, subscriptionTier } = useSettings();
  
  const event = getEvent(id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'guests' | 'vendors' | 'immersive' | 'analytics'>('overview');
  
  // State for forms/modals
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
      title: '',
      amount: '',
      category: 'Misc',
      date: new Date().toISOString().split('T')[0]
  });

  if (!event) return <div className="p-8 text-center">Event not found</div>;

  const eventVendors = vendors.filter(v => event.vendors.includes(v.id));

  // --- Handlers (Task, Guest, Expense) ---
  const toggleTask = (taskId: string) => {
    const updatedTasks = event.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    updateEvent({ ...event, tasks: updatedTasks });
  };
  const addTask = () => {
      if (!newTaskTitle.trim()) return;
      updateEvent({ ...event, tasks: [...event.tasks, { id: Date.now().toString(), title: newTaskTitle, completed: false }] });
      setNewTaskTitle('');
  };
  const removeTask = (taskId: string) => updateEvent({ ...event, tasks: event.tasks.filter(t => t.id !== taskId) });
  
  const addGuest = () => {
      if (!newGuestName.trim()) return;
      updateEvent({ ...event, guests: [...(event.guests || []), { id: Date.now().toString(), name: newGuestName, phone: newGuestPhone, status: 'pending' }] });
      setNewGuestName(''); setNewGuestPhone('');
  };
  const removeGuest = (guestId: string) => updateEvent({ ...event, guests: (event.guests || []).filter(g => g.id !== guestId) });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount) return;
    const amount = parseFloat(expenseForm.amount);
    const newExpense: Expense = {
        id: `exp-${Date.now()}`,
        title: expenseForm.title,
        amount: amount,
        category: expenseForm.category,
        date: expenseForm.date
    };
    updateEvent({ ...event, expenses: [newExpense, ...(event.expenses || [])], spent: event.spent + amount });
    setExpenseForm({ title: '', amount: '', category: 'Misc', date: new Date().toISOString().split('T')[0] });
    setIsExpenseModalOpen(false);
  };

  const mintNFT = (guestId: string) => {
      alert("Minting NFT Badge on Polygon Network... Success!");
      const updatedGuests = event.guests.map(g => g.id === guestId ? {...g, nftBadgeId: `nft_${Date.now()}`} : g);
      updateEvent({...event, guests: updatedGuests});
  };

  // WhatsApp Logic
  const handleGroupInvite = () => {
      const text = encodeURIComponent(`You are invited to ${event.name}! 📅 ${new Date(event.date).toLocaleDateString()} 📍 ${event.location}. RSVP here!`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleIndividualInvite = (guest: Guest) => {
      if (!guest.phone) {
          alert("No phone number for this guest.");
          return;
      }
      const text = encodeURIComponent(`Hi ${guest.name}, you are invited to ${event.name}! Please confirm your presence.`);
      const phone = guest.phone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Expense Modal */}
      {isExpenseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                  <h3 className="text-xl font-bold mb-4">{t('logExpense', language)}</h3>
                  <form onSubmit={handleAddExpense} className="space-y-4">
                      <input type="text" required value={expenseForm.title} onChange={e => setExpenseForm({...expenseForm, title: e.target.value})} placeholder="Description" className="w-full border p-2 rounded" />
                      <input type="number" required value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} placeholder="Amount" className="w-full border p-2 rounded" />
                      <button type="submit" className="w-full bg-orange-600 text-white font-bold py-2 rounded">Save</button>
                      <button type="button" onClick={() => setIsExpenseModalOpen(false)} className="w-full text-gray-500 py-2">Cancel</button>
                  </form>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="relative h-48 md:h-72 rounded-3xl overflow-hidden shadow-md group">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <p className="opacity-90">📍 {event.location} • {new Date(event.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 sticky top-0 bg-gray-50 z-10 pt-2 overflow-x-auto">
        <nav className="flex space-x-6 pb-1 min-w-max">
          {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'immersive', label: 'Immersive View (AR/VR)', icon: '👓' },
              { id: 'analytics', label: 'Smart Analytics', icon: '🧠' },
              { id: 'tasks', label: 'Tasks', icon: '📝' },
              { id: 'guests', label: 'Guests & NFT', icon: '🎟️' },
              { id: 'vendors', label: 'Vendors', icon: '🛍️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'overview' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => setActiveTab('vendors')} className="bg-white p-4 rounded-xl border text-center hover:bg-orange-50 transition-colors">
                        <div className="text-2xl font-bold text-orange-600">{eventVendors.length}</div>
                        <div className="text-xs text-gray-500 font-bold uppercase">Vendors</div>
                    </button>
                    <button onClick={() => setActiveTab('tasks')} className="bg-white p-4 rounded-xl border text-center hover:bg-blue-50 transition-colors">
                        <div className="text-2xl font-bold text-blue-600">{event.tasks.filter(t=>!t.completed).length}</div>
                        <div className="text-xs text-gray-500 font-bold uppercase">Pending Tasks</div>
                    </button>
                </div>
                {/* Immersive Teaser */}
                <div 
                    onClick={() => setActiveTab('immersive')}
                    className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-6 text-white cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Experience Your Event in VR</h3>
                        <p className="opacity-80 text-sm mb-4">Take a 360° tour of your venue and visualize decor with AR before you buy.</p>
                        <span className="bg-white/20 px-3 py-1 rounded text-xs font-bold">Try Now →</span>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"></div>
                </div>
             </div>
          )}

          {activeTab === 'immersive' && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4">
                  {subscriptionTier === 'FREE' && (
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex justify-between items-center">
                          <div className="text-sm text-yellow-800">
                              <b>Pro Feature:</b> You are viewing a limited demo. Upgrade to upload your own venue photos.
                          </div>
                          <Link to="/subscription" className="text-xs bg-yellow-600 text-white px-3 py-1 rounded font-bold">Upgrade</Link>
                      </div>
                  )}
                  
                  <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-lg">AR Decor Preview</h3>
                      <ARDecorPreview />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <h3 className="font-bold text-gray-900 mb-4 text-lg">VR 360° Venue Tour</h3>
                          <VRVenueTour />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900 mb-4 text-lg">IoT Smart Control</h3>
                          <IoTControls />
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'analytics' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <WeatherRisk />
                      <SentimentTracker />
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="font-bold text-gray-800 mb-4">Generative AI Content</h3>
                      <div className="grid grid-cols-3 gap-4">
                          {[1,2,3].map(i => (
                              <div key={i} className="aspect-square bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300">
                                  <span className="text-2xl">🎨</span>
                                  <span className="text-xs text-gray-500 mt-2">Invite Design {i}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'guests' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                      
                      <button 
                        onClick={handleGroupInvite}
                        className="w-full mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                         Invite via WhatsApp
                      </button>

                      <div className="flex gap-2 mb-6">
                          <input className="border p-2 rounded flex-1" placeholder="Name" value={newGuestName} onChange={e=>setNewGuestName(e.target.value)} />
                          <input className="border p-2 rounded w-32" placeholder="Phone" value={newGuestPhone} onChange={e=>setNewGuestPhone(e.target.value)} />
                          <button onClick={addGuest} className="bg-black text-white px-4 rounded font-bold">Add</button>
                      </div>
                      <div className="space-y-3">
                          {event.guests.map(g => (
                              <div key={g.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50/50">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                          {g.name.charAt(0)}
                                      </div>
                                      <div>
                                          <p className="font-bold">{g.name}</p>
                                          <p className="text-xs text-gray-500">{g.phone || 'No Phone'}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      {g.phone && (
                                          <button 
                                            onClick={() => handleIndividualInvite(g)}
                                            className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                                            title="Message on WhatsApp"
                                          >
                                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                          </button>
                                      )}
                                      {g.nftBadgeId ? (
                                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200">💎 NFT</span>
                                      ) : (
                                          <button onClick={() => mintNFT(g.id)} className="text-xs bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-700">Mint NFT</button>
                                      )}
                                      <button onClick={() => removeGuest(g.id)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">×</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'tasks' && (
             <div className="bg-white p-6 rounded-2xl border border-gray-100">
                 <div className="flex gap-2 mb-4"><input className="border p-2 flex-1 rounded" value={newTaskTitle} onChange={e=>setNewTaskTitle(e.target.value)} placeholder="Task..."/><button onClick={addTask} className="bg-black text-white px-4 rounded">Add</button></div>
                 {event.tasks.map(t => (
                     <div key={t.id} className="flex items-center gap-2 p-2"><input type="checkbox" checked={t.completed} onChange={()=>toggleTask(t.id)} /> <span className={t.completed?'line-through text-gray-400':''}>{t.title}</span></div>
                 ))}
             </div>
          )}
           {activeTab === 'vendors' && (
             <div className="grid grid-cols-2 gap-4">
                 {eventVendors.map(v => (
                     <div key={v.id} className="border p-4 rounded-xl">
                         <h4 className="font-bold">{v.name}</h4>
                         <p className="text-xs text-gray-500">{v.category}</p>
                     </div>
                 ))}
                 <Link to="/vendors" className="border-2 border-dashed border-gray-300 p-4 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all cursor-pointer">
                     <span className="text-2xl mb-1">🛍️</span>
                     <span className="font-bold text-sm">Find Vendors</span>
                 </Link>
             </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-2">Budget Tracker</h3>
             <div className="h-48"><BudgetChart total={event.budget} spent={event.spent} /></div>
             <div className="flex justify-between mt-4 font-bold">
                 <span>Total: {formatCurrency(event.budget, currency)}</span>
             </div>
             <button onClick={() => setIsExpenseModalOpen(true)} className="w-full mt-4 border border-dashed border-gray-300 py-2 rounded text-sm hover:bg-gray-50 transition-colors">+ Log Expense</button>
             
             {event.expenses && event.expenses.length > 0 && (
                 <div className="mt-6 border-t pt-4">
                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Recent Transactions</h4>
                     <div className="space-y-3">
                         {event.expenses.slice(0, 3).map(exp => (
                             <div key={exp.id} className="flex justify-between text-sm">
                                 <div>
                                     <p className="font-medium">{exp.title}</p>
                                     <p className="text-xs text-gray-400">{new Date(exp.date).toLocaleDateString()}</p>
                                 </div>
                                 <div className="text-right">
                                     <p className="font-bold text-red-500">-{formatCurrency(exp.amount, currency)}</p>
                                     <p className="text-[10px] bg-gray-100 inline-block px-1 rounded">{exp.category}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
