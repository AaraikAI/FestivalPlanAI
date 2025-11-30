
import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Login from './pages/Login';
import { EventProvider } from './context/EventContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { CommunityProvider } from './context/CommunityContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
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
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <EventProvider>
          <CommunityProvider>
            <HashRouter>
              <AppRoutes />
            </HashRouter>
          </CommunityProvider>
        </EventProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
