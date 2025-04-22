
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserType } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  signup: (
    email: string, 
    password: string, 
    name: string,
    userType: UserType
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace this with actual Supabase auth check when integrated
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('aiyouneed_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Mock functions to be replaced with Supabase
  const login = async (email: string, password: string, userType: UserType) => {
    try {
      // TODO: Replace with Supabase auth
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        userType
      };
      
      localStorage.setItem('aiyouneed_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string,
    userType: UserType
  ) => {
    try {
      // TODO: Replace with Supabase auth
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        userType
      };
      
      localStorage.setItem('aiyouneed_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Replace with Supabase auth
      localStorage.removeItem('aiyouneed_user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
