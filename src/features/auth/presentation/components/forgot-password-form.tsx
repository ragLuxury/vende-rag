'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Icon } from '@iconify/react';

import { buttonStyles } from '@/src/shared/ui/button';
import { TextField } from '@/src/shared/ui/text-field';
import { useToast } from '@/src/shared/ui/toast';
import { useForgotPassword } from '@/src/features/auth/presentation/hooks/use-forgot-password';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const { showToast } = useToast();
  const forgotPassword = useForgotPassword();

  const isValid = email.trim() !== '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    forgotPassword.mutate(email.trim(), {
      onSuccess: () => {
        setEmail('');
        showToast('Si el correo está registrado, recibirás un enlace de recuperación pronto.');
        router.push('/welcome');
      },
    });
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-8">
      <Link href="/login" aria-label="Regresar" className="text-neutral-900">
        <Icon icon="ion:chevron-back-outline" className="size-7" />
      </Link>

      <header className="mt-24 mb-10 text-center">
        <h1 className="font-editors text-4xl text-neutral-900">Recuperar Contraseña</h1>
        <p className="mt-3 text-neutral-500">
          Ingresa el correo electrónico asociado a tu cuenta y te enviaremos las instrucciones para
          restablecer tu contraseña.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {forgotPassword.isError ? (
          <p role="alert" className="text-sm text-red-600">
            Ocurrió un error. Intenta de nuevo.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!isValid || forgotPassword.isPending}
          className={`${buttonStyles('primary')} disabled:opacity-50`}
        >
          {forgotPassword.isPending ? 'Enviando...' : 'Enviar instrucciones'}
        </button>
      </form>
    </main>
  );
}
