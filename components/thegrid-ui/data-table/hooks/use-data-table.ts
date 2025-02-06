'use client';

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type TableOptions,
  type TableState,
  type Updater,
  type VisibilityState
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import type {
  DataTableFilterField,
  DataTableMeta,
  ExtendedSortingState
} from '../types';

export interface UseDataTableProps<TData>
  extends Omit<
    TableOptions<TData>,
    // | 'data'
    | 'state'
    | 'pageCount'
    | 'getCoreRowModel'
    | 'manualFiltering'
    | 'manualPagination'
    | 'manualSorting'
    | 'meta'
  > {
  /**
   * Total number of pages
   * @default -1
   */
  pageCount: number;

  /**
   * Enable cell editing functionality
   * @default false
   */
  isEditable?: boolean;

  /**
   * Callback when a cell is edited
   * @param data { id: string } & Record<string, any>
   */
  onCellSubmit?: (
    data: { id: string } & Record<string, any>
  ) => Promise<boolean>;

  /**
   * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
   * - Faceted filters are rendered when `options` are provided for a filter field.
   * - Otherwise, search filters are rendered.
   * @default []
   */
  filterFields?: DataTableFilterField<TData>[];

  /**
   * Enable notion like column filters.
   * Advanced filters and column filters cannot be used at the same time.
   * @default false
   */
  enableAdvancedFilter?: boolean;

  /**
   * Enable row selection
   * @default false
   */
  enableRowSelection?: boolean;

  /**
   * Enable column resizing
   * @default false
   */
  enableColumnResizing?: boolean;

  /**
   * Enable column pinning
   * @default false
   */
  enablePinning?: boolean;

  /**
   * Initial state for the table
   */
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: ExtendedSortingState<TData>;
  };

  // data?: TableOptions<TData>['data'] | null;

  /**
   * Callback when state changes
   */
  onStateChange?: (updater: Updater<TableState>) => void;

  meta?: DataTableMeta<TData>;
}

export function useDataTable<TData>({
  pageCount = -1,
  filterFields = [],
  enableAdvancedFilter = false,
  enableRowSelection = false,
  enableColumnResizing = false,
  enablePinning = false,
  initialState,
  onStateChange,
  onCellSubmit,
  isEditable,
  meta: customMeta,
  ...props
}: UseDataTableProps<TData>) {
  // Row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  );

  // Pagination state
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialState?.pagination?.pageSize ?? 10
  });

  // Sorting state
  const [sorting, setSorting] = useState<ExtendedSortingState<TData>>(
    initialState?.sorting ?? []
  );

  // Column filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? []
  );

  // Create meta object for custom options
  const meta = {
    ...customMeta,
    onCellSubmit
  } as DataTableMeta<TData>;

  // Create the table instance
  const table = useReactTable({
    ...props,
    pageCount,
    state: {
      rowSelection: enableRowSelection ? rowSelection : {},
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize
      },
      sorting,
      columnFilters,
      columnOrder: initialState?.columnOrder ?? [],
      columnPinning: initialState?.columnPinning ?? {},
      rowPinning: initialState?.rowPinning ?? {},
      globalFilter: initialState?.globalFilter ?? '',
      expanded: initialState?.expanded ?? {}
    },
    enableRowSelection,
    enableColumnResizing,
    enablePinning,
    meta, // Pass custom options through meta
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: updaterOrValue => {
      if (typeof updaterOrValue === 'function') {
        const newSorting = updaterOrValue(
          sorting
        ) as ExtendedSortingState<TData>;
        setSorting(newSorting);
      } else {
        setSorting(updaterOrValue as ExtendedSortingState<TData>);
      }
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  // Call onStateChange when any state changes
  useEffect(() => {
    onStateChange?.(state => ({
      ...state,
      rowSelection,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize
      },
      sorting,
      columnFilters
    }));
  }, [
    rowSelection,
    columnVisibility,
    pageIndex,
    pageSize,
    sorting,
    columnFilters,
    onStateChange
  ]);

  return table;
}
