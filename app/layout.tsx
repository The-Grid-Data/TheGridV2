import '@/app/globals.css';

import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { Archivo, DM_Sans } from 'next/font/google';

import { Banner } from '@/components/containers/banner';
import { Header } from '@/components/containers/header';
import { siteConfig } from '@/lib/site-config';
import { Providers } from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from '@/components/containers/footer';

type TLayout = Readonly<{
  children: React.ReactNode;
}>;

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: siteConfig.pageTitle,
  description: siteConfig.pageDescription
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  viewportFit: 'cover'
};

export default function Layout({ children }: TLayout) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          dmSans.className,
          dmSans.variable,
          archivo.variable,
          'flex min-h-screen flex-col'
        )}
      >
        <Analytics />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Banner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
