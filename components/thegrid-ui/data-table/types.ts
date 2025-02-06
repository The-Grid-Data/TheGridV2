import type { ColumnSort, Row } from '@tanstack/react-table';
import type { ComponentType } from 'react';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
  count?: number;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, 'id'> {
  id: StringKeyOf<TData>;
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>;
  label: string;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi-select';
}

export interface DataTableMeta<TData> {
  isEditable?: boolean;
  onCellSubmit?: (data: {
    id: string;
    field: string;
    value: any;
  }) => Promise<boolean>;
}

export type Filter<TData> = Prettify<{
  id: StringKeyOf<TData>;
}>;

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: 'update' | 'delete';
}
