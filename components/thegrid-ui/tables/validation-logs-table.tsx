'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { Validation } from '@/lib/graphql/generated/graphql';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { graphql } from '@/lib/graphql/generated';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ValidationLogsQuery = graphql(`
  query getValidationLog($where: validationBoolExp) {
    validation(where: $where) {
      referencedTable
      referencedField
      isPending
      field
      destinationValue
      createdAt
      committedAt
      comment
      updatedBy
      updatedFrom
      resolution
      resolvedAt
      resolvedBy
      rootId
      rowId
      sourceValue
    }
  }
`);

const columns: ColumnDef<Validation>[] = [
  {
    accessorKey: 'field',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Field" />
    )
  },
  {
    accessorKey: 'referencedTable',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referenced Table" />
    )
  },
  {
    accessorKey: 'referencedField',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referenced Field" />
    )
  },
  {
    accessorKey: 'isPending',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Pending" />
    )
  },
  {
    accessorKey: 'destinationValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination Value" />
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    )
  },
  {
    accessorKey: 'committedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Committed At" />
    )
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    )
  },
  {
    accessorKey: 'updatedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated By" />
    )
  },
  {
    accessorKey: 'updatedFrom',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated From" />
    )
  },
  {
    accessorKey: 'resolution',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolution" />
    )
  },
  {
    accessorKey: 'resolvedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolved At" />
    )
  },
  {
    accessorKey: 'resolvedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolved By" />
    )
  },
  {
    accessorKey: 'rootId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Root ID" />
    )
  },
  {
    accessorKey: 'rowId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Row ID" />
    )
  },
  {
    accessorKey: 'sourceValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source Value" />
    )
  }
];

type ValidationLogsTableProps = {
  rootId: string;
};

export function ValidationLogsTable({ rootId }: ValidationLogsTableProps) {
  const query = {
    where: { rootId: { _eq: rootId } }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['validation-logs', rootId],
    queryFn: () => execute(ValidationLogsQuery, query)
  });

  const validationLogs = useMemo(() => {
    return data?.validation ?? [];
  }, [data]);

  const table = useDataTable({
    data: validationLogs,
    //@ts-ignore
    columns,
    pageCount: 1,
    enableExpanding: true
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Validation Logs</CardTitle>
        </CardHeader>
        <CardContent className="max-w-6xl">
          <DataTable table={table} hideFooter />
        </CardContent>
      </Card>
    </div>
  );
}
