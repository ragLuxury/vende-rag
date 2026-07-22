'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface ChecklistItem {
  readonly icon: string;
  readonly label: string;
  readonly isDone: boolean;
}

interface PublicationGenerationChecklistProps {
  infoGenerated: boolean;
  hasVideo: boolean;
  hasPhotos: boolean;
  hasTag: boolean;
}

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const IN_PROGRESS_PERCENT = 18;

function GenerationRing({ icon, label, isDone }: ChecklistItem) {
  const targetPercent = isDone ? 100 : IN_PROGRESS_PERCENT;
  const [percent, setPercent] = useState(0);

  // Starts near-empty and animates up to the real target on mount, so the
  // seller sees progress "fill in" rather than an infinite spinner.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setPercent(targetPercent));
    return () => cancelAnimationFrame(frame);
  }, [targetPercent]);

  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex size-14 items-center justify-center">
        <svg viewBox="0 0 60 60" className="absolute inset-0 -rotate-90">
          <circle cx="30" cy="30" r={RING_RADIUS} fill="none" stroke="#EDEAFB" strokeWidth="3" />
          <circle
            cx="30"
            cy="30"
            r={RING_RADIUS}
            fill="none"
            stroke="#6C5CE7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <span className="flex size-10 items-center justify-center rounded-full bg-[#EDEAFB] text-[#6C5CE7]">
          <Icon icon={icon} className="size-5" />
        </span>
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-neutral-900">{label}</p>
        <p className="text-[11px] text-neutral-400">{isDone ? 'Listo' : 'Generando'}</p>
      </div>
    </div>
  );
}

export function PublicationGenerationChecklist({
  infoGenerated,
  hasVideo,
  hasPhotos,
  hasTag,
}: PublicationGenerationChecklistProps) {
  const items: readonly ChecklistItem[] = [
    { icon: 'ion:information-circle-outline', label: 'Información', isDone: infoGenerated },
    { icon: 'ion:play-circle-outline', label: 'Video', isDone: hasVideo },
    { icon: 'ion:camera-outline', label: 'Fotos', isDone: hasPhotos },
    { icon: 'ion:pricetag-outline', label: 'Etiqueta', isDone: hasTag },
  ];

  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs text-neutral-400">
        <Icon icon="ion:information-circle-outline" className="size-3.5 shrink-0" />
        Estamos generando estos elementos automáticamente
      </p>
      <div className="mt-4 flex gap-6">
        {items.map((item) => (
          <GenerationRing key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
