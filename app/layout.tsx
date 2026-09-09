import type { Metadata } from 'next';
import './globals.css';
import { fontVariables } from '@/src/shared/ui/fonts/fonts';
import { AppShell } from '@/src/shared/ui/app-shell';
import { GoogleTag } from '@/src/shared/ui/google-tag';
import { TopNavActions } from '@/src/features/auth/presentation/components/top-nav-actions';
import { Providers } from './providers';

const GOOGLE_TAG_ID = 'GT-5M3LS27P';

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
        <GoogleTag tagId={GOOGLE_TAG_ID} />
      </body>
    </html>
  );
}
