'use client';

import { format, parseISO, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function formatDateString(dateString: string | Date): string {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
}

const parseAndValidateDate = (dateString?: string | null): Date | undefined => {
  if (!dateString || dateString === '0000-00-00') return undefined;
  const parsed = parseISO(dateString);
  return isValid(parsed) ? parsed : undefined;
};

const formatDisplayDate = (date: Date | undefined): React.ReactNode => {
  return date ? format(date, 'PPP') : <span>Pick a date</span>;
};

export interface DatePickerProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  error?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  error,
  className
}: DatePickerProps) {
  const date = parseAndValidateDate(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            error && 'border-destructive focus:ring-destructive',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDisplayDate(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          captionLayout="dropdown-buttons"
          fromYear={1800}
          toYear={2025}
          mode="single"
          selected={date}
          onSelect={newDate =>
            onChange?.(newDate ? formatDateString(newDate) : null)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
