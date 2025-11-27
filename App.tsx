
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MyEvents from './pages/MyEvents';
import CreateEvent from './pages/CreateEvent';
import VendorMarketplace from './pages/VendorMarketplace';
import VendorDetails from './pages/VendorDetails';
import EventDetails from './pages/EventDetails';
import Community from './pages/Community';
import VendorOnboarding from './pages/VendorOnboarding';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <EventProvider>
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/vendors" element={<VendorMarketplace />} />
                <Route path="/vendor/:id" element={<VendorDetails />} />
                <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/events" element={<MyEvents />} />
                <Route path="/community" element={<Community />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </HashRouter>
        </EventProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
