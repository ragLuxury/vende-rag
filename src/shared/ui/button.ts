export type ButtonVariant = 'primary' | 'secondary';

const BASE =
  'flex h-14 w-full items-center justify-center gap-3 rounded-xl px-6 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand/90',
  secondary: 'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50',
};

export function buttonStyles(variant: ButtonVariant = 'primary'): string {
  return `${BASE} ${VARIANT[variant]}`;
}
