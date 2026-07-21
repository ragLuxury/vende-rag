'use client';

import Image from 'next/image';
import { useLoginModal } from '@/src/features/auth/presentation/login-modal-context';

export function LandingHero() {
  const { open } = useLoginModal();

  return (
    <section className="grid min-h-[530px] w-full grid-cols-[calc(50%+50px)_calc(50%-50px)] border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="relative min-h-[530px] overflow-hidden">
        <Image
          src="/images/hero/header-bolsas.jpg"
          alt="Piezas de lujo en consignación con RAG"
          fill
          priority
          sizes="50vw"
          className="!h-full !w-[92%] object-cover"
        />
      </div>

      <div className="flex min-h-[530px] flex-col items-center justify-center px-12 text-center">
        <p className="font-black text-sm tracking-[0.2em] uppercase">
          Vender con nosotros
        </p>

        <h1 className="font-cormorant mt-8 text-6xl font-normal uppercase tracking-tight">
          Es muy fácil
        </h1>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-neutral-700">
          Estás a un paso de vender en la plataforma más completa de consignación de lujo en México.
          Nuestro Panel de Seller está automatizado para dar visibilidad y control de las
          solicitudes y ventas de tus productos. RAG se encarga de todo el proceso de venta:
          fotografías para web, autenticación, publicación, contenido digital y servicios
          post-venta.
        </p>

        <button
          type="button"
          onClick={open}
          className="bg-brand mt-10 inline-block rounded-[10px] px-5 py-2 text-[14px] font-md text-white uppercase transition-opacity hover:opacity-90 cursor-pointer"
        >
          Quiero vender
        </button>
      </div>
    </section>
  );
}
