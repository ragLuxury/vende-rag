import { Icon } from '@iconify/react';

interface SummaryItem {
  label: string;
  count: number;
  icon: string;
}

interface SolicitudSummaryProps {
  items: readonly SummaryItem[];
}

export function SolicitudSummary({ items }: SolicitudSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-4"
        >
          <div className="flex items-start justify-between">
            <span className="text-2xl font-semibold text-neutral-900">{item.count}</span>
            <Icon icon={item.icon} className="size-6 text-neutral-400" />
          </div>
          <span className="text-sm text-neutral-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export type { SummaryItem };
