import { SmartContractDeployments } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateSmartContractDeploymentInput =
  Partial<SmartContractDeployments> & {
    productId?: string; // Optional product ID for creating product deployment relationship
  };
export type UpdateSmartContractDeploymentInput =
  Partial<SmartContractDeployments> & { id: string };
export type UpsertSmartContractDeploymentInput =
  Partial<SmartContractDeployments> & { id?: string };

const TABLE_NAME = 'smartContractDeployments';

const DEPLOYMENTS_RELATIONSHIPS_TABLES = {
  products: 'productDeployments',
  assets: 'assetDeployments'
};

const DEPLOYMENTS_RELATIONSHIPS_TABLE_FIELDS = {
  products: 'productId',
  assets: 'assetId'
};

export const createSmartContractDeploymentsApi = (
  client: RestClient,
  lensName: string,
  lensRecordId: string
) => {
  const create = async (input: CreateSmartContractDeploymentInput) => {
    // First create the smart contract deployment
    const smartContractDeploymentResult = await client.create(
      TABLE_NAME,
      input
    );
    if (!smartContractDeploymentResult.results?.[0]?.success) {
      throw new Error('Failed to create smart contract deployment');
    }

    const tableName =
      DEPLOYMENTS_RELATIONSHIPS_TABLES[
        lensName as keyof typeof DEPLOYMENTS_RELATIONSHIPS_TABLES
      ];
    const fieldName =
      DEPLOYMENTS_RELATIONSHIPS_TABLE_FIELDS[
        lensName as keyof typeof DEPLOYMENTS_RELATIONSHIPS_TABLE_FIELDS
      ];

    // If created record is present, create the deployment relationship
    if (smartContractDeploymentResult.results[0].create?.created_records?.[0]) {
      const deploymentId =
        smartContractDeploymentResult.results[0].create.created_records[0];
      const lensDeploymentResult = await client.create(tableName, {
        [fieldName]: lensRecordId,
        deploymentId
      });
      return lensDeploymentResult;
    }

    return smartContractDeploymentResult;
  };

  const update = async (input: UpdateSmartContractDeploymentInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const upsert = async (input: UpsertSmartContractDeploymentInput) => {
    const { id, ...data } = input;
    let result;
    if (id) {
      result = await update({ ...data, id });
    } else {
      result = await create(data);
    }
    return result;
  };

  const remove = async (id: string) => {
    return client.delete(TABLE_NAME, id);
  };

  return {
    create,
    update,
    upsert,
    delete: remove
  };
};

export const useSmartContractDeploymentsApi = (
  client: RestClient,
  lensName: string,
  lensRecordId: string
) => {
  return createSmartContractDeploymentsApi(client, lensName, lensRecordId);
};
