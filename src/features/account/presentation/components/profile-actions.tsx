import { Icon } from '@iconify/react';

interface ProfileActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProfileActions({ onEdit, onDelete }: ProfileActionsProps) {
  return (
    <div className="mt-5 flex gap-3">
      <button
        type="button"
        onClick={onEdit}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-neutral-300 text-base font-medium text-neutral-700"
      >
        <Icon icon="ion:pencil-outline" className="size-5" />
        Editar
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 text-base font-medium text-red-600"
      >
        <Icon icon="ion:trash-outline" className="size-5" />
        Eliminar
      </button>
    </div>
  );
}
