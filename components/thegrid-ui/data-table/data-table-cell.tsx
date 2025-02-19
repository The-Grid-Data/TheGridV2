import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SingleCombobox } from '@/components/ui/single-combobox';
import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Cell, flexRender } from '@tanstack/react-table';
import { Loader2, Pencil, Save, X } from 'lucide-react';
import * as React from 'react';
import { getCommonPinningStyles } from './lib/data-table';
import { type ColumnMeta } from './types';

interface DataTableCellProps<TData> {
  cell: Cell<TData, unknown>;
  onSubmit?: (data: { id: string } & Record<string, any>) => Promise<boolean>;
  isNewRow?: boolean;
}

export function DataTableCell<TData>({
  cell,
  onSubmit,
  isNewRow
}: DataTableCellProps<TData>) {
  const [isEditing, setIsEditing] = React.useState(isNewRow);
  const [value, setValue] = React.useState<string>(
    String(cell.getValue() ?? '')
  );
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const columnMeta = cell.column.columnDef.meta as ColumnMeta | undefined;
  const isEditable = columnMeta?.isEditable ?? false;

  const handleClick = () => {
    if (!isEditable || !onSubmit) return;

    const cellValue = cell.getValue() ?? '';
    setValue(String(cellValue));
    setError(null);
    setIsEditing(true);

    // Focus input on next tick after render
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const validate = (value: string): boolean => {
    if (!columnMeta?.validation) return true;

    const result = columnMeta.validation(value);
    if (typeof result === 'string') {
      setError(result);
      return false;
    }
    setError(null);
    return result;
  };

  const handleSubmit = async (submitValue?: string) => {
    if (!onSubmit) return;

    const valueToSubmit = submitValue ?? value;
    if (!validate(valueToSubmit)) {
      return;
    }

    setIsSubmitting(true);
    try {
      let field = columnMeta?.field || cell.column.id;

      // Transform field.id to database format
      if (field.endsWith('.id')) {
        field = field.slice(0, -3) + 'Id';
      }

      const success = await onSubmit({
        id: cell.row.id,
        [field]: valueToSubmit
      });

      if (success) {
        setIsEditing(false);
        setError(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setError(null);
    }
  };

  const renderContent = () => {
    // Tag type field editing
    if (isEditing && columnMeta?.type === 'tag' && columnMeta.options) {
      let currentValue;
      if (columnMeta.field) {
        const fieldPath = columnMeta.field.split('.');
        let value = cell.row.original as any;
        for (const key of fieldPath) {
          value = value?.[key];
        }
        currentValue = String(value?.id ?? '');
      } else {
        currentValue = String(cell.getValue() ?? '');
      }

      return (
        <div className="flex items-center gap-2">
          <SingleCombobox
            value={currentValue}
            options={columnMeta.options}
            onValueChange={async newValue => {
              if (newValue) {
                setValue(newValue);
                await handleSubmit(newValue);
                setIsEditing(false);
              }
            }}
            className="h-8"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={e => {
              e.stopPropagation();
              setIsEditing(false);
            }}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    // Other type fields editing
    if (isEditing) {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-center gap-2">
            <Input
              ref={inputRef}
              value={value}
              onChange={e => {
                setValue(e.target.value);
                validate(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className={cn(
                'h-8',
                'rounded-md',
                error && 'border-destructive focus-visible:ring-destructive'
              )}
              disabled={isSubmitting}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={e => {
                e.stopPropagation();
                handleSubmit();
              }}
              className="h-6 w-6"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
          {error && (
            <div className="top-full mt-1 w-full text-xs text-destructive">
              {error}
            </div>
          )}
        </div>
      );
    }

    if (cell.getValue() === undefined) {
      return <div className="h-6">&nbsp;</div>;
    }

    // Tag type field rendering
    if (columnMeta?.type === 'tag') {
      return <Badge variant="secondary">{String(cell.getValue())}</Badge>;
    }

    // Other type fields rendering
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <TableCell
      style={{
        ...getCommonPinningStyles({ column: cell.column })
      }}
      className={cn(
        'group relative cursor-pointer',
        isEditable && !isEditing && 'hover:!bg-muted'
      )}
      tabIndex={isEditable ? 0 : undefined}
      onClick={handleClick}
      onBlur={e => {
        // Only handle blur for non-select inputs
        if (
          columnMeta?.type !== 'tag' &&
          !e.currentTarget.contains(e.relatedTarget)
        ) {
          setIsEditing(false);
          setError(null);
        }
      }}
    >
      <div className="relative">
        {renderContent()}
        {isEditable && !isEditing && (
          <button className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70 group-hover:opacity-100">
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-start bg-background pl-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    </TableCell>
  );
}
