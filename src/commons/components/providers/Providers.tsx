'use client';

import React, { Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ConfirmationModalContextProvider } from '@/commons/components/confirm/context/ConfirmContextProvider';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <ConfirmationModalContextProvider>
          {children}
        </ConfirmationModalContextProvider>
      </QueryClientProvider>
    </Suspense>
  );
};
