import Image from 'next/image';
import { NEW_PRODUCTS } from './landing-content';

// Rendered twice back-to-back so the track is exactly double-width; animating
// from translateX(0) to translateX(-50%) loops seamlessly at the halfway point.
const MARQUEE_ITEMS = [...NEW_PRODUCTS, ...NEW_PRODUCTS];

export function LandingNewProducts() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-cormorant text-center text-3xl font-semibold text-neutral-900">
          Nuevos <span className="font-normal italic">Productos</span>
        </h2>

        <div className="mt-12 max-w-[624px] mx-auto overflow-hidden">
          <div className="animate-marquee flex w-max gap-6 hover:[animation-play-state:paused]">
            {MARQUEE_ITEMS.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="w-48 shrink-0"
                aria-hidden={index >= NEW_PRODUCTS.length}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
