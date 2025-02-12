'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { execute } from '@/lib/graphql/execute';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useSupportsProductsApi } from '@/lib/rest-api/supports-products';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';
import { TableContainer } from '../lenses/base/components/table-container';
import { ProductsLayersDictionaryQuery } from './deployments-table';

type SupportsProducts =
  ProductFieldsFragmentFragment['supportsProducts'];
type SupportsProduct = NonNullable<SupportsProducts>[number];


type SupportsProductsTableProps = {
  supportsProducts?: SupportsProducts;
  rootId: string;
};

export function SupportsProductsTable({
  supportsProducts,
  rootId
}: SupportsProductsTableProps) {
  const data = useMemo(() => {
    return supportsProducts ?? [];
  }, [supportsProducts]);

  const { data: productsLayersDictionaryData, isLoading: productsLayersDictionaryLoading } = useQuery({
    queryKey: ['products-layers-dictionary'],
    queryFn: () => execute(ProductsLayersDictionaryQuery)
  });
  const productsLayersDictionaryOptions = useMemo(() => {
    return (
      productsLayersDictionaryData?.products?.map(item => ({
        value: item.id,
        label: item.name
      }))?.sort((a, b) => a.label.localeCompare(b.label)) ?? []
    );
  }, [productsLayersDictionaryData]);

  const columns: ColumnDef<SupportsProduct, any>[] = useMemo(() => [
    {
      accessorKey: 'supportsProduct.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }) => row.original.supportsProduct?.name,
      meta: {
          type: 'tag',
          isEditable: true,
          options: productsLayersDictionaryOptions,
          field: 'supportsProduct.id'
        } satisfies ColumnMeta
      },
  ], [productsLayersDictionaryOptions]);

  const client = useRestApiClient();
  const supportsProductsApi = useSupportsProductsApi(client);
  const queryClient = useQueryClient();

  const table = useDataTable({
    data,
    columns,
    pageCount: 1,
    getRowId: row => row.id,
    onCellSubmit: async (data) => {
        try {
          await supportsProductsApi.update(data);
          queryClient.invalidateQueries({
            queryKey: ['profile', rootId],
            exact: true,
            refetchType: 'all'
          });
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
