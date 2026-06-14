'use client';

import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  label: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, label, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-8">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
      >
        {children}
      </div>
    </div>
  );
}
