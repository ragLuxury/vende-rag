'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@iconify/react';

interface ProductGalleryProps {
  images: readonly string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center bg-neutral-100 text-neutral-300">
        <Icon icon="ion:image-outline" className="size-16" />
      </div>
    );
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const { scrollLeft, clientWidth } = event.currentTarget;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  }

  return (
    <div className="relative">
      <div
        onScroll={handleScroll}
        className="flex aspect-square snap-x snap-mandatory overflow-x-auto"
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
