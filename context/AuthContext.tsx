
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock User Data
const MOCK_HOST_USER: User = {
  id: 'u1',
  name: 'Jay Deep',
  email: 'jay@example.com',
  role: 'HOST',
  avatar: 'JD'
};

const MOCK_VENDOR_USER: User = {
  id: 'v_user_1',
  name: 'Ramesh Decorators',
  email: 'ramesh@decor.com',
  role: 'VENDOR',
  avatar: 'RD',
  vendorProfileId: 'v_pending'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Host for demo purposes
  const [user, setUser] = useState<User | null>(MOCK_HOST_USER);

  const login = (role: UserRole) => {
    if (role === 'VENDOR') {
      setUser(MOCK_VENDOR_USER);
    } else {
      setUser(MOCK_HOST_USER);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
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
