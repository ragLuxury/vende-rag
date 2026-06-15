import Image from 'next/image';

import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { ContactForm } from './contact-form';
import { SocialLinks } from './social-links';

export function ContactScreen() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <div className="flex-1 pb-28">
        <Image
          src="/images/header-contacto.jpg"
          alt="Bolsas y zapatos de lujo en consignación con RAG"
          width={4176}
          height={2784}
          priority
          className="h-auto w-full"
        />

        <div className="px-6">
          <h1 className="font-editors mt-8 text-center text-5xl text-neutral-900">Contacto</h1>

          <p className="mt-8 text-center text-sm leading-relaxed tracking-wide text-neutral-700 uppercase">
            Nos encantaría poder verte. Puedes agendar una cita presencial o dejarnos una reseña o
            comentario. Nos importa lo que piensas y sientes.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>

          <div className="mt-12">
            <SocialLinks />
          </div>

          <div className="mt-10 flex flex-col items-center gap-6 text-center">
            <a
              href="mailto:sell@rag.mx"
              className="text-base font-medium text-neutral-900 underline"
            >
              SELL@RAG.MX
            </a>
            <a href="tel:+523328071856" className="text-base text-neutral-700">
              +52 1 33 2807 1856
            </a>
            <p className="text-base leading-relaxed text-neutral-700">
              Lunes - Viernes: 10:00 AM - 7:00 PM (GMT-6)
              <br />
              Jalisco México
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
