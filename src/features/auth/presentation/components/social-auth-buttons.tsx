import { AppleIcon, GoogleIcon } from './social-icons';

const CIRCLE =
  'flex size-14 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200';

export function SocialAuthButtons() {
  return (
    <div className="flex justify-center gap-4">
      <button type="button" aria-label="Continuar con Google" className={CIRCLE}>
        <GoogleIcon />
      </button>
      <button type="button" aria-label="Continuar con Apple" className={CIRCLE}>
        <AppleIcon />
      </button>
    </div>
  );
}
