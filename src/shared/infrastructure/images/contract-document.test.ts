import { describe, expect, it, vi } from 'vitest';

vi.mock('@/src/shared/infrastructure/env/env', () => ({
  env: { NEXT_PUBLIC_CONTRACT_BASE_URL: 'https://admin.rag.mx/uploads/clientes' },
}));

const { getContractUrl } = await import('./contract-document');

describe('getContractUrl', () => {
  it('deja pasar las URLs absolutas tal cual (R2 y legacy)', () => {
    const r2 = 'https://images.rag.mx/contracts/123/abc.pdf';
    expect(getContractUrl(r2)).toBe(r2);
    expect(getContractUrl('  ' + r2 + ' ')).toBe(r2);
  });

  it('concatena la base cuando solo llega el nombre del archivo', () => {
    expect(getContractUrl('contrato-123.pdf')).toBe(
      'https://admin.rag.mx/uploads/clientes/contrato-123.pdf',
    );
  });

  it('no genera slashes duplicados cuando el nombre viene con / inicial', () => {
    expect(getContractUrl('/contrato-123.pdf')).toBe(
      'https://admin.rag.mx/uploads/clientes/contrato-123.pdf',
    );
    expect(getContractUrl('///contrato-123.pdf')).toBe(
      'https://admin.rag.mx/uploads/clientes/contrato-123.pdf',
    );
  });

  it('devuelve cadena vacía si el valor viene vacío o solo con espacios', () => {
    expect(getContractUrl('')).toBe('');
    expect(getContractUrl('   ')).toBe('');
  });
});
