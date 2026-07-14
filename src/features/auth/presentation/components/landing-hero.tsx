'use client';

import Image from 'next/image';
import { useLoginModal } from '@/src/features/auth/presentation/login-modal-context';

export function LandingHero() {
  const { open } = useLoginModal();

  return (
    <section className="grid min-h-[530px] w-full grid-cols-[calc(50%+50px)_calc(50%-50px)] border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="relative min-h-[530px] overflow-hidden">
        <Image
          src="/images/header-bolsas.jpg"
          alt="Piezas de lujo en consignación con RAG"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>

      <div className="flex min-h-[530px] flex-col items-center justify-center px-12 text-center">
        <p className="text-brand text-sm font-semibold tracking-[0.2em] uppercase">
          Vender con nosotros
        </p>

        <h1 className="font-editors mt-8 text-6xl leading-[1.05] text-neutral-900">
          Es muy <span className="italic">fácil</span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-neutral-700">
          Estás a un paso de vender en la plataforma más completa de consignación de lujo en México.
          Nuestro Panel de Seller está automatizado para dar visibilidad y control de las
          solicitudes y ventas de tus productos. RAG se encarga de todo el proceso de venta:
          fotografías para web, autenticación, publicación, contenido digital y servicios
          post-venta.
        </p>

        <button
          type="button"
          onClick={open}
          className="bg-brand mt-10 inline-block rounded-[14px] px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          Quiero vender
        </button>
      </div>
    </section>
  );
}
