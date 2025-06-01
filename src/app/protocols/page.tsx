import { getMedicines } from '@/app/medicine/actions';
import { getProtocols } from '@/app/protocols/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { ProtocolsList } from '@/features/protocols/ProtocolsList';

export default async function Protocols() {
  const protocols = await getProtocols();
  const medicines = await getMedicines();

  return (
    <DashboardLayout>
      <ProtocolsList protocols={protocols} medicines={medicines} />
    </DashboardLayout>
  );
}
