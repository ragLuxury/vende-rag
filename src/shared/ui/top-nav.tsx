'use client';

import Image from 'next/image';
import Link from 'next/link';

interface TopNavProps {
  trailing?: React.ReactNode;
}

// Grid (not flex + absolute-centering) keeps the wordmark truly centered
// regardless of how wide `trailing` renders — the outer columns are equal
// width, so the middle column's center always lands on the header's center.
export function TopNav({ trailing }: TopNavProps) {
  return (
    <header className="relative z-[150] hidden h-32 grid-cols-3 items-center bg-white/90 px-8 backdrop-blur md:grid">
      <Image
        src="/images/header/isotipo.svg"
        alt=""
        width={48}
        height={48}
        className="size-12 shrink-0"
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

      <div className="shrink-0 justify-self-end">
        {trailing ?? (
          <Link
            href="/vender"
            className="bg-brand rounded-[8px] px-5 py-2 text-xs font-semibold tracking-wide text-white uppercase transition-opacity hover:opacity-90"
          >
            Vender
          </Link>
        )}
      </div>
    </header>
  );
}
