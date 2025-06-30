import { getProtocols } from '@/app/protocols/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { ProtocolsList } from '@/features/protocols/ProtocolsList';

export default async function Protocols() {
  const protocols = await getProtocols();

  return (
    <DashboardLayout>
      <ProtocolsList protocols={protocols} />
    </DashboardLayout>
  );
}
