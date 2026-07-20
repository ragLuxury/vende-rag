'use client';

import Image from 'next/image';
import Link from 'next/link';

// The authenticated header also carries the landing page's anchor-link nav strip; no shared
// abstraction exists yet for cross-feature nav content, and the anchor targets only exist on
// `/welcome`.
// eslint-disable-next-line boundaries/element-types
import { NAV_LINKS } from '@/src/features/auth/presentation/components/landing-content';

interface TopNavProps {
  trailing?: React.ReactNode;
}

// Grid (not flex + absolute-centering) keeps the wordmark truly centered
// regardless of how wide `trailing` renders — the outer columns are equal
// width, so the middle column's center always lands on the header's center.
export function TopNav({ trailing }: TopNavProps) {
  return (
    <header className="relative z-[150]">
      <div className="hidden h-22 flex justify-between items-start bg-white/90 px-2 backdrop-blur md:flex">
        <Image
          src="/images/header/isotipo.svg"
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 mt-2"
        />

        <Link href="/welcome" aria-label="RAG" className="shrink-0 justify-self-center">
          <Image
            src="/images/header/headerv2.png"
            alt="RAG"
            width={245}
            height={56}
            priority
            className="h-[105px] w-auto"
          />
        </Link>

        <div className="shrink-0 justify-self-end mt-5">
          {trailing ?? (
            <Link
              href="/vender"
              className="bg-brand rounded-[8px] px-5 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
            >
              Vender
            </Link>
          )}
        </div>
      </div>

      <nav className="hidden md:block">
        <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-center gap-8 px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`/welcome${link.href}`}
              className="text-xs font-medium tracking-wide text-neutral-600 uppercase transition-colors hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
