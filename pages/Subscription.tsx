
import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { formatCurrency } from '../utils/localization';
import PaymentModal from '../components/PaymentModal';

const Subscription: React.FC = () => {
  const { currency, subscriptionTier, setSubscriptionTier } = useSettings();
  const [showPayment, setShowPayment] = useState(false);

  // Dynamic pricing based on currency
  const getProPrice = () => {
    switch (currency) {
        case 'INR': return 399;
        case 'EUR': return 4.99;
        case 'USD': 
        default: return 4.99;
    }
  };

  const proPrice = getProPrice();

  const PLANS = [
    {
      id: 'FREE',
      name: 'Basic Planner',
      price: 0,
      features: ['Basic Event Planning', 'Standard Templates', 'Manual Vendor Search', 'Ads Supported']
    },
    {
      id: 'PRO',
      name: 'FestPlan Pro',
      price: proPrice,
      features: ['AI Assistant & Concierge', 'Premium Cultural Templates', 'AR/VR Venue Previews', 'Zero Transaction Fees', 'Advanced Analytics'],
      recommended: true
    }
  ];

  const handleUpgrade = () => {
    setShowPayment(true);
  };

  const onPaymentSuccess = () => {
    setSubscriptionTier('PRO');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <PaymentModal 
         isOpen={showPayment}
         onClose={() => setShowPayment(false)}
         amount={proPrice}
         item="FestPlan Pro Subscription (Monthly)"
         onSuccess={onPaymentSuccess}
      />

      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrade Your Experience ✨</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Unlock the full power of AI, Immersive Tech, and Premium Templates to make your event truly world-class.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {PLANS.map(plan => (
          <div 
            key={plan.id} 
            className={`relative rounded-3xl p-8 border-2 transition-all ${
              plan.id === subscriptionTier 
                ? 'border-green-500 bg-green-50 shadow-none'
                : plan.recommended 
                    ? 'border-orange-500 bg-white shadow-xl scale-105 z-10' 
                    : 'border-gray-200 bg-white shadow-sm'
            }`}
          >
            {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                </div>
            )}

            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <div className="my-4">
               <span className="text-4xl font-bold">{formatCurrency(plan.price, currency)}</span>
               <span className="text-gray-500 text-sm">/month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
                {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${plan.id === 'PRO' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>✓</span>
                        {feat}
                    </li>
                ))}
            </ul>

            {plan.id === subscriptionTier ? (
                <button disabled className="w-full py-3 bg-green-600 text-white font-bold rounded-xl opacity-100">
                    Current Plan
                </button>
            ) : (
                <button 
                  onClick={handleUpgrade}
                  className={`w-full py-3 font-bold rounded-xl transition-colors ${
                      plan.id === 'PRO' 
                      ? 'bg-gray-900 text-white hover:bg-gray-800' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                    {plan.price === 0 ? 'Downgrade' : 'Upgrade Now'}
                </button>
            )}
          </div>
        ))}
      </div>

      {/* Passive Income Teaser */}
      <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
             📡
          </div>
          <div className="flex-1">
             <h4 className="font-bold text-indigo-900 text-lg">Earn Credits Automatically</h4>
             <p className="text-indigo-800/80 text-sm">Opt-in to share anonymous bandwidth and data to earn credits towards your Pro subscription.</p>
          </div>
          <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
             Enable in Settings
          </button>
      </div>
    </div>
  );
};

export default Subscription;
