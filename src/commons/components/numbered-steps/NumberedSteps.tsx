import React from 'react';

import cx from 'classnames';

interface Props {
  number: number;
  children: React.ReactNode;
  className?: string;
}

export const NumberedSteps: React.FC<Props> = ({
  number,
  children,
  className,
}) => {
  return (
    <div className="relative flex w-full gap-2 pr-8 pb-2">
      <div className="absolute right-0 top-0 bottom-0 border-r border-primary">
        <div className="absolute top-0 right-0 left-0 -translate-x-1/2 border bg-white rounded-full border-primary text-primary w-5 h-5 flex items-center text-sm justify-center">
          {number}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-primary w-2 h-2 -translate-x-1/2 rounded-full" />
      </div>
      <div className={cx('w-full', className)}>{children}</div>
    </div>
  );
};
