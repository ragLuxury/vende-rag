import Link from 'next/link';

import { UserIcon } from '@/src/shared/ui/icons';

interface ProfileHeaderProps {
  name: string;
}

export function ProfileHeader({ name }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/perfil"
        aria-label="Ir a mi perfil"
        className="focus-visible:ring-brand flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <UserIcon className="size-8" />
      </Link>
      <p className="font-editors text-xl text-neutral-900">{name}</p>
    </div>
  );
}
