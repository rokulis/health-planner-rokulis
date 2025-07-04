'use server';

import { revalidateTag } from 'next/cache';

import { apiClient } from '@/app/actions';
import { Invitations } from '@/types/swagger/InvitationsRoute';
import { Workspace } from '@/types/swagger/WorkspaceRoute';

export async function getInvitations() {
  return apiClient<Invitations.GetInvitations.ResponseBody>('/invitations', {
    method: 'GET',
    next: {
      tags: ['invitations'],
      revalidate: 3600,
    },
  });
}

export async function sendInvitation(
  payload: Invitations.CreateInvitation.RequestBody
) {
  const res = await apiClient<Invitations.CreateInvitation.ResponseBody>(
    '/invitations',
    {
      method: 'POST',
      body: payload,
      next: {
        tags: ['invitations'],
        revalidate: 3600,
      },
    }
  );

  if (res.success) {
    revalidateTag('invitations');
  }

  return res;
}

export async function getWorkspace() {
  return apiClient<Workspace.GetWorkspace.ResponseBody>('/workspace', {
    method: 'GET',
    next: {
      tags: ['workspace'],
      revalidate: 3600,
    },
  });
}
