import { ProductAssetRelationships } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateProductAssetRelationshipInput =
  Partial<ProductAssetRelationships>;
export type UpdateProductAssetRelationshipInput =
  Partial<ProductAssetRelationships> & { id: string };
export type UpsertProductAssetRelationshipInput =
  Partial<ProductAssetRelationships> & { id?: string };

const TABLE_NAME = 'productAssetRelationships';

export const createProductAssetRelationshipsApi = (client: RestClient) => {
  const create = async (input: CreateProductAssetRelationshipInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateProductAssetRelationshipInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const upsert = async (input: UpsertProductAssetRelationshipInput) => {
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

export const useProductAssetRelationshipsApi = (client: RestClient) => {
  return createProductAssetRelationshipsApi(client);
};
