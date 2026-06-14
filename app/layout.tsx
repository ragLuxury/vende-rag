import type { Metadata } from 'next';
import './globals.css';
import { fontVariables } from '@/src/shared/ui/fonts/fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'RAG',
  description: 'Compra en línea con RAG',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
