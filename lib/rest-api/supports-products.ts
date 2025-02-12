import { SupportsProducts } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateSupportsProductInput = Partial<SupportsProducts>;
export type UpdateSupportsProductInput = Partial<SupportsProducts> & {
  id: string;
};
export type UpsertSupportsProductInput = Partial<SupportsProducts> & {
  id?: string;
};
const TABLE_NAME = 'supportsProducts';

export const createSupportsProductsApi = (client: RestClient) => {
  const create = async (input: CreateSupportsProductInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateSupportsProductInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const upsert = async (input: UpsertSupportsProductInput) => {
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

export const useSupportsProductsApi = (client: RestClient) => {
  return createSupportsProductsApi(client);
};
