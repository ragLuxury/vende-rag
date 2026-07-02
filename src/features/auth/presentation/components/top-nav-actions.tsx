'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useCurrentUser } from '../hooks/use-current-user';

export function TopNavActions() {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-3">
        <Link
          href="/vender"
          className="bg-brand rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Vender
        </Link>
        <Link
          href="/perfil"
          aria-label="Mi perfil"
          className="text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <Icon icon="ion:person-circle-outline" className="size-9" />
        </Link>
      </div>
      {user?.name ? (
        <Link
          href="/perfil"
          className="max-w-[13rem] truncate text-xs font-medium tracking-wide text-neutral-500 uppercase transition-colors hover:text-neutral-900"
        >
          {user.name}
        </Link>
      ) : null}
    </div>
  );
}
