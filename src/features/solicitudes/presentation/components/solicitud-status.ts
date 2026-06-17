const STATUS_STYLES: Record<string, string> = {
  aprobada: 'bg-green-100 text-green-700',
  'en revisión': 'bg-amber-100 text-amber-700',
  negociación: 'bg-blue-100 text-blue-700',
  rechazada: 'bg-red-400 text-white',
};

function normalize(status: string): string {
  return status.trim().toLowerCase();
}

export function getStatusStyle(status: string): string {
  return STATUS_STYLES[normalize(status)] ?? 'bg-neutral-100 text-neutral-600';
}

export function matchesStatus(status: string, target: string): boolean {
  return normalize(status) === normalize(target);
}
