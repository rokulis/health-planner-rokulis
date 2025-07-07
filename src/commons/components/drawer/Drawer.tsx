import React, { Suspense } from 'react';

import { useActionContext } from '@/commons/action-context-provider/useActionContext';
import {
  Drawer as BaseDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/commons/components/ui/drawer';

interface Props {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Drawer: React.FC<Props> = ({
  title,
  isOpen,
  children,
  onClose,
}) => {
  const { onClose: actionOnClose } = useActionContext();

  return (
    <BaseDrawer
      direction="right"
      open={isOpen}
      onClose={() => {
        if (typeof onClose !== 'undefined') {
          onClose();
        } else {
          actionOnClose?.();
        }
      }}
    >
      <DrawerContent className="h-full overflow-y-auto overflow-x-hidden">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <Suspense fallback="Loading...">{children}</Suspense>
      </DrawerContent>
    </BaseDrawer>
  );
};
