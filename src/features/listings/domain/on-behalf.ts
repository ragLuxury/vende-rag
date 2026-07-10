export const ON_BEHALF_EMAILS: readonly string[] = ['sellgdl@rag.mx', 'sell@rag.mx', 'info@rag.mx'];

export function canListOnBehalf(email: string | null): boolean {
  return email !== null && ON_BEHALF_EMAILS.includes(email.toLowerCase());
}
