import { SupportsProducts } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateSupportsProductInput = Partial<SupportsProducts>;
export type UpdateSupportsProductInput = Partial<SupportsProducts> & {
  id: string;
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

  const remove = async (id: string) => {
    return client.delete(TABLE_NAME, id);
  };

  return {
    create,
    update,
    delete: remove
  };
};

export const useSupportsProductsApi = (client: RestClient) => {
  return createSupportsProductsApi(client);
};
