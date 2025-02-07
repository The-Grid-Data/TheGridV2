'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useUrlsApi } from '@/lib/rest-api/urls';
import { getTgsData } from '@/lib/tgs';
import { useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';
import { TableContainer } from '../lenses/base/components/table-container';

type Urls = ProductFieldsFragmentFragment['urls'];
type Url = NonNullable<Urls>[number];

const urlTypeData = getTgsData('urls.urlType');
const urlTypeOptions = urlTypeData.isDataValid && urlTypeData.is_enum === 'true'
  ? urlTypeData.possible_values.map(value => ({
      label: value.name,
      value: value.id
    }))
  : [];

const columns: ColumnDef<Url, any>[] = [
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    meta: {
      type: 'url',
      isEditable: true,
      validation: (value: string) => {
        try {
          new URL(value);
          return true;
        } catch {
          return 'Please enter a valid URL';
        }
      }
    } satisfies ColumnMeta
  },
  {
    accessorKey: 'urlType.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => row.original.urlType?.name,
    meta: {
      type: 'tag',
      isEditable: true,
      options: urlTypeOptions,
      field: 'urlType.id'
    } satisfies ColumnMeta
  },
];

type UrlsTableProps = {
  urls: Urls;
  rootId: string;
};

export function UrlsTable({ urls, rootId }: UrlsTableProps) {
  const client = useRestApiClient();
  const urlsApi = useUrlsApi(client);
  const queryClient = useQueryClient();

  const data = useMemo(() => {
    return urls ?? [];
  }, [urls]);

  const table = useDataTable({
    data,
    columns,
    pageCount: 1,
    onCellSubmit: async (data) => {
      try {
        await urlsApi.update(data);
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
    <TableContainer title="URLs">
      <div className="space-y-4">
        <DataTable table={table} hideFooter />
      </div>
    </TableContainer>
  );
}
