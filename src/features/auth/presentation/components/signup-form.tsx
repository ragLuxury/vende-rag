'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Icon } from '@iconify/react';

import { HttpError } from '@/src/shared/domain/errors';
import { buttonStyles } from '@/src/shared/ui/button';
import { Divider } from '@/src/shared/ui/divider';
import { PasswordField } from '@/src/shared/ui/password-field';
import { TextField } from '@/src/shared/ui/text-field';
import { useSignup } from '@/src/features/auth/presentation/hooks/use-signup';
import { SocialAuthButtons } from './social-auth-buttons';

const MIN_PASSWORD_LENGTH = 5;

export function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const signup = useSignup();

  const passwordLongEnough = password.length >= MIN_PASSWORD_LENGTH;
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const canSubmit =
    firstName.length > 0 &&
    lastName.length > 0 &&
    phone.length === 10 &&
    email.length > 0 &&
    passwordLongEnough &&
    passwordsMatch &&
    acceptedPrivacy;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signup.mutate({ firstName, lastName, phone, email, password });
  }

  const errorMessage = signup.isError ? resolveErrorMessage(signup.error) : null;

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-12">
      <Link href="/welcome" aria-label="Regresar" className="text-neutral-900">
        <Icon icon="ion:chevron-back-outline" className="size-7" />
      </Link>

      <header className="mt-8 mb-8 text-center">
        <h1 className="font-editors text-4xl text-neutral-900">Crear cuenta</h1>
        <p className="mt-3 text-neutral-500">Regístrate para poder empezar a vender en RAG</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TextField
          label="Nombre (s)"
          autoComplete="given-name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          label="Apellidos"
          autoComplete="family-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          label="Teléfono a 10 dígitos"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel-national"
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordField
          label="Contraseña"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <PasswordField
          label="Confirmar Contraseña"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <ul className="flex flex-col gap-3 text-sm text-neutral-600">
          <li className="flex items-center gap-2">
            <StatusIcon valid={passwordLongEnough} />
            Mínimo {MIN_PASSWORD_LENGTH} caracteres
          </li>
          <li>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(event) => setAcceptedPrivacy(event.target.checked)}
                className="accent-brand size-5 shrink-0 rounded-full"
              />
              <span>
                Acepto las{' '}
                <Link href="/privacidad" className="underline">
                  políticas de privacidad
                </Link>
              </span>
            </label>
          </li>
        </ul>

        {errorMessage && (
          <p role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit || signup.isPending}
          className={`${buttonStyles('primary')} mt-2 disabled:opacity-50`}
        >
          {signup.isPending ? 'Creando...' : 'Crear Cuenta'}
        </button>
      </form>

      <div className="mt-8">
        <Divider label="O regístrate con" />
      </div>

      <div className="mt-8">
        <SocialAuthButtons />
      </div>

      <Link href="/login" className={`${buttonStyles('secondary')} mt-6`}>
        Iniciar Sesión
      </Link>
    </main>
  );
}

function resolveErrorMessage(error: unknown): string {
  if (error instanceof HttpError && isMessageBody(error.body)) {
    return error.body.message;
  }
  return 'Ocurrió un error. Intenta de nuevo.';
}

function isMessageBody(body: unknown): body is { message: string } {
  return (
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    typeof (body as { message: unknown }).message === 'string'
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
