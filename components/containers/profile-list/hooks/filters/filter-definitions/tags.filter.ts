import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import {
  ProfileTagsBoolExp,
  TagsBoolExp
} from '@/lib/graphql/generated/graphql';
import { siteConfig } from '@/lib/site-config';
import { isNotEmpty } from '@/lib/utils/is-not-empty';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import { useFilter } from '../../use-filter';
import { FiltersStore } from '../../use-profile-filters';
import { mergeConditions, parseAsId, validateAndFormatOptions } from '../utils';

const filterId = 'tags';

export const useTagsFilter = (filterStore: FiltersStore) => {
  const [value, setValue] = useQueryState(
    filterId,
    parseAsArrayOf(parseAsId).withDefault([])
  );

  return useFilter<string, string>({
    id: filterId,
    type: 'multiselect',
    initialValue: value,
    optionsQueryDeps: [filterStore],
    onChange: newValue => setValue(newValue),
    getOptions: async () => {
      const data = await execute(
        graphql(`
          query getTagsOptions(
            $where: TagsBoolExp
            $aggregateInput: ProfileTagsFilterInput
          ) {
            tags(where: $where) {
              value: id
              label: name
              description
              profileTagsAggregate(filter_input: $aggregateInput) {
                _count
              }
            }
          }
        `),
        {
          where: buildTagsWhere(filterStore),
          aggregateInput: { where: buildAggregateInput(filterStore) }
        }
      );

      return validateAndFormatOptions(
        data?.tags
          ?.map(item => ({
            label: item.label,
            value: item.value,
            description: item.description,
            count: item?.profileTagsAggregate?._count
          }))
          .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
      );
    },
    getQueryConditions: value => ({
      root: {
        profileTags: { tagId: { _in: value } }
      }
    }),
    getOptionsQueryConditions: value => ({
      products: {
        root: {
          profileInfos: {
            root: { profileTags: { tagId: { _in: value } } }
          }
        }
      }
    })
  });
};

function buildTagsWhere(filterStore: FiltersStore): TagsBoolExp {
  const conditions: TagsBoolExp[] = [];

  if (isNotEmpty(filterStore.profileSectorsFilter)) {
    conditions.push({
      profileTags: {
        root: {
          products: {
            root: {
              profileInfos: {
                profileSectorId: { _in: filterStore.profileSectorsFilter }
              }
            }
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productTypesFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productTypes)
  ) {
    conditions.push({
      profileTags: {
        root: {
          products: {
            productTypeId: {
              _in: [
                ...filterStore.productTypesFilter,
                ...siteConfig.overrideFilterValues.productTypes
              ]
            }
          }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productAssetRelationshipsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productAssetRelationships)
  ) {
    conditions.push({
      profileTags: {
        root: {
          products: {
            productAssetRelationships: {
              asset: {
                ticker: {
                  _in: siteConfig.overrideFilterValues.productAssetRelationships
                }
              }
            }
          }
        }
      }
    });
  }

  return mergeConditions(conditions);
}

function buildAggregateInput(filterStore: FiltersStore): ProfileTagsBoolExp {
  const conditions: Array<ProfileTagsBoolExp> = [];

  if (isNotEmpty(filterStore.profileSectorsFilter)) {
    conditions.push({
      root: {
        products: {
          root: {
            profileInfos: {
              profileSectorId: { _in: filterStore.profileSectorsFilter }
            }
          }
        }
      }
    });
  }

  if (isNotEmpty(filterStore.productTypesFilter)) {
    conditions.push({
      root: {
        products: {
          productTypeId: { _in: filterStore.productTypesFilter }
        }
      }
    });
  }

  if (
    isNotEmpty(filterStore.productAssetRelationshipsFilter) ||
    isNotEmpty(siteConfig.overrideFilterValues.productAssetRelationships)
  ) {
    conditions.push({
      root: {
        products: {
          productAssetRelationships: {
            asset: {
              ticker: {
                _in: [
                  ...filterStore.productAssetRelationshipsFilter,
                  ...siteConfig.overrideFilterValues.productAssetRelationships
                ]
              }
            }
          }
        }
      }
    });
  }

  return mergeConditions(conditions);
}
