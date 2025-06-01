'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { Protocols } from '@/types/swagger/ProtocolsRoute';

export const getProtocols = async () => {
  return await apiClient<Protocols.GetProtocols.ResponseBody>('/protocols', {
    next: {
      revalidate: 3600,
      tags: ['protocols'],
    },
  });
};

export const getProtocol = async (id: string) => {
  return await apiClient<Protocols.GetProtocol.ResponseBody>(
    `/protocols/${id}`,
    {
      next: {
        revalidate: 3600,
        tags: ['protocols', id],
      },
    }
  );
};

export const createProtocol = async (
  data: Protocols.CreateProtocol.RequestBody
) => {
  const res = await apiClient<Protocols.CreateProtocol.ResponseBody>(
    '/protocols',
    {
      method: 'POST',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('protocols');
  }

  return res;
};

export const updateProtocol = async (
  id: number,
  data: Protocols.UpdateProtocol.RequestBody
) => {
  const res = await apiClient<Protocols.UpdateProtocol.ResponseBody>(
    `/protocols/${id}`,
    {
      method: 'PUT',
      body: data,
    }
  );

  if (res.success) {
    revalidateTag('protocols');
  }

  return res;
};

export const deleteProtocol = async (protocolId: number) => {
  const res = await apiClient<Protocols.DeleteProtocol.ResponseBody>(
    `/protocols/${protocolId}`,
    {
      method: 'DELETE',
    }
  );

  if (res.success) {
    revalidateTag('protocols');
  }

  return res;
};
