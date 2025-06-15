import { getInvitations } from '@/app/settings/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { Team } from '@/features/settings/team/Team';

export default async function Settings() {
  const invitations = await getInvitations();

  return (
    <DashboardLayout>
      <Team invitations={invitations} addNew={true} />
    </DashboardLayout>
  );
}
