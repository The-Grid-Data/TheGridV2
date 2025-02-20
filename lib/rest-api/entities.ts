import { Entities } from '../graphql/generated/graphql';
import { RestClient } from './client';

export type CreateEntityInput = Partial<Entities>;
export type UpdateEntityInput = Partial<Entities> & { id: string };

const TABLE_NAME = 'entities';

export const createEntitiesApi = (client: RestClient) => {
  const create = async (input: CreateEntityInput) => {
    return client.create(TABLE_NAME, input);
  };

  const update = async (input: UpdateEntityInput) => {
    const { id, ...data } = input;
    console.log('update input', input);
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

export const useEntitiesApi = (client: RestClient) => {
  return createEntitiesApi(client);
};
