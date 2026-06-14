'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import { buttonStyles } from '@/src/shared/ui/button';
import { Divider } from '@/src/shared/ui/divider';
import { PasswordField } from '@/src/shared/ui/password-field';
import { TextField } from '@/src/shared/ui/text-field';
import { SocialAuthButtons } from './social-auth-buttons';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-8">
      <Link href="/" aria-label="Regresar" className="text-neutral-900">
        <ChevronLeftIcon />
      </Link>

      <header className="mt-12 mb-10 text-center">
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
        <button type="submit" className={`${buttonStyles('primary')} mt-2`}>
          Iniciar Sesión
        </button>
      </form>

      <Link
        href="/forgot-password"
        className="text-brand mt-6 text-center text-sm font-medium underline"
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
    </main>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
