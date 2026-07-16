import Image from 'next/image';
import Link from 'next/link';

import { buttonStyles } from '@/src/shared/ui/button';
import { Divider } from '@/src/shared/ui/divider';
import { LandingScreen } from './landing-screen';
import { GoogleIcon } from './social-icons';

export function WelcomeScreen() {
  return (
    <>
      <div className="hidden md:block">
        <LandingScreen />
      </div>

      <main className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col px-6 py-12 md:hidden">
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/images/headerv2.png"
            alt="RAG"
            width={640}
            height={139}
            priority
            className="h-auto w-full max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/login" className={buttonStyles('secondary')}>
            Iniciar Sesión
          </Link>
          <Link href="/signup" className={buttonStyles('primary')}>
            Crear cuenta
          </Link>

          <div className="my-2">
            <Divider label="Continuar con" />
          </div>

          <button type="button" className={buttonStyles('secondary')}>
            <GoogleIcon />
            Continuar con Google
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/disenadores"
            className="text-sm font-medium text-neutral-600 underline transition-colors hover:text-neutral-900"
          >
            Ver catálogo de diseñadores
          </Link>
        </div>
      </main>
    </>
  );
}
