
import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { formatCurrency } from '../utils/localization';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  item: string;
  onSuccess: () => void;
}

const PaymentModal: React.FC<Props> = ({ isOpen, onClose, amount, item, onSuccess }) => {
  const { currency } = useSettings();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!isOpen) return null;

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
            onSuccess();
            onClose();
            setStatus('idle');
        }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden">
        
        {status === 'idle' && (
            <>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-900">Secure Payment</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(amount, currency)}</p>
                    <p className="text-xs text-gray-400 mt-1">For: {item}</p>
                </div>

                <div className="space-y-3 mb-6">
                    <button className="w-full flex items-center gap-3 p-3 border border-orange-500 bg-orange-50 rounded-xl relative">
                        <span className="text-xl">📱</span>
                        <div className="text-left">
                            <p className="font-bold text-sm text-gray-900">UPI / BHIM</p>
                            <p className="text-xs text-gray-500">GooglePay, PhonePe, Paytm</p>
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-orange-500"></div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl opacity-60">
                        <span className="text-xl">💳</span>
                        <div className="text-left">
                            <p className="font-bold text-sm text-gray-900">Credit / Debit Card</p>
                        </div>
                    </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-4 justify-center">
                    <span>🔒 256-bit SSL Encrypted</span>
                    <span>•</span>
                    <span>PCI-DSS Compliant</span>
                </div>

                <button 
                  onClick={handlePay}
                  className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                >
                    Pay Now
                </button>
            </>
        )}

        {status === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-gray-800">Processing Transaction...</p>
                <p className="text-xs text-gray-500 mt-2">Do not close this window</p>
            </div>
        )}

        {status === 'success' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
                <p className="font-bold text-xl text-gray-900">Payment Successful!</p>
                <p className="text-sm text-gray-500 mt-2">Transaction ID: TXN_{Date.now().toString().slice(-6)}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
