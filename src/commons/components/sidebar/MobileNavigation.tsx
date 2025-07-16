'use client';

import React from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/app/auth/actions';
import { SIDEBAR_LINKS } from '@/commons/components/sidebar/Sidebar';
import { Button } from '@/commons/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import { Me } from '@/types/swagger/MeRoute';

interface Props {
  me: Me.GetProfile.ResponseBody;
}

export const MobileNavigation: React.FC<Props> = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex lg:hidden justify-around p-2 max-w-[100vw]">
      {SIDEBAR_LINKS.map(link => (
        <Link
          href={link.url}
          key={link.name}
          className={cx(
            'flex flex-col items-center text-xs gap-2 py-2 hover:bg-primary/10 transition-all duration-200 rounded-md px-2',
            {
              'bg-primary/10': pathname.includes(link.url),
            }
          )}
        >
          {link.icon}
          <span>{link.shortName}</span>
        </Link>
      ))}
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild={true}>
            <Button variant="ghost">
              <Image
                src="/avatar.png"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem asChild={true}>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
