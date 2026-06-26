'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

import { useProfile } from '../hooks/use-profile';
import { ProfileAccordion } from './profile-accordion';

interface PersonalInfoSectionProps {
  clientId: number;
}

export function PersonalInfoSection({ clientId }: PersonalInfoSectionProps) {
  const { data: profile, isLoading, isError } = useProfile(clientId);

  return (
    <ProfileAccordion
      icon={<Icon icon="ion:person-outline" className="size-6" />}
      label="Información Personal"
    >
      {isLoading ? (
        <p className="text-base text-neutral-400">Cargando...</p>
      ) : isError || !profile ? (
        <p className="text-base text-red-600">No pudimos cargar tu información.</p>
      ) : (
        <>
          <dl className="flex flex-col gap-5">
            <ProfileField label="Nombre" value={profile.firstName} />
            <ProfileField label="Apellido" value={profile.lastName} />
            <ProfileField label="Correo" value={profile.email} />
            <ProfileField label="Teléfono" value={profile.phone} />
          </dl>

          <Link
            href="/perfil/editar"
            className="bg-brand/30 mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-base font-medium text-neutral-700"
          >
            Editar
            <Icon icon="ion:pencil-outline" className="size-5" />
          </Link>
        </>
      )}
    </ProfileAccordion>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="border-b border-neutral-200 pb-2">
      <dt className="text-base font-semibold text-neutral-900">{label}</dt>
      <dd className="mt-1 text-base text-neutral-400">{value}</dd>
    </div>
  );
}
