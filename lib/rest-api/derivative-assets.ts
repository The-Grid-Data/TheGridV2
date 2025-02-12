import { DerivativeAssets } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateDerivativeAssetInput = Partial<DerivativeAssets>;
export type UpdateDerivativeAssetInput = Partial<DerivativeAssets> & {
  id: string;
};
export type UpsertDerivativeAssetInput = Partial<DerivativeAssets> & {
  id?: string;
  assetId?: string;
};
const TABLE_NAME = 'derivativeAssets';

export const createDerivativeAssetsApi = (client: RestClient) => {
  const create = async (input: CreateDerivativeAssetInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateDerivativeAssetInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const upsert = async (input: UpsertDerivativeAssetInput) => {
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

export const useDerivativeAssetsApi = (client: RestClient) => {
  return createDerivativeAssetsApi(client);
};
