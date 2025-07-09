// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createRoom, updateRoom } from '@/app/rooms/actions';
import { Drawer } from '@/commons/components/drawer/Drawer';
import { FieldWrapper } from '@/commons/components/form/FieldWrapper';
import { FloatingLabelInput } from '@/commons/components/form/FloatingLabelInput';
import { FloatingLabelSelect } from '@/commons/components/form/FloatingLabelSelect';
import { Button } from '@/commons/components/ui/button';
import { Form, FormLabel } from '@/commons/components/ui/form';
import { RoomBed } from '@/features/rooms/add-room/RoomBed';
import { roomSchema } from '@/features/rooms/add-room/validations';
import { WorkingDaysSelector } from '@/features/rooms/add-room/WorkingDaysSelector';
import { StoreRoomRequestCategoryEnum } from '@/types/swagger/data-contracts';
import { Rooms } from '@/types/swagger/RoomsRoute';
import { Sectors } from '@/types/swagger/SectorsRoute';
import { formatTimeToHHMM } from '@/utils/helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  room?: Rooms.GetRoom.ResponseBody;
  sectors: Sectors.GetSectors.ResponseBody;
}

export const RoomForm: React.FC<Props> = ({
  isOpen,
  onClose,
  room,
  sectors,
}) => {
  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: room?.data?.name ?? '',
      sector_id: room?.data?.sector_id ?? sectors.data?.[0]?.id ?? 1,
      work_start_time: room?.data?.work_start_time
        ? formatTimeToHHMM(room.data.work_start_time)
        : '09:00',
      work_end_time: room?.data?.work_end_time
        ? formatTimeToHHMM(room.data.work_end_time)
        : '17:00',
      working_days: room?.data?.working_days ?? [],
      beds: room?.data?.beds ?? [
        { name: '', category: StoreRoomRequestCategoryEnum.ShortTerm },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'beds',
  });

  const onSubmit: SubmitHandler<Rooms.CreateRoom.RequestBody> = async data => {
    if (room?.data?.id) {
      return updateRoom(room.data.id, data).then(res => {
        if (res.message) {
          toast.error(res.message);
        } else {
          toast.success('Room updated successfully');
          form.reset();
          onClose();
        }
      });
    }

    return createRoom(data).then(res => {
      if (res.message) {
        toast.error(res.message);
      } else {
        toast.success('Room created successfully');
        form.reset();
        onClose();
      }
    });
  };

  return (
    <Drawer title="Room Form" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel className="my-4">Room information</FormLabel>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6">
              <FieldWrapper control={form.control} name="name">
                <FloatingLabelInput id="name" label="Room name" />
              </FieldWrapper>
            </div>
            <div className="col-span-6">
              <FieldWrapper control={form.control} name="sector_id">
                <FloatingLabelSelect
                  label="Sector"
                  options={(sectors?.data ?? [])?.map(s => ({
                    value: String(s.id),
                    label: String(s.name),
                  }))}
                />
              </FieldWrapper>
            </div>
            <div className="col-span-3">
              <FieldWrapper control={form.control} name="work_start_time">
                <FloatingLabelInput
                  id="work_start_time"
                  label="Work start time"
                />
              </FieldWrapper>
            </div>
            <div className="col-span-3">
              <FieldWrapper control={form.control} name="work_end_time">
                <FloatingLabelInput id="work_end_time" label="Work end time" />
              </FieldWrapper>
            </div>
          </div>

          <WorkingDaysSelector form={form} />

          <div className="flex flex-col gap-4 mt-4">
            {fields.length > 0
              ? fields.map((_field, index) => (
                <RoomBed
                  key={index}
                  index={index}
                  form={form}
                  onRemove={remove}
                />
              ))
              : null}
          </div>

          <div className="p-2 mt-4 border border-dashed border-black/10 rounded-md">
            <Button
              variant="ghost"
              type="button"
              onClick={() =>
                append({
                  name: '',
                  category: StoreRoomRequestCategoryEnum.ShortTerm,
                })
              }
            >
              <Plus /> Add Spot
            </Button>
          </div>
          <div className="col-span-6 mt-12 flex justify-end">
            <Button type="submit" className="w-1/2">
              {room?.data?.id ? 'Update Room' : 'Create Room'}
            </Button>
          </div>
        </form>
      </Form>
    </Drawer>
  );
};
