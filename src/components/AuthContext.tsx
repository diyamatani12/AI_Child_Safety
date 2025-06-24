import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'parent' | 'child';
  childId?: string; // For parent accounts
  parentId?: string; // For child accounts
  age?: number; // For child accounts
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'parent' | 'child') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('safeyatra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'parent' | 'child'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any credentials for demo purposes
    if (email && password) {
      const userData: User = {
        id: `${role}_${Date.now()}`,
        name: email.split('@')[0] || email, // Use part before @ as name, or full username for child
        email: role === 'parent' ? email : undefined,
        role: role,
        childId: role === 'parent' ? 'child_1' : undefined,
        parentId: role === 'child' ? 'parent_1' : undefined,
        age: role === 'child' ? 12 : undefined,
        avatar: role === 'parent' 
          ? 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
          : 'https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      
      setUser(userData);
      localStorage.setItem('safeyatra_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safeyatra_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};