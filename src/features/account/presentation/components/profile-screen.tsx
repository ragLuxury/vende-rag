'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { ConfirmDialog } from '@/src/shared/ui/confirm-dialog';
import {
  CardIcon,
  DocumentIcon,
  GridIcon,
  LogoutIcon,
  SendIcon,
  TrashIcon,
  UserIcon,
} from '@/src/shared/ui/icons';
import { DeleteAccountDialog } from './delete-account-dialog';
import { ProfileRow } from './profile-row';

interface ProfileScreenProps {
  name: string;
  clientId: number;
  onLogout: () => void;
  onDeleted: () => void;
}

export function ProfileScreen({ name, clientId, onLogout, onDeleted }: ProfileScreenProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <div className="flex-1 px-6 pt-6 pb-28">
        <p className="text-center text-lg text-neutral-400">Perfil</p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <span className="flex size-28 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <UserIcon className="size-12" />
          </span>
          <h1 className="font-editors text-4xl text-neutral-900">{name}</h1>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <ProfileRow
            icon={<UserIcon className="size-6" />}
            label="Información Personal"
            expandable
          />
          <ProfileRow icon={<SendIcon className="size-6" />} label="Mi Dirección" expandable />
          <ProfileRow icon={<CardIcon className="size-6" />} label="Métodos De Pago" expandable />
          <ProfileRow icon={<DocumentIcon className="size-6" />} label="Contrato" expandable />
          <ProfileRow icon={<GridIcon className="size-6" />} label="Dashboard" />
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="flex items-center gap-3 text-neutral-500"
          >
            <LogoutIcon className="size-6" />
            <span className="text-lg font-medium">Cerrar Sesión</span>
          </button>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="flex items-center gap-3 text-red-600"
          >
            <TrashIcon className="size-6" />
            <span className="text-lg font-medium">Eliminar Cuenta</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500">
          ¿Tienes dudas? Consulta nuestras{' '}
          <Link href="/preguntas-frecuentes" className="text-brand underline">
            preguntas frecuentes
          </Link>{' '}
          o{' '}
          <Link href="/contacto" className="text-brand underline">
            contáctanos
          </Link>
        </p>
      </div>

      <ConfirmDialog
        open={logoutOpen}
        icon={<LogoutIcon className="size-6" />}
        title="Cerrar sesión"
        description="¿Estás seguro de que deseas salir de tu cuenta?"
        cancelLabel="Cancelar"
        confirmLabel="Salir"
        onCancel={() => setLogoutOpen(false)}
        onConfirm={onLogout}
      />

      <DeleteAccountDialog
        open={deleteOpen}
        clientId={clientId}
        onCancel={() => setDeleteOpen(false)}
        onDeleted={onDeleted}
      />

      <BottomNav />
    </div>
  );
}
