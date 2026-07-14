'use client';

import { Icon } from '@iconify/react';
import { LoginFormBody } from './login-form-body';

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Iniciar sesión"
        className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-8 shadow-xl"
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <Icon icon="ion:close-outline" className="size-6" />
        </button>

        <div className="mt-6">
          <LoginFormBody />
        </div>
      </div>
    </div>
  );
}
