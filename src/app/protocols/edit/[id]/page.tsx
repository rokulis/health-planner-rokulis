import { redirect } from 'next/navigation';

import { getMedicines } from '@/app/medicine/actions';
import { getProtocol, getProtocols } from '@/app/protocols/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { ProtocolsList } from '@/features/protocols/ProtocolsList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Protocols(props: NextServerComponentProps) {
  const params = await props.params;
  const protocols = await getProtocols();
  const medicines = await getMedicines();

  if (!params.id) {
    return redirect('/protocols');
  }

  const protocol = await getProtocol(params.id);

  return (
    <DashboardLayout>
      <ProtocolsList
        protocols={protocols}
        medicines={medicines}
        protocol={protocol}
      />
    </DashboardLayout>
  );
}
