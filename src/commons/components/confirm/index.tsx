import React from 'react';


import { Button } from '@/commons/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/commons/components/ui/dialog';
import Trash from '@/commons/icons/svg/trash.svg';

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  content?: React.ReactNode;
  proceedText?: string;
  cancelText?: string;
  proceedButtonId?: string;
}

export const ModalConfirm: React.FC<Props> = ({
  onCancel,
  onConfirm,
  title,
  content,
  proceedButtonId,
  proceedText,
  cancelText,
}) => {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogDescription className="flex flex-col text-center gap-4 justify-center items-center">
          <Trash />
          <span className="text-2xl font-semibold leading-8 tracking-tight text-center">
            {title}
          </span>
          {content}
        </DialogDescription>
        <div className="flex flex-col border-t border-gray-200 pt-6">
          <Button
            aria-label="Proceed"
            variant="destructive"
            id={proceedButtonId}
            onClick={onConfirm}
          >
            {proceedText ?? 'Proceed'}
          </Button>
          <DialogClose asChild={true}>
            <Button
              variant="ghost"
              aria-label="Cancel"
              onClick={() => {
                onCancel();
              }}
            >
              {cancelText ?? 'Cancel'}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
