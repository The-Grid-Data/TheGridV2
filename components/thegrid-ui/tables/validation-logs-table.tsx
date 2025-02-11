'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { Validation } from '@/lib/graphql/generated/graphql';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { DataTableToolbar } from '../data-table/data-table-toolbar';
import { DataTableAdvancedFilterField } from '../data-table/types';

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
    accessorKey: 'isPending',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Pending" />
    )
  },
  {
    accessorKey: 'resolution',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resolution" />
    )
  },
  {
    accessorKey: 'destinationValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Old Data" />
    ),
    cell: ({ row }) => (
      <div className="w-xl truncate" title={row.getValue('destinationValue')}>
        {row.getValue('destinationValue')}
      </div>
    )
  },
  {
    accessorKey: 'sourceValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="New Data" />
    ),
    cell: ({ row }) => (
      <div className="w-xl truncate" title={row.getValue('sourceValue')}>
        {row.getValue('sourceValue')}
      </div>
    )
  },
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
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    )
  },
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
    return (
      data?.validation?.map(item => {
        return {
          ...item,
          isPending: item.isPending === '1' ? 'Yes' : 'No'
        };
      }) ?? []
    );
  }, [data]);

  const filterFields: DataTableAdvancedFilterField<Validation>[] = [
    {
      id: 'isPending',
      label: 'Is Pending',
      placeholder: 'Filter is pending...',
      type: 'select',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
      ]
    }
  ];

  const table = useDataTable({
    data: validationLogs,
    // @ts-ignore
    columns,
    pageCount: Math.ceil(validationLogs.length / 50),
    enableExpanding: true,
    //@ts-ignore
    filterFields,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      // columnFilters: [{ id: 'isPending', value: 'No' }],
      pagination: {
        pageSize: 50,
        pageIndex: 0
      }
    }
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Validation Logs</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {/* @ts-ignore */}
          <DataTableToolbar table={table} filterFields={filterFields} />

          <DataTable table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
