import { Icon } from '@iconify/react';

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
        const isCompleted = index < activeIndex;
        const isPastOrActive = index <= activeIndex;
        const isLast = index === PUBLICATION_TIMELINE_STEPS.length - 1;

        return (
          <div
            key={step.matchValue}
            className={`flex flex-col items-center ${isLast ? '' : 'flex-1'}`}
          >
            <div className="flex w-full items-center">
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                  isPastOrActive ? 'bg-indigo-600' : 'border-2 border-neutral-300 bg-white'
                }`}
              >
                {isCompleted ? <Icon icon="ion:checkmark" className="size-3.5 text-white" /> : null}
              </span>
              {isLast ? null : (
                <span
                  className={`h-0.5 flex-1 ${isCompleted ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                />
              )}
            </div>
            <span
              className={`mt-2 px-0.5 text-center text-[11px] leading-tight break-words ${
                isPastOrActive ? 'font-semibold text-neutral-900' : 'text-neutral-400'
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
