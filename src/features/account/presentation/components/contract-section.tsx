'use client';

import { Icon } from '@iconify/react';

import { useProfile } from '../hooks/use-profile';
import { ProfileAccordion } from './profile-accordion';

interface ContractSectionProps {
  clientId: number;
  open: boolean;
  onToggle: () => void;
}

export function ContractSection({ clientId, open, onToggle }: ContractSectionProps) {
  const { data: profile, isLoading, isError } = useProfile(clientId);

  return (
    <ProfileAccordion
      icon={<Icon icon="ion:document-text-outline" className="size-6" />}
      label="Contrato"
      open={open}
      onToggle={onToggle}
    >
      <p className="text-base text-neutral-500">
        Consulta los términos y condiciones firmados para la venta de tus productos.
      </p>

      {isLoading ? (
        <p className="mt-5 text-base text-neutral-400">Cargando...</p>
      ) : isError ? (
        <p className="mt-5 text-base text-red-600">No pudimos cargar tu contrato.</p>
      ) : !profile?.contract ? (
        <p className="mt-5 text-base text-neutral-400">Aún no tienes un contrato firmado.</p>
      ) : (
        <a
          href={profile.contract}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-neutral-300 text-base font-medium text-neutral-700"
        >
          <Icon icon="ion:document-outline" className="size-5" />
          Ver Contrato
        </a>
      )}
    </ProfileAccordion>
  );
}
