export interface PublicationTimelineStep {
  readonly matchValue: string;
  readonly displayLabel: string;
}

/**
 * Authoritative internal step sequence for the `publicaciones` view, mirroring
 * the reference admin panel's `status_intern` constants. Display labels
 * intentionally differ from a couple of raw match values ("Autentificación"
 * vs "Autentificado", "Aprobado" vs "Ingresado") to read correctly to sellers.
 */
export const PUBLICATION_TIMELINE_STEPS: readonly PublicationTimelineStep[] = [
  { matchValue: 'preaprobada', displayLabel: 'Preaprobada' },
  { matchValue: 'bolería p/c', displayLabel: 'Bolería P/C' },
  { matchValue: 'bolería', displayLabel: 'Bolería' },
  { matchValue: 'autentificado', displayLabel: 'Autentificación' },
  { matchValue: 'ingresado', displayLabel: 'Aprobado' },
];

export function resolvePublicationStepIndex(statusIntern: string): number {
  const normalized = statusIntern.trim().toLowerCase();
  const index = PUBLICATION_TIMELINE_STEPS.findIndex((step) => step.matchValue === normalized);
  return index === -1 ? 0 : index;
}

const APPROVED_INTERNAL_STATUSES = new Set(['ingresado', 'completado']);

/** True once the product has reached "ingresado" or the later "completado" step. */
export function isPublicationApproved(statusIntern: string): boolean {
  return APPROVED_INTERNAL_STATUSES.has(statusIntern.trim().toLowerCase());
}

export function resolvePublicationPillLabel(statusIntern: string): string {
  return isPublicationApproved(statusIntern) ? 'Aprobado' : 'Preaprobada';
}

/** "Información" is only fully generated once the internal status reaches "completado". */
export function isPublicationInfoGenerated(statusIntern: string): boolean {
  return statusIntern.trim().toLowerCase() === 'completado';
}
