'use client';

import { useGoogleLoginTrigger } from '@/src/features/auth/presentation/hooks/use-google-login';
import { GoogleIcon } from './social-icons';

const CIRCLE =
  'flex size-14 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:opacity-50';

export function SocialAuthButtons() {
  const { trigger, isPending } = useGoogleLoginTrigger();

  return (
    <div className="flex justify-center gap-4">
      <button
        type="button"
        aria-label="Continuar con Google"
        className={CIRCLE}
        disabled={isPending}
        onClick={() => trigger()}
      >
        <GoogleIcon />
      </button>
    </div>
  );
}
