import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { name: string; phone: string }) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'idli_app_user';

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password',
    name: 'Demo User',
    phone: '+91 9876543210',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
  };

  const signUp = async (email: string, password: string, userData: { name: string; phone: string }) => {
    // Mock user creation
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: userData.name,
      phone: userData.phone,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}