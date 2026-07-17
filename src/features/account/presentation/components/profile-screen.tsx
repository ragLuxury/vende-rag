'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { AccountTabs } from '@/src/shared/ui/account-tabs';
import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { ConfirmDialog } from '@/src/shared/ui/confirm-dialog';
import { consumeQueuedToast, useToast } from '@/src/shared/ui/toast';
// Reused as-is below the desktop profile card (same sections LandingScreen
// renders at the bottom of the public landing page); no shared cross-feature
// abstraction exists yet for this read (same precedent as products-screen.tsx
// reading useProfile from the account feature).
// eslint-disable-next-line boundaries/element-types
import { LandingFooter } from '@/src/features/auth/presentation/components/landing-footer';
// eslint-disable-next-line boundaries/element-types
import { LandingNewProducts } from '@/src/features/auth/presentation/components/landing-new-products';
import { useProfile } from '../hooks/use-profile';
import { useProfileSummary } from '../hooks/use-profile-summary';
import { AddressSection } from './address-section';
import { ContractContent, ContractSection } from './contract-section';
import { DeleteAccountDialog } from './delete-account-dialog';
import { EditAddressForm } from './edit-address-screen';
import { EditPaymentMethodForm } from './edit-payment-method-screen';
import { EditProfileForm } from './edit-profile-screen';
import { PaymentMethodSection } from './payment-method-section';
import { PersonalInfoSection } from './personal-info-section';
import { ProfileRow } from './profile-row';

type DesktopSection = 'personal' | 'address' | 'payment' | 'contract';

const DESKTOP_SECTIONS: ReadonlyArray<{ id: DesktopSection; label: string }> = [
  { id: 'personal', label: 'Información Personal' },
  { id: 'address', label: 'Mis Direcciones' },
  { id: 'payment', label: 'Métodos de Pago' },
  { id: 'contract', label: 'Contrato' },
];

// Narrows the raw `?section=` query value against the known section ids so an
// arbitrary/stale query string can't put the panel in an invalid state.
function isDesktopSection(value: string | null): value is DesktopSection {
  return DESKTOP_SECTIONS.some((section) => section.id === value);
}

interface ProfileScreenProps {
  name: string;
  clientId: number;
  onLogout: () => void;
  onDeleted: () => void;
  onProfileSaved?: ((fullName: string) => void) | undefined;
}

export function ProfileScreen({
  name,
  clientId,
  onLogout,
  onDeleted,
  onProfileSaved,
}: ProfileScreenProps) {
  const { showToast } = useToast();
  const { data: profile } = useProfile(clientId);
  const { data: summary } = useProfileSummary(clientId);
  const searchParams = useSearchParams();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  // Lazy initializer: only reads the URL once on mount so the dropdown links
  // land on the right section without keeping desktopSection synced to the URL
  // afterwards (clicking sidebar items behaves as plain local state).
  const [desktopSection, setDesktopSection] = useState<DesktopSection>(() => {
    const section = searchParams.get('section');
    return isDesktopSection(section) ? section : 'personal';
  });

  const toggleSection = (section: string) =>
    setOpenSection((current) => (current === section ? null : section));

  useEffect(() => {
    const message = consumeQueuedToast();
    if (message) showToast(message);
  }, [showToast]);

  function handleProfileSaved(fullName: string) {
    onProfileSaved?.(fullName);
    showToast('Información actualizada correctamente');
  }

  function handleSectionSaved() {
    showToast('Información actualizada correctamente');
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col md:mx-0 md:max-w-none">
      <div className="flex flex-1 flex-col md:hidden">
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
              className="flex items-center gap-1.5 text-neutral-400 transition-colors hover:text-red-600"
            >
              <Icon icon="ion:trash-outline" className="size-4" />
              <span className="text-sm">Eliminar Cuenta</span>
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
      </div>

      <div className="hidden flex-1 flex-col md:flex">
        <div className="px-8 py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <h1 className="font-editors text-4xl text-neutral-900">
              ¡Hola!, bienvenid@{' '}
              {summary ? (
                <span className="italic">
                  {summary.firstName} {summary.lastName}
                </span>
              ) : null}
            </h1>

            <div className="mt-8">
              <AccountTabs />
            </div>

            <div className="mt-8 flex flex-1 gap-10">
              <aside className="w-56 shrink-0">
                <nav className="flex flex-col gap-6">
                  {DESKTOP_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setDesktopSection(section.id)}
                      className={`text-left text-base transition-colors ${
                        desktopSection === section.id
                          ? 'text-brand font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </aside>

              <div className="min-w-0 flex-1 rounded-2xl border border-neutral-200 p-8">
                {!profile ? (
                  <p className="text-base text-neutral-400">Cargando...</p>
                ) : desktopSection === 'personal' ? (
                  <>
                    <h2 className="font-editors mb-8 text-2xl text-neutral-900">
                      Información <span className="italic">Personal</span>
                    </h2>
                    <EditProfileForm
                      clientId={clientId}
                      profile={profile}
                      onSaved={handleProfileSaved}
                    />
                  </>
                ) : desktopSection === 'address' ? (
                  <EditAddressForm
                    clientId={clientId}
                    profile={profile}
                    onSaved={handleSectionSaved}
                  />
                ) : desktopSection === 'payment' ? (
                  <EditPaymentMethodForm
                    clientId={clientId}
                    profile={profile}
                    onSaved={handleSectionSaved}
                  />
                ) : (
                  <ContractContent clientId={clientId} />
                )}
              </div>
            </div>
          </div>
        </div>

        <LandingNewProducts />
        <LandingFooter isAuthenticated />
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
