import React from 'react';

import { ScheduleLayout } from '@/features/schedule/layouts/ScheduleLayout';
import HospitalTimeline from '@/features/schedule/timeline/Timeline';
import { Medicines } from '@/types/swagger/MedicinesRoute';
import { Patients } from '@/types/swagger/PatientsRoute';
import { Protocols } from '@/types/swagger/ProtocolsRoute';
import { Rooms } from '@/types/swagger/RoomsRoute';
import { Schedule } from '@/types/swagger/ScheduleRoute';

interface Props {
  roomsData: Promise<Rooms.GetAllRooms.ResponseBody>;
  scheduleData: Promise<Schedule.GetSchedule.ResponseBody>;
  patientsData: Promise<Patients.GetPatients.ResponseBody>;
  protocolsData: Promise<Protocols.GetProtocols.ResponseBody>;
  medicinesData: Promise<Medicines.GetMedicines.ResponseBody>;
  isDrawerOpen?: boolean;
}

export const TimelinePage: React.FC<Props> = ({
  roomsData,
  scheduleData,
  patientsData,
  protocolsData,
  medicinesData,
  isDrawerOpen,
}) => {
  const rooms = React.use(roomsData);
  const schedule = React.use(scheduleData);
  const patients = React.use(patientsData);
  const protocols = React.use(protocolsData);
  const medicines = React.use(medicinesData);

  return (
    <ScheduleLayout
      isDefaultOpen={isDrawerOpen}
      patients={patients}
      protocols={protocols}
      medicines={medicines}
    >
      <HospitalTimeline rooms={rooms.data} schedule={schedule.data} />
    </ScheduleLayout>
  );
};
