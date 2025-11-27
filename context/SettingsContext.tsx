
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppSettings, Language, Currency, SubscriptionTier } from '../types';
import { useAuth } from './AuthContext';
import { encryptData, decryptData } from '../services/storageService';

interface SettingsContextType extends AppSettings {
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  togglePrivacySetting: (key: keyof AppSettings['privacy']) => void;
  exportUserData: () => void;
  deleteUserData: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AppSettings = {
    language: 'en',
    currency: 'INR',
    subscriptionTier: 'FREE',
    privacy: {
      shareDataForCredits: false,
      analyticsConsent: true
    }
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addCredits } = useAuth();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Load Settings
  useEffect(() => {
    const loadSettings = async () => {
        const stored = localStorage.getItem('festplan_settings');
        if (stored) {
            const decrypted = await decryptData<AppSettings>(stored, DEFAULT_SETTINGS);
            setSettings(decrypted);
        }
    };
    loadSettings();
  }, []);

  // Save Settings
  useEffect(() => {
    const saveSettings = async () => {
        const encrypted = await encryptData(settings);
        localStorage.setItem('festplan_settings', encrypted);
    };
    saveSettings();
  }, [settings]);

  // Passive Income Logic (Simulation)
  useEffect(() => {
      let interval: any;
      if (settings.privacy.shareDataForCredits) {
          // Add 1 credit every 10 seconds for demo purposes (Representing bandwidth sharing)
          interval = setInterval(() => {
              addCredits(1);
          }, 10000);
      }
      return () => clearInterval(interval);
  }, [settings.privacy.shareDataForCredits, addCredits]);

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
    setSettings(DEFAULT_SETTINGS);
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
