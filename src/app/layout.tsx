import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CookiesProvider } from 'next-client-cookies/server';

import { ActionContextProvider } from '@/commons/action-context-provider/ActionContextProvider';
import { Providers } from '@/commons/components/providers/Providers';
import { Toaster } from '@/commons/components/ui/sonner';

import './globals.scss';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Patient planner',
  description: 'Patient planner',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <Providers>
          <ActionContextProvider>
            <CookiesProvider>
              <Providers>{children}</Providers>
              <Toaster richColors={true} position="top-right" />
            </CookiesProvider>
          </ActionContextProvider>
        </Providers>
      </body>
    </html>
  );
}
