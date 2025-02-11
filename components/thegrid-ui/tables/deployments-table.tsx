'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useSmartContractDeploymentsApi } from '@/lib/rest-api/smartContractDeployments';
import { useSmartContractsApi } from '@/lib/rest-api/smartContracts';
import { getTgsData } from '@/lib/tgs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { ColumnMeta } from '../data-table/types';
import { TableContainer } from '../lenses/base/components/table-container';

type Deployments = ProductFieldsFragmentFragment['productDeployments'];
type Deployment = NonNullable<Deployments>[number];

const deploymentTypeData = getTgsData('smartContractDeployments.deploymentTypes');
const deploymentTypeOptions = deploymentTypeData.isDataValid && deploymentTypeData.is_enum === 'true'
  ? deploymentTypeData.possible_values.map(value => ({
      label: value.name,
      value: value.id
    }))
  : [];

const isOfStandardData = getTgsData('smartContractDeployments.assetStandards');
const isOfStandardOptions = isOfStandardData.isDataValid && isOfStandardData.is_enum === 'true'
? isOfStandardData.possible_values.map(value => ({
    label: value.name,
    value: value.id
    }))
: [];

export const ProductsLayersQuery = graphql(`
    query getProductsLayers {
      products(where: {productTypeId: {_in: [15, 16, 17]}}) {
        id
        name
      }
    }
  `);

type DeploymentsTableProps = {
  productDeployments: Deployments;
  rootId: string;
};

export function DeploymentsTable({
  productDeployments,
  rootId
}: DeploymentsTableProps) {
  const client = useRestApiClient();
  const smartContractDeploymentsApi = useSmartContractDeploymentsApi(client);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['products-layers'],
    queryFn: () => execute(ProductsLayersQuery)
  });
  const productsLayersOptions = useMemo(() => {
    return (
      data?.products?.map(item => ({
        value: item.id,
        label: item.name
      }))?.sort((a, b) => a.label.localeCompare(b.label)) ?? []
    );
  }, [data]);

  const columns: ColumnDef<Deployment>[] = [
    {
      accessorKey: 'smartContractDeployment.deploymentType.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deployment Type" />
      ),
      meta: {
        type: 'tag',
        isEditable: true,
        options: deploymentTypeOptions,
        field: 'deploymentType.id'
      } satisfies ColumnMeta
    },
    {
      accessorKey: 'smartContractDeployment.deployedOnProduct.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Deployed On" />
      ),
      meta: {
        type: 'tag',
        isEditable: true,
        options: productsLayersOptions,
        field: 'deployedOn.id'
      } satisfies ColumnMeta
    },
    {
      accessorKey: 'smartContractDeployment.assetStandard.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Is Of Standard" />
      ),
      meta: {
        type: 'tag',
        isEditable: true,
        options: isOfStandardOptions,
        field: 'isOfStandard.id'
      } satisfies ColumnMeta
    }
  ];

  const deploymentsData = useMemo(() => {
    return productDeployments ?? [];
  }, [productDeployments]);

  const table = useDataTable({
    data: deploymentsData,
    columns,
    pageCount: 1,
    enableExpanding: true,
    getRowId: row => row.smartContractDeployment?.id ?? row.id,
    onCellSubmit: async (data) => {
      await smartContractDeploymentsApi.update(data);
      queryClient.invalidateQueries({
        queryKey: ['profile', rootId],
        exact: true,
        refetchType: 'all'
      });
      return true;
    }
  });

  return (
    <TableContainer title="Product Deployments">
      <div className="space-y-4">
        <DataTable
          table={table}
          hideFooter
          renderSubRow={row => <DeploymentSubRow deployment={row.original} rootId={rootId} />}
        />
      </div>
    </TableContainer>
  );
}

export function DeploymentSubRow({ deployment, rootId }: { deployment: Deployment, rootId: string }) {
  const data = useMemo(() => {
    return deployment.smartContractDeployment?.smartContracts ?? [];
  }, [deployment.smartContractDeployment?.smartContracts]);

  const client = useRestApiClient();
  const smartContractsApi = useSmartContractsApi(client);
  const queryClient = useQueryClient();

  const subColumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: {
          type: 'text',
          isEditable: true,
        } satisfies ColumnMeta
      },
      {
        accessorKey: 'address',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        meta: {
            type: 'text',
            isEditable: true,
        } satisfies ColumnMeta
      },
      {
        accessorKey: 'deploymentDate',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Deployment Date" />
        ),
        meta: {
            type: 'text',
            isEditable: true,
          } satisfies ColumnMeta
        }
    ],
    []
  );

  const subTable = useDataTable({
    data,
    columns: subColumns,
    pageCount: 1,
    getRowId: row => row.id,
    onCellSubmit: async (data) => {
        try {
            await smartContractsApi.update(data);
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
      },
      enableExpanding: false
  });

  return (
    <div className="bg-gray-50 p-2">
      <DataTable table={subTable} hideFooter />
    </div>
  );
}
