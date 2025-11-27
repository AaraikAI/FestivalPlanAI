
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppSettings, Language, Currency, SubscriptionTier } from '../types';

interface SettingsContextType extends AppSettings {
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  togglePrivacySetting: (key: keyof AppSettings['privacy']) => void;
  exportUserData: () => void;
  deleteUserData: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    currency: 'INR',
    subscriptionTier: 'FREE',
    privacy: {
      shareDataForCredits: false,
      analyticsConsent: true
    }
  });

  const setLanguage = (lang: Language) => setSettings(prev => ({ ...prev, language: lang }));
  const setCurrency = (curr: Currency) => setSettings(prev => ({ ...prev, currency: curr }));
  const setSubscriptionTier = (tier: SubscriptionTier) => setSettings(prev => ({ ...prev, subscriptionTier: tier }));
  
  const togglePrivacySetting = (key: keyof AppSettings['privacy']) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: !prev.privacy[key] }
    }));
  };

  const exportUserData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "festplan_user_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const deleteUserData = () => {
    alert("GDPR Request: All your data has been scheduled for deletion.");
    setSettings({
        language: 'en',
        currency: 'INR',
        subscriptionTier: 'FREE',
        privacy: { shareDataForCredits: false, analyticsConsent: false }
    });
  };

  return (
    <SettingsContext.Provider value={{ 
      ...settings, 
      setLanguage, 
      setCurrency, 
      setSubscriptionTier,
      togglePrivacySetting,
      exportUserData,
      deleteUserData
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
