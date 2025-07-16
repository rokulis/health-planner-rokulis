import React, { Suspense } from 'react';

import { PageTopLoader } from '@/commons/components/loader/PageTopLoader';
import { SearchInput } from '@/commons/components/search-input/SearchInput';

interface Props {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  searchEnabled?: boolean;
}

export const PageLayout: React.FC<Props> = ({
  title,
  actions,
  children,
  searchEnabled = false,
}) => {
  return (
    <div className="flex flex-col pb-20 lg:pb-0">
      <div className="flex items-center justify-between p-3 lg:p-6">
        <h1 className="text-lg lg:text-2xl font-bold font-light">{title}</h1>
        <div className="flex gap-4 lg:gap-8 items-center justify-end">
          {searchEnabled ? <SearchInput /> : null}
          {actions}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<PageTopLoader />}>{children}</Suspense>
      </div>
    </div>
  );
};
