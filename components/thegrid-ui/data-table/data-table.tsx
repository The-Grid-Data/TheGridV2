import {
  flexRender,
  Row,
  type Table as TanstackTable
} from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Fragment } from 'react';
import { DataTableCell } from './data-table-cell';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { getCommonPinningStyles } from './lib/data-table';
import type { DataTableFilterField, DataTableMeta } from './types';
import { Progress } from '@/components/ui/progress';

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;

  /**
   * The floating bar to render at the bottom of the table on row selection.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBar={<TasksTableFloatingBar table={table} />}
   */
  floatingBar?: React.ReactNode | null;

  /**
   * Hide the table footer which includes pagination
   * @default false
   * @type boolean
   */
  hideFooter?: boolean;

  /**
   * Hide the table toolbar
   * @default false
   */
  hideToolbar?: boolean;

  /**
   * Filter fields for the toolbar
   */
  filterFields?: DataTableFilterField<TData>[];

  /**
   * Enable/disable adding new rows
   * @default true
   */
  displayAddRowButton?: boolean;

  /**
   * Label for the add row button
   * @default "Add row"
   */
  addRowButtonLabel?: string;

  renderSubRow?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData>({
  table,
  floatingBar = null,
  children,
  className,
  renderSubRow,
  displayAddRowButton = false,
  addRowButtonLabel = 'Add row',
  hideFooter = false,
  hideToolbar = false,
  filterFields = [],
  ...props
}: DataTableProps<TData>) {
  const [openRows, setOpenRows] = React.useState<Record<string, boolean>>({});
  const [hasEmptyRow, setHasEmptyRow] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Get editable config from table meta
  const meta = table.options.meta as DataTableMeta<TData>;
  const onCellSubmit = meta?.onCellSubmit;
  const setData = meta?.setData;

  const toggleRow = (rowId: string) => {
    setOpenRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const onAddRow = () => {
    if (!setData || hasEmptyRow || !displayAddRowButton) return;

    const newRow = {
      id: ''
    } as TData & { id: string };

    setData(prev => [...prev, newRow]);
    setHasEmptyRow(true);
  };

  const handleCellSubmit = async (
    data: { id: string } & Record<string, any>
  ) => {
    if (!onCellSubmit) return false;

    setIsSubmitting(true);
    try {
      const success = await onCellSubmit(data);
      if (success) {
        setHasEmptyRow(false);
      }
      return success;
    } catch (error) {
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const addButton = (
    <Button
      onClick={onAddRow}
      variant="outline"
      size="sm"
      className="h-8"
      disabled={hasEmptyRow}
    >
      <Plus className="mr-2 size-4" />
      {addRowButtonLabel}
    </Button>
  );

  return (
    <div
      className={cn('w-full space-y-2.5 overflow-auto', className)}
      {...props}
    >
      {children}

      <div className="overflow-hidden rounded-md border">
        {isSubmitting && <Progress indeterminate />}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {renderSubRow && <TableHead colSpan={1} />}
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getCommonPinningStyles({ column: header.column })
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row =>
                renderSubRow ? (
                  <Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && 'selected'}>
                      <TableCell className="w-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRow(row.id)}
                          aria-expanded={openRows[row.id] ? 'true' : 'false'}
                          aria-label="Toggle"
                        >
                          {openRows[row.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </TableCell>
                      {row.getVisibleCells().map(cell => (
                        <DataTableCell
                          isNewRow={row.id === ''}
                          key={cell.id}
                          cell={cell}
                          onSubmit={handleCellSubmit}
                        />
                      ))}
                    </TableRow>
                    {openRows[row.id] && (
                      <TableRow
                        key={`${row.id}-subrow`}
                        className="bg-foreground/5 hover:bg-foreground/5"
                      >
                        <TableCell colSpan={table.getAllColumns().length + 1}>
                          {renderSubRow(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ) : (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <DataTableCell
                        isNewRow={row.id === ''}
                        key={cell.id}
                        cell={cell}
                        onSubmit={handleCellSubmit}
                      />
                    ))}
                  </TableRow>
                )
              )
            ) : (
              <>
                <TableRow>
                  <TableCell
                    className="h-24"
                    colSpan={
                      table.getAllColumns().length + (renderSubRow ? 1 : 0)
                    }
                  >
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span>No results.</span>
                      {addButton}
                    </div>
                  </TableCell>
                </TableRow>
                {displayAddRowButton && (
                  <TableRow>
                    <TableCell
                      colSpan={
                        table.getAllColumns().length + (renderSubRow ? 1 : 0)
                      }
                      className="text-center"
                    ></TableCell>
                  </TableRow>
                )}
              </>
            )}
            {table.getRowModel().rows?.length > 0 && displayAddRowButton && (
              <TableRow>
                <TableCell
                  colSpan={
                    table.getAllColumns().length + (renderSubRow ? 1 : 0)
                  }
                >
                  {addButton}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        {!hideToolbar && (
          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            disableAddRow={hasEmptyRow}
          />
        )}
        {!hideFooter && <DataTablePagination table={table} />}
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
    </div>
  );
}
