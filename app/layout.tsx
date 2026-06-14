import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/src/shared/infrastructure/query/query-provider';
import { fontVariables } from '@/src/shared/ui/fonts/fonts';

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
    <html lang="es" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
