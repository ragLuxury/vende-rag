'use client';

import { useGoogleLogin as useGoogleOAuthLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@/src/features/auth/presentation/hooks/use-google-login';
import { GoogleIcon } from './social-icons';

const CIRCLE =
  'flex size-14 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 disabled:opacity-50';

interface GoogleUserInfo {
  sub: string;
  email: string;
  given_name?: string;
  family_name?: string;
}

export function SocialAuthButtons() {
  const googleLogin = useGoogleLogin();

  const triggerGoogle = useGoogleOAuthLogin({
    flow: 'implicit',
    scope: 'openid email profile',
    onSuccess: async ({ access_token: accessToken }) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) return;
      const info = (await res.json()) as GoogleUserInfo;
      googleLogin.mutate({
        socialId: info.sub,
        email: info.email,
        firstName: info.given_name ?? '',
        lastName: info.family_name ?? '',
      });
    },
  });

  return (
    <div className="flex justify-center gap-4">
      <button
        type="button"
        aria-label="Continuar con Google"
        className={CIRCLE}
        disabled={googleLogin.isPending}
        onClick={() => triggerGoogle()}
      >
        <GoogleIcon />
      </button>
    </div>
  );
}
