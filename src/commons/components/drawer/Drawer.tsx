import React, { Suspense } from 'react';

import { X } from 'lucide-react';

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
      dismissible={false}
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
      <DrawerContent className="h-full overflow-y-auto overflow-x-hidden mb-8">
        <DrawerHeader>
          <DrawerTitle className="flex justify-between items-center">
            {title}
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => {
                if (typeof onClose !== 'undefined') {
                  onClose();
                } else {
                  actionOnClose?.();
                }
              }}
            >
              <X />
            </button>
          </DrawerTitle>
        </DrawerHeader>
        <Suspense fallback="Loading...">{children}</Suspense>
      </DrawerContent>
    </BaseDrawer>
  );
};
