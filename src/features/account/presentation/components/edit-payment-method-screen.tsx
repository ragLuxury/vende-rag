'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '@iconify/react';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import type { ClientProfile } from '@/src/features/account/domain/account-repository';
import { useProfile } from '../hooks/use-profile';
import { useSavePaymentMethod } from '../hooks/use-save-payment-method';
import { BankSelectField } from './bank-select-field';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-[11px] text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

const CLABE_LENGTH = 18;

interface EditPaymentMethodScreenProps {
  clientId: number;
  onSaved?: () => void;
}

export function EditPaymentMethodScreen({ clientId, onSaved }: EditPaymentMethodScreenProps) {
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
        <h1 className="text-lg font-semibold text-neutral-900">Método de Pago</h1>
      </header>

      <div className="flex-1 px-6 pt-10 pb-28">
        {isLoading || !profile ? (
          <p className="text-base text-neutral-400">Cargando...</p>
        ) : (
          <EditPaymentMethodForm clientId={clientId} profile={profile} onSaved={onSaved} />
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export interface EditPaymentMethodFormProps {
  clientId: number;
  profile: ClientProfile;
  onSaved?: (() => void) | undefined;
}

export function EditPaymentMethodForm({ clientId, profile, onSaved }: EditPaymentMethodFormProps) {
  const savePaymentMethod = useSavePaymentMethod();
  const existing = profile.paymentMethod;

  const [bank, setBank] = useState(existing?.bank ?? '');
  const [holder, setHolder] = useState(existing?.holder ?? '');
  const [accountNumber, setAccountNumber] = useState(existing?.accountNumber ?? '');
  const [clabe, setClabe] = useState(existing?.clabe ?? '');

  const isValid =
    bank.trim() !== '' &&
    holder.trim() !== '' &&
    accountNumber.trim() !== '' &&
    clabe.length === CLABE_LENGTH;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;

    savePaymentMethod.mutate(
      {
        clientId,
        hasExistingPaymentMethod: existing !== null,
        data: {
          bank: bank.trim(),
          holder: holder.trim(),
          accountNumber: accountNumber.trim(),
          clabe: clabe.trim(),
        },
      },
      {
        onSuccess: () => {
          onSaved?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field label="Banco">
        <BankSelectField value={bank} onSelect={setBank} />
      </Field>

      <Field label="Beneficiario">
        <input
          value={holder}
          onChange={(event) => setHolder(event.target.value)}
          aria-label="Beneficiario"
          className={FIELD_CLASS}
        />
      </Field>

      <Field label="Cuenta">
        <input
          value={accountNumber}
          onChange={(event) => setAccountNumber(event.target.value.replace(/[^\d]/g, ''))}
          inputMode="numeric"
          placeholder="Ej. 7482935104763"
          aria-label="Cuenta"
          className={FIELD_CLASS}
        />
      </Field>

      <Field label="CLABE">
        <input
          value={clabe}
          onChange={(event) => setClabe(event.target.value.replace(/[^\d]/g, ''))}
          inputMode="numeric"
          maxLength={CLABE_LENGTH}
          placeholder="Ej. 123412341234123412"
          aria-label="CLABE"
          className={FIELD_CLASS}
        />
        {clabe.length < CLABE_LENGTH ? (
          <p className="mt-2 text-sm text-neutral-400">
            Faltan {CLABE_LENGTH - clabe.length} dígitos
          </p>
        ) : (
          <p className="mt-2 text-sm text-green-600">Completado</p>
        )}
      </Field>

      {savePaymentMethod.isError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          No pudimos guardar tu método de pago. Inténtalo de nuevo.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!isValid || savePaymentMethod.isPending}
        className={`mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors md:mx-auto md:w-auto md:px-16 ${
          isValid && !savePaymentMethod.isPending
            ? 'bg-brand hover:bg-brand/90 text-white'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
        }`}
      >
        <Icon icon="ion:save-outline" className="size-5" />
        {savePaymentMethod.isPending ? 'Guardando...' : 'Guardar'}
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
        {label}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}
