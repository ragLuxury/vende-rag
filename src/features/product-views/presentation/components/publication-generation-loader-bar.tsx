'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface LoaderItem {
  readonly label: string;
  readonly isDone: boolean;
}

interface PublicationGenerationLoaderBarProps {
  infoGenerated: boolean;
  hasVideo: boolean;
  hasPhotos: boolean;
  hasTag: boolean;
}

export function PublicationGenerationLoaderBar({
  infoGenerated,
  hasVideo,
  hasPhotos,
  hasTag,
}: PublicationGenerationLoaderBarProps) {
  const items: readonly LoaderItem[] = [
    { label: 'Información', isDone: infoGenerated },
    { label: 'Video', isDone: hasVideo },
    { label: 'Fotos', isDone: hasPhotos },
    { label: 'Etiqueta', isDone: hasTag },
  ];

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Icon icon="ion:information-circle-outline" className="size-3.5 shrink-0" />
        Estamos generando estos elementos
      </p>
      <div className="mt-4 flex gap-1">
        {items.map((item) => (
          <div key={item.label} className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
            <div
              className={`bg-brand h-full rounded-full transition-all duration-700 ease-out ${
                hasAnimated && item.isDone ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1">
        {items.map((item) => (
          <p key={item.label} className="flex-1 text-center text-[11px] text-neutral-400">
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
