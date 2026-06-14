const KEY = 'vende_rag_user';

export const userStorage = {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(KEY);
  },
  set(user: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(KEY, user);
  },
  clear(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(KEY);
  },
};
