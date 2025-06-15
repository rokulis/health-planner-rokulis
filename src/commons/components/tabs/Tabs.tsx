'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  icon?: React.ReactNode;
  href: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className }: TabsProps) {
  const pathname = usePathname();

  return (
    <div className={cn('border-b border-muted-foreground/10', className)}>
      <div className="flex h-12 items-center px-4 gap-4">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.disabled ? '#' : tab.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative',
                tab.disabled && 'pointer-events-none opacity-50',
                {
                  "text-black": isActive,
                  "text-black/50": !isActive,
                }
              )}
            >
              {Icon ? Icon : null}
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
