import type {
  AuthRepository,
  AuthUser,
  LoginCredentials,
  RegistrationData,
} from '@/src/features/auth/domain/auth-repository';
import { httpRequest } from '@/src/shared/infrastructure/http/http-client';
import { tokenStorage } from '@/src/shared/infrastructure/http/token-storage';
import { userStorage } from '@/src/shared/infrastructure/http/user-storage';
import { authUserSchema, loginResponseSchema, registerResponseSchema } from './auth-schemas';

export const authHttpRepository = {
  async login(credentials: LoginCredentials) {
    const response = await httpRequest('/web/login', {
      method: 'POST',
      body: { user: credentials.email, pass: credentials.password },
      schema: loginResponseSchema,
    });

    tokenStorage.set(response.token);
    userStorage.set(JSON.stringify(response.user));

    return { user: response.user, token: response.token };
  },

  async register(data: RegistrationData) {
    const response = await httpRequest('/web/client/register', {
      method: 'POST',
      body: {
        email: data.email,
        telefono: data.phone,
        contrasena: data.password,
        nombres: data.firstName,
        apellidos: data.lastName,
      },
      schema: registerResponseSchema,
    });

    return { clientId: response.data.clientId, profileId: response.data.profileId };
  },

  getToken() {
    return tokenStorage.get();
  },

  getUser() {
    const raw = userStorage.get();
    if (raw === cachedRaw) return cachedUser;

    cachedRaw = raw;
    cachedUser = raw ? (authUserSchema.safeParse(safeJsonParse(raw)).data ?? null) : null;
    return cachedUser;
  },

  logout() {
    tokenStorage.clear();
    userStorage.clear();
    cachedRaw = null;
    cachedUser = null;
  },
} satisfies AuthRepository;

let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
