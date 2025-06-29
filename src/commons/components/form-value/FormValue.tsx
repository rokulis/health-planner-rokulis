import React from 'react';

interface Props {
  label: string;
  value?: string | number | boolean;
}

export const FormValue: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};
