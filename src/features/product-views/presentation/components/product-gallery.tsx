'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';

interface ProductGalleryProps {
  images: readonly string[];
  alt: string;
  fill?: boolean;
}

export function ProductGallery({ images, alt, fill = false }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sizeClass = fill ? 'h-full' : 'aspect-square';

  if (images.length === 0) {
    return (
      <div
        className={`flex ${sizeClass} items-center justify-center bg-neutral-100 text-neutral-300`}
      >
        <Icon icon="ion:image-outline" className="size-16" />
      </div>
    );
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollLeft, clientWidth } = event.currentTarget;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  }

  function goToIndex(index: number) {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    container.scrollTo({ left: clamped * container.clientWidth, behavior: 'smooth' });
  }

  return (
    <div className={`relative ${fill ? 'h-full' : ''}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`scrollbar-hide flex ${sizeClass} snap-x snap-mandatory overflow-x-auto`}
      >
        {images.map((image, index) => (
          <div key={image} className="relative size-full shrink-0 snap-center">
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          {activeIndex > 0 ? (
            <button
              type="button"
              onClick={() => goToIndex(activeIndex - 1)}
              aria-label="Imagen anterior"
              className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            >
              <Icon icon="ion:chevron-back" className="size-5" />
            </button>
          ) : null}
          {activeIndex < images.length - 1 ? (
            <button
              type="button"
              onClick={() => goToIndex(activeIndex + 1)}
              aria-label="Imagen siguiente"
              className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            >
              <Icon icon="ion:chevron-forward" className="size-5" />
            </button>
          ) : null}
        </>
      ) : null}

      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((image, index) => (
            <span
              key={image}
              className={`size-1.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-neutral-700' : 'bg-white/70'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
