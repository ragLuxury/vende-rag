'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import type {
  MouseEvent as ReactMouseEvent,
  RefObject,
  TouchEvent as ReactTouchEvent,
} from 'react';

import { CONTRACT_FONT_STYLE } from './contract-constants';

type SignatureEvent = ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>;

interface ClauseItemProps {
  number: number;
  text: string;
}

export function ClauseItem({ number, text }: ClauseItemProps) {
  return (
    <li className="flex gap-2">
      <span className="min-w-[24px] shrink-0">{number}.</span>
      <span className="text-justify">{text}</span>
    </li>
  );
}

interface SellerSignatureProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  clientName: string;
  hasSignature: boolean;
  isSaving: boolean;
  onStartDrawing: (event: SignatureEvent) => void;
  onDraw: (event: SignatureEvent) => void;
  onStopDrawing: () => void;
  onClear: () => void;
}

export function SellerSignature({
  canvasRef,
  clientName,
  hasSignature,
  isSaving,
  onStartDrawing,
  onDraw,
  onStopDrawing,
  onClear,
}: SellerSignatureProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 h-[120px] w-full overflow-hidden border-b border-gray-100/50">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 m-0 h-full w-full cursor-crosshair touch-none p-0"
          onMouseDown={onStartDrawing}
          onMouseMove={onDraw}
          onMouseUp={onStopDrawing}
          onMouseLeave={onStopDrawing}
          onTouchStart={onStartDrawing}
          onTouchMove={onDraw}
          onTouchEnd={onStopDrawing}
        />
        {!hasSignature ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] text-gray-400 italic">
            Firma aquí
          </div>
        ) : null}
      </div>

      <div className="relative flex w-full flex-col items-center">
        <div className="flex h-[60px] w-full flex-col items-center justify-start">
          <p className="mb-1 h-[20px] text-center text-[14px] capitalize">
            {clientName.toLowerCase()}
          </p>
          <div className="mb-1 w-full border-t border-black" />
          <p className="text-[12px] uppercase">FIRMA</p>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasSignature || isSaving}
          data-html2canvas-ignore="true"
          className="absolute -bottom-10 left-1/2 flex h-8 -translate-x-1/2 items-center gap-1 text-[11px] whitespace-nowrap text-blue-600 hover:text-blue-700 disabled:opacity-50"
        >
          <Icon icon="ion:refresh-outline" className="size-3" /> Limpiar Firma
        </button>
      </div>
    </div>
  );
}

export function AnaPaulaSignature() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 flex h-[120px] w-full items-center justify-center">
        <div className="pointer-events-none relative flex h-[130px] w-[280px] items-center justify-center select-none">
          <Image
            src="/ceo-signature.png"
            alt="Firma Ana Paula Godoy"
            width={280}
            height={130}
            priority
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center">
        <div className="flex h-[60px] w-full flex-col items-center justify-start">
          <p className="mb-1 h-[20px] text-center text-[14px]" style={CONTRACT_FONT_STYLE}>
            Ana Paula Godoy Paredes
          </p>
          <div className="mb-1 w-full border-t border-black" />
          <p className="text-[12px] uppercase">FIRMA</p>
        </div>
      </div>
    </div>
  );
}
