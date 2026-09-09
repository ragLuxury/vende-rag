import type { ReactElement } from 'react';
import Script from 'next/script';

interface GoogleTagProps {
  readonly tagId: string;
}

/** Inyecta el Google tag (gtag.js) a nivel de sitio. Cargar una sola vez en el layout raíz. */
export function GoogleTag({ tagId }: GoogleTagProps): ReactElement {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${tagId}');`}
      </Script>
    </>
  );
}
