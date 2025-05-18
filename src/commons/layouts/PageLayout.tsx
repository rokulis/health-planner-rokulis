import React, { Suspense } from 'react';

import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';

interface Props {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: React.FC<Props> = ({ title, actions, children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold font-light">{title}</h1>
        <div>{actions}</div>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<PageTopLoader />}>{children}</Suspense>
      </div>
    </div>
  );
};
