'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

// Reused as-is below the contact page's layout (same section LandingScreen and
// profile-screen.tsx render at the bottom of their desktop views); no shared
// cross-feature abstraction exists yet for this read (same precedent as
// product-detail-screen.tsx's own import of LandingFooter).
// eslint-disable-next-line boundaries/element-types
import { useCurrentUser } from '@/src/features/auth/presentation/hooks/use-current-user';
// Reused as-is below the contact page's layout (same section LandingScreen and
// profile-screen.tsx render at the bottom of their desktop views); no shared
// cross-feature abstraction exists yet for this read (same precedent as
// product-detail-screen.tsx's own import of LandingFooter).
// eslint-disable-next-line boundaries/element-types
import { LandingNewProducts } from '@/src/features/auth/presentation/components/landing-new-products';
// Reused as-is below the contact page's layout (same section LandingScreen and
// profile-screen.tsx render at the bottom of their desktop views); no shared
// cross-feature abstraction exists yet for this read (same precedent as
// product-detail-screen.tsx's own import of LandingFooter).
// eslint-disable-next-line boundaries/element-types
import { LandingFooter } from '@/src/features/auth/presentation/components/landing-footer';
import { ContactForm } from './contact-form';
import { SocialLinks } from './social-links';

function ContactInfo() {
  return (
    <>
      <h1 className="font-editors text-center text-[74px] font-thin text-neutral-900">Contacto</h1>

      <p className="mt-4 w-full text-center text-sm font-medium text-neutral-700 uppercase">
        Nos encantaría poder verte. Puedes agendar una cita presencial o dejarnos una reseña o
        comentario. Nos importa lo que piensas y sientes.
      </p>

      <div className="mt-6">
        <ContactForm />
      </div>

      <div className="mt-6">
        <SocialLinks />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-around gap-3">
          <a href="mailto:sell@rag.mx" className="font-sm text-base text-neutral-900 underline">
            SELL@RAG.MX
          </a>
          <a href="tel:+523328071856" className="text-base text-neutral-700">
            +52 1 33 2807 1856
          </a>
        </div>
        <p className="mt-3 text-center text-base leading-relaxed text-neutral-700">
          Lunes - Viernes: 10:00 AM - 7:00 PM (GMT-6)
          <br />
          Jalisco México
        </p>
      </div>
    </>
  );
}

export function ContactScreen() {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <div className="flex min-h-full w-full flex-1 flex-col">
      <div className="mx-auto w-full max-w-md flex-1 pb-10 md:hidden">
        <div className="relative">
          <Image
            src="/images/hero/header-contacto.jpg"
            alt="Bolsas y zapatos de lujo en consignación con RAG"
            width={4176}
            height={2784}
            priority
            className="h-auto w-full"
          />
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver"
            className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-full bg-white/80 text-neutral-900 backdrop-blur"
          >
            <Icon icon="ion:chevron-back-outline" className="size-6" />
          </button>
        </div>

        <div className="px-6">
          <div className="mt-8">
            <ContactInfo />
          </div>
        </div>
      </div>

      <div className="hidden items-center md:grid md:grid-cols-2">
        <div className="relative mt-20 h-130">
          <Image
            src="/images/hero/header-contacto.jpg"
            alt="Bolsas y zapatos de lujo en consignación con RAG"
            fill
            sizes="40vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="px-12">
          <div className="mx-auto w-4/5">
            <ContactInfo />
          </div>
        </div>
      </div>

      <LandingNewProducts />
      <LandingFooter isAuthenticated={Boolean(user)} />
    </div>
  );
}
