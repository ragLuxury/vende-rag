'use client';

import { useState } from 'react';

import { LockIcon, WarningIcon } from '@/src/shared/ui/icons';
import { Modal } from '@/src/shared/ui/modal';
import { useDeleteAccount } from '@/src/features/account/presentation/hooks/use-delete-account';

const SECURITY_WORD = 'ELIMINAR';

interface DeleteAccountDialogProps {
  open: boolean;
  clientId: number;
  onCancel: () => void;
  onDeleted: () => void;
}

export function DeleteAccountDialog({
  open,
  clientId,
  onCancel,
  onDeleted,
}: DeleteAccountDialogProps) {
  const [word, setWord] = useState('');
  const deleteAccount = useDeleteAccount();

  const confirmed = word.trim().toUpperCase() === SECURITY_WORD;

  function handleCancel() {
    setWord('');
    deleteAccount.reset();
    onCancel();
  }

  function handleConfirm() {
    if (!confirmed || deleteAccount.isPending) return;
    deleteAccount.mutate(clientId, { onSuccess: onDeleted });
  }

  return (
    <Modal open={open} label="Eliminar cuenta" onClose={handleCancel}>
      <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
        <WarningIcon className="size-6" />
      </span>

      <h2 className="text-2xl font-semibold text-neutral-900">Eliminar cuenta</h2>
      <p className="mt-2 text-neutral-500">
        Esta acción es{' '}
        <strong className="font-semibold text-neutral-900">
          permanente y no se puede deshacer
        </strong>
        . Tu historial, productos y datos serán eliminados.
      </p>

      <hr className="my-5 border-neutral-200" />

      <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        <LockIcon className="size-5 shrink-0" />
        <p>Confirma escribiendo la palabra de seguridad. Esta acción no puede revertirse.</p>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-neutral-900">
          Palabra de seguridad <span className="text-red-600">*</span>
        </span>
        <input
          type="text"
          autoComplete="off"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          placeholder='Escribe "ELIMINAR"'
          className="focus-visible:ring-brand mt-2 h-12 w-full rounded-xl border border-neutral-300 px-4 text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:outline-none"
        />
      </label>

      {deleteAccount.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          No se pudo eliminar la cuenta. Intenta de nuevo.
        </p>
      )}

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="h-12 flex-1 rounded-xl bg-neutral-100 font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!confirmed || deleteAccount.isPending}
          className="h-12 flex-1 rounded-xl bg-red-600 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {deleteAccount.isPending ? 'Eliminando...' : 'Eliminar cuenta'}
        </button>
      </div>
    </Modal>
  );
}
