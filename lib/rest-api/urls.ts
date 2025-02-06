import { Urls } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateUrlInput = Partial<Urls>;
export type UpdateUrlInput = Partial<Urls> & { id: string };

const TABLE_NAME = 'urls';

export const createUrlsApi = (client: RestClient) => {
  const create = async (input: CreateUrlInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateUrlInput) => {
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

export const useUrlsApi = (client: RestClient) => {
  return createUrlsApi(client);
};
