export interface AuthUser {
  id: number;
  name: string;
  email: string;
  type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface RegistrationResult {
  clientId: number;
  profileId: number;
}

export interface GoogleLoginData {
  socialId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  loginWithGoogle(data: GoogleLoginData): Promise<AuthSession>;
  register(data: RegistrationData): Promise<RegistrationResult>;
  forgotPassword(email: string): Promise<void>;
  validateResetToken(token: string): Promise<string>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  getToken(): string | null;
  getUser(): AuthUser | null;
  updateUser(patch: Partial<AuthUser>): AuthUser | null;
  logout(): void;
}
