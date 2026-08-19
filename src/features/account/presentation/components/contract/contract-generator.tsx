'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

import { useToast } from '@/src/shared/ui/toast';

import { useProfile } from '../../hooks/use-profile';
import { useSignContract } from '../../hooks/use-sign-contract';
import { CONTRACT_CLAUSES, PAGE_1_CLAUSE_COUNT } from './contract-clauses';
import { CONTRACT_FONT_STYLE, getFormattedDate } from './contract-constants';
import { AnaPaulaSignature, ClauseItem, SellerSignature } from './contract-parts';
import { generateContractPdf } from './generate-contract-pdf';
import { useSignatureCanvas } from './use-signature-canvas';

interface ContractGeneratorProps {
  clientId: number;
  onClose: () => void;
}

function titleCase(value: string): string {
  return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

function sanitizeForFileName(value: string): string {
  return value.trim().replace(/\s+/g, '_');
}

export function ContractGenerator({ clientId, onClose }: ContractGeneratorProps) {
  const { data: profile } = useProfile(clientId);
  const { mutateAsync: signContract, isPending: isSaving } = useSignContract();
  const { showToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // This component only ever mounts client-side (toggled by a button click in
  // contract-section.tsx), so the canvas is always ready to size on first render —
  // no SSR/hydration "mounted" gate needed here, unlike the front-rag original.
  const { canvasRef, hasSignature, startDrawing, draw, stopDrawing, clearSignature } =
    useSignatureCanvas(true);

  useEffect(() => {
    scrollContainerRef.current?.focus({ preventScroll: true });
  }, []);

  if (!profile) return null;

  const clientName = `${profile.firstName} ${profile.lastName}`;
  const formattedDate = getFormattedDate();
  const page1Clauses = CONTRACT_CLAUSES.slice(0, PAGE_1_CLAUSE_COUNT);
  const page2Clauses = CONTRACT_CLAUSES.slice(PAGE_1_CLAUSE_COUNT);

  const handleSave = async () => {
    if (!hasSignature) {
      showToast('Por favor firma el contrato antes de guardar');
      return;
    }
    if (!page1Ref.current || !page2Ref.current) return;

    setIsGenerating(true);
    try {
      const pdfBlob = await generateContractPdf({
        page1Element: page1Ref.current,
        page2Element: page2Ref.current,
      });
      const fileName = `${sanitizeForFileName(profile.firstName)}_${sanitizeForFileName(profile.lastName)}_Contrato.pdf`;
      await signContract({ clientId, pdfBlob, fileName });
      onClose();
    } catch (error) {
      console.error('[ContractGenerator] Error al guardar contrato:', error);
      showToast('Error al guardar el contrato');
    } finally {
      setIsGenerating(false);
    }
  };

  const isBusy = isSaving || isGenerating;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            aria-label="Cerrar"
            className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100 disabled:opacity-50"
          >
            <Icon icon="ion:close-outline" className="size-5" />
          </button>
          <h1 className="text-base font-bold text-neutral-900">Contrato RAG - {clientName}</h1>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isBusy || !hasSignature}
          className="bg-brand hover:bg-brand/90 flex min-w-[90px] items-center justify-center gap-2 rounded-xl px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isBusy ? <Icon icon="ion:sync-outline" className="size-4 animate-spin" /> : 'Guardar'}
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        tabIndex={0}
        className="flex-1 overflow-y-auto bg-neutral-200 p-4 outline-none focus-visible:outline-none md:p-8"
      >
        <div className="flex flex-col items-center gap-8 pb-20">
          <div
            ref={page1Ref}
            className="relative flex h-[279mm] w-[216mm] shrink-0 flex-col overflow-hidden bg-white p-[25mm] text-justify text-[13px] leading-[1.4] text-[#000000] shadow-2xl"
            style={CONTRACT_FONT_STYLE}
          >
            <h1 className="mb-4 text-center text-[15px] font-bold uppercase">
              CONTRATO DE CONSIGNACIÓN DE PRODUCTOS DE LUJO
            </h1>

            <div className="space-y-2">
              <p>
                Entre RAG Luxury Resale SAPI de CV, representado en este acto por Ana Paula Godoy
                Paredes, en adelante denominado &quot;El Consignatario&quot;, y{' '}
                {titleCase(clientName)} el consignador, en adelante denominado &quot;El
                Seller&quot;.
              </p>

              <p>
                Considerando que &quot;El Seller&quot; es de nacionalidad mexicana, mayor de edad y
                con capacidad legal para celebrar el presente contrato.
              </p>

              <p>
                &quot;El Seller&quot; es propietario de los productos que se consignan en virtud de
                este contrato, &quot;El Consignatario&quot; se dedica a la venta de productos
                similares a los consignados, y que ambas partes están de acuerdo en celebrar el
                presente contrato de consignación bajo las siguientes cláusulas.
              </p>

              <h2 className="pt-2 pb-1 font-bold uppercase">CLÁUSULAS</h2>

              <ol className="space-y-[6px]">
                {page1Clauses.map((text, idx) => (
                  <ClauseItem key={idx} number={idx + 1} text={text} />
                ))}
              </ol>
            </div>
          </div>

          <div
            ref={page2Ref}
            className="relative flex h-[279mm] w-[216mm] shrink-0 flex-col overflow-hidden bg-white p-[25mm] text-justify text-[13px] leading-[1.4] text-[#000000] shadow-2xl"
            style={CONTRACT_FONT_STYLE}
          >
            <ol className="mb-6 space-y-[6px]">
              {page2Clauses.map((text, idx) => (
                <ClauseItem key={idx} number={PAGE_1_CLAUSE_COUNT + idx + 1} text={text} />
              ))}
            </ol>

            <p className="mt-6 mb-16 text-[13px]">
              En buena fe, las partes firman el presente contrato en Guadalajara, Jalisco a{' '}
              {formattedDate}.
            </p>

            <div className="mt-auto mb-10 grid w-full grid-cols-2 items-end gap-20">
              <SellerSignature
                canvasRef={canvasRef}
                clientName={clientName}
                hasSignature={hasSignature}
                isSaving={isBusy}
                onStartDrawing={startDrawing}
                onDraw={draw}
                onStopDrawing={stopDrawing}
                onClear={clearSignature}
              />
              <AnaPaulaSignature />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
