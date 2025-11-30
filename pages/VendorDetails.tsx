
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import SustainabilityBadge from '../components/SustainabilityBadge';

const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVendor, events, addVendorToEvent } = useEvents();
  const { currency } = useSettings();
  const { user } = useAuth();
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');
  
  const vendor = getVendor(id || '');
  if (!vendor) return <div>Not Found</div>;

  const handleHire = () => {
    if (events.length === 0) { alert("Create an event first!"); navigate('/create-event'); return; }
    setShowEventSelector(true);
  };

  const confirmHire = () => {
      addVendorToEvent(selectedEventId, vendor.id);
      setShowEventSelector(false);
      navigate(`/event/${selectedEventId}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in">
       {showEventSelector && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
               <div className="bg-white p-6 rounded-xl w-full max-w-sm">
                   <h3 className="font-bold mb-4">Select Event</h3>
                   <div className="space-y-2 mb-4">
                       {events.map(e => <button key={e.id} onClick={()=>setSelectedEventId(e.id)} className={`w-full text-left p-3 border rounded ${selectedEventId===e.id?'border-orange-500 bg-orange-50':''}`}>{e.name}</button>)}
                   </div>
                   <button onClick={confirmHire} disabled={!selectedEventId} className="w-full bg-orange-600 text-white py-2 rounded">Confirm</button>
                   <button onClick={()=>setShowEventSelector(false)} className="w-full text-gray-500 py-2 mt-2">Cancel</button>
               </div>
           </div>
       )}

       <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
           <div className="h-64 md:h-96 relative">
               <img src={vendor.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute bottom-6 left-6 text-white">
                   <h1 className="text-4xl font-bold">{vendor.name}</h1>
                   <p>📍 {vendor.location} • {['Budget', 'Standard', 'Premium'][vendor.priceLevel-1]}</p>
               </div>
           </div>
           <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-6">
                   <div>
                       <h3 className="font-bold text-gray-900 text-xl mb-2">About</h3>
                       <p className="text-lg text-gray-600">{vendor.description}</p>
                   </div>
                   
                   {vendor.services && vendor.services.length > 0 && (
                       <div>
                           <h3 className="font-bold text-gray-900 text-xl mb-2">Services Offered</h3>
                           <div className="flex flex-wrap gap-2">
                               {vendor.services.map(s => (
                                   <span key={s} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-100">
                                       {s}
                                   </span>
                               ))}
                           </div>
                       </div>
                   )}
               </div>
               
               <div>
                   {user?.role === 'VENDOR' ? (
                       <div className="bg-gray-100 p-6 rounded-xl text-center">
                           <p className="text-gray-500 font-bold">Vendor View</p>
                           <p className="text-xs text-gray-400 mt-1">You cannot hire yourself or other vendors.</p>
                       </div>
                   ) : (
                       <>
                           <button onClick={handleHire} className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-transform">Hire Vendor</button>
                           <p className="text-center text-xs text-gray-400 mt-2">Secure Payment via Escrow</p>
                       </>
                   )}
               </div>
           </div>
       </div>
    </div>
  );
};

export default VendorDetails;
