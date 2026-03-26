import { LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '../ui';

export const SignOut = () => {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  // Handle sign out action
  const handleSignOut = () => {
    logout();
    setLocation('/login');
  };

  return (
    <Button variant="reverse" className="bg-bw text-text" aria-label="Sign out" onClick={handleSignOut}>
      <LogOut className="h-4 w-4 mr-2" /> <span className="hidden md:inline">Sign Out</span>
    </Button>
  );
};
