import { Icon } from '@iconify/react';
import { LAYAWAY_TIMELINE, SALE_TIMELINE, type TimelineMilestone } from './landing-content';

interface TimelineRowProps {
  label: string;
  milestones: readonly TimelineMilestone[];
}

function TimelineRow({ label, milestones }: TimelineRowProps) {
  return (
    <div className="flex items-center gap-8">
      <span className="text-brand w-24 shrink-0 text-xs font-semibold tracking-wide uppercase">
        {label}
      </span>
      <div className="relative flex flex-1 items-center justify-between">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-200" />
        {milestones.map((milestone) => (
          <div key={milestone.week} className="relative z-10 flex flex-col items-center gap-2">
            <span className="text-[11px] font-medium text-neutral-500">{milestone.week}</span>
            <span className="border-brand bg-brand/10 flex size-8 items-center justify-center rounded-full border">
              <Icon icon="ion:cash-outline" className="text-brand size-4" />
            </span>
            <span className="max-w-24 text-center text-[11px] text-neutral-500">
              {milestone.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingPaymentTimeline() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Cuándo recibo <span className="italic">mi pago</span>
        </h2>

        <div className="mt-12 flex flex-col gap-10 rounded-3xl border border-neutral-200 bg-white p-10">
          <TimelineRow label="Venta" milestones={SALE_TIMELINE} />
          <TimelineRow label="Apartado" milestones={LAYAWAY_TIMELINE} />
        </div>
      </div>
    </section>
  );
}
