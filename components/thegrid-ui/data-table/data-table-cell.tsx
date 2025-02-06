import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Cell, flexRender } from '@tanstack/react-table';
import * as React from 'react';
import { getCommonPinningStyles } from './lib/data-table';

interface DataTableCellProps<TData> {
  cell: Cell<TData, unknown>;
  isEditable?: boolean;
  onSubmit?: (data: { id: string; field: string; value: any }) => Promise<boolean>;
}

export function DataTableCell<TData>({
  cell,
  isEditable,
  onSubmit
}: DataTableCellProps<TData>) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    if (!isEditable || !onSubmit) return;
    setValue(String(cell.getValue()));
    setIsEditing(true);
    // Focus input on next tick after render
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = async () => {
    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      const success = await onSubmit({
        id: cell.row.id,
        field: cell.column.id,
        value
      });

      if (success) {
        setIsEditing(false);
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
    }
  };

  return (
    <TableCell
      style={{
        ...getCommonPinningStyles({ column: cell.column })
      }}
      className={cn(
        isEditable && !isEditing && 'cursor-pointer hover:bg-muted/50',
        isSubmitting && 'opacity-50'
      )}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          className="h-8"
          disabled={isSubmitting}
        />
      ) : (
        flexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </TableCell>
  );
}
