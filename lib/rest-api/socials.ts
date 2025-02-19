import { Socials } from '../graphql/generated/graphql';
import { RestClient } from './client';
import { LENS_NAME_TO_TABLE_ID, LENS_NAME_TO_URL_TYPE_ID } from './urls';

export type CreateSocialInput = Partial<Socials> & { url?: string };
export type UpdateSocialInput = Partial<Socials> & { id: string; url?: string };
export type UpsertSocialInput = Partial<Socials> & { url?: string };

const TABLE_NAME = 'socials';
const URLS_TABLE_NAME = 'urls';

export const createSocialsApi = (client: RestClient) => {
  const create = async (input: CreateSocialInput) => {
    console.log('input', input);
    // First create the Socials record
    const lensSocialResult = await client.create(TABLE_NAME, {
      rootId: input.rootId,
      name: input.url
    });

    if (!lensSocialResult.results?.[0]?.success) {
      throw new Error('Failed to create Socials');
    }

    const lensSocialId = lensSocialResult.results[0].create?.created_records[0];
    if (lensSocialId) {
      const urlInput = {
        url: input.url,
        tableId:
          LENS_NAME_TO_TABLE_ID[
            'socials' as keyof typeof LENS_NAME_TO_TABLE_ID
          ],
        rowId: lensSocialId,
        urlTypeId:
          LENS_NAME_TO_URL_TYPE_ID[
            'socials' as keyof typeof LENS_NAME_TO_URL_TYPE_ID
          ][0]
      };
      console.log('urlInput', urlInput);
      await client.create(URLS_TABLE_NAME, urlInput);
    }

    return lensSocialResult;
  };

  const update = async (input: UpdateSocialInput) => {
    const { id, ...data } = input;
    const [lensSocialId, urlId] = id.split('::');

    try {
      if (data.url) {
        await client.update(URLS_TABLE_NAME, urlId, {
          url: data.url
        });
      } else {
        await client.update(TABLE_NAME, lensSocialId, data);
      }
    } catch (error) {
      console.error('Failed to update Social', error);
      return false;
    }

    return true;
  };

  const upsert = async (input: UpsertSocialInput) => {
    console.log('upsert input', input);
    const { id, ...data } = input;
    const [lensSocialId, urlId] = id?.split('::') ?? [];

    let result;
    if (id && lensSocialId) {
      result = await update({ ...data, id });
    } else {
      result = await create(data);
    }
    return result;
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

export const useSocialsApi = (client: RestClient) => {
  return createSocialsApi(client);
};
