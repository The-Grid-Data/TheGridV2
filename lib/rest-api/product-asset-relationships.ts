import { ProductAssetRelationships } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateProductAssetRelationshipInput =
  Partial<ProductAssetRelationships>;
export type UpdateProductAssetRelationshipInput =
  Partial<ProductAssetRelationships> & { id: string };

const TABLE_NAME = 'productAssetRelationships';

export const createProductAssetRelationshipsApi = (client: RestClient) => {
  const create = async (input: CreateProductAssetRelationshipInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateProductAssetRelationshipInput) => {
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

export const useProductAssetRelationshipsApi = (client: RestClient) => {
  return createProductAssetRelationshipsApi(client);
};
