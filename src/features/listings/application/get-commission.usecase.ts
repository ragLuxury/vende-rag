import type {
  Commission,
  CommissionQuery,
  CommissionRepository,
} from '@/src/features/listings/domain/commission-repository';

export async function getCommissionUseCase(
  repository: CommissionRepository,
  query: CommissionQuery,
  signal?: AbortSignal,
): Promise<Commission> {
  return repository.getCommission(query, signal);
}
