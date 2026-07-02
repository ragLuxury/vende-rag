import type { Metadata } from 'next';
import './globals.css';
import { fontVariables } from '@/src/shared/ui/fonts/fonts';
import { AppShell } from '@/src/shared/ui/app-shell';
import { TopNavActions } from '@/src/features/auth/presentation/components/top-nav-actions';
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
        <Providers>
          <AppShell topRight={<TopNavActions />}>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
