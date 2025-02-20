'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { useTableCellUpdater } from '@/hooks/use-table-cell-updater';
import { execute } from '@/lib/graphql/execute';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useSupportsProductsApi } from '@/lib/rest-api/supports-products';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';
import { ProductsLayersDictionaryQuery } from './deployments-table';

type SupportsProducts = ProductFieldsFragmentFragment['supportsProducts'];
type SupportsProduct = NonNullable<SupportsProducts>[number];

type SupportsProductsTableProps = {
  supportsProducts?: SupportsProducts;
  productId: string;
  rootId: string;
};

export function SupportsProductsTable({
  supportsProducts,
  productId,
  rootId
}: SupportsProductsTableProps) {
  const data = useMemo(() => {
    return supportsProducts ?? [];
  }, [supportsProducts]);

  const {
    data: productsLayersDictionaryData,
    isLoading: productsLayersDictionaryLoading
  } = useQuery({
    queryKey: ['products-layers-dictionary'],
    queryFn: () => execute(ProductsLayersDictionaryQuery)
  });
  const productsLayersDictionaryOptions = useMemo(() => {
    return (
      productsLayersDictionaryData?.products
        ?.map(item => ({
          value: item.id,
          label: item.name,
          description: item.description
        }))
        ?.sort((a, b) => a.label.localeCompare(b.label)) ?? []
    );
  }, [productsLayersDictionaryData]);

  const columns: ColumnDef<SupportsProduct, any>[] = useMemo(
    () => [
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
          field: 'supportsProduct.id',
          dbColumn: 'supportsProductId'
        } satisfies ColumnMeta
      }
    ],
    [productsLayersDictionaryOptions]
  );

  const client = useRestApiClient();
  const supportsProductsApi = useSupportsProductsApi(client);
  const { updatingCellId, handleCellSubmit } = useTableCellUpdater({ rootId });

  const table = useDataTable({
    data,
    columns,
    pageCount: 1,
    getRowId: row => row.id,
    onCellSubmit: async data => {
      return handleCellSubmit(data, async (inputData) => {
        const result = await supportsProductsApi.upsert({
          ...inputData,
          productId
        });
        return !!result;
      });
    }
  });

  return (
    <DataTable
      table={table}
      hideFooter
      displayAddRowButton
      addRowButtonLabel="Add Product"
      updatingCellId={updatingCellId}
    />
  );
}
