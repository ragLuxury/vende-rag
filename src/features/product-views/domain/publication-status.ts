/**
 * Internal stages a publication moves through between "Recibido" (status 10)
 * and "Activo" (status 11).
 *
 * The numeric status only tells those two apart, so the whole middle of the
 * journey lives in `status_intern`. The match values are the literal strings
 * stored in the database — verified against products with status 10 to 12 — and
 * must not be guessed: a misspelled value matches nothing and the publication
 * silently falls back to the first stage.
 *
 * "Ingresado" and "Completado" share a stage: to a seller both mean the product
 * is approved.
 */
export interface PublicationStage {
  readonly matchValues: readonly string[];
  readonly label: string;
}

const FIRST_STAGE: PublicationStage = {
  matchValues: ['preaprobado', 'preaprobada'],
  label: 'Preaprobado',
};

export const PUBLICATION_STAGES: readonly PublicationStage[] = [
  FIRST_STAGE,
  { matchValues: ['autentificado'], label: 'Autentificado' },
  { matchValues: ['bolería', 'boleria'], label: 'Bolería' },
  { matchValues: ['bolería p/c', 'boleria p/c'], label: 'Bolería P/C' },
  { matchValues: ['ingresado', 'completado'], label: 'Aprobado' },
];

/** Last stage: from here the publication is ready to go on sale. */
const APPROVED_STAGE = PUBLICATION_STAGES[PUBLICATION_STAGES.length - 1];

function normalize(statusIntern: string): string {
  return statusIntern.trim().toLowerCase();
}

export function findPublicationStage(statusIntern: string): PublicationStage | undefined {
  const normalized = normalize(statusIntern);
  return PUBLICATION_STAGES.find((stage) => stage.matchValues.includes(normalized));
}

export interface PublicationTimelineStep {
  readonly matchValue: string;
  readonly displayLabel: string;
}

/**
 * Steps shown to the seller in the detail timeline. Deliberately a curated
 * subset of PUBLICATION_STAGES: the seller only follows these four milestones,
 * even though the product moves through more internal stages. Display labels
 * differ from a couple of raw match values ("Autentificación" vs
 * "Autentificado", "Aprobado" vs "Ingresado") to read correctly to sellers.
 */
export const PUBLICATION_TIMELINE_STEPS: readonly PublicationTimelineStep[] = [
  { matchValue: 'preaprobado', displayLabel: 'Preaprobado' },
  { matchValue: 'autentificado', displayLabel: 'Autentificación' },
  { matchValue: 'bolería', displayLabel: 'Bolería' },
  { matchValue: 'ingresado', displayLabel: 'Aprobado' },
];

/**
 * Raw values that belong to a step but are not its match value. Without this a
 * product stored as "Completado" — the most common state of all — matched
 * nothing and the timeline fell back to the first step, showing an approved
 * publication as if it had just been preapproved.
 */
const TIMELINE_STEP_ALIASES: Record<string, string> = {
  preaprobada: 'preaprobado',
  boleria: 'bolería',
  'bolería p/c': 'bolería',
  'boleria p/c': 'bolería',
  completado: 'ingresado',
};

export function resolvePublicationStepIndex(statusIntern: string): number {
  const normalized = normalize(statusIntern);
  const stepValue = TIMELINE_STEP_ALIASES[normalized] ?? normalized;
  const index = PUBLICATION_TIMELINE_STEPS.findIndex((step) => step.matchValue === stepValue);
  return index === -1 ? 0 : index;
}

/** True once the product has reached "ingresado" or the later "completado" step. */
export function isPublicationApproved(statusIntern: string): boolean {
  return APPROVED_STAGE?.matchValues.includes(normalize(statusIntern)) ?? false;
}

/**
 * Pill text for a card while the publication is still in "Recibido". Shows the
 * real stage (Autentificado, Bolería, …) instead of collapsing everything into
 * Preaprobado/Aprobado, which hid the progress from the seller.
 */
export function resolvePublicationPillLabel(statusIntern: string): string {
  return findPublicationStage(statusIntern)?.label ?? FIRST_STAGE.label;
}

/** "Información" is only fully generated once the internal status reaches "completado". */
export function isPublicationInfoGenerated(statusIntern: string): boolean {
  return normalize(statusIntern) === 'completado';
}
