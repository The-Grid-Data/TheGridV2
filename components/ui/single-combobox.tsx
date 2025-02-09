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
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export type Option = {
  value: string;
  label: string;
  description?: string;
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'flex w-full flex-1 justify-between gap-2 truncate',
              error && 'border-destructive',
              className
            )}
            {...props}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="w-fit gap-0 rounded-md p-0"
          aria-describedby={undefined}
        >
          <VisuallyHidden asChild>
            <DialogTitle>{placeholder}</DialogTitle>
          </VisuallyHidden>
          <OptionList
            options={options}
            setOpen={setOpen}
            onSelect={onValueChange}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex w-full flex-1 justify-between gap-2 truncate',
            error && 'border-destructive',
            className
          )}
          {...props}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 flex-shrink-0 opacity-50" />
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
      <CommandList className="min-h-[300px] w-[400px] overflow-y-auto">
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
              <div>
                <div className="text font-medium">{option.label}</div>
                {option.description !== null && (
                  <div className="text text-sm text-muted-foreground">
                    {option.description || 'No description provided'}
                  </div>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
