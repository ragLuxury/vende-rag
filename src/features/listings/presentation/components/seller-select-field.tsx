'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { Seller } from '@/src/features/listings/domain/seller-repository';
import { useSellers } from '../hooks/use-sellers';

const FIELD_CLASS =
  'w-full rounded-2xl border border-neutral-300 bg-transparent px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none';

const MAX_RESULTS = 50;

interface SellerSelectFieldProps {
  value: number | null;
  onSelect: (seller: Seller) => void;
}

function sellerLabel(seller: Seller): string {
  const fullName = [seller.name, seller.lastname].filter(Boolean).join(' ').trim();
  return fullName ? `${fullName} | ${seller.email}` : seller.email;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function SellerSelectField({ value, onSelect }: SellerSelectFieldProps) {
  const { data: sellers, isPending, isError } = useSellers(true);

  const [query, setQuery] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = sellers?.find((seller) => seller.id === value);
  const inputValue = query ?? (selected ? sellerLabel(selected) : '');
  const search = query ?? '';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const matches = useMemo(() => {
    if (!sellers) return [];
    const terms = normalize(search.trim()).split(/\s+/).filter(Boolean);
    const filtered =
      terms.length === 0
        ? sellers
        : sellers.filter((seller) => {
            const words = normalize(sellerLabel(seller)).split(/\s+/);
            return terms.every((term) => words.some((word) => word.startsWith(term)));
          });
    return filtered.slice(0, MAX_RESULTS);
  }, [sellers, search]);

  const showSuggestions = isOpen;

  return (
    <div ref={containerRef} className="relative">
      <input
        value={inputValue}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        aria-label="Cliente"
        placeholder="Cliente *"
        autoComplete="off"
        className={FIELD_CLASS}
      />

      {showSuggestions ? (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-neutral-200 bg-white shadow-lg">
          {isPending ? (
            <li className="px-4 py-3 text-base text-neutral-400">Cargando clientes…</li>
          ) : null}
          {isError ? (
            <li className="px-4 py-3 text-base text-neutral-500">
              No se pudieron cargar los clientes.
            </li>
          ) : null}
          {!isPending && !isError && matches.length === 0 ? (
            <li className="px-4 py-3 text-base text-neutral-500">Sin coincidencias.</li>
          ) : null}
          {matches.map((seller) => (
            <li key={seller.id} className="border-b border-neutral-100 last:border-b-0">
              <button
                type="button"
                onClick={() => {
                  onSelect(seller);
                  setQuery(sellerLabel(seller));
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-base ${
                  seller.id === value ? 'text-brand font-medium' : 'text-neutral-900'
                }`}
              >
                {sellerLabel(seller)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
