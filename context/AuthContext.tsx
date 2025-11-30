
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types';
import { encryptData, decryptData } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addCredits: (amount: number) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Templates
const HOST_TEMPLATE: Partial<User> = {
  credits: 50,
  referralCode: 'FEST2025'
};

// Updated to link to 'v1' (Royal Heritage Banquet) so the Dashboard appears immediately
const VENDOR_TEMPLATE: Partial<User> = {
  vendorProfileId: 'v1',
  credits: 0,
  referralCode: 'VENDOR10'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load Persisted User
  useEffect(() => {
    const loadUser = async () => {
        const stored = localStorage.getItem('festplan_user');
        if (stored) {
            try {
                const decrypted = await decryptData<User>(stored, {} as User);
                if (decrypted && decrypted.id) {
                    setUser(decrypted);
                }
            } catch (e) {
                console.error("Failed to load user session");
                localStorage.removeItem('festplan_user');
            }
        }
        setIsLoading(false);
    };
    loadUser();
  }, []);

  // Save on change
  useEffect(() => {
    const saveUser = async () => {
        if (user) {
            const encrypted = await encryptData(user);
            localStorage.setItem('festplan_user', encrypted);
        } else {
            localStorage.removeItem('festplan_user');
        }
    };
    if (!isLoading) {
        saveUser();
    }
  }, [user, isLoading]);

  const login = (name: string, email: string, role: UserRole) => {
    const template = role === 'VENDOR' ? VENDOR_TEMPLATE : HOST_TEMPLATE;
    
    const newUser: User = {
        id: `u_${Date.now()}`,
        name,
        email,
        role,
        avatar: name.substring(0, 2).toUpperCase(),
        credits: template.credits || 0,
        referralCode: template.referralCode || 'NEWCODE',
        vendorProfileId: template.vendorProfileId
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('festplan_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addCredits = (amount: number) => {
      if (user) {
          setUser({ ...user, credits: user.credits + amount });
      }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser, addCredits, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
