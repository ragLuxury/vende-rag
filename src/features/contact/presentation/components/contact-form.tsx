'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';

const FIELD_CLASS =
  'w-[80%] rounded-[10px] border border-neutral-300 bg-transparent px-4 py-2.5 text-center text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 px-5">
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
        ref={messageRef}
        value={message}
        onChange={handleMessageChange}
        aria-label="Mensaje"
        placeholder="Mensaje"
        rows={1}
        className={`${FIELD_CLASS} resize-none overflow-hidden`}
      />
      <button
        type="submit"
        className="bg-brand mt-2 w-[80%] rounded-[10px] py-2.5 text-sm font-medium tracking-[0.2em] text-white uppercase"
      >
        Enviar Mensaje
      </button>
    </form>
  );
}
