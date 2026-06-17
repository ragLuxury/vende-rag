'use client';

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ChevronLeftIcon } from './icons';

interface BottomSheetProps {
  open: boolean;
  label: string;
  onClose: () => void;
  children: ReactNode;
}

const CLOSE_THRESHOLD_PX = 100;

export function BottomSheet({ open, label, onClose, children }: BottomSheetProps) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (typeof document === 'undefined' || !open) return null;

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    startYRef.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (startYRef.current === null) return;
    setDragY(Math.max(0, event.clientY - startYRef.current));
  }

  function handlePointerEnd() {
    if (startYRef.current === null) return;
    const shouldClose = dragY > CLOSE_THRESHOLD_PX;
    startYRef.current = null;
    setIsDragging(false);
    setDragY(0);
    if (shouldClose) onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[90vh] w-full max-w-md flex-col rounded-t-3xl bg-white shadow-xl"
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="shrink-0 cursor-grab touch-none"
        >
          <div className="flex justify-center pt-3">
            <span className="h-1.5 w-12 rounded-full bg-neutral-300" />
          </div>

          <div className="relative flex items-center justify-center border-b border-neutral-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Volver"
              className="absolute left-6 text-neutral-900"
            >
              <ChevronLeftIcon className="size-6" />
            </button>
            <h2 className="text-lg font-semibold text-neutral-900">{label}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
