'use client';

import React from 'react';

import { ModalConfirm } from '../index';

export interface ModalContextType {
  showConfirmation: (data: IContent) => Promise<boolean>;
}

export const ConfirmationModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType
);

interface IContent {
  title?: string;
  message?: React.ReactNode;
  isLoading?: boolean;
  proceedText?: string;
    cancelText?: string;
  proceedButtonId?: string;
}

const ConfirmationModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [content, setContent] = React.useState<IContent | undefined>();
  const resolver = React.useRef<(value: boolean) => void>(null);

  const handleShow = (ctx: IContent): Promise<boolean> => {
    setContent(ctx);
    return new Promise(resolve => {
      resolver.current = resolve;
    });
  };

  const modalContext: ModalContextType = {
    showConfirmation: handleShow,
  };

  const handleConfirm = (): void => {
    if (resolver.current) resolver.current(true);
    setContent(undefined);
  };

  const handleCancel = (): void => {
    if (resolver.current) resolver.current(false);
    setContent(undefined);
  };

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {children}

      {content ? (
        <ModalConfirm
          title={content.title}
          proceedText={content.proceedText}
          cancelText={content.cancelText}
          content={content.message}
          proceedButtonId={content.proceedButtonId}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      ) : null}
    </ConfirmationModalContext.Provider>
  );
};

export { ConfirmationModalContextProvider };
