'use client';

import { Icon } from '@iconify/react';

import { useProfile } from '../hooks/use-profile';
import { ProfileAccordion } from './profile-accordion';
import { ProfileActions } from './profile-actions';

interface PaymentMethodSectionProps {
  clientId: number;
}

export function PaymentMethodSection({ clientId }: PaymentMethodSectionProps) {
  const { data: profile, isLoading, isError } = useProfile(clientId);
  const paymentMethod = profile?.paymentMethod;

  return (
    <ProfileAccordion
      icon={<Icon icon="ion:card-outline" className="size-6" />}
      label="Métodos De Pago"
    >
      {isLoading ? (
        <p className="text-base text-neutral-400">Cargando...</p>
      ) : isError ? (
        <p className="text-base text-red-600">No pudimos cargar tus métodos de pago.</p>
      ) : !paymentMethod ? (
        <p className="text-base text-neutral-400">Aún no has registrado un método de pago.</p>
      ) : (
        <>
          <div className="flex gap-3">
            <Icon icon="ion:business-outline" className="size-6 shrink-0 text-neutral-900" />
            <dl className="text-base text-neutral-700">
              <PaymentField label="Banco" value={paymentMethod.bank} />
              <PaymentField label="Titular" value={paymentMethod.holder} />
              <PaymentField label="Cuenta" value={paymentMethod.accountNumber} />
              <PaymentField label="CLABE" value={paymentMethod.clabe} />
            </dl>
          </div>

          <ProfileActions />
        </>
      )}
    </ProfileAccordion>
  );
}

interface PaymentFieldProps {
  label: string;
  value: string;
}

function PaymentField({ label, value }: PaymentFieldProps) {
  return (
    <div className="flex gap-1">
      <dt className="font-medium text-neutral-900">{label}:</dt>
      <dd className="break-all">{value}</dd>
    </div>
  );
}
