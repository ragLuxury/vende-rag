export interface Commission {
  type: string;
  rate: number;
  sellerNet: number;
}

export interface CommissionQuery {
  price: number;
  userId: number;
}

export interface CommissionRepository {
  getCommission(query: CommissionQuery, signal?: AbortSignal): Promise<Commission>;
}
