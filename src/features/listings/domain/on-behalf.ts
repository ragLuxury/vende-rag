/**
 * Accounts allowed to list a product on someone else's behalf.
 *
 * These are the API's advisor accounts, and the list must not drift from
 * `advisorAssignment.config.js` in api_rga: an account that only this side
 * recognises passes the form and then creates a product with no advisor, no
 * inventory and no zone, without raising an error anywhere.
 */
export const ON_BEHALF_EMAILS: readonly string[] = ['sell@rag.mx', 'sellgdl@rag.mx'];

export function canListOnBehalf(email: string | null): boolean {
  return email !== null && ON_BEHALF_EMAILS.includes(email.toLowerCase());
}
