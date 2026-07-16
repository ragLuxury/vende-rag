import type {
  Designer,
  DesignerRepository,
} from '@/src/features/designers/domain/designer-repository';

export async function getDesignersUseCase(
  repository: DesignerRepository,
  signal?: AbortSignal,
): Promise<readonly Designer[]> {
  return repository.getDesigners(signal);
}
