import { redirect } from 'next/navigation';

import { getMedicine, getMedicines } from '@/app/medicine/actions';
import { DashboardLayout } from '@/commons/layouts/DashboardLayout';
import { MedicineList } from '@/features/medicine/MedicineList';
import { NextServerComponentProps } from '@/utils/ts-utils';

export default async function Medicine(props: NextServerComponentProps) {
  const params = await props.params;
  const medicines = await getMedicines();

  if (!params.id) {
    return redirect('/medicines');
  }

  const medicine = await getMedicine(params.id);

  return (
    <DashboardLayout>
      <MedicineList medicines={medicines} medicine={medicine} />
    </DashboardLayout>
  );
}
