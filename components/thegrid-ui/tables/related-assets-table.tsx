'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { TableContainer } from '../lenses/base/components/table-container';

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
    pageCount: 1,
  });

  return (
    <TableContainer title="Related Assets">
      <div className="space-y-4">
        <DataTable table={table} hideFooter />
      </div>
    </TableContainer>
  );
}
