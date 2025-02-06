'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { TableContainer } from '../lenses/base/components/table-container';

type Deployments = ProductFieldsFragmentFragment['productDeployments'];
type Deployment = NonNullable<Deployments>[number];

const columns: ColumnDef<Deployment>[] = [
  {
    accessorKey: 'smartContractDeployment.deploymentType.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deployment Type" />
    )
  },
  {
    accessorKey: 'smartContractDeployment.deployedOnProduct.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deployed On" />
    )
  },
  {
    accessorKey: 'smartContractDeployment.assetStandard.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Of Standard" />
    )
  }
];

type DeploymentsTableProps = {
  productDeployments: Deployments;
};

export function DeploymentsTable({
  productDeployments
}: DeploymentsTableProps) {
  const data = useMemo(() => {
    return productDeployments ?? [];
  }, [productDeployments]);

  const table = useDataTable({
    data,
    columns,
    pageCount: 1,
    enableExpanding: true,
  });

  return (
    <TableContainer title="Product Deployments">
      <div className="space-y-4">
        <DataTable
          table={table}
          hideFooter
          renderSubRow={row => <DeploymentSubRow deployment={row.original} />}
        />
      </div>
    </TableContainer>
  );
}

export function DeploymentSubRow({ deployment }: { deployment: Deployment }) {
  const data = useMemo(() => {
    return deployment.smartContractDeployment?.smartContracts ?? [];
  }, [deployment.smartContractDeployment?.smartContracts]);

  const subColumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Name" />
        )
      },
      {
        accessorKey: 'address',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Address" />
        )
      },
      {
        accessorKey: 'deploymentDate',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Deployment Date" />
        )
      }
    ],
    []
  );

  const subTable = useDataTable({
    data,
    columns: subColumns,
    pageCount: 1,
    enableExpanding: false
  });

  return (
    <div className="bg-gray-50 p-2">
      <DataTable table={subTable} hideFooter />
    </div>
  );
}
