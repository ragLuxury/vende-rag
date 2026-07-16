import Link from 'next/link';
import { Icon } from '@iconify/react';
import { LoginFormBody } from './login-form-body';

export function LoginForm() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-8">
      <Link href="/welcome" aria-label="Regresar" className="text-neutral-900">
        <Icon icon="ion:chevron-back-outline" className="size-7" />
      </Link>

      <div className="mt-12">
        <LoginFormBody />
      </div>
    </main>
  );
}
