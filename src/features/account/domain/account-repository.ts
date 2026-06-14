export interface AccountRepository {
  deleteAccount(clientId: number): Promise<void>;
}
