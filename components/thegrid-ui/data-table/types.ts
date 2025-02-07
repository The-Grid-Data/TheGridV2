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

export type ColumnType = 'text' | 'tag' | 'url' | 'date' | 'number';

export interface ColumnMeta {
  type?: ColumnType;
  isEditable?: boolean;
  validation?: (value: any) => boolean | string; // return string for error message
  options?: { label: string; value: string }[];
  field?: string; // The actual field to update, if different from the accessor
}

export interface DataTableMeta<TData> {
  onCellSubmit?: (
    data: { id: string } & Record<string, any>
  ) => Promise<boolean>;
}

export type Filter<TData> = Prettify<{
  id: StringKeyOf<TData>;
}>;

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  type: 'update' | 'delete';
}
