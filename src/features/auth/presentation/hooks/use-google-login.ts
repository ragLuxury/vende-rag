'use client';

import { useGoogleLogin as useGoogleOAuthLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthRepository } from '@/src/features/auth/application/auth-repository-context';
import { loginWithGoogleUseCase } from '@/src/features/auth/application/login-with-google.usecase';
import type { GoogleLoginData } from '@/src/features/auth/domain/auth-repository';

interface GoogleUserInfo {
  sub: string;
  email: string;
  given_name?: string;
  family_name?: string;
}

export function useGoogleLogin() {
  const repository = useAuthRepository();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: GoogleLoginData) => loginWithGoogleUseCase(repository, data),
    onSuccess: () => router.replace('/'),
  });
}

export function useGoogleLoginTrigger() {
  const googleLogin = useGoogleLogin();

  const trigger = useGoogleOAuthLogin({
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

  return { trigger, isPending: googleLogin.isPending };
}
