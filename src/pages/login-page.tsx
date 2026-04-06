import { useEffect } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

import LoginForm from '@/components/app/login-form';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Redirect to main page if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      if (response.success) {
        toast.success('Welcome! You have successfully logged in.');
        setLocation('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to be caught by LoginForm
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12 sm:px-6 lg:px-8 bg-[radial-gradient(#80808080_1px,transparent_1px)] bg-size-[16px_16px]">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text/60">
            OVA Manager System
          </p>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;