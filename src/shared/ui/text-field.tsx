import type { ComponentProps, ReactNode } from 'react';

interface TextFieldProps extends ComponentProps<'input'> {
  label: string;
  trailing?: ReactNode;
  /** Smaller text/padding variant. Defaults to false (current sizing). */
  compact?: boolean;
}

export function TextField({ label, trailing, compact = false, ...props }: TextFieldProps) {
  const sizeStyles = compact ? 'py-2 text-sm' : 'py-3 text-lg';

  return (
    <div className="focus-within:border-brand flex items-center gap-2 border-b border-neutral-300">
      <input
        {...props}
        aria-label={label}
        placeholder={label}
        className={`w-full bg-transparent ${sizeStyles} text-neutral-900 placeholder:text-neutral-400 focus:outline-none`}
      />
      {trailing}
    </div>
  );
}
