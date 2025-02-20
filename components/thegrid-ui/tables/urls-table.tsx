'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { useTableCellUpdater } from '@/hooks/use-table-cell-updater';
import {
  AssetFieldsFragmentFragment,
  EntityFieldsFragmentFragment,
  ProductFieldsFragmentFragment,
  ProfileInfoFragmentFragment
} from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { LENS_NAME_TO_TABLE_ID, LENS_NAME_TO_URL_TYPE_ID, useUrlsApi } from '@/lib/rest-api/urls';
import { getTgsData } from '@/lib/tgs';
import { type ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';

type Urls =
  | ProductFieldsFragmentFragment['urls']
  | AssetFieldsFragmentFragment['urls']
  | ProfileInfoFragmentFragment['urls']
  | EntityFieldsFragmentFragment['urls'];
type Url = NonNullable<Urls>[number];

const urlTypeData = getTgsData('urls.urlType');
const urlTypeOptions =
  urlTypeData.isDataValid && urlTypeData.is_enum === 'true'
    ? urlTypeData.possible_values.map(value => ({
        label: value.name,
        value: value.id,
        description: value.definition
      }))
    : [];

type UrlsTableProps = {
  urls: Urls;
  rootId: string;
  lensName: string;
  lensRowId: string;
};



export function UrlsTable({
  urls,
  rootId,
  lensName,
  lensRowId
}: UrlsTableProps) {
  const client = useRestApiClient();
  const urlsApi = useUrlsApi(client);
  const { updatingCellId, handleCellSubmit } = useTableCellUpdater({ rootId });

  // Filter URL type options based on lens name
  const filteredUrlTypeOptions = React.useMemo(() => {
    const allowedTypeIds =
      LENS_NAME_TO_URL_TYPE_ID[
        lensName as keyof typeof LENS_NAME_TO_URL_TYPE_ID
      ] ?? [];
    return urlTypeOptions.filter(option =>
      allowedTypeIds.includes(option.value)
    );
  }, [lensName]);

  const columns: ColumnDef<Url, any>[] = React.useMemo(
    () => [
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
          options: filteredUrlTypeOptions,
          field: 'urlType.id',
          dbColumn: 'urlTypeId',
        } satisfies ColumnMeta
      }
    ],
    [filteredUrlTypeOptions]
  );

  const table = useDataTable({
    data: urls ?? [],
    columns,
    pageCount: 1,
    getRowId: row => row.id,
    onCellSubmit: async data => {
      return handleCellSubmit(data, async (inputData) => {
        const result = await urlsApi.upsert({
          ...inputData,
          tableId: LENS_NAME_TO_TABLE_ID[lensName as keyof typeof LENS_NAME_TO_TABLE_ID],
          rowId: lensRowId
        });
        return result.success;
      });
    },
  });

  return (
    <DataTable
      table={table}
      hideFooter
      filterFields={[]}
      updatingCellId={updatingCellId}
      displayAddRowButton
      addRowButtonLabel="Add URL"
    />
  );
}
