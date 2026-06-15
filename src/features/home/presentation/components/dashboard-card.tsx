import Image from 'next/image';
import Link from 'next/link';

import { ChevronRightIcon } from '@/src/shared/ui/icons';

export interface DashboardCardProps {
  title: string;
  href: string;
  tone: string;
  image?: string;
}

export function DashboardCard({ title, href, tone, image }: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="focus-visible:ring-brand relative flex h-44 items-center overflow-hidden rounded-3xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover"
        />
      ) : null}
      <div
        className={`absolute inset-0 ${
          image ? 'bg-gradient-to-r from-black/85 via-black/45 to-black/10' : tone
        }`}
      />
      <div className="relative flex w-full items-center justify-between gap-4 px-7">
        <h2 className="text-xl font-medium text-white">{title}</h2>
        <ChevronRightIcon className="size-6 shrink-0 text-white" />
      </div>
    </Link>
  );
}
