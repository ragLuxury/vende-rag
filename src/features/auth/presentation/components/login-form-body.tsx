'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { UnauthorizedError } from '@/src/shared/domain/errors';
import { buttonStyles } from '@/src/shared/ui/button';
import { Divider } from '@/src/shared/ui/divider';
import { PasswordField } from '@/src/shared/ui/password-field';
import { TextField } from '@/src/shared/ui/text-field';
import { useLogin } from '@/src/features/auth/presentation/hooks/use-login';
import { SocialAuthButtons } from './social-auth-buttons';

function resolveErrorMessage(error: unknown): string {
  if (error instanceof UnauthorizedError) {
    return 'Credenciales inválidas';
  }
  return 'Ocurrió un error. Intenta de nuevo.';
}

export function LoginFormBody() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login.mutate({ email, password });
  }

  const errorMessage = login.isError ? resolveErrorMessage(login.error) : null;

  return (
    <>
      <header className="mb-10 text-center">
        <h1 className="font-editors text-4xl text-neutral-900">Iniciar Sesión</h1>
        <p className="mt-3 text-neutral-500">Ingresa tu correo electrónico para acceder a la App</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          label="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errorMessage && (
          <p role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={login.isPending}
          className={`${buttonStyles('primary')} mt-2 disabled:opacity-50`}
        >
          {login.isPending ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <Link
        href="/forgot-password"
        className="text-brand mt-6 block text-center text-sm font-medium"
      >
        Olvidé mi contraseña
      </Link>

      <div className="mt-8">
        <SocialAuthButtons />
      </div>

      <div className="mt-8">
        <Divider label="O también" />
      </div>

      <Link href="/signup" className={`${buttonStyles('secondary')} mt-6`}>
        Crear cuenta
      </Link>
    </>
  );
}
