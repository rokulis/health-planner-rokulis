// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

'use client';

import { Clock, Edit } from 'lucide-react';

import { Badge } from '@/commons/components/ui/badge';
import { Button } from '@/commons/components/ui/button';
import { Card, CardContent, CardHeader } from '@/commons/components/ui/card';
import { Visits } from '@/types/swagger/VisitsRoute';

interface TreatmentCardProps {
  data: Visits.GetVisit.ResponseBody;
  cycleInfo?: string;
  onClose?: () => void;
  onEdit?: () => void;
  onReschedule?: () => void;
  onNextProcedure?: () => void;
}

export default function VisitCard({
  data,
  cycleInfo = 'Cycle 1/1',
  onReschedule,
  onNextProcedure,
  onClose,
}: TreatmentCardProps) {
  const getAllMedicines = () => {
    const medicines =
      data.visit_treatments[0]?.treatment_medicine_group?.treatment_medicines ||
      [];
    return medicines;
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <Card className="w-full mx-auto p-0">
        <CardHeader className="pb-4 px-0">
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {data.room.name} {data.bed.name}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {cycleInfo}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-0">
          {/* Blood Test Section */}
          <Card className="border-purple-200 bg-purple-50 p-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Blood test</h3>
                <Edit className="h-5 w-5 text-purple-600" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4" />
                <span>15min</span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-white border-gray-300"
                  onClick={onReschedule}
                >
                  Reschedule
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={onNextProcedure}
                >
                  Next Procedure
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medicines List */}
          <div className="space-y-3">
            {getAllMedicines().map(treatmentMedicine => (
              <div
                key={treatmentMedicine.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
              >
                <span className="font-medium">
                  {treatmentMedicine.medicine.name}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  {treatmentMedicine.medicine.atc_code}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
