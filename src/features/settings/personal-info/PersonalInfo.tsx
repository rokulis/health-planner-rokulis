import React from 'react';

import { Card } from '@/commons/components/ui/card';
import { SettingsLayout } from '@/features/settings/layouts/SettingsLayout';
import { Me } from '@/types/swagger/MeRoute';

interface Props {
  me: Me.GetProfile.ResponseBody;
}

export const PersonalInfo: React.FC<Props> = ({ me }) => {
  return (
    <SettingsLayout>
      <Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-4">
              <div className="text-muted-foreground/80">Name:</div> <strong>{me.data?.name}</strong>
            </div>
            <div className="flex gap-4">
              <div className="text-muted-foreground/80">Email:</div> <strong>{me.data?.email}</strong>
            </div>
          </div>
        </div>
      </Card>
    </SettingsLayout>
  );
};
