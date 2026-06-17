'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

import { BottomSheet } from '@/src/shared/ui/bottom-sheet';

export const MIN_PHOTOS = 3;
export const MAX_PHOTOS = 6;

interface PhotoUploaderProps {
  photos: readonly File[];
  onChange: (photos: readonly File[]) => void;
}

export function PhotoUploader({ photos, onChange }: PhotoUploaderProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const previews = useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const canAddMore = photos.length < MAX_PHOTOS;
  const isValid = photos.length >= MIN_PHOTOS;

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const next = [...photos, ...Array.from(fileList)].slice(0, MAX_PHOTOS);
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  function pickFrom(ref: typeof cameraInputRef) {
    setSheetOpen(false);
    ref.current?.click();
  }

  return (
    <div>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />

      {photos.length === 0 ? (
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl bg-neutral-100 text-neutral-500"
        >
          <Icon icon="ion:images-outline" className="size-9" />
          <span className="text-base text-neutral-700">Añadir foto</span>
          <span className="text-sm text-neutral-400">
            Sube entre {MIN_PHOTOS} y {MAX_PHOTOS} imágenes
          </span>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-3 rounded-3xl bg-neutral-100 p-3">
          {previews.map((url, index) => (
            <div key={url} className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              <Image
                src={url}
                alt={`Foto ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label={`Eliminar foto ${index + 1}`}
                className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-red-500 text-base text-white"
              >
                ×
              </button>
            </div>
          ))}
          {canAddMore ? (
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-200/60 px-3 text-center text-neutral-500"
            >
              <Icon icon="ion:images-outline" className="size-8" />
              <span className="text-sm text-neutral-700">Añadir foto</span>
              <span className="text-xs text-neutral-400">
                Sube entre {MIN_PHOTOS} y {MAX_PHOTOS} imágenes
              </span>
            </button>
          ) : null}
        </div>
      )}

      <p className={`mt-3 text-sm font-medium ${isValid ? 'text-neutral-500' : 'text-red-600'}`}>
        {photos.length} de {MIN_PHOTOS} a {MAX_PHOTOS} Fotos*
      </p>

      <BottomSheet open={sheetOpen} label="Seleccionar Fotos" onClose={() => setSheetOpen(false)}>
        <ul className="flex flex-col">
          <li>
            <button
              type="button"
              onClick={() => pickFrom(cameraInputRef)}
              className="flex w-full items-center gap-4 px-6 py-5 text-left text-neutral-900"
            >
              <Icon icon="ion:camera-outline" className="size-6 text-neutral-700" />
              <span className="text-lg">Tomar Foto</span>
            </button>
          </li>
          <li className="border-t border-neutral-200">
            <button
              type="button"
              onClick={() => pickFrom(galleryInputRef)}
              className="flex w-full items-center gap-4 px-6 py-5 text-left text-neutral-900"
            >
              <Icon icon="ion:images-outline" className="size-6 text-neutral-700" />
              <span className="text-lg">Seleccionar de la Galería</span>
            </button>
          </li>
        </ul>
      </BottomSheet>
    </div>
  );
}
