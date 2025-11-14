export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
}

export interface AuthResponse {
  success: boolean;
  user: {
    username: string;
    role: string;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}