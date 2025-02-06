import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Cell, flexRender } from '@tanstack/react-table';
import * as React from 'react';
import { getCommonPinningStyles } from './lib/data-table';
import { type ColumnMeta } from './types';

interface DataTableCellProps<TData> {
  cell: Cell<TData, unknown>;
  onSubmit?: (data: { id: string } & Record<string, any>) => Promise<boolean>;
}

export function DataTableCell<TData>({
  cell,
  onSubmit
}: DataTableCellProps<TData>) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const columnMeta = cell.column.columnDef.meta as ColumnMeta | undefined;
  const isEditable = columnMeta?.isEditable ?? false;

  const handleClick = () => {
    if (!isEditable || !onSubmit) return;
    setValue(String(cell.getValue()));
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
        id: String((cell.row.original as any).id),
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
      const currentValue = columnMeta.field
        ? String((cell.row.original as any)[columnMeta.field.split('.')[0]]?.id)
        : String(cell.getValue());

      return (
        <Select
          defaultValue={currentValue}
          onOpenChange={setIsEditing}
          onValueChange={async (newValue) => {
            setValue(newValue);
            await handleSubmit(newValue);
            setIsEditing(false);
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {columnMeta.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    // Other type fields editing
    if (isEditing) {
      return (
        <div className="relative">
          <Input
            ref={inputRef}
            value={value}
            onChange={e => {
              setValue(e.target.value);
              validate(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className={cn(
              "h-8",
              error && "border-destructive focus-visible:ring-destructive"
            )}
            disabled={isSubmitting}
          />
          {error && (
            <div className="absolute left-0 top-full mt-1 text-xs text-destructive">
              {error}
            </div>
          )}
        </div>
      );
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
        'relative',
        isEditable && !isEditing && 'cursor-pointer hover:bg-muted/50',
        isSubmitting && 'opacity-50'
      )}
      onClick={handleClick}
      tabIndex={isEditable ? 0 : undefined}
      onBlur={(e) => {
        // Only handle blur for non-select inputs
        if (columnMeta?.type !== 'tag' && !e.currentTarget.contains(e.relatedTarget)) {
          setIsEditing(false);
          setError(null);
        }
      }}
    >
      {renderContent()}
    </TableCell>
  );
}
