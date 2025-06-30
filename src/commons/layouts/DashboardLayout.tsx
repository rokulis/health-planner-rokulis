import React from 'react';

import { getMe } from '@/app/profile/actions';
import { Sidebar } from '@/commons/components/sidebar/Sidebar';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const me = await getMe();

  return (
    <>
      <Sidebar me={me} />
      <main className="ml-[320px]">{children}</main>
    </>
  );
};
