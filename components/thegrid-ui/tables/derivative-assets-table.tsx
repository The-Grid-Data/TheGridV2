'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { execute } from '@/lib/graphql/execute';
import { AssetFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useDerivativeAssetsApi } from '@/lib/rest-api/derivative-assets';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';
import { AssetsDictionaryQuery } from './product-asset-relationships-table';

type DerivativeAssets = AssetFieldsFragmentFragment['derivativeAssets'];
type DerivativeAsset = NonNullable<DerivativeAssets>[number];

type DerivativeAssetsTableProps = {
  derivativeAssets?: DerivativeAssets;
  assetId: string;
  rootId: string;
};

export function DerivativeAssetsTable({
  derivativeAssets,
  assetId,
  rootId
}: DerivativeAssetsTableProps) {
  const data = useMemo(() => {
    return derivativeAssets ?? [];
  }, [derivativeAssets]);

  const { data: assetsDictionaryData } = useQuery({
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

  const columns: ColumnDef<DerivativeAsset, any>[] = useMemo(
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
          field: 'derivativeAsset.id'
        } satisfies ColumnMeta
      }
    ],
    [assetsDictionaryOptions]
  );

  const client = useRestApiClient();
  const derivativeAssetsApi = useDerivativeAssetsApi(client);
  const queryClient = useQueryClient();

  const table = useDataTable({
    data,
    columns,
    pageCount: 1,
    getRowId: row => row.id,
    onCellSubmit: async data => {
      try {
        await derivativeAssetsApi.upsert({
          ...data,
          baseAssetId: assetId
        });
        queryClient.invalidateQueries({
          queryKey: ['profile', rootId],
          exact: true,
          refetchType: 'all'
        });
        if (rootId) {
          queryClient.invalidateQueries({
            queryKey: ['validation-logs', rootId],
            exact: true,
            refetchType: 'all'
          });
        }
        return true;
      } catch (error) {
        console.error('Failed to upsert derivative asset:', error);
        return false;
      }
    }
  });

  return <DataTable table={table} hideFooter />;
}
