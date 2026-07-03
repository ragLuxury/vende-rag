import Image from 'next/image';
import Link from 'next/link';

interface Valuation {
  icon: string;
  title: string;
  description: string;
}

const VALUATIONS: readonly Valuation[] = [
  {
    icon: '/images/valor-reventa-icon.png',
    title: 'Valor de reventa',
    description:
      'Consideramos marca, modelo y ediciones limitadas para estimar cuánto vale realmente tu pieza en el mercado de lujo.',
  },
  {
    icon: '/images/tendencia-mercado-icon.png',
    title: 'Tendencias del mercado',
    description:
      'Nuestro algoritmo analiza la demanda actual para publicar tu producto al mejor precio posible.',
  },
  {
    icon: '/images/condicion-producto-icon.png',
    title: 'Estado del producto',
    description:
      'Las piezas nuevas o en excelente estado se venden más rápido y alcanzan un precio premium.',
  },
];

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: readonly Step[] = [
  {
    number: '01',
    title: 'Solicitud',
    description: 'Subes tu producto y acordamos juntos el precio de venta.',
  },
  {
    number: '02',
    title: 'Autenticación',
    description: 'Revisamos cada pieza física y digitalmente para garantizar su autenticidad.',
  },
  {
    number: '03',
    title: 'Publicación',
    description: 'Fotografiamos y publicamos tu producto de forma profesional.',
  },
  {
    number: '04',
    title: 'Pago',
    description: 'Cuando se vende, recibes tu ganancia de forma segura y puntual.',
  },
];

const BENEFITS: readonly string[] = [
  'Valuaciones precisas basadas en datos del mercado',
  'Pagos rápidos y seguros',
  'Comisiones justas por niveles',
  'Disponibilidad durante todo el año',
  'Acompañamiento en cada venta',
  'Fotografía y autenticación incluidas',
];

const FOOTER_LINKS: readonly { label: string; href: string }[] = [
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Términos', href: '/terminos' },
  { label: 'Privacidad', href: '/privacidad' },
];

export function LandingScreen() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-8">
          <Image
            src="/images/headerv2.png"
            alt="RAG"
            width={160}
            height={36}
            priority
            className="h-8 w-auto"
          />
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-16 px-8 py-20">
        <div>
          <p className="text-brand text-sm font-semibold tracking-[0.2em] uppercase">
            Consignación de lujo
          </p>
          <h1 className="font-editors mt-6 text-6xl leading-[1.05] text-neutral-900">
            Vender con nosotros es muy <span className="italic">fácil</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-500">
            La plataforma más completa de consignación de lujo en México. Nosotros nos encargamos de
            la fotografía, la autenticación y la venta; tú solo recibes tu ganancia.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/login"
              className="bg-brand rounded-full px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Quiero Vender
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
          <Image
            src="/images/header-bolsas.jpg"
            alt="Piezas de lujo"
            fill
            priority
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto w-full max-w-6xl px-8">
          <h2 className="font-editors text-4xl text-neutral-900">
            Cómo <span className="italic">valuamos</span>
          </h2>
          <p className="mt-3 max-w-xl text-neutral-500">
            Tres factores determinan el precio ideal de tu pieza.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8">
            {VALUATIONS.map((item) => (
              <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-8">
                <Image
                  src={item.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
                <h3 className="mt-6 text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-8">
          <h2 className="font-editors text-4xl text-neutral-900">
            Nuestro <span className="italic">proceso</span>
          </h2>
          <p className="mt-3 max-w-xl text-neutral-500">
            De tu clóset a una venta segura en cuatro pasos.
          </p>

          <div className="mt-12 grid grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="rounded-3xl border border-neutral-200 p-8">
                <span className="font-editors text-brand text-4xl">{step.number}</span>
                <h3 className="mt-6 text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-16 px-8">
          <div>
            <h2 className="font-editors text-4xl text-neutral-900">
              ¿Por qué <span className="italic">RAG</span>?
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-neutral-500">
              Somos el socio de confianza para vender tus piezas de lujo sin complicaciones.
            </p>
          </div>
          <ul className="grid gap-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-neutral-700">
                <span className="bg-brand mt-1.5 size-2 shrink-0 rounded-full" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand py-20 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-8 text-center">
          <h2 className="font-editors text-5xl leading-tight">
            ¿Lista para <span className="italic">vender</span>?
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Crea tu cuenta y publica tu primera pieza hoy mismo.
          </p>
          <Link
            href="/signup"
            className="text-brand mt-10 rounded-full bg-white px-10 py-4 text-base font-medium transition-opacity hover:opacity-90"
          >
            Quiero Vender
          </Link>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-8 sm:flex-row sm:justify-between">
          <Image
            src="/images/headerv2.png"
            alt="RAG"
            width={140}
            height={32}
            className="h-7 w-auto"
          />
          <nav className="flex flex-wrap items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} RAG</p>
        </div>
      </footer>
    </div>
  );
}
