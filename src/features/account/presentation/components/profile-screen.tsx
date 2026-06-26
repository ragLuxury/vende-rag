'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { ConfirmDialog } from '@/src/shared/ui/confirm-dialog';
import { consumeQueuedToast, useToast } from '@/src/shared/ui/toast';
import { useProfile } from '../hooks/use-profile';
import { AddressSection } from './address-section';
import { ContractSection } from './contract-section';
import { DeleteAccountDialog } from './delete-account-dialog';
import { PaymentMethodSection } from './payment-method-section';
import { PersonalInfoSection } from './personal-info-section';
import { ProfileRow } from './profile-row';

interface ProfileScreenProps {
  name: string;
  clientId: number;
  onLogout: () => void;
  onDeleted: () => void;
}

export function ProfileScreen({ name, clientId, onLogout, onDeleted }: ProfileScreenProps) {
  const { showToast } = useToast();
  const { data: profile } = useProfile(clientId);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) =>
    setOpenSection((current) => (current === section ? null : section));

  useEffect(() => {
    const message = consumeQueuedToast();
    if (message) showToast(message);
  }, [showToast]);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <div className="flex-1 px-6 pt-6 pb-28">
        <p className="text-center text-lg text-neutral-400">Perfil</p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <span className="flex size-28 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <Icon icon="ion:person-outline" className="size-12" />
          </span>
          <h1 className="font-editors text-4xl text-neutral-900">
            {profile ? `${profile.firstName} ${profile.lastName}` : name}
          </h1>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <PersonalInfoSection
            clientId={clientId}
            open={openSection === 'personal'}
            onToggle={() => toggleSection('personal')}
          />
          <AddressSection
            clientId={clientId}
            open={openSection === 'address'}
            onToggle={() => toggleSection('address')}
          />
          <PaymentMethodSection
            clientId={clientId}
            open={openSection === 'payment'}
            onToggle={() => toggleSection('payment')}
          />
          <ContractSection
            clientId={clientId}
            open={openSection === 'contract'}
            onToggle={() => toggleSection('contract')}
          />
          <ProfileRow
            icon={<Icon icon="ion:grid-outline" className="size-6" />}
            label="Dashboard"
          />
        </div>

        <div className="mt-14 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="flex items-center gap-3 text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <Icon icon="ion:log-out-outline" className="size-6" />
            <span className="text-lg font-medium">Cerrar Sesión</span>
          </button>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="flex items-center gap-2 text-neutral-400 transition-colors hover:text-red-600"
          >
            <Icon icon="ion:trash-outline" className="size-5" />
            <span className="text-base">Eliminar Cuenta</span>
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
        icon={<Icon icon="ion:log-out-outline" className="size-6" />}
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
