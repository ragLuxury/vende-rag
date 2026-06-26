'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Icon } from '@iconify/react';

import { buttonStyles } from '@/src/shared/ui/button';
import { PasswordField } from '@/src/shared/ui/password-field';
import { useToast } from '@/src/shared/ui/toast';
import { useResetPassword } from '@/src/features/auth/presentation/hooks/use-reset-password';
import { useValidateResetToken } from '@/src/features/auth/presentation/hooks/use-validate-reset-token';

const MIN_PASSWORD_LENGTH = 5;

export function ResetPasswordForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const emailToken = useSearchParams().get('token');
  const validation = useValidateResetToken(emailToken);
  const resetPassword = useResetPassword();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetToken = validation.data;
  const passwordLongEnough = password.length >= MIN_PASSWORD_LENGTH;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit = passwordLongEnough && passwordsMatch && resetToken !== undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || resetToken === undefined) return;

    resetPassword.mutate(
      { token: resetToken, newPassword: password },
      {
        onSuccess: () => {
          showToast('Tu contraseña fue restablecida correctamente. Inicia sesión.');
          router.push('/login');
        },
      },
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-8">
      <Link href="/login" aria-label="Regresar" className="text-neutral-900">
        <Icon icon="ion:chevron-back-outline" className="size-7" />
      </Link>

      <header className="mt-24 mb-10 text-center">
        <h1 className="font-editors text-4xl text-neutral-900">Restablecer Contraseña</h1>
        <p className="mt-3 text-neutral-500">Ingresa y confirma tu nueva contraseña.</p>
      </header>

      {validation.isLoading ? (
        <p className="text-center text-neutral-500">Validando enlace…</p>
      ) : validation.isError || emailToken === null ? (
        <div className="text-center">
          <p className="text-neutral-700">
            Este enlace no es válido o ha expirado. Solicita uno nuevo.
          </p>
          <Link
            href="/forgot-password"
            className="text-brand mt-6 inline-block text-sm font-medium underline"
          >
            Recuperar contraseña
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <PasswordField
            label="Nueva contraseña"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <PasswordField
            label="Confirmar contraseña"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <ul className="flex flex-col gap-3 text-sm text-neutral-600">
            <li className="flex items-center gap-2">
              <StatusIcon valid={passwordLongEnough} />
              Mínimo {MIN_PASSWORD_LENGTH} caracteres
            </li>
            <li className="flex items-center gap-2">
              <StatusIcon valid={passwordsMatch} />
              Las contraseñas coinciden
            </li>
          </ul>

          {resetPassword.isError ? (
            <p role="alert" className="text-sm text-red-600">
              No pudimos restablecer tu contraseña. El enlace pudo haber expirado.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit || resetPassword.isPending}
            className={`${buttonStyles('primary')} mt-2 disabled:opacity-50`}
          >
            {resetPassword.isPending ? 'Restableciendo...' : 'Restablecer contraseña'}
          </button>
        </form>
      )}
    </main>
  );
}

function StatusIcon({ valid }: { valid: boolean }) {
  return (
    <Icon
      icon={valid ? 'ion:checkmark-circle' : 'ion:close-circle'}
      aria-hidden="true"
      className={`size-5 shrink-0 ${valid ? 'text-brand' : 'text-neutral-400'}`}
    />
  );
}
