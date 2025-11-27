
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('HOST');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
        login(formData.name || 'User', formData.email || 'user@example.com', role);
        navigate('/');
        setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600 mb-2">
              FestPlan AI
            </h1>
            <p className="text-gray-500">Your intelligent event planning assistant</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button 
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'HOST' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setRole('HOST')}
            >
              Host / Planner
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'VENDOR' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setRole('VENDOR')}
            >
              Vendor / Partner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
              <input 
                required 
                type="text" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input 
                required 
                type="email" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input 
                required 
                type="password" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2
                ${role === 'HOST' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-pink-500 to-purple-600'}
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>Sign In as {role === 'HOST' ? 'Host' : 'Vendor'} →</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>By signing in, you agree to our Terms & Privacy Policy.</p>
            <p className="mt-2">Protected by reCAPTCHA Enterprise.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
