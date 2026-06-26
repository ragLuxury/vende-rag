'use client';

import type { ReactNode } from 'react';

import { Modal } from './modal';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  icon?: ReactNode;
  destructive?: boolean;
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
  destructive = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} label={title} onClose={onCancel}>
      {icon ? (
        <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
          {icon}
        </span>
      ) : null}

      <h2 className="font-editors text-2xl text-neutral-900">{title}</h2>
      <p className="mt-2 text-neutral-500">{description}</p>

      <div className="mt-6 flex items-center justify-end gap-6">
        <button
          type="button"
          onClick={onCancel}
          className="font-medium text-neutral-500 transition-colors hover:text-neutral-700"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`font-semibold transition-colors ${
            destructive ? 'text-red-600 hover:text-red-700' : 'text-brand hover:text-brand/80'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
