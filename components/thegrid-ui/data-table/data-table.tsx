import * as React from 'react';
import {
  flexRender,
  Row,
  type Table as TanstackTable
} from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getCommonPinningStyles } from './lib/data-table';
import { DataTablePagination } from './data-table-pagination';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Fragment } from 'react';

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

  renderSubRow?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData>({
  table,
  floatingBar = null,
  children,
  className,
  renderSubRow,
  ...props
}: DataTableProps<TData>) {
  const [openRows, setOpenRows] = React.useState<Record<string, boolean>>({});

  const toggleRow = (rowId: string) => {
    setOpenRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  return (
    <div
      className={cn('w-full space-y-2.5 overflow-auto', className)}
      {...props}
    >
      {children}
      <div className="overflow-hidden rounded-md border">
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
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getCommonPinningStyles({ column: cell.column })
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {openRows[row.id] && (
                      <TableRow key={`${row.id}-subrow`}>
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
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column })
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    table.getAllColumns().length + (renderSubRow ? 1 : 0)
                  }
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
    </div>
  );
}
