import {
  PUBLICATION_TIMELINE_STEPS,
  resolvePublicationStepIndex,
} from '@/src/features/product-views/domain/publication-status';

interface PublicationTimelineProps {
  statusIntern: string;
}

export function PublicationTimeline({ statusIntern }: PublicationTimelineProps) {
  const activeIndex = resolvePublicationStepIndex(statusIntern);

  return (
    <div className="flex items-start">
      {PUBLICATION_TIMELINE_STEPS.map((step, index) => {
        const isActive = index === activeIndex;
        const isLast = index === PUBLICATION_TIMELINE_STEPS.length - 1;

        return (
          <div
            key={step.matchValue}
            className={`flex flex-col items-center ${isLast ? '' : 'flex-1'}`}
          >
            <div className="flex w-full items-center">
              <span
                className={`size-3 shrink-0 rounded-full ${
                  isActive ? 'bg-brand' : 'border-2 border-neutral-300 bg-white'
                }`}
              />
              {isLast ? null : <span className="h-px flex-1 bg-neutral-200" />}
            </div>
            <span
              className={`mt-2 px-0.5 text-center text-[11px] leading-tight break-words ${
                isActive ? 'font-semibold text-neutral-900' : 'text-neutral-400'
              }`}
            >
              {step.displayLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
