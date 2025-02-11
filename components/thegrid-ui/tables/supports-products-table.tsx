'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';
import { TableContainer } from '../lenses/base/components/table-container';

type SupportsProducts =
  ProductFieldsFragmentFragment['supportsProducts'];
type SupportsProduct = NonNullable<SupportsProducts>[number];

const columns: ColumnDef<SupportsProduct, any>[] = [
  {
    accessorKey: 'supportsProduct.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => row.original.supportsProduct?.name,
    meta: {
        type: 'tag',
        isEditable: true,
        options: [{
          label: 'Supports',
          value: 'supports'
        }, {
          label: 'Requires',
          value: 'requires'
        }],
        field: 'supportsProduct.id'
      } satisfies ColumnMeta
    },
];

type SupportsProductsTableProps = {
  supportsProducts?: SupportsProducts;
};

export function SupportsProductsTable({
  supportsProducts
}: SupportsProductsTableProps) {
  const data = useMemo(() => {
    return supportsProducts ?? [];
  }, [supportsProducts]);

  const table = useDataTable({
    data,
    columns,
    pageCount: 1,
    onCellSubmit: async (data) => {
        try {
          console.log(data);
          return true;
        } catch (error) {
          console.error('Failed to update URL:', error);
          return false;
        }
      }
    });

  return (
    <TableContainer title="Supports Products">
      <div className="space-y-4">
        <DataTable table={table} hideFooter />
      </div>
    </TableContainer>
  );
}
