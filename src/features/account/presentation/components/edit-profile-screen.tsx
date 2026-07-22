'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import type { ClientProfile } from '@/src/features/account/domain/account-repository';
import { useProfile } from '../hooks/use-profile';
import { useUpdateProfile } from '../hooks/use-update-profile';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-[11px] text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

interface EditProfileScreenProps {
  clientId: number;
  onSaved?: (fullName: string) => void;
}

export function EditProfileScreen({ clientId, onSaved }: EditProfileScreenProps) {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile(clientId);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col md:max-w-3xl">
      <header className="relative flex items-center justify-center px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Volver"
          className="absolute left-6 text-neutral-900"
        >
          <Icon icon="ion:chevron-back-outline" className="size-7" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Información Personal</h1>
      </header>

      <div className="flex-1 px-6 pt-10 pb-28">
        {isLoading || !profile ? (
          <p className="text-base text-neutral-400">Cargando...</p>
        ) : (
          <EditProfileForm clientId={clientId} profile={profile} onSaved={onSaved} />
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export interface EditProfileFormProps {
  clientId: number;
  profile: ClientProfile;
  onSaved?: ((fullName: string) => void) | undefined;
}

export function EditProfileForm({ clientId, profile, onSaved }: EditProfileFormProps) {
  const updateProfile = useUpdateProfile();

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phone, setPhone] = useState(profile.phone);

  const isValid = firstName.trim() !== '' && lastName.trim() !== '' && phone.trim() !== '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    updateProfile.mutate(
      {
        clientId,
        data: {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          phone: phone.trim(),
          email: profile.email,
        },
      },
      {
        onSuccess: () => {
          onSaved?.(`${trimmedFirstName} ${trimmedLastName}`);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Nombre">
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            aria-label="Nombre"
            className={FIELD_CLASS}
          />
        </Field>

        <Field label="Apellidos">
          <input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            aria-label="Apellidos"
            className={FIELD_CLASS}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Teléfono">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value.replace(/[^\d]/g, ''))}
            inputMode="numeric"
            aria-label="Teléfono"
            className={FIELD_CLASS}
          />
        </Field>

        <Field label="Correo">
          <input
            value={profile.email}
            disabled
            aria-label="Correo"
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-[11px] text-[13px] text-neutral-400"
          />
        </Field>
      </div>

      {updateProfile.isError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          No pudimos guardar tus cambios. Inténtalo de nuevo.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!isValid || updateProfile.isPending}
        className={`mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-[10px] text-sm font-medium transition-colors md:mx-auto md:w-auto md:px-6 ${
          isValid && !updateProfile.isPending
            ? 'bg-brand hover:bg-brand/90 text-white'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
        }`}
      >
        <Icon icon="ion:save-outline" className="size-5" />
        {updateProfile.isPending ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  children: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="text-base font-semibold text-neutral-900 md:text-xs md:font-semibold md:tracking-wide md:text-neutral-500 md:uppercase">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}
