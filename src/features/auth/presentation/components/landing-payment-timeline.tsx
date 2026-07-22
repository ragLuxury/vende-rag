import { ClipboardCheck, Coins, PackageCheck, Tag, type LucideIcon } from 'lucide-react';
import { LAYAWAY_TIMELINE, SALE_TIMELINE, type TimelineMilestone } from './landing-content';

interface TimelineWeek {
  week: number;
  saleLabel: string | null;
  layawayLabel: string | null;
  hasMilestone: boolean;
  featured: boolean;
  icon: LucideIcon;
}

function getWeekNumber(week: string): number {
  return Number(week.replace(/\D/g, ''));
}

function isFeaturedMilestone(label: string): boolean {
  return label.toLowerCase().includes('pago');
}

function getMilestoneIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  if (normalized.includes('recibido')) return PackageCheck;
  if (normalized.includes('publicado')) return ClipboardCheck;
  if (normalized.includes('vendido')) return Tag;
  return Coins;
}

function findMilestone(
  milestones: readonly TimelineMilestone[],
  week: number,
): TimelineMilestone | undefined {
  return milestones.find((milestone) => getWeekNumber(milestone.week) === week);
}

function buildTimelineWeeks(
  sale: readonly TimelineMilestone[],
  layaway: readonly TimelineMilestone[],
): readonly TimelineWeek[] {
  const maxWeek = Math.max(...[...sale, ...layaway].map((m) => getWeekNumber(m.week)));

  return Array.from({ length: maxWeek }, (_, index) => {
    const week = index + 1;
    const saleMilestone = findMilestone(sale, week);
    const layawayMilestone = findMilestone(layaway, week);
    const primary = saleMilestone ?? layawayMilestone;

    return {
      week,
      saleLabel: saleMilestone?.label ?? null,
      layawayLabel: layawayMilestone?.label ?? null,
      hasMilestone: Boolean(primary),
      featured: primary ? isFeaturedMilestone(primary.label) : false,
      icon: primary ? getMilestoneIcon(primary.label) : Coins,
    };
  });
}

interface TimelineRowLabelProps {
  edge: 'top' | 'bottom';
  children: string;
}

function TimelineRowLabel({ edge, children }: TimelineRowLabelProps) {
  return (
    <span
      className={`text-brand absolute left-16 text-xs font-semibold tracking-wide uppercase ${
        edge === 'top' ? 'top-10' : 'bottom-10'
      }`}
    >
      {children}
    </span>
  );
}

interface TimelineLabelProps {
  edge: 'top' | 'bottom';
  week: number;
  text: string;
}

function TimelineLabel({ edge, week, text }: TimelineLabelProps) {
  return (
    <div
      className={`absolute flex flex-col items-center ${
        edge === 'top' ? 'bottom-full flex-col-reverse' : 'top-full'
      }`}
    >
      <span className="h-9 w-px bg-neutral-200" />
      <span className="w-28 text-center text-[11px] text-neutral-500">
        <span className="block font-medium text-neutral-900">Semana {week}:</span>
        {text}
      </span>
    </div>
  );
}

interface TimelineMarkerProps {
  week: TimelineWeek;
  leftPercent: number;
}

function TimelineMarker({ week, leftPercent }: TimelineMarkerProps) {
  const Icon = week.icon;

  return (
    <div
      className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left: `${leftPercent}%` }}
    >
      {week.hasMilestone ? (
        <>
          {week.saleLabel ? (
            <TimelineLabel edge="top" week={week.week} text={week.saleLabel} />
          ) : null}
          <span
            className={`flex size-10 items-center justify-center rounded-full border ${
              week.featured ? 'border-brand bg-brand/10' : 'border-neutral-200 bg-white'
            }`}
          >
            <Icon className="text-brand size-4" />
          </span>
          {week.layawayLabel ? (
            <TimelineLabel edge="bottom" week={week.week} text={week.layawayLabel} />
          ) : null}
        </>
      ) : (
        <span className="size-2 rounded-full bg-neutral-300" />
      )}
    </div>
  );
}

interface TimelineTrackProps {
  weeks: readonly TimelineWeek[];
}

function TimelineTrack({ weeks }: TimelineTrackProps) {
  const maxWeek = weeks[weeks.length - 1]?.week ?? 1;

  return (
    <div className="relative mr-[30px] ml-[142px] h-10">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-neutral-200" />
      {weeks.map((week) => (
        <TimelineMarker
          key={week.week}
          week={week}
          leftPercent={((week.week - 1) / (maxWeek - 1)) * 100}
        />
      ))}
    </div>
  );
}

export function LandingPaymentTimeline() {
  const weeks = buildTimelineWeeks(SALE_TIMELINE, LAYAWAY_TIMELINE);

  return (
    <section className="py-1">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-cormorant text-center text-3xl font-semibold text-neutral-900">
          Cuándo recibo <span className="font-normal italic">mi pago</span>
        </h2>
      </div>

      <div className="mx-[15px] mt-5 mb-[15px] rounded-2xl border border-neutral-200 bg-white px-8">
        <div className="relative w-full px-16 py-28">
          <TimelineRowLabel edge="top">Venta</TimelineRowLabel>
          <TimelineRowLabel edge="bottom">Apartado</TimelineRowLabel>
          <TimelineTrack weeks={weeks} />
        </div>
      </div>
    </section>
  );
}
