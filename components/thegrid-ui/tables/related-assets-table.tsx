'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { TableContainer } from '../lenses/base/components/table-container';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';

type ProductAssetRelationships =
  ProductFieldsFragmentFragment['productAssetRelationships'];
type ProductAssetRelationship = NonNullable<ProductAssetRelationships>[number];

const columns: ColumnDef<ProductAssetRelationship>[] = [
  {
    accessorKey: 'asset.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset" />
    )
  },
  {
    accessorKey: 'assetSupportType.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Support Type" />
    )
  }
];

type RelatedAssetsTableProps = {
  productAssetRelationships?: ProductAssetRelationships;
};

export function RelatedAssetsTable({
  productAssetRelationships
}: RelatedAssetsTableProps) {
  const data = useMemo(() => {
    return productAssetRelationships ?? [];
  }, [productAssetRelationships]);

  const table = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / 10),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    }
  });

  return (
    <TableContainer title="Related Assets">
      <div className="space-y-4">
        <DataTable table={table} />
      </div>
    </TableContainer>
  );
}
