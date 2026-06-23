'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import { useProfile } from '../hooks/use-profile';

interface PersonalInfoSectionProps {
  clientId: number;
}

export function PersonalInfoSection({ clientId }: PersonalInfoSectionProps) {
  const [open, setOpen] = useState(false);
  const { data: profile, isLoading, isError } = useProfile(clientId);

  return (
    <div className="w-full rounded-2xl border border-neutral-200 px-5 py-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-4"
      >
        <span className="shrink-0 text-neutral-900">
          <Icon icon="ion:person-outline" className="size-6" />
        </span>
        <span className="font-editors flex-1 text-left text-xl text-neutral-900">
          Información Personal
        </span>
        <Icon
          icon={open ? 'ion:chevron-up-outline' : 'ion:chevron-down-outline'}
          className="size-5 shrink-0 text-neutral-500"
        />
      </button>

      {open ? (
        <div className="mt-5">
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
        </div>
      ) : null}
    </div>
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
