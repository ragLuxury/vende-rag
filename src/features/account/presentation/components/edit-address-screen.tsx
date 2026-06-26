'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '@iconify/react';

import { queueToast } from '@/src/shared/ui/toast';
import type { ClientProfile } from '@/src/features/account/domain/account-repository';
import { useProfile } from '../hooks/use-profile';
import { useSaveAddress } from '../hooks/use-save-address';
import { AddressMap, type SelectedPlace } from './address-map';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

const DEFAULT_CENTER = { lat: 18.1345, lng: -94.4585 };

interface AddressFields {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface EditAddressScreenProps {
  clientId: number;
}

export function EditAddressScreen({ clientId }: EditAddressScreenProps) {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile(clientId);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <header className="relative flex items-center justify-center px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Volver"
          className="absolute left-6 text-neutral-900"
        >
          <Icon icon="ion:chevron-back-outline" className="size-7" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-900">Mi Dirección</h1>
      </header>

      <div className="flex-1 px-6 pt-8 pb-10">
        {isLoading || !profile ? (
          <p className="text-base text-neutral-400">Cargando...</p>
        ) : (
          <EditAddressForm clientId={clientId} profile={profile} />
        )}
      </div>
    </div>
  );
}

interface EditAddressFormProps {
  clientId: number;
  profile: ClientProfile;
}

function EditAddressForm({ clientId, profile }: EditAddressFormProps) {
  const router = useRouter();
  const saveAddress = useSaveAddress();
  const existing = profile.address;

  const [fields, setFields] = useState<AddressFields | null>(() =>
    existing
      ? {
          street: existing.street,
          neighborhood: existing.neighborhood,
          city: existing.city,
          state: existing.state,
          country: existing.country,
          postalCode: existing.postalCode,
        }
      : null,
  );
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(() =>
    existing?.latitude && existing.longitude
      ? { lat: existing.latitude, lng: existing.longitude }
      : null,
  );
  const [searchValue, setSearchValue] = useState(() =>
    existing ? formatLocationLabel(existing.street, existing.neighborhood) : '',
  );
  const [exteriorNumber, setExteriorNumber] = useState(existing?.exteriorNumber ?? '');
  const [interiorNumber, setInteriorNumber] = useState(existing?.interiorNumber ?? '');
  const [reference, setReference] = useState(existing?.reference ?? '');

  const isValid = fields !== null && fields.street !== '' && exteriorNumber.trim() !== '';

  function handlePlaceSelect(place: SelectedPlace) {
    setFields({
      street: place.street,
      neighborhood: place.neighborhood,
      city: place.city,
      state: place.state,
      country: place.country,
      postalCode: place.postalCode,
    });
    setMarkerPosition({ lat: place.latitude, lng: place.longitude });
    setSearchValue(formatLocationLabel(place.street, place.neighborhood));
  }

  function handleClear() {
    setFields(null);
    setMarkerPosition(null);
    setSearchValue('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || !fields) return;

    saveAddress.mutate(
      {
        clientId,
        hasExistingAddress: existing !== null,
        data: {
          street: fields.street,
          neighborhood: fields.neighborhood,
          exteriorNumber: exteriorNumber.trim(),
          interiorNumber: interiorNumber.trim(),
          city: fields.city,
          state: fields.state,
          country: fields.country,
          postalCode: fields.postalCode,
          reference: reference.trim(),
        },
      },
      {
        onSuccess: () => {
          queueToast('Información actualizada correctamente');
          router.push('/perfil');
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-neutral-900">Ubicación</span>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-2 text-base text-neutral-500"
        >
          <Icon icon="ion:backspace-outline" className="size-5" />
          Limpiar dirección
        </button>
      </div>

      <AddressMap
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        defaultCenter={markerPosition ?? DEFAULT_CENTER}
        markerPosition={markerPosition}
        onPlaceSelect={handlePlaceSelect}
      />

      {fields ? (
        <div className="flex gap-3 rounded-2xl border border-neutral-200 px-4 py-3">
          <Icon icon="ion:location-outline" className="size-5 shrink-0 text-neutral-500" />
          <div>
            <p className="text-base font-semibold text-neutral-900">
              {formatLocationLabel(fields.street, fields.neighborhood)}
            </p>
            <p className="text-sm text-neutral-400">
              {[fields.city, fields.state].filter(Boolean).join(', ')}
              {fields.postalCode ? ` · C.P. ${fields.postalCode}` : ''}
            </p>
          </div>
        </div>
      ) : null}

      <Field label="Número Exterior" required>
        <input
          value={exteriorNumber}
          onChange={(event) => setExteriorNumber(event.target.value)}
          aria-label="Número Exterior"
          className={FIELD_CLASS}
        />
      </Field>

      <Field label="Número Interior">
        <input
          value={interiorNumber}
          onChange={(event) => setInteriorNumber(event.target.value)}
          placeholder="Ej. 451"
          aria-label="Número Interior"
          className={FIELD_CLASS}
        />
      </Field>

      <Field label="Referencia">
        <textarea
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder="Ej. Casa azul frente al parque, entre Calle 5 y Calle 6"
          aria-label="Referencia"
          rows={3}
          className={`${FIELD_CLASS} resize-none`}
        />
      </Field>

      {saveAddress.isError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          No pudimos guardar tu dirección. Inténtalo de nuevo.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!isValid || saveAddress.isPending}
        className={`mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-medium transition-colors ${
          isValid && !saveAddress.isPending
            ? 'bg-brand hover:bg-brand/90 text-white'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
        }`}
      >
        <Icon icon="ion:save-outline" className="size-5" />
        {saveAddress.isPending ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}

function formatLocationLabel(street: string, neighborhood: string): string {
  return [street, neighborhood].filter(Boolean).join(', ');
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

function Field({ label, required = false, children }: FieldProps) {
  return (
    <div>
      <label className="text-base font-semibold text-neutral-900">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}
