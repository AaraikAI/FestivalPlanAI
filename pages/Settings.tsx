
import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { AppSettings, Language, Currency } from '../types';

const Settings: React.FC = () => {
  const { 
    language, setLanguage, 
    currency, setCurrency, 
    privacy, togglePrivacySetting,
    exportUserData, deleteUserData 
  } = useSettings();

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
       <div>
         <h1 className="text-2xl font-bold text-gray-900">Settings & Compliance</h1>
         <p className="text-gray-500">Manage your preferences, data privacy, and region.</p>
       </div>

       {/* Region & Language */}
       <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Localization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App Language</label>
                  <select 
                    value={language} 
                    onChange={e => setLanguage(e.target.value as Language)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-orange-500"
                  >
                      <option value="en">English</option>
                      <option value="hi">हिंदी (Hindi)</option>
                      <option value="es">Español</option>
                  </select>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select 
                    value={currency} 
                    onChange={e => setCurrency(e.target.value as Currency)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-orange-500"
                  >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                  </select>
              </div>
          </div>
       </section>

       {/* Privacy & GDPR */}
       <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2 flex items-center gap-2">
             <span>🛡️</span> Privacy & Security (GDPR/DPDP)
          </h2>
          
          <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                   <p className="font-medium text-gray-900 text-sm">Anonymous Analytics</p>
                   <p className="text-xs text-gray-500">Help us improve by sharing usage data.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={privacy.analyticsConsent} onChange={() => togglePrivacySetting('analyticsConsent')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
             </div>

             <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <div>
                   <p className="font-medium text-indigo-900 text-sm">Passive Income (Bandwidth Sharing)</p>
                   <p className="text-xs text-indigo-700">Earn credits by opting into the FestPlan Network.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={privacy.shareDataForCredits} onChange={() => togglePrivacySetting('shareDataForCredits')} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
             </div>
          </div>

          <div className="pt-4 flex gap-4">
             <button onClick={exportUserData} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                 ⬇️ Export My Data
             </button>
             <button onClick={deleteUserData} className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100">
                 🗑️ Delete Account
             </button>
          </div>
       </section>

       <p className="text-center text-xs text-gray-400">
           FestPlan AI complies with ISO27001, GDPR, and India DPDP Act 2023.
           <br/>All data is encrypted using AES-256.
       </p>
    </div>
  );
};

export default Settings;
