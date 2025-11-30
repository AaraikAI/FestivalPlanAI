
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
  const [method, setMethod] = useState<'UPI' | 'CARD'>('UPI');
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Luhn Algorithm for Credit Card Validation
  const isValidCard = (val: string) => {
    if (!val) return false;
    // Remove spaces and dashes
    const cleanVal = val.replace(/[\s-]/g, "");
    if (cleanVal.length < 13 || cleanVal.length > 19) return false;
    
    let nCheck = 0, bEven = false;
    for (let n = cleanVal.length - 1; n >= 0; n--) {
      let cDigit = cleanVal.charAt(n),
          nDigit = parseInt(cDigit, 10);
      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return (nCheck % 10) === 0;
  };

  const handlePay = () => {
    setError('');

    if (method === 'CARD') {
        if (!isValidCard(cardNumber)) {
            setError('Invalid Card Number. Please check and try again.');
            return;
        }
        if (!expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            setError('Invalid Expiry Date (MM/YY)');
            return;
        }
        if (!cvv || cvv.length < 3 || isNaN(Number(cvv))) {
            setError('Invalid CVV');
            return;
        }
    }

    setStatus('processing');
    setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
            onSuccess();
            onClose();
            setStatus('idle');
            setCardNumber('');
            setExpiry('');
            setCvv('');
            setMethod('UPI');
        }, 1500);
    }, 2000);
  };

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return val;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        
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
                    <button 
                        onClick={() => setMethod('UPI')}
                        className={`w-full flex items-center gap-3 p-3 border rounded-xl relative transition-all ${
                            method === 'UPI' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        <span className="text-xl">📱</span>
                        <div className="text-left">
                            <p className="font-bold text-sm text-gray-900">UPI / BHIM</p>
                            <p className="text-xs text-gray-500">GooglePay, PhonePe, Paytm</p>
                        </div>
                        {method === 'UPI' && (
                             <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-orange-500"></div>
                        )}
                    </button>
                    
                    <button 
                         onClick={() => setMethod('CARD')}
                         className={`w-full flex items-center gap-3 p-3 border rounded-xl relative transition-all ${
                            method === 'CARD' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        <span className="text-xl">💳</span>
                        <div className="text-left">
                            <p className="font-bold text-sm text-gray-900">Credit / Debit Card</p>
                            <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                        </div>
                         {method === 'CARD' && (
                             <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-orange-500"></div>
                        )}
                    </button>

                    {method === 'CARD' && (
                        <div className="p-3 bg-gray-50 rounded-xl space-y-3 border border-gray-100 animate-in slide-in-from-top-2">
                             <input 
                                type="text" 
                                placeholder="Card Number (0000 0000 0000 0000)" 
                                className="w-full p-2 border border-gray-200 rounded text-sm bg-white"
                                value={cardNumber}
                                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                                maxLength={19}
                             />
                             <div className="flex gap-3">
                                 <input 
                                    type="text" 
                                    placeholder="MM/YY" 
                                    className="w-1/2 p-2 border border-gray-200 rounded text-sm bg-white" 
                                    value={expiry}
                                    onChange={e => {
                                        let v = e.target.value.replace(/[^0-9]/g, '');
                                        if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                                        setExpiry(v);
                                    }}
                                    maxLength={5}
                                 />
                                 <input 
                                    type="text" 
                                    placeholder="CVV" 
                                    className="w-1/2 p-2 border border-gray-200 rounded text-sm bg-white" 
                                    value={cvv}
                                    onChange={e => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                                    maxLength={4}
                                 />
                             </div>
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 text-xs text-center mb-4 font-bold">{error}</p>}

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
