import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation } from 'wouter';

import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin text-main" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
