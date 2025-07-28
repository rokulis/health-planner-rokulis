'use client';

import * as React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/commons/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  size?: 'default' | 'sm';
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker> & Props) {
  const { size = 'default' } = props;
  const isSmall = size === 'sm';
  const cellSize = isSmall ? 'w-[52px] h-[52px]' : 'w-[62px] h-[62px]';
  const cellPadding = isSmall ? 'p-0' : 'p-0';

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 !border-0 bg-white rounded-xl', className)}
      classNames={{
        months: 'flex flex-col justify-center',
        month: 'space-y-4',
        caption:
          'flex justify-between pt-1 relative items-end border-b border-dark-blue pb-2 mb-2',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'left-1',
        nav_button_next: 'right-1',
        table: 'w-full border-collapse space-y-0',
        head_row: 'flex',
        head_cell: cn(
          'text-muted-foreground rounded-full w-[62px] font-normal text-xl',
          cellSize
        ),
        row: 'flex w-full',
        cell: cn(
          'relative w-[62px] p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-white/5 [&:has([aria-selected].day-outside)]:bg-white/5 [&:has([aria-selected].day-range-end)]:rounded-r-full',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full'
            : '[&:has([aria-selected])]:rounded-full',
          cellSize,
          cellPadding
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-[62px] w-[62px] p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
        day_today: 'bg-primary/50 text-white',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-transparent aria-selected:text-muted-foreground',
        day_disabled: 'text-white/5 aria-selected:bg-transparent',
        day_range_middle:
          'aria-selected:bg-transparent aria-selected:text-white',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className: iconClassname, ...iconProps }) => (
          <ChevronLeft
            className={cn('h-8 w-8', iconClassname)}
            {...iconProps}
          />
        ),
        IconRight: ({ className: iconClassname, ...iconProps }) => (
          <ChevronRight
            className={cn('h-8 w-8', iconClassname)}
            {...iconProps}
          />
        ),
        CaptionLabel: captionLabelProps => (
          <div className="flex flex-col text-left">
            {captionLabelProps.displayMonth.toLocaleDateString('default', {
              month: 'long',
            })}
          </div>
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
