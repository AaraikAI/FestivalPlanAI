
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { VendorCategory, Vendor } from '../types';

const VendorOnboarding: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addVendor, getVendor, updateVendor } = useEvents();
  const navigate = useNavigate();
  
  // State for Onboarding Wizard
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({ businessName: '', category: 'Venue', priceLevel: '2', isEcoFriendly: false, document: null });
  const [isVerifying, setIsVerifying] = useState(false);

  // State for Vendor Dashboard (Existing Vendor)
  const [myVendor, setMyVendor] = useState<Vendor | undefined>(undefined);
  const [newService, setNewService] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState('');

  // Check if user is already a vendor
  useEffect(() => {
      if (user?.vendorProfileId) {
          const v = getVendor(user.vendorProfileId);
          setMyVendor(v);
          if (v) setEditDesc(v.description);
      }
  }, [user, getVendor]);

  // --- Onboarding Logic ---
  const handleOnboardingSubmit = () => {
      setIsVerifying(true);
      setTimeout(() => {
          const newVendorId = `v_${Date.now()}`;
          addVendor({
              id: newVendorId,
              name: formData.businessName,
              category: formData.category,
              rating: 5.0,
              priceLevel: parseInt(formData.priceLevel) as any,
              isEcoFriendly: formData.isEcoFriendly,
              location: formData.location || 'Mumbai',
              imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3',
              description: formData.description || 'New vendor',
              verified: true,
              basePrice: 10000,
              services: [],
              ownerId: user?.id
          });
          
          // Link user to new vendor profile
          updateUser({ vendorProfileId: newVendorId, role: 'VENDOR' });
          
          setStep(4);
          setIsVerifying(false);
      }, 2000);
  };

  // --- Dashboard Logic ---
  const handleAddService = () => {
      if (!newService.trim() || !myVendor) return;
      const updatedServices = [...(myVendor.services || []), newService];
      updateVendor({ ...myVendor, services: updatedServices });
      setNewService('');
  };

  const handleRemoveService = (service: string) => {
      if (!myVendor) return;
      const updatedServices = (myVendor.services || []).filter(s => s !== service);
      updateVendor({ ...myVendor, services: updatedServices });
  };

  const handleSaveProfile = () => {
      if (!myVendor) return;
      updateVendor({ ...myVendor, description: editDesc });
      setIsEditing(false);
  };

  // --- RENDER: Vendor Dashboard (If already onboarded) ---
  if (myVendor) {
      return (
          <div className="max-w-5xl mx-auto py-8 space-y-8 animate-in fade-in">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center">
                  <div>
                      <h2 className="text-sm font-bold opacity-70 uppercase mb-1">Welcome, {user?.name}</h2>
                      <h1 className="text-3xl font-bold">{myVendor.name}</h1>
                      <p className="opacity-80 mt-1">{myVendor.category} • {myVendor.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                      <span className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm animate-pulse">● Live on Marketplace</span>
                      <p className="text-xs opacity-60 mt-2">ID Verified</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Service Management */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
                      <div className="flex items-center gap-3 mb-6">
                          <span className="text-2xl p-2 bg-orange-100 rounded-lg">🛠️</span>
                          <h2 className="font-bold text-xl text-gray-900">Manage Services</h2>
                      </div>
                      
                      <div className="flex gap-2 mb-6">
                          <input 
                            value={newService} 
                            onChange={e => setNewService(e.target.value)}
                            placeholder="Add a service (e.g. Valet, Buffet)"
                            className="flex-1 border-2 border-gray-200 p-3 rounded-xl focus:border-orange-500 focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
                          />
                          <button onClick={handleAddService} className="bg-black text-white px-6 rounded-xl font-bold hover:bg-gray-800 transition-colors">Add</button>
                      </div>

                      <div className="flex flex-wrap gap-3">
                          {(myVendor.services || []).map(s => (
                              <div key={s} className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-3 group">
                                  {s}
                                  <button 
                                    onClick={() => handleRemoveService(s)} 
                                    className="text-gray-400 hover:text-red-500 font-bold transition-colors"
                                    title="Remove Service"
                                  >
                                    ×
                                  </button>
                              </div>
                          ))}
                          {(myVendor.services || []).length === 0 && (
                              <div className="w-full text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                  No services listed yet. Add one above!
                              </div>
                          )}
                      </div>
                  </div>

                  {/* Profile Edit */}
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3">
                              <span className="text-2xl p-2 bg-blue-100 rounded-lg">📝</span>
                              <h2 className="font-bold text-xl text-gray-900">Profile Details</h2>
                          </div>
                          {isEditing ? (
                              <button onClick={handleSaveProfile} className="bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-sm hover:bg-green-700">Save</button>
                          ) : (
                              <button onClick={() => setIsEditing(true)} className="bg-white border border-gray-200 text-gray-900 px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-50">Edit</button>
                          )}
                      </div>
                      
                      {isEditing ? (
                          <textarea 
                            value={editDesc}
                            onChange={e => setEditDesc(e.target.value)}
                            className="w-full border-2 border-gray-200 p-4 rounded-xl h-full min-h-[150px] focus:border-blue-500 focus:outline-none text-gray-700 leading-relaxed"
                            placeholder="Describe your business..."
                          />
                      ) : (
                          <div className="bg-gray-50 p-6 rounded-xl text-gray-700 leading-relaxed flex-1">
                              {myVendor.description}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      );
  }

  // --- RENDER: Onboarding Wizard (If new) ---
  return (
    <div className="max-w-2xl mx-auto py-8 animate-in slide-in-from-bottom-4">
       {step < 4 && (
           <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Onboarding</h1>
               <p className="text-gray-500">Step {step} of 3 • Join the FestPlan Marketplace</p>
               <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
                   <div className="bg-orange-600 h-2 rounded-full transition-all duration-500" style={{ width: `${(step/3)*100}%` }}></div>
               </div>
           </div>
       )}
       
       <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
           {step === 1 && (
               <div className="space-y-6">
                   <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Business Name</label>
                       <input className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-orange-500 focus:outline-none" placeholder="e.g. Royal Events" value={formData.businessName} onChange={e=>setFormData({...formData, businessName: e.target.value})} />
                   </div>
                   <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                       <select className="w-full border-2 border-gray-200 p-3 rounded-xl bg-white focus:border-orange-500 focus:outline-none" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})}>
                           {Object.values(VendorCategory).map(c=><option key={c} value={c}>{c}</option>)}
                       </select>
                   </div>
                   <button onClick={()=>setStep(2)} disabled={!formData.businessName} className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition-colors">Next Step →</button>
               </div>
           )}
           {step === 2 && (
               <div className="space-y-6">
                   <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                       <textarea className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-orange-500 focus:outline-none h-32" placeholder="Tell us about your services..." onChange={e=>setFormData({...formData, description: e.target.value})} />
                   </div>
                   <label className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl cursor-pointer">
                       <input type="checkbox" className="w-5 h-5 text-green-600 rounded" checked={formData.isEcoFriendly} onChange={e=>setFormData({...formData, isEcoFriendly: e.target.checked})} /> 
                       <span className="font-bold text-green-800">🌱 My business is Eco-Friendly</span>
                   </label>
                   <div className="flex gap-4">
                       <button onClick={()=>setStep(1)} className="flex-1 border-2 border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50">Back</button>
                       <button onClick={()=>setStep(3)} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold">Next Step →</button>
                   </div>
               </div>
           )}
           {step === 3 && (
               <div className="space-y-6 text-center">
                   <div className="border-2 border-dashed border-gray-300 p-10 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors group">
                       <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">📄</span>
                       <p className="font-bold text-gray-800">Upload ID Proof</p>
                       <p className="text-xs text-gray-500 mt-1">GST / Aadhaar / PAN (Simulated)</p>
                       <input type="file" className="hidden" />
                   </div>
                   <div className="flex gap-4">
                       <button onClick={()=>setStep(2)} className="flex-1 border-2 border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50">Back</button>
                       <button onClick={handleOnboardingSubmit} disabled={isVerifying} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200">
                           {isVerifying ? 'Verifying Details...' : 'Submit for Verification'}
                       </button>
                   </div>
               </div>
           )}
           {step === 4 && (
               <div className="text-center py-8">
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">✓</div>
                   <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Aboard!</h2>
                   <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your profile is now live on the FestPlan Marketplace. You can manage your services from your dashboard.</p>
                   <button onClick={() => window.location.reload()} className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">Go to Dashboard</button>
               </div>
           )}
       </div>
    </div>
  );
};

export default VendorOnboarding;
