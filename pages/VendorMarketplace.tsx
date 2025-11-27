
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useSettings } from '../context/SettingsContext';
import { VendorCategory } from '../types';
import SustainabilityBadge from '../components/SustainabilityBadge';
import { formatCurrency } from '../utils/localization';

const VendorMarketplace: React.FC = () => {
  const { vendors } = useEvents();
  const { currency } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showOnlyEco, setShowOnlyEco] = useState(false);

  const filteredVendors = vendors.filter(vendor => {
    return (vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (selectedCategory === 'All' || vendor.category === selectedCategory) &&
           (!showOnlyEco || vendor.isEcoFriendly);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Marketplace</h1>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full md:w-96 border p-3 rounded-xl" />
      </div>

      <div className="flex flex-wrap gap-2">
         {['All', ...Object.values(VendorCategory)].map(cat => (
             <button key={cat} onClick={()=>setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-bold ${selectedCategory===cat ? 'bg-black text-white' : 'bg-white border'}`}>{cat}</button>
         ))}
         <label className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-full text-sm font-bold cursor-pointer ml-auto">
             <input type="checkbox" checked={showOnlyEco} onChange={e=>setShowOnlyEco(e.target.checked)} /> Eco-Friendly
         </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => (
          <Link to={`/vendor/${vendor.id}`} key={vendor.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all block group">
            <div className="relative h-52">
                <img src={vendor.imageUrl} className="w-full h-full object-cover" />
                {vendor.isEcoFriendly && <div className="absolute top-2 left-2"><SustainabilityBadge score={90} size="sm" /></div>}
            </div>
            <div className="p-5">
                <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{vendor.name}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{vendor.category}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">📍 {vendor.location}</p>
                <div className="mt-4 flex justify-between items-center text-sm font-bold">
                    <span>{['Budget', 'Standard', 'Premium'][vendor.priceLevel-1]}</span>
                    <span className="text-orange-600">View →</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorMarketplace;
