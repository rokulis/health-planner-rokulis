'use client';

import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/commons/components/ui/button';
import { Calendar } from '@/commons/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/commons/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateNavigatorProps {
  className?: string;
  onDateChange?: (date: string) => void;
}

export function DateNavigator({ className, onDateChange }: DateNavigatorProps) {
  const searchParams = useSearchParams();

  // Initialize date from URL param or current date
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      // Parse the YYYY-DD-MM format
      const [year, month, day] = dateParam.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Format date for display (YYYY-MM-DD)
  const formatDisplayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format date for URL param and callback (YYYY-MM-DD)
  const formatUrlDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
    onDateChange?.(formatUrlDate(newDate));
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    handleDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    handleDateChange(nextDay);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-lg px-4 py-3 max-w-sm mx-auto',
        className
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPreviousDay}
        className="h-8 w-8 p-0 hover:bg-gray-200"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous day</span>
      </Button>

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild={true}>
          <Button
            variant="ghost"
            className="text-lg font-medium bg-muted-foreground/5 h-auto py-2 px-4"
          >
            {formatDisplayDate(currentDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            weekStartsOn={1} // Start week on Monday
            mode="single"
            selected={currentDate}
            onSelect={date => {
              if (date) {
                handleDateChange(date);
                setIsCalendarOpen(false);
              }
            }}
            initialFocus={true}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="sm"
        onClick={goToNextDay}
        className="h-8 w-8 p-0 hover:bg-gray-200"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next day</span>
      </Button>
    </div>
  );
}
