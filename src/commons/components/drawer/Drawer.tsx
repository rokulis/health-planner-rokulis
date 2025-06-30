import React, { Suspense } from 'react';

import {
  Drawer as BaseDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/commons/components/ui/drawer';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<Props> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <BaseDrawer direction="right" open={isOpen} onClose={onClose}>
      <DrawerContent className="h-full overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <Suspense fallback="Loading...">{children}</Suspense>
      </DrawerContent>
    </BaseDrawer>
  );
};
