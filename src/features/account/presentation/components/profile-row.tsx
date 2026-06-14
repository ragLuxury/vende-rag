import type { ReactNode } from 'react';

import { ChevronDownIcon } from '@/src/shared/ui/icons';

interface ProfileRowProps {
  icon: ReactNode;
  label: string;
  expandable?: boolean;
}

export function ProfileRow({ icon, label, expandable = false }: ProfileRowProps) {
  return (
    <div className="flex h-16 w-full items-center gap-4 rounded-2xl border border-neutral-200 px-5">
      <span className="shrink-0 text-neutral-900">{icon}</span>
      <span className="font-editors flex-1 text-xl text-neutral-900">{label}</span>
      {expandable ? <ChevronDownIcon className="size-5 shrink-0 text-neutral-500" /> : null}
    </div>
  );
}
