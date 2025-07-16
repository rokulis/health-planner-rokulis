import React from 'react';

import { getMe } from '@/app/profile/actions';
import { MobileNavigation } from '@/commons/components/sidebar/MobileNavigation';
import { Sidebar } from '@/commons/components/sidebar/Sidebar';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const me = await getMe();

  return (
    <>
      <Sidebar me={me} />
      <MobileNavigation me={me} />
      <main className="lg:ml-[320px]">{children}</main>
    </>
  );
};
