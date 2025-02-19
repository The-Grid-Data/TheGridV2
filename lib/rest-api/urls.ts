import { Urls } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateUrlInput = Partial<Urls> & { rootId: string };
export type UpdateUrlInput = Partial<Urls> & { id: string };
export type UpsertUrlInput = Partial<Urls> & {
  id?: string;
  tableId?: string;
  rowId?: string;
};
const TABLE_NAME = 'urls';

// TODO: remove table ids hardcoding
export const LENS_NAME_TO_TABLE_ID = {
  products: '15',
  assets: '14',
  entities: '13',
  socials: '11',
  profileInfos: '7'
};

// TODO: remove url type ids hardcoding
export const LENS_NAME_TO_URL_TYPE_ID = {
  profileInfos: ['2', '3', '4', '5', 'id1737127021-McZQIPuJSeS7xJRGFEtvBw'],
  products: ['4', '6', 'id1737127021-McZQIPuJSeS7xJRGFEtvBw'],
  assets: ['4', 'id1737127021-McZQIPuJSeS7xJRGFEtvBw'],
  entities: ['7', 'id1737127021-McZQIPuJSeS7xJRGFEtvBw'],
  socials: ['8', 'id1737127021-McZQIPuJSeS7xJRGFEtvBw']
};

export const createUrlsApi = (client: RestClient) => {
  const create = async (input: CreateUrlInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateUrlInput) => {
    const { id, ...data } = input;
    return client.update(TABLE_NAME, id, data);
  };

  const upsert = async (input: UpsertUrlInput) => {
    const { id, tableId, rowId, ...data } = input;
    let result;
    if (id) {
      result = await client.update(TABLE_NAME, id, data);
    } else {
      result = await client.create(TABLE_NAME, { ...data, tableId, rowId });
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

export const useUrlsApi = (client: RestClient) => {
  return createUrlsApi(client);
};
