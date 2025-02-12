'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated/gql';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useProductAssetRelationshipsApi } from '@/lib/rest-api/product-asset-relationships';
import { getTgsData } from '@/lib/tgs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { ColumnMeta } from '../data-table/types';
import { TableContainer } from '../lenses/base/components/table-container';

type ProductAssetRelationships =
  ProductFieldsFragmentFragment['productAssetRelationships'];
type ProductAssetRelationship = NonNullable<ProductAssetRelationships>[number];

export const AssetsDictionaryQuery = graphql(`
  query getAssetsDictionary {
    assets {
      id
      name
    }
  }
`);

const assetSupportTypeData = getTgsData('assets.assetSupportTypes');
const assetSupportTypeOptions =
  assetSupportTypeData.isDataValid && assetSupportTypeData.is_enum === 'true'
    ? assetSupportTypeData.possible_values.map(value => ({
        label: value.name,
        value: value.id
      }))
    : [];

type ProductAssetRelationshipsTableProps = {
  productAssetRelationships?: ProductAssetRelationships;
  productId: string;
  rootId: string;
};

export function ProductAssetRelationshipsTable({
  productAssetRelationships,
  productId,
  rootId
}: ProductAssetRelationshipsTableProps) {
  const { data: assetsDictionaryData, isLoading: assetsDictionaryLoading } =
    useQuery({
      queryKey: ['assets-dictionary'],
      queryFn: () => execute(AssetsDictionaryQuery)
    });
  const assetsDictionaryOptions = useMemo(() => {
    return (
      assetsDictionaryData?.assets
        ?.map(item => ({
          value: item.id,
          label: item.name
        }))
        ?.sort((a, b) => a.label.localeCompare(b.label)) ?? []
    );
  }, [assetsDictionaryData]);

  const columns: ColumnDef<ProductAssetRelationship>[] = useMemo(
    () => [
      {
        accessorKey: 'asset.name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Asset" />
        ),
        meta: {
          type: 'tag',
          isEditable: true,
          options: assetsDictionaryOptions,
          field: 'asset.id'
        } satisfies ColumnMeta
      },
      {
        accessorKey: 'assetSupportType.name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Support Type" />
        ),
        meta: {
          type: 'tag',
          isEditable: true,
          options: assetSupportTypeOptions,
          field: 'typeOfSupport.id'
        } satisfies ColumnMeta
      }
    ],
    [assetsDictionaryOptions]
  );

  const productAssetRelationshipsData = useMemo(() => {
    return productAssetRelationships ?? [];
  }, [productAssetRelationships]);

  const client = useRestApiClient();
  const productAssetRelationshipsApi = useProductAssetRelationshipsApi(client);
  const queryClient = useQueryClient();

  const table = useDataTable({
    data: productAssetRelationshipsData,
    columns,
    pageCount: 1,
    getRowId: row => row.id,
    onCellSubmit: async data => {
      try {
        await productAssetRelationshipsApi.upsert({
          ...data,
          productId
        });
        queryClient.invalidateQueries({
          queryKey: ['profile', rootId],
          exact: true,
          refetchType: 'all'
        });
        return true;
      } catch (error) {
        console.error('Failed to upsert product asset relationship:', error);
        return false;
      }
    }
  });

  return <DataTable table={table} hideFooter />;
}
