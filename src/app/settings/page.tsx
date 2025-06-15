import { getMe } from '@/app/profile/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { PersonalInfo } from '@/features/settings/personal-info/PersonalInfo';

export default async function Settings() {
  const me = await getMe();

  return (
    <DashboardLayout>
      <PersonalInfo me={me} />
    </DashboardLayout>
  );
}
