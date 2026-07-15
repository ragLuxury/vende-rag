import { Icon } from '@iconify/react';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export interface SummaryItem {
  label: string;
  icon: string;
  format: 'count' | 'currency';
  value: number;
}

interface ProductSummaryProps {
  items: readonly SummaryItem[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function ProductSummary({ items, selectedIndex, onSelect }: ProductSummaryProps) {
  const columns =
    items.length === 4
      ? 'grid-cols-2 md:grid-cols-4'
      : items.length === 3
        ? 'grid-cols-3'
        : 'grid-cols-2';

  return (
    <div className={`grid gap-3 ${columns}`}>
      {items.map((item, index) => {
        const active = selectedIndex === index;
        const display =
          item.format === 'currency' ? currencyFormatter.format(item.value) : String(item.value);

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={active}
            className={`flex flex-col gap-1.5 rounded-2xl border px-8 py-5 text-center transition-colors ${
              active ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-2xl font-semibold text-neutral-900">{display}</span>
              <Icon icon={item.icon} className="size-6 text-neutral-400" />
            </div>
            <span className="text-sm text-neutral-600">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
