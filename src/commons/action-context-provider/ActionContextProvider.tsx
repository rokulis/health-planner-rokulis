'use client';

import React from 'react';

import qs from 'qs';

import { useRouter, useSearchParams } from 'next/navigation';

import { Drawer } from '@/commons/components/drawer/Drawer';
import { PatientEntity } from '@/features/patients/patient-form/PatientEntity';
import { ProtocolEntity } from '@/features/protocols/add-protocol/ProtocolEntity';
import { AddTreatment } from '@/features/schedule/add-treatment/AddTreatment';
import { VisitForm } from '@/features/schedule/visit/VisitForm';

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
  treatment_new: (
    <Drawer title="Schedule treatment" isOpen={true}>
      <AddTreatment />
    </Drawer>
  ),
  visit_view: (params?: Record<string, any>) => <VisitForm id={params?.id} />,
  protocol_new: (
    <Drawer title="Protocol Form" isOpen={true}>
      <ProtocolEntity />
    </Drawer>
  ),
  protocol_edit: (params?: Record<string, any>) => (
    <Drawer title="Protocol Form" isOpen={true}>
      <ProtocolEntity protocolId={params?.id} />
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
        ...qs.parse(queryParams.toString(), {
          allowDots: true,
        }),
        action: null,
      },
      {
        skipNulls: true,
        encode: false,
        allowDots: true,
      }
    );
    router.push(`?${queryString}`);
  }, [queryParams, router]);

  const actionData = ACTIONS[actionName as keyof typeof ACTIONS] ?? null;

  const dispatchAction = (
    action: keyof typeof ACTIONS,
    actionParams?: Record<string, any>
  ) => {
    const queryString = qs.stringify(
      {
        ...qs.parse(queryParams.toString(), {
          allowDots: true,
        }),
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
