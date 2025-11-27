
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { VendorCategory } from '../types';

const VendorOnboarding: React.FC = () => {
  const { addVendor } = useEvents();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({ businessName: '', category: 'Venue', priceLevel: '2', isEcoFriendly: false, document: null });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = () => {
      setIsVerifying(true);
      setTimeout(() => {
          addVendor({
              id: `v_${Date.now()}`,
              name: formData.businessName,
              category: formData.category,
              rating: 5.0,
              priceLevel: parseInt(formData.priceLevel) as any,
              isEcoFriendly: formData.isEcoFriendly,
              location: formData.location || 'Mumbai',
              imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
              description: formData.description || 'New vendor',
              verified: true,
              basePrice: 10000 // Default base price for new onboarded vendors
          });
          setStep(4);
          setIsVerifying(false);
      }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
       {step < 4 && <h1 className="text-2xl font-bold mb-6">Vendor Onboarding (Step {step}/3)</h1>}
       
       <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
           {step === 1 && (
               <div className="space-y-4">
                   <input className="w-full border p-2 rounded" placeholder="Business Name" value={formData.businessName} onChange={e=>setFormData({...formData, businessName: e.target.value})} />
                   <select className="w-full border p-2 rounded" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})}>
                       {Object.values(VendorCategory).map(c=><option key={c} value={c}>{c}</option>)}
                   </select>
                   <button onClick={()=>setStep(2)} className="w-full bg-orange-600 text-white py-2 rounded font-bold">Next</button>
               </div>
           )}
           {step === 2 && (
               <div className="space-y-4">
                   <textarea className="w-full border p-2 rounded" placeholder="Description" onChange={e=>setFormData({...formData, description: e.target.value})} />
                   <label className="flex gap-2"><input type="checkbox" checked={formData.isEcoFriendly} onChange={e=>setFormData({...formData, isEcoFriendly: e.target.checked})} /> Eco-Friendly</label>
                   <div className="flex gap-2"><button onClick={()=>setStep(1)} className="flex-1 border py-2 rounded">Back</button><button onClick={()=>setStep(3)} className="flex-1 bg-orange-600 text-white py-2 rounded font-bold">Next</button></div>
               </div>
           )}
           {step === 3 && (
               <div className="space-y-4 text-center">
                   <div className="border-2 border-dashed p-8 rounded-xl cursor-pointer hover:bg-gray-50">
                       <p>📄 Upload ID Proof (Simulated)</p>
                       <input type="file" className="hidden" />
                   </div>
                   <div className="flex gap-2"><button onClick={()=>setStep(2)} className="flex-1 border py-2 rounded">Back</button><button onClick={handleSubmit} disabled={isVerifying} className="flex-1 bg-green-600 text-white py-2 rounded font-bold">{isVerifying ? 'Verifying...' : 'Submit'}</button></div>
               </div>
           )}
           {step === 4 && (
               <div className="text-center">
                   <div className="text-4xl mb-4">✅</div>
                   <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                   <p className="text-gray-500 mb-6">Your profile is live.</p>
                   <button onClick={()=>navigate('/vendors')} className="bg-black text-white px-6 py-2 rounded font-bold">Go to Marketplace</button>
               </div>
           )}
       </div>
    </div>
  );
};

export default VendorOnboarding;
