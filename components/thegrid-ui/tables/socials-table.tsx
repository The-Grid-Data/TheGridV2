'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import {
  ProfileInfoFragmentFragment
} from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useSocialsApi } from '@/lib/rest-api/socials';
import { getTgsData } from '@/lib/tgs';
import { useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { type ColumnMeta } from '../data-table/types';

type Socials = NonNullable<NonNullable<ProfileInfoFragmentFragment['root']>['socials']>;
type Social = Socials[number];

const socialTypeData = getTgsData('socials.socialType');
const socialTypeOptions =
  socialTypeData.isDataValid && socialTypeData.is_enum === 'true'
    ? socialTypeData.possible_values.map(value => ({
        label: value.name,
        value: value.id
      }))
    : [];

type SocialsTableProps = {
  socials: Socials;
  rootId: string;
};

export function SocialsTable({
  socials,
  rootId,
}: SocialsTableProps) {
  const client = useRestApiClient();
  const socialsApi = useSocialsApi(client);
  const queryClient = useQueryClient();

  const columns: ColumnDef<Social, any>[] = React.useMemo(
    () => [
      {
        accessorKey: 'url',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="URL" />
        ),
        accessorFn: (row) => row.urls?.[0]?.url ?? '',
        meta: {
          type: 'text',
          isEditable: true,
          field: 'url'
        } satisfies ColumnMeta
      },
      {
        accessorKey: 'socialType.name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => row.original.socialType?.name,
        meta: {
          type: 'tag',
          isEditable: true,
          options: socialTypeOptions,
          field: 'socialType.id'
        } satisfies ColumnMeta
      }
    ],
    []
  );

  const table = useDataTable({
    data: socials ?? [],
    columns,
    pageCount: 1,
    getRowId: row => `${row.id}::${row.urls?.[0]?.id}`,
    onCellSubmit: async data => {
      try {
        const result = await socialsApi.upsert({
          ...data,
          rootId
        });
        if (!result) {
          throw new Error('Failed to upsert Social');
        }
        queryClient.invalidateQueries({
          queryKey: ['profile', rootId],
          exact: true,
          refetchType: 'all'
        });
        return true;
      } catch (error) {
        console.error('Failed to upsert Social:', error);
        return false;
      }
    }
  });

  return <DataTable table={table} hideFooter filterFields={[]} />;
}
