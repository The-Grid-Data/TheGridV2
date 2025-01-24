import { AProducts } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateProductInput = Partial<AProducts>;
export type UpdateProductInput = Partial<AProducts> & { id: string };

const TABLE_NAME = 'products';

export const createProductsApi = (client: RestClient) => {
  const create = async (input: CreateProductInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateProductInput) => {
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

export const useProductsApi = (client: RestClient) => {
  return createProductsApi(client);
};
