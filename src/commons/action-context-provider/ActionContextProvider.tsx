'use client';

import React from 'react';

import qs from 'qs';

import { useRouter, useSearchParams } from 'next/navigation';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { PatientEntity } from '@/features/patients/patient-form/PatientEntity';

const ACTIONS = {
  patient_new: (
    <Drawer title="Patient Form" isOpen={true}>
      <PatientEntity />
    </Drawer>
  ),
  patient_edit: (params?: Record<string, any>) => (
    <Drawer title="Patient Form" isOpen={true}>
      <PatientEntity id={params?.id} />
    </Drawer>
  ),
};

type ActionContextType = {
  dispatchAction: (
    action: keyof typeof ACTIONS,
    params?: Record<string, any>
  ) => void;
  onClose?: () => void;
};

export const ActionContext = React.createContext<ActionContextType>(
  {} as ActionContextType
);

interface Props {
  children: React.ReactNode;
}

interface ActionType {
  name: string;
  component: React.ReactNode;
  params?: Record<string, any>;
}

export const ActionContextProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const activeAction = qs.parse(queryParams.toString(), {
    allowDots: true,
  });
  const actionName = (activeAction.action as unknown as ActionType)?.name;
  const actionsParams = (activeAction.action as unknown as ActionType)?.params;

  const onClose = React.useCallback(() => {
    const queryString = qs.stringify(
      {
        action: null,
      },
      {
        skipNulls: true,
        encode: false,
        allowDots: true,
      }
    );
    router.push(`?${queryString}`);
  }, [router]);

  const actionData = ACTIONS[actionName as keyof typeof ACTIONS] ?? null;

  const dispatchAction = (
    action: keyof typeof ACTIONS,
    actionParams?: Record<string, any>
  ) => {
    const queryString = qs.stringify(
      {
        action: {
          name: action,
          params: actionParams || {},
        },
      },
      {
        skipNulls: true,
        encode: false,
        allowDots: true,
      }
    );

    router.push(`?${queryString}`);
  };

  return (
    <ActionContext.Provider value={{ dispatchAction, onClose }}>
      {typeof actionData === 'function'
        ? actionData(actionsParams)
        : actionData}
      {children}
    </ActionContext.Provider>
  );
};
