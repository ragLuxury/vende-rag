export interface Designer {
  id: number;
  name: string;
  code: string;
}

export interface DesignerRepository {
  getDesigners(signal?: AbortSignal): Promise<readonly Designer[]>;
}
