'use client';

import React from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/app/auth/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/commons/components/ui/dropdown-menu';
import ChevronDown from '@/commons/icons/svg/chevron_down.svg';
import Hospital from '@/commons/icons/svg/hospital.svg';
import Medicine from '@/commons/icons/svg/medicine.svg';
import Patient from '@/commons/icons/svg/patient.svg';
import Protocols from '@/commons/icons/svg/protocols.svg';
import Rooms from '@/commons/icons/svg/rooms.svg';
import Settings from '@/commons/icons/svg/settings.svg';
import { Me } from '@/types/swagger/MeRoute';

import { Button } from '../ui/button';

const SIDEBAR_LINKS = [
  {
    name: 'Schedule',
    url: '/schedule',
    icon: <Hospital />,
  },
  {
    name: 'Patients',
    url: '/patients',
    icon: <Patient />,
  },
  {
    name: 'Protocols',
    url: '/protocols',
    icon: <Protocols />,
  },
  {
    name: 'Medicine',
    url: '/medicine',
    icon: <Medicine />,
  },
  {
    name: 'Rooms and Beds',
    url: '/rooms',
    icon: <Rooms />,
  },
];

interface Props {
  me: Me.GetProfile.ResponseBody;
}

export const Sidebar: React.FC<Props> = ({ me }) => {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[320px] h-screen border-r p-4 border-gray">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-between items-center">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-sm">{me.data?.name}</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild={true}>
            <Button variant="ghost">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-1 border-y border-gray my-4 py-4 text-dark-gray text-sm">
        {SIDEBAR_LINKS.map(link => (
          <Link
            href={link.url}
            key={link.name}
            className={cx(
              'flex items-center py-2 hover:bg-primary/10 transition-all duration-200 rounded-md px-2',
              {
                'bg-primary/10': pathname.includes(link.url),
              }
            )}
          >
            {link.icon}
            <span className="ml-2">{link.name}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 w-full px-4">
        <Link
          href="/settings"
          className="flex items-center py-2 text-sm hover:underline text-dark-gray bg-primary/10 rounded-md px-2 w-full"
        >
          <Settings />
          <span className="ml-2">Settings</span>
        </Link>
      </div>
    </aside>
  );
};
