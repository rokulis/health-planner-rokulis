'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SettingsLayout } from '@/features/settings/layouts/SettingsLayout';
import { ActiveInvitations } from '@/features/settings/team/ActiveInvitations';
import { TeamForm } from '@/features/settings/team/team-form/TeamForm';
import { TeamMembers } from '@/features/settings/team/TeamMembers';
import { Invitations } from '@/types/swagger/InvitationsRoute';
import { Workspace } from '@/types/swagger/WorkspaceRoute';

interface Props {
  invitations: Invitations.GetInvitations.ResponseBody;
  workspace: Workspace.GetWorkspace.ResponseBody;
  addNew?: boolean;
}

export const Team: React.FC<Props> = ({ invitations, addNew, workspace }) => {
  const router = useRouter();
  const [addNewMember, setAddNewMember] = React.useState(addNew ?? false);

  const onClose = () => {
    setAddNewMember(false);
    router.push('/settings/team');
  };

  return (
    <>
      <TeamForm isOpen={addNewMember} onClose={onClose} />
      <SettingsLayout>
        {!!invitations.data && invitations.data.length > 0 ? (
          <ActiveInvitations invitations={invitations} />
        ) : null}
        <TeamMembers workspace={workspace} />
      </SettingsLayout>
    </>
  );
};
