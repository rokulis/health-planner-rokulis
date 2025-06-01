'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ConfirmationModalContextProvider } from '@/commons/components/confirm/context/ConfirmContextProvider';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmationModalContextProvider>
        {children}
      </ConfirmationModalContextProvider>
    </QueryClientProvider>
  );
};
