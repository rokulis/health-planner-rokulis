import React from 'react';

import cx from 'classnames';

interface Props {
  label: string;
  value?: string | number | boolean;
  className?: string;
}

export const FormValue: React.FC<Props> = ({ label, value, className }) => {
  return (
    <div className={cx('flex gap-2 items-center', className)}>
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};
