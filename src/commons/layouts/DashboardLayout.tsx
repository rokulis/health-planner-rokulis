import React from 'react';

import { Sidebar } from '@/commons/sidebar/Sidebar';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="ml-[320px]">{children}</main>
    </>
  );
};
