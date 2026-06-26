'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import { ConfirmDialog } from '@/src/shared/ui/confirm-dialog';
import { useToast } from '@/src/shared/ui/toast';
import { useDeletePaymentMethod } from '../hooks/use-delete-payment-method';
import { useProfile } from '../hooks/use-profile';
import { ProfileAccordion } from './profile-accordion';
import { ProfileActions } from './profile-actions';

interface PaymentMethodSectionProps {
  clientId: number;
}

export function PaymentMethodSection({ clientId }: PaymentMethodSectionProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: profile, isLoading, isError } = useProfile(clientId);
  const deletePaymentMethod = useDeletePaymentMethod();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const paymentMethod = profile?.paymentMethod;

  function handleDelete() {
    if (!paymentMethod) return;
    deletePaymentMethod.mutate(
      { clientId },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          showToast('Método de pago eliminado correctamente');
        },
      },
    );
  }

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
        <div className="flex flex-col gap-4">
          <p className="text-base text-neutral-400">Aún no has registrado un método de pago.</p>
          <button
            type="button"
            onClick={() => router.push('/perfil/metodo-pago')}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-neutral-300 text-base font-medium text-neutral-700"
          >
            <Icon icon="ion:add-outline" className="size-5" />
            Agregar método de pago
          </button>
        </div>
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

          <ProfileActions
            onEdit={() => router.push('/perfil/metodo-pago')}
            onDelete={() => setConfirmOpen(true)}
          />

          <ConfirmDialog
            open={confirmOpen}
            destructive
            title="Eliminar método de pago"
            description="¿Estás seguro de que deseas eliminar tu método de pago? No podrás recuperarlo."
            cancelLabel="Cancelar"
            confirmLabel={deletePaymentMethod.isPending ? 'Eliminando...' : 'Eliminar'}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleDelete}
          />
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
