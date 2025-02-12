import { SmartContracts } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateSmartContractInput = Partial<SmartContracts>;
export type UpdateSmartContractInput = Partial<SmartContracts> & { id: string };
export type UpsertSmartContractInput = Partial<SmartContracts> & {
  id?: string;
};

const TABLE_NAME = 'smartContracts';

export const createSmartContractsApi = (client: RestClient) => {
  const create = async (input: CreateSmartContractInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateSmartContractInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const upsert = async (input: UpsertSmartContractInput) => {
    const { id, ...data } = input;
    let result;
    if (id) {
      result = await client.update(TABLE_NAME, id, data);
    } else {
      result = await client.create(TABLE_NAME, data);
    }
    return result.results[0];
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

export const useSmartContractsApi = (client: RestClient) => {
  return createSmartContractsApi(client);
};
