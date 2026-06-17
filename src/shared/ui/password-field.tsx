'use client';

import { useState, type ComponentProps } from 'react';
import { Icon } from '@iconify/react';

import { TextField } from './text-field';

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, 'trailing' | 'type'>;

export function PasswordField({ label, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      label={label}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="shrink-0 text-neutral-700"
        >
          <Icon icon={visible ? 'ion:eye-off-outline' : 'ion:eye-outline'} className="size-6" />
        </button>
      }
    />
  );
}
