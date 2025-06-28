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

// Mock user database for demo
const mockUsers = {
  'parent1@example.com': {
    id: 'parent_1',
    name: 'Rajesh Sharma',
    email: 'parent1@example.com',
    role: 'parent' as const,
    childId: 'child_1',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'parent2@example.com': {
    id: 'parent_2',
    name: 'Meera Patel',
    email: 'parent2@example.com',
    role: 'parent' as const,
    childId: 'child_2',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'parent3@example.com': {
    id: 'parent_3',
    name: 'Suresh Kumar',
    email: 'parent3@example.com',
    role: 'parent' as const,
    childId: 'child_3',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'aarav': {
    id: 'child_1',
    name: 'Aarav',
    role: 'child' as const,
    parentId: 'parent_1',
    age: 12,
    avatar: 'https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'priya': {
    id: 'child_2',
    name: 'Priya',
    role: 'child' as const,
    parentId: 'parent_2',
    age: 10,
    avatar: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  'arjun': {
    id: 'child_3',
    name: 'Arjun',
    role: 'child' as const,
    parentId: 'parent_3',
    age: 14,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
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
    
    // Check credentials against mock database
    const userKey = role === 'parent' ? email : email; // For child, email is actually username
    const userData = mockUsers[userKey as keyof typeof mockUsers];
    
    if (userData && userData.role === role && password) {
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