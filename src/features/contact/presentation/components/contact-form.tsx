'use client';

import { useState, type FormEvent } from 'react';

import { buttonStyles } from '@/src/shared/ui/button';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        aria-label="Nombre completo"
        placeholder="Nombre Completo"
        autoComplete="name"
        className={FIELD_CLASS}
      />
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        aria-label="Correo"
        placeholder="Correo"
        autoComplete="email"
        className={FIELD_CLASS}
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        aria-label="Mensaje"
        placeholder="Mensaje"
        rows={4}
        className={`${FIELD_CLASS} resize-none`}
      />
      <button
        type="submit"
        className={`${buttonStyles('primary')} mt-2 tracking-[0.2em] uppercase`}
      >
        Enviar Mensaje
      </button>
    </form>
  );
}
