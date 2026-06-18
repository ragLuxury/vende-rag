import { Icon } from '@iconify/react';

interface SummaryItem {
  label: string;
  status: string;
  count: number;
  icon: string;
}

interface SolicitudSummaryProps {
  items: readonly SummaryItem[];
  selectedStatus: string | null;
  onSelect: (status: string) => void;
}

export function SolicitudSummary({ items, selectedStatus, onSelect }: SolicitudSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => {
        const active = selectedStatus === item.status;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect(item.status)}
            aria-pressed={active}
            className={`flex flex-col gap-3 rounded-2xl border p-4 text-left transition-colors ${
              active ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl font-semibold text-neutral-900">{item.count}</span>
              <Icon icon={item.icon} className="size-6 text-neutral-400" />
            </div>
            <span className="text-sm text-neutral-600">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type { SummaryItem };
