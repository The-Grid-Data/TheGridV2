'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';

export type Option = {
  value: string;
  label: string;
};
export type SingleComboboxProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  options: Option[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  error?: string;
};

export function SingleCombobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option...',
  className,
  error,
  ...props
}: SingleComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const selectedOption = options.find(option => option.value === value);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-between',
              error && 'border-destructive',
              className
            )}
            {...props}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <OptionList
            options={options}
            setOpen={setOpen}
            onSelect={onValueChange}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between',
            error && 'border-destructive',
            className
          )}
          {...props}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionList
            options={options}
            setOpen={setOpen}
            onSelect={onValueChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  options,
  setOpen,
  onSelect
}: {
  options: Option[];
  setOpen: (open: boolean) => void;
  onSelect?: (value: string | null) => void;
}) {
  return (
    <Command
      filter={(value, search) => {
        const item = options.find(item => item.value === value);
        if (!item) return 0;
        if (item.label.toLowerCase().includes(search.toLowerCase())) return 1;

        return 0;
      }}
    >
      <CommandInput placeholder="Filter options..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map(option => (
            <CommandItem
              keywords={[option.label]}
              key={option.value}
              value={option.value}
              onSelect={value => {
                onSelect?.(value);
                setOpen(false);
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
