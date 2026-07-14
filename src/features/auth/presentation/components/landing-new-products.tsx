import { Icon } from '@iconify/react';
import { NEW_PRODUCTS } from './landing-content';

export function LandingNewProducts() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-8">
        <h2 className="font-editors text-center text-4xl text-neutral-900">
          Nuevos <span className="italic">Productos</span>
        </h2>

        <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-2">
          {NEW_PRODUCTS.map((product) => (
            <div key={product.id} className="w-56 shrink-0 snap-start">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-neutral-100">
                <Icon icon="ion:image-outline" className="size-10 text-neutral-300" />
              </div>
              <p className="mt-3 text-sm text-neutral-700">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
