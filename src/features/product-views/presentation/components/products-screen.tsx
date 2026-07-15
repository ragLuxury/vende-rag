'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

import type {
  Product,
  ProductView,
} from '@/src/features/product-views/domain/product-view-repository';
import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { useProducts } from '../hooks/use-products';
import { usePaidByProduct } from '../hooks/use-paid-by-product';
import { VIEW_CONFIG, type CurrencyAmount } from '../view-config';
import { ProductCard } from './product-card';
import { ProductSummary, type SummaryItem } from './product-summary';

type SortOrder = 'price-desc' | 'price-asc' | 'oldest' | 'newest';

const SEARCH_DEBOUNCE_MS = 400;

function amountFor(
  product: Product,
  amount: CurrencyAmount,
  paidById: ReadonlyMap<number, number>,
): number {
  const paid = paidById.get(product.id) ?? 0;
  if (amount === 'paid') return paid;
  if (amount === 'pending') return Math.max(product.earning - paid, 0);
  if (amount === 'salePrice') return Math.max(product.salePrice - product.discountAmount, 0);
  return product.earning;
}

function isPaidStatus(product: Product): boolean {
  return product.status.trim().toLowerCase().includes('pagado');
}

function ventasSecondary(product: Product, paidById: ReadonlyMap<number, number>) {
  const paid = paidById.get(product.id) ?? 0;
  if (isPaidStatus(product)) {
    return { label: 'Pagado', value: paid > 0 ? paid : product.earning };
  }
  return { label: 'Por pagar', value: Math.max(product.earning - paid, 0) };
}

interface ProductsScreenProps {
  view: ProductView;
  clientId: number | null;
}

export function ProductsScreen({ view, clientId }: ProductsScreenProps) {
  const router = useRouter();
  const config = VIEW_CONFIG[view];

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('price-desc');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileSortMenuOpen, setMobileSortMenuOpen] = useState(false);
  const [desktopSortMenuOpen, setDesktopSortMenuOpen] = useState(false);
  const mobileSortMenuRef = useRef<HTMLDivElement>(null);
  const desktopSortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (!mobileSortMenuOpen && !desktopSortMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideMobile = !mobileSortMenuRef.current?.contains(target);
      const isOutsideDesktop = !desktopSortMenuRef.current?.contains(target);

      if (mobileSortMenuOpen && isOutsideMobile) {
        setMobileSortMenuOpen(false);
      }

      if (desktopSortMenuOpen && isOutsideDesktop) {
        setDesktopSortMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileSortMenuOpen, desktopSortMenuOpen]);

  function handleSortSelect(order: SortOrder) {
    setSortOrder(order);
    setMobileSortMenuOpen(false);
    setDesktopSortMenuOpen(false);
  }

  const isSolicitudesView = view === 'solicitudes';
  const activeSearch = isSolicitudesView ? '' : debouncedSearch;
  const { data: products, isLoading, isError } = useProducts(view, clientId, activeSearch);

  const productIds = useMemo(() => (products ?? []).map((product) => product.id), [products]);
  const needsPayments = view === 'ventas';
  const paidById = usePaidByProduct(productIds, needsPayments);
  const sortLabel =
    sortOrder === 'price-desc'
      ? 'Precio: mayor a menor'
      : sortOrder === 'price-asc'
        ? 'Precio: menor a mayor'
        : sortOrder === 'oldest'
          ? 'Más antigua'
          : 'Más reciente';

  const summary = useMemo<readonly SummaryItem[]>(() => {
    const list = products ?? [];
    return config.summary.map((item) => ({
      label: item.label,
      icon: item.icon,
      format: item.format,
      value:
        item.format === 'currency'
          ? list
              .filter(item.matches)
              .reduce(
                (total, product) => total + amountFor(product, item.amount ?? 'earning', paidById),
                0,
              )
          : list.filter(item.matches).length,
    }));
  }, [products, config, paidById]);

  const visibleProducts = useMemo(() => {
    const predicate = selectedIndex === null ? null : config.summary[selectedIndex]?.matches;
    const filtered = (products ?? []).filter((product) => !predicate || predicate(product));

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'price-desc') return b.salePrice - a.salePrice;
      if (sortOrder === 'price-asc') return a.salePrice - b.salePrice;
      if (sortOrder === 'oldest') return a.id - b.id;
      return b.id - a.id;
    });
  }, [products, sortOrder, selectedIndex, config]);

  function handleSummarySelect(index: number) {
    setSelectedIndex((current) => (current === index ? null : index));
  }

  function renderCard(product: Product) {
    return (
      <Link
        key={product.id}
        href={`/productos/${product.id}?view=${view}`}
        className="block h-full"
      >
        <ProductCard
          product={product}
          secondary={
            view === 'ventas'
              ? ventasSecondary(product, paidById)
              : {
                  label: config.cardSecondary.label,
                  value: amountFor(product, config.cardSecondary.amount, paidById),
                }
          }
        />
      </Link>
    );
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col md:mx-0 md:max-w-none">
      <div className="flex flex-1 flex-col md:hidden">
        <header className="relative flex items-center justify-center px-6 pt-6">
          <button
            type="button"
            onClick={() => (config.backHref ? router.push(config.backHref) : router.back())}
            aria-label="Volver"
            className="absolute left-6 text-neutral-900"
          >
            <Icon icon="ion:chevron-back-outline" className="size-7" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-900">{config.title}</h1>
        </header>

        <div className="flex-1 px-6 pt-6 pb-28">
          {!isSolicitudesView ? (
            <div className="relative">
              <Icon
                icon="ion:search-outline"
                className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label={config.searchPlaceholder}
                placeholder={config.searchPlaceholder}
                className="focus:border-brand w-full rounded-full border border-neutral-200 bg-neutral-50 py-3.5 pr-4 pl-11 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          ) : null}

          <div className="mt-6">
            <ProductSummary
              items={summary}
              selectedIndex={selectedIndex}
              onSelect={handleSummarySelect}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <div ref={mobileSortMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setMobileSortMenuOpen((open) => !open)}
                className="mt-2.5 flex items-center gap-2 text-base text-neutral-700"
              >
                {sortLabel}
                <Icon icon="ion:funnel-outline" className="size-5" />
              </button>

              {mobileSortMenuOpen ? (
                <div className="absolute right-0 z-10 mt-2 w-40 rounded-2xl border border-neutral-200 bg-white py-2 shadow-lg">
                  {[
                    { value: 'price-desc', label: 'Precio: mayor a menor' },
                    { value: 'price-asc', label: 'Precio: menor a mayor' },
                    { value: 'oldest', label: 'Más antigua' },
                    { value: 'newest', label: 'Más reciente' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSortSelect(option.value as SortOrder)}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${sortOrder === option.value ? 'font-semibold text-neutral-900' : 'text-neutral-600'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4">
            {isLoading ? (
              <p className="py-12 text-center text-sm text-neutral-400">Cargando...</p>
            ) : isError ? (
              <p className="py-12 text-center text-sm text-red-600">
                No pudimos cargar la información. Inténtalo de nuevo.
              </p>
            ) : visibleProducts.length === 0 ? (
              <p className="py-12 text-center text-sm text-neutral-400">{config.emptyText}</p>
            ) : (
              <div className="grid auto-rows-fr grid-cols-2 gap-4">
                {visibleProducts.map(renderCard)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden flex-1 flex-col px-8 py-10 md:flex">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
          <div className="flex w-full items-center justify-center gap-4">
            <div className="shrink-0">
              <ProductSummary
                items={summary}
                selectedIndex={selectedIndex}
                onSelect={handleSummarySelect}
              />
            </div>

            {!isSolicitudesView ? (
              <div className="relative flex-1">
                <Icon
                  icon="ion:search-outline"
                  className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label={config.searchPlaceholder}
                  placeholder={config.searchPlaceholder}
                  className="focus:border-brand w-full rounded-full border border-neutral-200 bg-neutral-50 py-3 pr-4 pl-11 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
            ) : null}
            <div ref={desktopSortMenuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setDesktopSortMenuOpen((open) => !open)}
                aria-label="Ordenar por"
                aria-expanded={desktopSortMenuOpen}
                className="mt-2.5 flex size-12 items-center justify-center rounded-full bg-neutral-900 text-white transition-opacity hover:opacity-90"
              >
                <Icon icon="ion:funnel-outline" className="size-5" />
              </button>

              {desktopSortMenuOpen ? (
                <div className="absolute top-full right-0 z-10 mt-2 w-40 rounded-2xl border border-neutral-200 bg-white py-2 shadow-lg">
                  {[
                    { value: 'price-desc', label: 'Precio: mayor a menor' },
                    { value: 'price-asc', label: 'Precio: menor a mayor' },
                    { value: 'oldest', label: 'Más antigua' },
                    { value: 'newest', label: 'Más reciente' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSortSelect(option.value as SortOrder)}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-50 ${sortOrder === option.value ? 'font-semibold text-neutral-900' : 'text-neutral-600'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-10 flex-1">
            {isLoading ? (
              <p className="py-12 text-center text-sm text-neutral-400">Cargando...</p>
            ) : isError ? (
              <p className="py-12 text-center text-sm text-red-600">
                No pudimos cargar la información. Inténtalo de nuevo.
              </p>
            ) : visibleProducts.length === 0 ? (
              <p className="py-12 text-center text-sm text-neutral-400">{config.emptyText}</p>
            ) : (
              <div className="grid auto-rows-fr grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map(renderCard)}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
