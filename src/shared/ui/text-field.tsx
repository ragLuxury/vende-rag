import type { ComponentProps, ReactNode } from 'react';

interface TextFieldProps extends ComponentProps<'input'> {
  label: string;
  trailing?: ReactNode;
}

export function TextField({ label, trailing, ...props }: TextFieldProps) {
  return (
    <div className="focus-within:border-brand flex items-center gap-2 border-b border-neutral-300">
      <input
        {...props}
        aria-label={label}
        placeholder={label}
        className="w-full bg-transparent py-3 text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
      />
      {trailing}
    </div>
  );
}
