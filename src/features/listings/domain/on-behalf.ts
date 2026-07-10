export const ON_BEHALF_USER_IDS: readonly number[] = [0, 25000, 29819];

export function canListOnBehalf(userId: number | null): boolean {
  return userId !== null && ON_BEHALF_USER_IDS.includes(userId);
}
