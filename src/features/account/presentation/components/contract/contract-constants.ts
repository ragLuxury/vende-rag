/** Century Gothic font-family CSS value, matching the signed PDF's typography. */
export const CONTRACT_FONT_STYLE = {
  fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
} as const;

/** Formats today's date in Spanish long form, e.g. "7 de agosto de 2026". */
export function getFormattedDate(): string {
  return new Date().toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
