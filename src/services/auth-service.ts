import { AuthResponse } from '@/types/auth';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookies';

const COOKIE_NAME = 'ovas_auth_token';
const COOKIE_OPTIONS = {
  path: '/',
  maxAge: 48 * 60 * 60, // 48 hours
  secure: true,
  sameSite: 'strict' as const
};

// Local credentials — each key maps to its corresponding password
const VALID_CREDENTIALS: Record<string, string> = {
  "UserUnadResocurces": ")a)I^66i#83r|_8AhF",
  "admin": ":v"
};

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      // Validate credentials locally — checks that the username exists and its paired password matches
      if (VALID_CREDENTIALS[username] !== password) {
        throw new Error('Invalid credentials');
      }

      // Create session data
      const sessionData = {
        username,
        role: 'admin',
        loginTime: new Date().toISOString()
      };

      // Save session in cookie
      setCookie(COOKIE_NAME, JSON.stringify(sessionData), COOKIE_OPTIONS);

      return {
        success: true,
        user: {
          username,
          role: 'admin'
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Authentication failed');
    }
  }

  logout(): void {
    deleteCookie(COOKIE_NAME);
  }

  isAuthenticated(): boolean {
    try {
      const sessionData = getCookie(COOKIE_NAME);
      return !!sessionData;
    } catch (error) {
      console.error('Authentication check error:', error);
      this.logout();
      return false;
    }
  }

  getUserData(): Record<string, unknown> | null {
    try {
      const sessionData = getCookie(COOKIE_NAME);
      if (!sessionData) return null;

      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Get user data error:', error);
      this.logout();
      return null;
    }
  }
}

export default AuthService.getInstance();