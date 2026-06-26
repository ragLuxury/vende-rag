'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import { ConfirmDialog } from '@/src/shared/ui/confirm-dialog';
import { useToast } from '@/src/shared/ui/toast';
import type { ClientAddress } from '@/src/features/account/domain/account-repository';
import { useDeleteAddress } from '../hooks/use-delete-address';
import { useProfile } from '../hooks/use-profile';
import { ProfileAccordion } from './profile-accordion';
import { ProfileActions } from './profile-actions';

interface AddressSectionProps {
  clientId: number;
}

export function AddressSection({ clientId }: AddressSectionProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: profile, isLoading, isError } = useProfile(clientId);
  const deleteAddress = useDeleteAddress();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const address = profile?.address;

  function handleDelete() {
    if (!address) return;
    deleteAddress.mutate(
      { clientId },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          showToast('Dirección eliminada correctamente');
        },
      },
    );
  }

  return (
    <ProfileAccordion
      icon={<Icon icon="ion:navigate-outline" className="size-6" />}
      label="Mi Dirección"
    >
      {isLoading ? (
        <p className="text-base text-neutral-400">Cargando...</p>
      ) : isError ? (
        <p className="text-base text-red-600">No pudimos cargar tu dirección.</p>
      ) : !profile?.address ? (
        <div className="flex flex-col gap-4">
          <p className="text-base text-neutral-400">Aún no has registrado una dirección.</p>
          <button
            type="button"
            onClick={() => router.push('/perfil/direccion')}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-neutral-300 text-base font-medium text-neutral-700"
          >
            <Icon icon="ion:add-outline" className="size-5" />
            Agregar dirección
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <Icon icon="ion:location-outline" className="size-6 shrink-0 text-neutral-900" />
            <address className="text-base text-neutral-700 not-italic">
              {formatAddressLines(profile.address).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <ProfileActions
            onEdit={() => router.push('/perfil/direccion')}
            onDelete={() => setConfirmOpen(true)}
          />

          <ConfirmDialog
            open={confirmOpen}
            destructive
            title="Eliminar dirección"
            description="¿Estás seguro de que deseas eliminar tu dirección? No podrás recuperarla."
            cancelLabel="Cancelar"
            confirmLabel={deleteAddress.isPending ? 'Eliminando...' : 'Eliminar'}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleDelete}
          />
        </>
      )}
    </ProfileAccordion>
  );
}

function formatAddressLines(address: ClientAddress): string[] {
  const streetLine = [address.street, address.exteriorNumber, address.interiorNumber]
    .filter(Boolean)
    .join(' ');
  const neighborhoodLine = [`Col. ${address.neighborhood}`, address.postalCode]
    .filter(Boolean)
    .join(', ');
  const cityLine = [address.city, address.state, address.country].filter(Boolean).join(', ');

  return [streetLine, neighborhoodLine, cityLine].filter(Boolean);
}
