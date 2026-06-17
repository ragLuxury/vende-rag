export function pickEs(raw: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return raw;
  }

  if (typeof parsed === 'object' && parsed !== null && 'es' in parsed) {
    const value = parsed.es;
    return typeof value === 'string' ? value : raw;
  }

  return raw;
}
