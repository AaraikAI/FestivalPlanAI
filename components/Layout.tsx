
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ChatAssistant from './ChatAssistant';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { t } from '../utils/localization';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, login } = useAuth();
  const { language, setLanguage, currency, setCurrency, subscriptionTier } = useSettings();

  const hostNavItems = [
    { name: t('dashboard', language), path: '/', icon: '📊' },
    { name: t('events', language), path: '/events', icon: '📅' },
    { name: t('marketplace', language), path: '/vendors', icon: '🛍️' },
    { name: t('community', language), path: '/community', icon: '🌍' },
  ];

  const vendorNavItems = [
    { name: 'Vendor Hub', path: '/vendor-onboarding', icon: '🏪' },
    { name: t('marketplace', language), path: '/vendors', icon: '🛍️' },
    { name: t('community', language), path: '/community', icon: '🌍' },
  ];

  const navItems = user?.role === 'VENDOR' ? vendorNavItems : hostNavItems;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600">
            FestPlan AI
          </h1>
          <div className="flex items-center gap-2 mt-2">
             <div className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                 {user?.role} MODE
             </div>
             {subscriptionTier === 'PRO' && (
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold">PRO</span>
             )}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
              <Link 
                to="/subscription"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
              >
                  <span>💎</span> {t('upgrade', language)}
              </Link>
              <Link 
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
              >
                  <span>⚙️</span> {t('settings', language)}
              </Link>
          </div>
        </nav>
        
        {/* Global Configs */}
        <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50">
           <div className="flex gap-2">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as any)}
                className="flex-1 text-xs border border-gray-200 rounded p-1 bg-white"
              >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
              </select>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-16 text-xs border border-gray-200 rounded p-1 bg-white"
              >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
              </select>
           </div>
           
           <button 
             onClick={() => login(user?.role === 'HOST' ? 'VENDOR' : 'HOST')}
             className="w-full text-xs font-medium text-gray-500 hover:text-gray-800 border border-dashed border-gray-300 rounded-lg py-2 hover:bg-white transition-all"
          >
             🔄 Switch to {user?.role === 'HOST' ? 'Vendor' : 'Host'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center">
           <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600">
            FestPlan AI
          </h1>
          <div className="flex gap-3 items-center">
             <Link to="/subscription" className="text-xs bg-black text-white px-2 py-1 rounded font-bold">UPGRADE</Link>
             <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                {user?.avatar}
             </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-30">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg ${
                 location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                  ? 'text-orange-600'
                  : 'text-gray-400'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          ))}
          <Link to="/settings" className="flex flex-col items-center p-2 text-gray-400">
             <span className="text-xl mb-1">⚙️</span>
             <span className="text-[10px] font-medium">Settings</span>
          </Link>
        </nav>
      </main>
      
      <ChatAssistant />
    </div>
  );
};

export default Layout;
