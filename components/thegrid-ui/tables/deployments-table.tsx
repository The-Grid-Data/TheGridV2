'use client';

import { DataTable } from '@/components/thegrid-ui/data-table/data-table';
import { useDataTable } from '@/components/thegrid-ui/data-table/hooks/use-data-table';
import { useTableCellUpdater } from '@/hooks/use-table-cell-updater';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import {
  AssetFieldsFragmentFragment,
  ProductFieldsFragmentFragment
} from '@/lib/graphql/generated/graphql';
import { useRestApiClient } from '@/lib/rest-api/client';
import { useSmartContractDeploymentsApi } from '@/lib/rest-api/smart-contract-deployments';
import { useSmartContractsApi } from '@/lib/rest-api/smart-contracts';
import { getTgsData } from '@/lib/tgs';
import { useQuery } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import { ColumnMeta } from '../data-table/types';

type Deployments =
  | ProductFieldsFragmentFragment['productDeployments']
  | AssetFieldsFragmentFragment['assetDeployments'];
type Deployment = NonNullable<Deployments>[number];

const deploymentTypeData = getTgsData(
  'smartContractDeployments.deploymentTypes'
);
const deploymentTypeOptions =
  deploymentTypeData.isDataValid && deploymentTypeData.is_enum === 'true'
    ? deploymentTypeData.possible_values.map(value => ({
        label: value.name,
        value: value.id,
        description: value.definition
      }))
    : [];

const isOfStandardData = getTgsData('smartContractDeployments.assetStandards');
const isOfStandardOptions =
  isOfStandardData.isDataValid && isOfStandardData.is_enum === 'true'
    ? isOfStandardData.possible_values.map(value => ({
        label: value.name,
        value: value.id,
        description: value.definition
      }))
    : [];

export const ProductsLayersDictionaryQuery = graphql(`
  query getProductsLayersDictionary {
    products {
      id
      name
      description
    }
  }
`);

type DeploymentsTableProps = {
  deployments: Deployments;
  rootId: string;
  lensName: string;
  lensRecordId: string;
};

export function DeploymentsTable({
  deployments,
  rootId,
  lensName,
  lensRecordId
}: DeploymentsTableProps) {
  const { data: productsLayersDictionaryData } = useQuery({
    queryKey: ['products-layers-dictionary'],
    queryFn: () => execute(ProductsLayersDictionaryQuery)
  });
  const productsLayersDictionaryOptions = useMemo(() => {
    return (
      productsLayersDictionaryData?.products
        ?.map(item => ({
          value: item.id,
          label: item.name,
          description: item.description
        }))
        ?.sort((a, b) => a.label.localeCompare(b.label)) ?? []
    );
  }, [productsLayersDictionaryData]);

  const columns: ColumnDef<Deployment>[] = useMemo(
    () => [
      {
        accessorKey: 'smartContractDeployment.deploymentType.name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deployment Type" />
        ),
        meta: {
          type: 'tag',
          isEditable: true,
          options: deploymentTypeOptions,
          field: 'deploymentType.id',
          dbColumn: 'deploymentTypeId'
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
          options: productsLayersDictionaryOptions,
          field: 'deployedOn.id',
          dbColumn: 'deployedOnId'
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
          field: 'isOfStandard.id',
          dbColumn: 'isOfStandardId'
        } satisfies ColumnMeta
      }
    ],
    [productsLayersDictionaryOptions]
  );

  const deploymentsData = useMemo(() => {
    return deployments ?? [];
  }, [deployments]);

  const client = useRestApiClient();
  const smartContractDeploymentsApi = useSmartContractDeploymentsApi(
    client,
    lensName,
    lensRecordId
  );
  const { updatingCellId, handleCellSubmit } = useTableCellUpdater({ rootId });

  const table = useDataTable({
    data: deploymentsData,
    columns,
    pageCount: 1,
    enableExpanding: true,
    getRowId: row => row.smartContractDeployment?.id ?? row.id,
    onCellSubmit: async data => {
      return handleCellSubmit(data, async (inputData) => {
        const result = await smartContractDeploymentsApi.upsert(inputData);
        return !!result;
      });
    },
  });

  return (
    <div className="space-y-4">
      <DataTable
        table={table}
        hideFooter
        displayAddRowButton
        addRowButtonLabel="Add deployment"
        updatingCellId={updatingCellId}
        renderSubRow={row => (
          <DeploymentSubRow deployment={row.original} rootId={rootId} />
        )}
      />
    </div>
  );
}

export function DeploymentSubRow({
  deployment,
  rootId
}: {
  deployment: Deployment;
  rootId: string;
}) {
  const data = useMemo(() => {
    return deployment.smartContractDeployment?.smartContracts ?? [];
  }, [deployment.smartContractDeployment?.smartContracts]);

  const client = useRestApiClient();
  const smartContractsApi = useSmartContractsApi(client);
  const { updatingCellId, handleCellSubmit } = useTableCellUpdater({ rootId });

  const subColumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: {
          type: 'text',
          isEditable: true
        } satisfies ColumnMeta
      },
      {
        accessorKey: 'address',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        meta: {
          type: 'text',
          isEditable: true
        } satisfies ColumnMeta
      },
      {
        accessorKey: 'deploymentDate',
        header: ({ column }: { column: any }) => (
          <DataTableColumnHeader column={column} title="Deployment Date" />
        ),
        meta: {
          type: 'text',
          isEditable: true
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
    onCellSubmit: async data => {
      return handleCellSubmit(data, async (inputData) => {
        const input = {
          ...inputData,
          deploymentId: deployment.smartContractDeployment?.id
        };
        const result = await smartContractsApi.upsert(input);
        return !!result;
      });
    },
    enableExpanding: false
  });

  return (
    <div className="bg-none p-2">
      <DataTable
        table={subTable}
        hideFooter
        displayAddRowButton
        addRowButtonLabel="Add contract"
        updatingCellId={updatingCellId}
      />
    </div>
  );
}
