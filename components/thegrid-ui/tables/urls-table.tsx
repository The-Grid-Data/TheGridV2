'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { TableContainer } from '../lenses/base/components/table-container';

type Urls = ProductFieldsFragmentFragment['urls'];
type Url = NonNullable<Urls>[number];

const columns: ColumnDef<Url>[] = [
  {
    accessorKey: 'url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    )
  },
  {
    accessorKey: 'urlType.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    )
  },
  {
    accessorKey: 'urlType.definition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Definition" />
    )
  }
];

type UrlsTableProps = {
  urls: Urls;
};

export function UrlsTable({ urls }: UrlsTableProps) {
  const data = useMemo(() => {
    return urls ?? [];
  }, [urls]);

  const table = useDataTable({
    data,
    columns,
    isEditable: true,
    onCellSubmit: async ({ id, field, value }) => {
      // TODO: Implement the actual update logic here
      console.log('Updating cell:', { id, field, value });
      return true; // Return true to indicate success
    },
    pageCount: Math.ceil(urls?.length ?? 0 / 10),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    }
  });

  return (
    <TableContainer title="URLs">
      <div className="space-y-4">
        <DataTable table={table} />
      </div>
    </TableContainer>
  );
}
