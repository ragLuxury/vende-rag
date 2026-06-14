'use client';

import { useEffect, type ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  icon?: ReactNode;
}

export function ConfirmDialog({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  icon,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-8">
      <button
        type="button"
        aria-label={cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
      >
        {icon ? (
          <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
            {icon}
          </span>
        ) : null}

        <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
        <p className="mt-2 text-neutral-500">{description}</p>

        <hr className="my-5 border-neutral-200" />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="h-12 flex-1 rounded-xl bg-neutral-100 font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-brand hover:bg-brand/90 h-12 flex-1 rounded-xl font-semibold text-white transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
