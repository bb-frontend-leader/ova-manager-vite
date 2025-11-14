import { useState } from 'react';

import authService from '@/services/auth-service';
import { AuthResponse } from '@/types/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // Function to check if the user is authenticated
  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
  };

  // Function to get user data
  const getUserData = (): Record<string, unknown> | null => {
    return authService.getUserData();
  };

  // Function to log in the user
  const login = async (username: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await authService.login(username, password);
      return response;
    } catch {
      throw new Error('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to log out the user
  const logout = () => {
    authService.logout();
  };

  return { 
    isAuthenticated,
    loading,
    login, 
    logout,
    getUserData
  };
};