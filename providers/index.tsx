'use client';

import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PropsWithChildren } from 'react';
import { ClerkProvider } from './clerk-provider';
import { IntercomProvider } from './intercom-provider';
import { ReactQueryProvider } from './react-query-provider';
import { ThemeProvider } from './theme-provider';

export const Providers = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark']}
    >
      <NuqsAdapter>
        <ReactQueryProvider>
          <IntercomProvider>
            <Toaster />
            <TooltipProvider>{children}</TooltipProvider>
          </IntercomProvider>
        </ReactQueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  </ClerkProvider>
);
