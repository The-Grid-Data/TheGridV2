import { SmartContractDeployments } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateSmartContractDeploymentInput =
  Partial<SmartContractDeployments>;
export type UpdateSmartContractDeploymentInput =
  Partial<SmartContractDeployments> & { id: string };

const TABLE_NAME = 'smartContractDeployments';

export const createSmartContractDeploymentsApi = (client: RestClient) => {
  const create = async (input: CreateSmartContractDeploymentInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateSmartContractDeploymentInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const remove = async (id: string) => {
    return client.delete(TABLE_NAME, id);
  };

  return {
    create,
    update,
    delete: remove
  };
};

export const useSmartContractDeploymentsApi = (client: RestClient) => {
  return createSmartContractDeploymentsApi(client);
};
