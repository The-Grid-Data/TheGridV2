/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
  Float1: { input: number; output: number };
  Int1: { input: number; output: number };
  String1: { input: string; output: string };
};

export type AAssetDeployments = {
  __typename?: 'AAssetDeployments';
  asset?: Maybe<AAssets>;
  assetId: Scalars['String1']['output'];
  deploymentId: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  smartContractDeployment?: Maybe<ASmartContractDeployments>;
};

export type AAssetDeploymentsBoolExp = {
  _and?: InputMaybe<Array<AAssetDeploymentsBoolExp>>;
  _not?: InputMaybe<AAssetDeploymentsBoolExp>;
  _or?: InputMaybe<Array<AAssetDeploymentsBoolExp>>;
  asset?: InputMaybe<AAssetsBoolExp>;
  assetId?: InputMaybe<StringBoolExp>;
  deploymentId?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  smartContractDeployment?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type AAssetDeploymentsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetDeploymentsOrderBy>>;
  where?: InputMaybe<AAssetDeploymentsBoolExp>;
};

export type AAssetDeploymentsOrderBy = {
  asset?: InputMaybe<AAssetsOrderBy>;
  assetId?: InputMaybe<OrderBy>;
  deploymentId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  smartContractDeployment?: InputMaybe<ASmartContractDeploymentsOrderBy>;
};

export type AAssetStandards = {
  __typename?: 'AAssetStandards';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  smartContractDeployments?: Maybe<Array<ASmartContractDeployments>>;
  smartContractDeploymentsAggregate: ASmartContractDeploymentsAggExp;
};

export type AAssetStandardsSmartContractDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractDeploymentsOrderBy>>;
  where?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type AAssetStandardsSmartContractDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<ASmartContractDeploymentsFilterInput>;
};

export type AAssetStandardsAggExp = {
  __typename?: 'AAssetStandardsAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AAssetStandardsBoolExp = {
  _and?: InputMaybe<Array<AAssetStandardsBoolExp>>;
  _not?: InputMaybe<AAssetStandardsBoolExp>;
  _or?: InputMaybe<Array<AAssetStandardsBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  smartContractDeployments?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type AAssetStandardsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetStandardsOrderBy>>;
  where?: InputMaybe<AAssetStandardsBoolExp>;
};

export type AAssetStandardsOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AAssetStatuses = {
  __typename?: 'AAssetStatuses';
  assets?: Maybe<Array<AAssets>>;
  assetsAggregate: AAssetsAggExp;
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
};

export type AAssetStatusesAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetsOrderBy>>;
  where?: InputMaybe<AAssetsBoolExp>;
};

export type AAssetStatusesAssetsAggregateArgs = {
  filter_input?: InputMaybe<AAssetsFilterInput>;
};

export type AAssetStatusesAggExp = {
  __typename?: 'AAssetStatusesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AAssetStatusesBoolExp = {
  _and?: InputMaybe<Array<AAssetStatusesBoolExp>>;
  _not?: InputMaybe<AAssetStatusesBoolExp>;
  _or?: InputMaybe<Array<AAssetStatusesBoolExp>>;
  assets?: InputMaybe<AAssetsBoolExp>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
};

export type AAssetStatusesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetStatusesOrderBy>>;
  where?: InputMaybe<AAssetStatusesBoolExp>;
};

export type AAssetStatusesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AAssetSupportTypes = {
  __typename?: 'AAssetSupportTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  productAssetRelationships?: Maybe<Array<AProductAssetRelationships>>;
  productAssetRelationshipsAggregate: AProductAssetRelationshipsAggExp;
};

export type AAssetSupportTypesProductAssetRelationshipsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductAssetRelationshipsOrderBy>>;
  where?: InputMaybe<AProductAssetRelationshipsBoolExp>;
};

export type AAssetSupportTypesProductAssetRelationshipsAggregateArgs = {
  filter_input?: InputMaybe<AProductAssetRelationshipsFilterInput>;
};

export type AAssetSupportTypesAggExp = {
  __typename?: 'AAssetSupportTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AAssetSupportTypesBoolExp = {
  _and?: InputMaybe<Array<AAssetSupportTypesBoolExp>>;
  _not?: InputMaybe<AAssetSupportTypesBoolExp>;
  _or?: InputMaybe<Array<AAssetSupportTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  productAssetRelationships?: InputMaybe<AProductAssetRelationshipsBoolExp>;
};

export type AAssetSupportTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetSupportTypesOrderBy>>;
  where?: InputMaybe<AAssetSupportTypesBoolExp>;
};

export type AAssetSupportTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AAssetTypes = {
  __typename?: 'AAssetTypes';
  assets?: Maybe<Array<AAssets>>;
  assetsAggregate: AAssetsAggExp;
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
};

export type AAssetTypesAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetsOrderBy>>;
  where?: InputMaybe<AAssetsBoolExp>;
};

export type AAssetTypesAssetsAggregateArgs = {
  filter_input?: InputMaybe<AAssetsFilterInput>;
};

export type AAssetTypesAggExp = {
  __typename?: 'AAssetTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AAssetTypesBoolExp = {
  _and?: InputMaybe<Array<AAssetTypesBoolExp>>;
  _not?: InputMaybe<AAssetTypesBoolExp>;
  _or?: InputMaybe<Array<AAssetTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
};

export type AAssetTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetTypesOrderBy>>;
  where?: InputMaybe<AAssetTypesBoolExp>;
};

export type AAssetTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AAssets = {
  __typename?: 'AAssets';
  assetDeployments?: Maybe<Array<AAssetDeployments>>;
  assetDeploymentsAggregate: AssetDeploymentsAggExp;
  assetStatus?: Maybe<AAssetStatuses>;
  assetStatusId?: Maybe<Scalars['String1']['output']>;
  assetType?: Maybe<AAssetTypes>;
  assetTypeId?: Maybe<Scalars['String1']['output']>;
  derivativeAssets?: Maybe<Array<ADerivativeAssets>>;
  derivativeAssetsAggregate: ADerivativeAssetsAggExp;
  derivativeAssetsByBaseAssetId?: Maybe<Array<ADerivativeAssets>>;
  derivativeAssetsByBaseAssetIdAggregate: ADerivativeAssetsAggExp;
  description: Scalars['String1']['output'];
  icon: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  productAssetRelationships?: Maybe<Array<AProductAssetRelationships>>;
  productAssetRelationshipsAggregate: AProductAssetRelationshipsAggExp;
  root?: Maybe<ARoots>;
  rootId: Scalars['String1']['output'];
  ticker: Scalars['String1']['output'];
  urls?: Maybe<Array<AssetUrls>>;
};

export type AAssetsAssetDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetDeploymentsOrderBy>>;
  where?: InputMaybe<AAssetDeploymentsBoolExp>;
};

export type AAssetsAssetDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<AAssetDeploymentsFilterInput>;
};

export type AAssetsDerivativeAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ADerivativeAssetsOrderBy>>;
  where?: InputMaybe<ADerivativeAssetsBoolExp>;
};

export type AAssetsDerivativeAssetsAggregateArgs = {
  filter_input?: InputMaybe<ADerivativeAssetsFilterInput>;
};

export type AAssetsDerivativeAssetsByBaseAssetIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ADerivativeAssetsOrderBy>>;
  where?: InputMaybe<ADerivativeAssetsBoolExp>;
};

export type AAssetsDerivativeAssetsByBaseAssetIdAggregateArgs = {
  filter_input?: InputMaybe<ADerivativeAssetsFilterInput>;
};

export type AAssetsProductAssetRelationshipsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductAssetRelationshipsOrderBy>>;
  where?: InputMaybe<AProductAssetRelationshipsBoolExp>;
};

export type AAssetsProductAssetRelationshipsAggregateArgs = {
  filter_input?: InputMaybe<AProductAssetRelationshipsFilterInput>;
};

export type AAssetsUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AssetUrlsOrderBy>>;
  where?: InputMaybe<AssetUrlsBoolExp>;
};

export type AAssetsAggExp = {
  __typename?: 'AAssetsAggExp';
  _count: Scalars['Int']['output'];
  assetStatusId: StringAggExp;
  assetTypeId: StringAggExp;
  description: StringAggExp;
  icon: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
  rootId: StringAggExp;
  ticker: StringAggExp;
};

export type AAssetsBoolExp = {
  _and?: InputMaybe<Array<AAssetsBoolExp>>;
  _not?: InputMaybe<AAssetsBoolExp>;
  _or?: InputMaybe<Array<AAssetsBoolExp>>;
  assetDeployments?: InputMaybe<AAssetDeploymentsBoolExp>;
  assetStatus?: InputMaybe<AAssetStatusesBoolExp>;
  assetStatusId?: InputMaybe<StringBoolExp>;
  assetTypeId?: InputMaybe<StringBoolExp>;
  derivativeAssets?: InputMaybe<ADerivativeAssetsBoolExp>;
  derivativeAssetsByBaseAssetId?: InputMaybe<ADerivativeAssetsBoolExp>;
  description?: InputMaybe<StringBoolExp>;
  icon?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  productAssetRelationships?: InputMaybe<AProductAssetRelationshipsBoolExp>;
  root?: InputMaybe<ARootsBoolExp>;
  rootId?: InputMaybe<StringBoolExp>;
  ticker?: InputMaybe<StringBoolExp>;
};

export type AAssetsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetsOrderBy>>;
  where?: InputMaybe<AAssetsBoolExp>;
};

export type AAssetsOrderBy = {
  assetStatus?: InputMaybe<AAssetStatusesOrderBy>;
  assetStatusId?: InputMaybe<OrderBy>;
  assetType?: InputMaybe<AAssetTypesOrderBy>;
  assetTypeId?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  icon?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  root?: InputMaybe<ARootsOrderBy>;
  rootId?: InputMaybe<OrderBy>;
  ticker?: InputMaybe<OrderBy>;
};

export type ACoreTableNames = {
  __typename?: 'ACoreTableNames';
  id: Scalars['String1']['output'];
  tableName: Scalars['String1']['output'];
  urls?: Maybe<Array<AUrls>>;
  urlsAggregate: AUrlsAggExp;
};

export type ACoreTableNamesUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AUrlsOrderBy>>;
  where?: InputMaybe<AUrlsBoolExp>;
};

export type ACoreTableNamesUrlsAggregateArgs = {
  filter_input?: InputMaybe<AUrlsFilterInput>;
};

export type ACoreTableNamesAggExp = {
  __typename?: 'ACoreTableNamesAggExp';
  _count: Scalars['Int']['output'];
  id: StringAggExp;
  tableName: StringAggExp;
};

export type ACoreTableNamesBoolExp = {
  _and?: InputMaybe<Array<ACoreTableNamesBoolExp>>;
  _not?: InputMaybe<ACoreTableNamesBoolExp>;
  _or?: InputMaybe<Array<ACoreTableNamesBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  tableName?: InputMaybe<StringBoolExp>;
  urls?: InputMaybe<AUrlsBoolExp>;
};

export type ACoreTableNamesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ACoreTableNamesOrderBy>>;
  where?: InputMaybe<ACoreTableNamesBoolExp>;
};

export type ACoreTableNamesOrderBy = {
  id?: InputMaybe<OrderBy>;
  tableName?: InputMaybe<OrderBy>;
};

export type ACountries = {
  __typename?: 'ACountries';
  code: Scalars['String1']['output'];
  entities?: Maybe<Array<AEntities>>;
  entitiesAggregate: AEntitiesAggExp;
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
};

export type ACountriesEntitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntitiesOrderBy>>;
  where?: InputMaybe<AEntitiesBoolExp>;
};

export type ACountriesEntitiesAggregateArgs = {
  filter_input?: InputMaybe<AEntitiesFilterInput>;
};

export type ACountriesAggExp = {
  __typename?: 'ACountriesAggExp';
  _count: Scalars['Int']['output'];
  code: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type ACountriesBoolExp = {
  _and?: InputMaybe<Array<ACountriesBoolExp>>;
  _not?: InputMaybe<ACountriesBoolExp>;
  _or?: InputMaybe<Array<ACountriesBoolExp>>;
  code?: InputMaybe<StringBoolExp>;
  entities?: InputMaybe<AEntitiesBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
};

export type ACountriesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ACountriesOrderBy>>;
  where?: InputMaybe<ACountriesBoolExp>;
};

export type ACountriesOrderBy = {
  code?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type ADeploymentTypes = {
  __typename?: 'ADeploymentTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  smartContractDeployments?: Maybe<Array<ASmartContractDeployments>>;
  smartContractDeploymentsAggregate: ASmartContractDeploymentsAggExp;
};

export type ADeploymentTypesSmartContractDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractDeploymentsOrderBy>>;
  where?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type ADeploymentTypesSmartContractDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<ASmartContractDeploymentsFilterInput>;
};

export type ADeploymentTypesAggExp = {
  __typename?: 'ADeploymentTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type ADeploymentTypesBoolExp = {
  _and?: InputMaybe<Array<ADeploymentTypesBoolExp>>;
  _not?: InputMaybe<ADeploymentTypesBoolExp>;
  _or?: InputMaybe<Array<ADeploymentTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  smartContractDeployments?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type ADeploymentTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ADeploymentTypesOrderBy>>;
  where?: InputMaybe<ADeploymentTypesBoolExp>;
};

export type ADeploymentTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type ADerivativeAssets = {
  __typename?: 'ADerivativeAssets';
  asset?: Maybe<AAssets>;
  assetByBaseAssetId?: Maybe<AAssets>;
  baseAssetId: Scalars['String1']['output'];
  derivativeAssetId: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
};

export type ADerivativeAssetsAggExp = {
  __typename?: 'ADerivativeAssetsAggExp';
  _count: Scalars['Int']['output'];
  baseAssetId: StringAggExp;
  derivativeAssetId: StringAggExp;
  id: StringAggExp;
};

export type ADerivativeAssetsBoolExp = {
  _and?: InputMaybe<Array<ADerivativeAssetsBoolExp>>;
  _not?: InputMaybe<ADerivativeAssetsBoolExp>;
  _or?: InputMaybe<Array<ADerivativeAssetsBoolExp>>;
  asset?: InputMaybe<AAssetsBoolExp>;
  assetByBaseAssetId?: InputMaybe<AAssetsBoolExp>;
  baseAssetId?: InputMaybe<StringBoolExp>;
  derivativeAssetId?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
};

export type ADerivativeAssetsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ADerivativeAssetsOrderBy>>;
  where?: InputMaybe<ADerivativeAssetsBoolExp>;
};

export type ADerivativeAssetsOrderBy = {
  asset?: InputMaybe<AAssetsOrderBy>;
  assetByBaseAssetId?: InputMaybe<AAssetsOrderBy>;
  baseAssetId?: InputMaybe<OrderBy>;
  derivativeAssetId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
};

export type AEntities = {
  __typename?: 'AEntities';
  address: Scalars['String1']['output'];
  country?: Maybe<ACountries>;
  countryId?: Maybe<Scalars['String1']['output']>;
  dateOfIncorporation?: Maybe<Scalars['Date']['output']>;
  entityType?: Maybe<AEntityTypes>;
  entityTypeId?: Maybe<Scalars['String1']['output']>;
  id: Scalars['String1']['output'];
  leiNumber: Scalars['String1']['output'];
  localRegistrationNumber: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  root?: Maybe<ARoots>;
  rootId: Scalars['String1']['output'];
  taxIdentificationNumber: Scalars['String1']['output'];
  tradeName: Scalars['String1']['output'];
  urls?: Maybe<Array<EntityUrls>>;
};

export type AEntitiesUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EntityUrlsOrderBy>>;
  where?: InputMaybe<EntityUrlsBoolExp>;
};

export type AEntitiesAggExp = {
  __typename?: 'AEntitiesAggExp';
  _count: Scalars['Int']['output'];
  address: StringAggExp;
  countryId: StringAggExp;
  dateOfIncorporation: DateAggExp;
  entityTypeId: StringAggExp;
  id: StringAggExp;
  leiNumber: StringAggExp;
  localRegistrationNumber: StringAggExp;
  name: StringAggExp;
  rootId: StringAggExp;
  taxIdentificationNumber: StringAggExp;
  tradeName: StringAggExp;
};

export type AEntitiesBoolExp = {
  _and?: InputMaybe<Array<AEntitiesBoolExp>>;
  _not?: InputMaybe<AEntitiesBoolExp>;
  _or?: InputMaybe<Array<AEntitiesBoolExp>>;
  address?: InputMaybe<StringBoolExp>;
  country?: InputMaybe<ACountriesBoolExp>;
  countryId?: InputMaybe<StringBoolExp>;
  dateOfIncorporation?: InputMaybe<DateBoolExp>;
  entityType?: InputMaybe<AEntityTypesBoolExp>;
  entityTypeId?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  leiNumber?: InputMaybe<StringBoolExp>;
  localRegistrationNumber?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  root?: InputMaybe<ARootsBoolExp>;
  rootId?: InputMaybe<StringBoolExp>;
  taxIdentificationNumber?: InputMaybe<StringBoolExp>;
  tradeName?: InputMaybe<StringBoolExp>;
};

export type AEntitiesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntitiesOrderBy>>;
  where?: InputMaybe<AEntitiesBoolExp>;
};

export type AEntitiesOrderBy = {
  address?: InputMaybe<OrderBy>;
  country?: InputMaybe<ACountriesOrderBy>;
  countryId?: InputMaybe<OrderBy>;
  dateOfIncorporation?: InputMaybe<OrderBy>;
  entityType?: InputMaybe<AEntityTypesOrderBy>;
  entityTypeId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  leiNumber?: InputMaybe<OrderBy>;
  localRegistrationNumber?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  root?: InputMaybe<ARootsOrderBy>;
  rootId?: InputMaybe<OrderBy>;
  taxIdentificationNumber?: InputMaybe<OrderBy>;
  tradeName?: InputMaybe<OrderBy>;
};

export type AEntityTypes = {
  __typename?: 'AEntityTypes';
  definition: Scalars['String1']['output'];
  entities?: Maybe<Array<AEntities>>;
  entitiesAggregate: AEntitiesAggExp;
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
};

export type AEntityTypesEntitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntitiesOrderBy>>;
  where?: InputMaybe<AEntitiesBoolExp>;
};

export type AEntityTypesEntitiesAggregateArgs = {
  filter_input?: InputMaybe<AEntitiesFilterInput>;
};

export type AEntityTypesAggExp = {
  __typename?: 'AEntityTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AEntityTypesBoolExp = {
  _and?: InputMaybe<Array<AEntityTypesBoolExp>>;
  _not?: InputMaybe<AEntityTypesBoolExp>;
  _or?: InputMaybe<Array<AEntityTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  entities?: InputMaybe<AEntitiesBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
};

export type AEntityTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntityTypesOrderBy>>;
  where?: InputMaybe<AEntityTypesBoolExp>;
};

export type AEntityTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AProductAssetRelationships = {
  __typename?: 'AProductAssetRelationships';
  asset?: Maybe<AAssets>;
  assetId: Scalars['String1']['output'];
  assetSupportType?: Maybe<AAssetSupportTypes>;
  id: Scalars['String1']['output'];
  product?: Maybe<AProducts>;
  productId: Scalars['String1']['output'];
  typeOfSupportId?: Maybe<Scalars['String1']['output']>;
};

export type AProductAssetRelationshipsAggExp = {
  __typename?: 'AProductAssetRelationshipsAggExp';
  _count: Scalars['Int']['output'];
  assetId: StringAggExp;
  id: StringAggExp;
  productId: StringAggExp;
  typeOfSupportId: StringAggExp;
};

export type AProductAssetRelationshipsBoolExp = {
  _and?: InputMaybe<Array<AProductAssetRelationshipsBoolExp>>;
  _not?: InputMaybe<AProductAssetRelationshipsBoolExp>;
  _or?: InputMaybe<Array<AProductAssetRelationshipsBoolExp>>;
  asset?: InputMaybe<AAssetsBoolExp>;
  assetId?: InputMaybe<StringBoolExp>;
  assetSupportType?: InputMaybe<AAssetSupportTypesBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  product?: InputMaybe<AProductsBoolExp>;
  productId?: InputMaybe<StringBoolExp>;
  typeOfSupportId?: InputMaybe<StringBoolExp>;
};

export type AProductAssetRelationshipsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductAssetRelationshipsOrderBy>>;
  where?: InputMaybe<AProductAssetRelationshipsBoolExp>;
};

export type AProductAssetRelationshipsOrderBy = {
  asset?: InputMaybe<AAssetsOrderBy>;
  assetId?: InputMaybe<OrderBy>;
  assetSupportType?: InputMaybe<AAssetSupportTypesOrderBy>;
  id?: InputMaybe<OrderBy>;
  product?: InputMaybe<AProductsOrderBy>;
  productId?: InputMaybe<OrderBy>;
  typeOfSupportId?: InputMaybe<OrderBy>;
};

export type AProductDeployments = {
  __typename?: 'AProductDeployments';
  deploymentId: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  product?: Maybe<AProducts>;
  productId: Scalars['String1']['output'];
  smartContractDeployment?: Maybe<ASmartContractDeployments>;
};

export type AProductDeploymentsAggExp = {
  __typename?: 'AProductDeploymentsAggExp';
  _count: Scalars['Int']['output'];
  deploymentId: StringAggExp;
  id: StringAggExp;
  productId: StringAggExp;
};

export type AProductDeploymentsBoolExp = {
  _and?: InputMaybe<Array<AProductDeploymentsBoolExp>>;
  _not?: InputMaybe<AProductDeploymentsBoolExp>;
  _or?: InputMaybe<Array<AProductDeploymentsBoolExp>>;
  deploymentId?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  product?: InputMaybe<AProductsBoolExp>;
  productId?: InputMaybe<StringBoolExp>;
  smartContractDeployment?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type AProductDeploymentsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductDeploymentsOrderBy>>;
  where?: InputMaybe<AProductDeploymentsBoolExp>;
};

export type AProductDeploymentsOrderBy = {
  deploymentId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product?: InputMaybe<AProductsOrderBy>;
  productId?: InputMaybe<OrderBy>;
  smartContractDeployment?: InputMaybe<ASmartContractDeploymentsOrderBy>;
};

export type AProductStatuses = {
  __typename?: 'AProductStatuses';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  products?: Maybe<Array<AProducts>>;
  productsAggregate: AProductsAggExp;
};

export type AProductStatusesProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductsOrderBy>>;
  where?: InputMaybe<AProductsBoolExp>;
};

export type AProductStatusesProductsAggregateArgs = {
  filter_input?: InputMaybe<AProductsFilterInput>;
};

export type AProductStatusesAggExp = {
  __typename?: 'AProductStatusesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AProductStatusesBoolExp = {
  _and?: InputMaybe<Array<AProductStatusesBoolExp>>;
  _not?: InputMaybe<AProductStatusesBoolExp>;
  _or?: InputMaybe<Array<AProductStatusesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  products?: InputMaybe<AProductsBoolExp>;
};

export type AProductStatusesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductStatusesOrderBy>>;
  where?: InputMaybe<AProductStatusesBoolExp>;
};

export type AProductStatusesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AProductTypes = {
  __typename?: 'AProductTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  products?: Maybe<Array<AProducts>>;
  productsAggregate: AProductsAggExp;
};

export type AProductTypesProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductsOrderBy>>;
  where?: InputMaybe<AProductsBoolExp>;
};

export type AProductTypesProductsAggregateArgs = {
  filter_input?: InputMaybe<AProductsFilterInput>;
};

export type AProductTypesAggExp = {
  __typename?: 'AProductTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AProductTypesBoolExp = {
  _and?: InputMaybe<Array<AProductTypesBoolExp>>;
  _not?: InputMaybe<AProductTypesBoolExp>;
  _or?: InputMaybe<Array<AProductTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  products?: InputMaybe<AProductsBoolExp>;
};

export type AProductTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductTypesOrderBy>>;
  where?: InputMaybe<AProductTypesBoolExp>;
};

export type AProductTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AProducts = {
  __typename?: 'AProducts';
  description: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  isMainProduct?: Maybe<Scalars['Int1']['output']>;
  launchDate?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String1']['output'];
  productAssetRelationships?: Maybe<Array<AProductAssetRelationships>>;
  productAssetRelationshipsAggregate: AProductAssetRelationshipsAggExp;
  productDeployments?: Maybe<Array<AProductDeployments>>;
  productDeploymentsAggregate: AProductDeploymentsAggExp;
  productStatus?: Maybe<AProductStatuses>;
  productStatusId?: Maybe<Scalars['String1']['output']>;
  productType?: Maybe<AProductTypes>;
  productTypeId?: Maybe<Scalars['String1']['output']>;
  root?: Maybe<ARoots>;
  rootId: Scalars['String1']['output'];
  supportsProducts?: Maybe<Array<ASupportsProducts>>;
  supportsProductsAggregate: ASupportsProductsAggExp;
  supportsProductsBySupportsProductId?: Maybe<Array<ASupportsProducts>>;
  supportsProductsBySupportsProductIdAggregate: ASupportsProductsAggExp;
  urls?: Maybe<Array<ProductUrls>>;
};

export type AProductsProductAssetRelationshipsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductAssetRelationshipsOrderBy>>;
  where?: InputMaybe<AProductAssetRelationshipsBoolExp>;
};

export type AProductsProductAssetRelationshipsAggregateArgs = {
  filter_input?: InputMaybe<AProductAssetRelationshipsFilterInput>;
};

export type AProductsProductDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductDeploymentsOrderBy>>;
  where?: InputMaybe<AProductDeploymentsBoolExp>;
};

export type AProductsProductDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<AProductDeploymentsFilterInput>;
};

export type AProductsSupportsProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASupportsProductsOrderBy>>;
  where?: InputMaybe<ASupportsProductsBoolExp>;
};

export type AProductsSupportsProductsAggregateArgs = {
  filter_input?: InputMaybe<ASupportsProductsFilterInput>;
};

export type AProductsSupportsProductsBySupportsProductIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASupportsProductsOrderBy>>;
  where?: InputMaybe<ASupportsProductsBoolExp>;
};

export type AProductsSupportsProductsBySupportsProductIdAggregateArgs = {
  filter_input?: InputMaybe<ASupportsProductsFilterInput>;
};

export type AProductsUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProductUrlsOrderBy>>;
  where?: InputMaybe<ProductUrlsBoolExp>;
};

export type AProductsAggExp = {
  __typename?: 'AProductsAggExp';
  _count: Scalars['Int']['output'];
  description: StringAggExp;
  id: StringAggExp;
  isMainProduct: IntAggExp;
  launchDate: DateAggExp;
  name: StringAggExp;
  productStatusId: StringAggExp;
  productTypeId: StringAggExp;
  rootId: StringAggExp;
};

export type AProductsBoolExp = {
  _and?: InputMaybe<Array<AProductsBoolExp>>;
  _not?: InputMaybe<AProductsBoolExp>;
  _or?: InputMaybe<Array<AProductsBoolExp>>;
  description?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  isMainProduct?: InputMaybe<IntBoolExp>;
  launchDate?: InputMaybe<DateBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  productAssetRelationships?: InputMaybe<AProductAssetRelationshipsBoolExp>;
  productDeployments?: InputMaybe<AProductDeploymentsBoolExp>;
  productStatus?: InputMaybe<AProductStatusesBoolExp>;
  productStatusId?: InputMaybe<StringBoolExp>;
  productType?: InputMaybe<AProductTypesBoolExp>;
  productTypeId?: InputMaybe<StringBoolExp>;
  root?: InputMaybe<ARootsBoolExp>;
  rootId?: InputMaybe<StringBoolExp>;
  supportsProducts?: InputMaybe<ASupportsProductsBoolExp>;
  supportsProductsBySupportsProductId?: InputMaybe<ASupportsProductsBoolExp>;
};

export type AProductsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductsOrderBy>>;
  where?: InputMaybe<AProductsBoolExp>;
};

export type AProductsOrderBy = {
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  isMainProduct?: InputMaybe<OrderBy>;
  launchDate?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  productStatus?: InputMaybe<AProductStatusesOrderBy>;
  productStatusId?: InputMaybe<OrderBy>;
  productType?: InputMaybe<AProductTypesOrderBy>;
  productTypeId?: InputMaybe<OrderBy>;
  root?: InputMaybe<ARootsOrderBy>;
  rootId?: InputMaybe<OrderBy>;
};

export type AProfileInfos = {
  __typename?: 'AProfileInfos';
  descriptionLong: Scalars['String1']['output'];
  descriptionShort: Scalars['String1']['output'];
  foundingDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String1']['output'];
  logo?: Maybe<Scalars['String1']['output']>;
  name: Scalars['String1']['output'];
  profileSector?: Maybe<AProfileSectors>;
  profileSectorId?: Maybe<Scalars['String1']['output']>;
  profileStatus?: Maybe<AProfileStatuses>;
  profileStatusId?: Maybe<Scalars['String1']['output']>;
  profileType?: Maybe<AProfileTypes>;
  profileTypeId?: Maybe<Scalars['String1']['output']>;
  root?: Maybe<ARoots>;
  rootId: Scalars['String1']['output'];
  /** Self promotion field */
  tagLine: Scalars['String1']['output'];
  urls?: Maybe<Array<ProfileInfoUrls>>;
};

export type AProfileInfosUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ProfileInfoUrlsOrderBy>>;
  where?: InputMaybe<ProfileInfoUrlsBoolExp>;
};

export type AProfileInfosAggExp = {
  __typename?: 'AProfileInfosAggExp';
  _count: Scalars['Int']['output'];
  descriptionLong: StringAggExp;
  descriptionShort: StringAggExp;
  foundingDate: DateAggExp;
  id: StringAggExp;
  logo: StringAggExp;
  name: StringAggExp;
  profileSectorId: StringAggExp;
  profileStatusId: StringAggExp;
  profileTypeId: StringAggExp;
  rootId: StringAggExp;
  tagLine: StringAggExp;
};

export type AProfileInfosBoolExp = {
  _and?: InputMaybe<Array<AProfileInfosBoolExp>>;
  _not?: InputMaybe<AProfileInfosBoolExp>;
  _or?: InputMaybe<Array<AProfileInfosBoolExp>>;
  descriptionLong?: InputMaybe<StringBoolExp>;
  descriptionShort?: InputMaybe<StringBoolExp>;
  foundingDate?: InputMaybe<DateBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  logo?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  profileSector?: InputMaybe<AProfileSectorsBoolExp>;
  profileSectorId?: InputMaybe<StringBoolExp>;
  profileStatus?: InputMaybe<AProfileStatusesBoolExp>;
  profileStatusId?: InputMaybe<StringBoolExp>;
  profileType?: InputMaybe<AProfileTypesBoolExp>;
  profileTypeId?: InputMaybe<StringBoolExp>;
  root?: InputMaybe<ARootsBoolExp>;
  rootId?: InputMaybe<StringBoolExp>;
  tagLine?: InputMaybe<StringBoolExp>;
};

export type AProfileInfosFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileInfosOrderBy>>;
  where?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileInfosOrderBy = {
  descriptionLong?: InputMaybe<OrderBy>;
  descriptionShort?: InputMaybe<OrderBy>;
  foundingDate?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  logo?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  profileSector?: InputMaybe<AProfileSectorsOrderBy>;
  profileSectorId?: InputMaybe<OrderBy>;
  profileStatus?: InputMaybe<AProfileStatusesOrderBy>;
  profileStatusId?: InputMaybe<OrderBy>;
  profileType?: InputMaybe<AProfileTypesOrderBy>;
  profileTypeId?: InputMaybe<OrderBy>;
  root?: InputMaybe<ARootsOrderBy>;
  rootId?: InputMaybe<OrderBy>;
  tagLine?: InputMaybe<OrderBy>;
};

export type AProfileSectors = {
  __typename?: 'AProfileSectors';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  profileInfos?: Maybe<Array<AProfileInfos>>;
  profileInfosAggregate: AProfileInfosAggExp;
};

export type AProfileSectorsProfileInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileInfosOrderBy>>;
  where?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileSectorsProfileInfosAggregateArgs = {
  filter_input?: InputMaybe<AProfileInfosFilterInput>;
};

export type AProfileSectorsAggExp = {
  __typename?: 'AProfileSectorsAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AProfileSectorsBoolExp = {
  _and?: InputMaybe<Array<AProfileSectorsBoolExp>>;
  _not?: InputMaybe<AProfileSectorsBoolExp>;
  _or?: InputMaybe<Array<AProfileSectorsBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  profileInfos?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileSectorsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileSectorsOrderBy>>;
  where?: InputMaybe<AProfileSectorsBoolExp>;
};

export type AProfileSectorsOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AProfileStatuses = {
  __typename?: 'AProfileStatuses';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  profileInfos?: Maybe<Array<AProfileInfos>>;
  profileInfosAggregate: AProfileInfosAggExp;
};

export type AProfileStatusesProfileInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileInfosOrderBy>>;
  where?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileStatusesProfileInfosAggregateArgs = {
  filter_input?: InputMaybe<AProfileInfosFilterInput>;
};

export type AProfileStatusesAggExp = {
  __typename?: 'AProfileStatusesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AProfileStatusesBoolExp = {
  _and?: InputMaybe<Array<AProfileStatusesBoolExp>>;
  _not?: InputMaybe<AProfileStatusesBoolExp>;
  _or?: InputMaybe<Array<AProfileStatusesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  profileInfos?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileStatusesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileStatusesOrderBy>>;
  where?: InputMaybe<AProfileStatusesBoolExp>;
};

export type AProfileStatusesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

/**   */
export type AProfileTags = {
  __typename?: 'AProfileTags';
  id: Scalars['String1']['output'];
  root?: Maybe<ARoots>;
  rootId: Scalars['String1']['output'];
  tag?: Maybe<ATags>;
  tagId: Scalars['String1']['output'];
};

export type AProfileTagsAggExp = {
  __typename?: 'AProfileTagsAggExp';
  _count: Scalars['Int']['output'];
  id: StringAggExp;
  rootId: StringAggExp;
  tagId: StringAggExp;
};

export type AProfileTagsBoolExp = {
  _and?: InputMaybe<Array<AProfileTagsBoolExp>>;
  _not?: InputMaybe<AProfileTagsBoolExp>;
  _or?: InputMaybe<Array<AProfileTagsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  root?: InputMaybe<ARootsBoolExp>;
  rootId?: InputMaybe<StringBoolExp>;
  tag?: InputMaybe<ATagsBoolExp>;
  tagId?: InputMaybe<StringBoolExp>;
};

export type AProfileTagsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileTagsOrderBy>>;
  where?: InputMaybe<AProfileTagsBoolExp>;
};

export type AProfileTagsOrderBy = {
  id?: InputMaybe<OrderBy>;
  root?: InputMaybe<ARootsOrderBy>;
  rootId?: InputMaybe<OrderBy>;
  tag?: InputMaybe<ATagsOrderBy>;
  tagId?: InputMaybe<OrderBy>;
};

export type AProfileTypes = {
  __typename?: 'AProfileTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  profileInfos?: Maybe<Array<AProfileInfos>>;
  profileInfosAggregate: AProfileInfosAggExp;
};

export type AProfileTypesProfileInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileInfosOrderBy>>;
  where?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileTypesProfileInfosAggregateArgs = {
  filter_input?: InputMaybe<AProfileInfosFilterInput>;
};

export type AProfileTypesAggExp = {
  __typename?: 'AProfileTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AProfileTypesBoolExp = {
  _and?: InputMaybe<Array<AProfileTypesBoolExp>>;
  _not?: InputMaybe<AProfileTypesBoolExp>;
  _or?: InputMaybe<Array<AProfileTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  profileInfos?: InputMaybe<AProfileInfosBoolExp>;
};

export type AProfileTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileTypesOrderBy>>;
  where?: InputMaybe<AProfileTypesBoolExp>;
};

export type AProfileTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type ARoots = {
  __typename?: 'ARoots';
  assets?: Maybe<Array<AAssets>>;
  assetsAggregate: AAssetsAggExp;
  entities?: Maybe<Array<AEntities>>;
  entitiesAggregate: AEntitiesAggExp;
  id: Scalars['String1']['output'];
  products?: Maybe<Array<AProducts>>;
  productsAggregate: AProductsAggExp;
  profileInfos?: Maybe<Array<AProfileInfos>>;
  profileInfosAggregate: AProfileInfosAggExp;
  profileTags?: Maybe<Array<AProfileTags>>;
  profileTagsAggregate: AProfileTagsAggExp;
  slug: Scalars['String1']['output'];
  socials?: Maybe<Array<ASocials>>;
  socialsAggregate: ASocialsAggExp;
  urlMain: Scalars['String1']['output'];
};

export type ARootsAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetsOrderBy>>;
  where?: InputMaybe<AAssetsBoolExp>;
};

export type ARootsAssetsAggregateArgs = {
  filter_input?: InputMaybe<AAssetsFilterInput>;
};

export type ARootsEntitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntitiesOrderBy>>;
  where?: InputMaybe<AEntitiesBoolExp>;
};

export type ARootsEntitiesAggregateArgs = {
  filter_input?: InputMaybe<AEntitiesFilterInput>;
};

export type ARootsProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductsOrderBy>>;
  where?: InputMaybe<AProductsBoolExp>;
};

export type ARootsProductsAggregateArgs = {
  filter_input?: InputMaybe<AProductsFilterInput>;
};

export type ARootsProfileInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileInfosOrderBy>>;
  where?: InputMaybe<AProfileInfosBoolExp>;
};

export type ARootsProfileInfosAggregateArgs = {
  filter_input?: InputMaybe<AProfileInfosFilterInput>;
};

export type ARootsProfileTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileTagsOrderBy>>;
  where?: InputMaybe<AProfileTagsBoolExp>;
};

export type ARootsProfileTagsAggregateArgs = {
  filter_input?: InputMaybe<AProfileTagsFilterInput>;
};

export type ARootsSocialsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASocialsOrderBy>>;
  where?: InputMaybe<ASocialsBoolExp>;
};

export type ARootsSocialsAggregateArgs = {
  filter_input?: InputMaybe<ASocialsFilterInput>;
};

export type ARootsAggExp = {
  __typename?: 'ARootsAggExp';
  _count: Scalars['Int']['output'];
  id: StringAggExp;
  slug: StringAggExp;
  urlMain: StringAggExp;
};

export type ARootsBoolExp = {
  _and?: InputMaybe<Array<ARootsBoolExp>>;
  _not?: InputMaybe<ARootsBoolExp>;
  _or?: InputMaybe<Array<ARootsBoolExp>>;
  assets?: InputMaybe<AAssetsBoolExp>;
  entities?: InputMaybe<AEntitiesBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  products?: InputMaybe<AProductsBoolExp>;
  profileInfos?: InputMaybe<AProfileInfosBoolExp>;
  profileTags?: InputMaybe<AProfileTagsBoolExp>;
  slug?: InputMaybe<StringBoolExp>;
  socials?: InputMaybe<ASocialsBoolExp>;
  urlMain?: InputMaybe<StringBoolExp>;
};

export type ARootsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ARootsOrderBy>>;
  where?: InputMaybe<ARootsBoolExp>;
};

export type ARootsOrderBy = {
  id?: InputMaybe<OrderBy>;
  slug?: InputMaybe<OrderBy>;
  urlMain?: InputMaybe<OrderBy>;
};

export type ASmartContractDeployments = {
  __typename?: 'ASmartContractDeployments';
  assetDeployments?: Maybe<Array<AAssetDeployments>>;
  assetDeploymentsAggregate: AssetDeploymentsAggExp;
  assetStandard?: Maybe<AAssetStandards>;
  deployedOnId?: Maybe<Scalars['String1']['output']>;
  deployedOnProduct?: Maybe<AProducts>;
  deploymentType?: Maybe<ADeploymentTypes>;
  deploymentTypeId?: Maybe<Scalars['String1']['output']>;
  id: Scalars['String1']['output'];
  isOfStandardId?: Maybe<Scalars['String1']['output']>;
  productDeployments?: Maybe<Array<AProductDeployments>>;
  productDeploymentsAggregate: AProductDeploymentsAggExp;
  smartContracts?: Maybe<Array<ASmartContracts>>;
  smartContractsAggregate: ASmartContractsAggExp;
};

export type ASmartContractDeploymentsAssetDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetDeploymentsOrderBy>>;
  where?: InputMaybe<AAssetDeploymentsBoolExp>;
};

export type ASmartContractDeploymentsAssetDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<AAssetDeploymentsFilterInput>;
};

export type ASmartContractDeploymentsProductDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductDeploymentsOrderBy>>;
  where?: InputMaybe<AProductDeploymentsBoolExp>;
};

export type ASmartContractDeploymentsProductDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<AProductDeploymentsFilterInput>;
};

export type ASmartContractDeploymentsSmartContractsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractsOrderBy>>;
  where?: InputMaybe<ASmartContractsBoolExp>;
};

export type ASmartContractDeploymentsSmartContractsAggregateArgs = {
  filter_input?: InputMaybe<ASmartContractsFilterInput>;
};

export type ASmartContractDeploymentsAggExp = {
  __typename?: 'ASmartContractDeploymentsAggExp';
  _count: Scalars['Int']['output'];
  deployedOnId: StringAggExp;
  deploymentTypeId: StringAggExp;
  id: StringAggExp;
  isOfStandardId: StringAggExp;
};

export type ASmartContractDeploymentsBoolExp = {
  _and?: InputMaybe<Array<ASmartContractDeploymentsBoolExp>>;
  _not?: InputMaybe<ASmartContractDeploymentsBoolExp>;
  _or?: InputMaybe<Array<ASmartContractDeploymentsBoolExp>>;
  assetDeployments?: InputMaybe<AAssetDeploymentsBoolExp>;
  assetStandard?: InputMaybe<AAssetStandardsBoolExp>;
  deployedOnId?: InputMaybe<StringBoolExp>;
  deployedOnProduct?: InputMaybe<AProductsBoolExp>;
  deploymentType?: InputMaybe<ADeploymentTypesBoolExp>;
  deploymentTypeId?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  isOfStandardId?: InputMaybe<StringBoolExp>;
  productDeployments?: InputMaybe<AProductDeploymentsBoolExp>;
  smartContracts?: InputMaybe<ASmartContractsBoolExp>;
};

export type ASmartContractDeploymentsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractDeploymentsOrderBy>>;
  where?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type ASmartContractDeploymentsOrderBy = {
  assetStandard?: InputMaybe<AAssetStandardsOrderBy>;
  deployedOnId?: InputMaybe<OrderBy>;
  deployedOnProduct?: InputMaybe<AProductsOrderBy>;
  deploymentType?: InputMaybe<ADeploymentTypesOrderBy>;
  deploymentTypeId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  isOfStandardId?: InputMaybe<OrderBy>;
};

export type ASmartContracts = {
  __typename?: 'ASmartContracts';
  address: Scalars['String1']['output'];
  deploymentDate?: Maybe<Scalars['Date']['output']>;
  deploymentId?: Maybe<Scalars['String1']['output']>;
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  smartContractDeployment?: Maybe<ASmartContractDeployments>;
};

export type ASmartContractsAggExp = {
  __typename?: 'ASmartContractsAggExp';
  _count: Scalars['Int']['output'];
  address: StringAggExp;
  deploymentDate: DateAggExp;
  deploymentId: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type ASmartContractsBoolExp = {
  _and?: InputMaybe<Array<ASmartContractsBoolExp>>;
  _not?: InputMaybe<ASmartContractsBoolExp>;
  _or?: InputMaybe<Array<ASmartContractsBoolExp>>;
  address?: InputMaybe<StringBoolExp>;
  deploymentDate?: InputMaybe<DateBoolExp>;
  deploymentId?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  smartContractDeployment?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type ASmartContractsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractsOrderBy>>;
  where?: InputMaybe<ASmartContractsBoolExp>;
};

export type ASmartContractsOrderBy = {
  address?: InputMaybe<OrderBy>;
  deploymentDate?: InputMaybe<OrderBy>;
  deploymentId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  smartContractDeployment?: InputMaybe<ASmartContractDeploymentsOrderBy>;
};

export type ASocialTypes = {
  __typename?: 'ASocialTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  socials?: Maybe<Array<ASocials>>;
  socialsAggregate: ASocialsAggExp;
};

export type ASocialTypesSocialsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASocialsOrderBy>>;
  where?: InputMaybe<ASocialsBoolExp>;
};

export type ASocialTypesSocialsAggregateArgs = {
  filter_input?: InputMaybe<ASocialsFilterInput>;
};

export type ASocialTypesAggExp = {
  __typename?: 'ASocialTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type ASocialTypesBoolExp = {
  _and?: InputMaybe<Array<ASocialTypesBoolExp>>;
  _not?: InputMaybe<ASocialTypesBoolExp>;
  _or?: InputMaybe<Array<ASocialTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  socials?: InputMaybe<ASocialsBoolExp>;
};

export type ASocialTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASocialTypesOrderBy>>;
  where?: InputMaybe<ASocialTypesBoolExp>;
};

export type ASocialTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type ASocials = {
  __typename?: 'ASocials';
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  root?: Maybe<ARoots>;
  rootId: Scalars['String1']['output'];
  socialType?: Maybe<ASocialTypes>;
  socialTypeId?: Maybe<Scalars['String1']['output']>;
  urls?: Maybe<Array<SocialUrls>>;
};

export type ASocialsUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SocialUrlsOrderBy>>;
  where?: InputMaybe<SocialUrlsBoolExp>;
};

export type ASocialsAggExp = {
  __typename?: 'ASocialsAggExp';
  _count: Scalars['Int']['output'];
  id: StringAggExp;
  name: StringAggExp;
  rootId: StringAggExp;
  socialTypeId: StringAggExp;
};

export type ASocialsBoolExp = {
  _and?: InputMaybe<Array<ASocialsBoolExp>>;
  _not?: InputMaybe<ASocialsBoolExp>;
  _or?: InputMaybe<Array<ASocialsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  root?: InputMaybe<ARootsBoolExp>;
  rootId?: InputMaybe<StringBoolExp>;
  socialType?: InputMaybe<ASocialTypesBoolExp>;
  socialTypeId?: InputMaybe<StringBoolExp>;
};

export type ASocialsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASocialsOrderBy>>;
  where?: InputMaybe<ASocialsBoolExp>;
};

export type ASocialsOrderBy = {
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  root?: InputMaybe<ARootsOrderBy>;
  rootId?: InputMaybe<OrderBy>;
  socialType?: InputMaybe<ASocialTypesOrderBy>;
  socialTypeId?: InputMaybe<OrderBy>;
};

/** Table mapping product support relationships */
export type ASupportsProducts = {
  __typename?: 'ASupportsProducts';
  id: Scalars['String1']['output'];
  product?: Maybe<AProducts>;
  productId: Scalars['String1']['output'];
  supportsProduct?: Maybe<AProducts>;
  supportsProductId: Scalars['String1']['output'];
};

export type ASupportsProductsAggExp = {
  __typename?: 'ASupportsProductsAggExp';
  _count: Scalars['Int']['output'];
  id: StringAggExp;
  productId: StringAggExp;
  supportsProductId: StringAggExp;
};

export type ASupportsProductsBoolExp = {
  _and?: InputMaybe<Array<ASupportsProductsBoolExp>>;
  _not?: InputMaybe<ASupportsProductsBoolExp>;
  _or?: InputMaybe<Array<ASupportsProductsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  product?: InputMaybe<AProductsBoolExp>;
  productId?: InputMaybe<StringBoolExp>;
  supportsProduct?: InputMaybe<AProductsBoolExp>;
  supportsProductId?: InputMaybe<StringBoolExp>;
};

export type ASupportsProductsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASupportsProductsOrderBy>>;
  where?: InputMaybe<ASupportsProductsBoolExp>;
};

export type ASupportsProductsOrderBy = {
  id?: InputMaybe<OrderBy>;
  product?: InputMaybe<AProductsOrderBy>;
  productId?: InputMaybe<OrderBy>;
  supportsProduct?: InputMaybe<AProductsOrderBy>;
  supportsProductId?: InputMaybe<OrderBy>;
};

export type ATagTypes = {
  __typename?: 'ATagTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  tags?: Maybe<Array<ATags>>;
  tagsAggregate: ATagsAggExp;
};

export type ATagTypesTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ATagsOrderBy>>;
  where?: InputMaybe<ATagsBoolExp>;
};

export type ATagTypesTagsAggregateArgs = {
  filter_input?: InputMaybe<ATagsFilterInput>;
};

export type ATagTypesAggExp = {
  __typename?: 'ATagTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type ATagTypesBoolExp = {
  _and?: InputMaybe<Array<ATagTypesBoolExp>>;
  _not?: InputMaybe<ATagTypesBoolExp>;
  _or?: InputMaybe<Array<ATagTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  tags?: InputMaybe<ATagsBoolExp>;
};

export type ATagTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ATagTypesOrderBy>>;
  where?: InputMaybe<ATagTypesBoolExp>;
};

export type ATagTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type ATags = {
  __typename?: 'ATags';
  description: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  profileTags?: Maybe<Array<AProfileTags>>;
  profileTagsAggregate: AProfileTagsAggExp;
  tagType?: Maybe<ATagTypes>;
  tagTypeId?: Maybe<Scalars['String1']['output']>;
};

export type ATagsProfileTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileTagsOrderBy>>;
  where?: InputMaybe<AProfileTagsBoolExp>;
};

export type ATagsProfileTagsAggregateArgs = {
  filter_input?: InputMaybe<AProfileTagsFilterInput>;
};

export type ATagsAggExp = {
  __typename?: 'ATagsAggExp';
  _count: Scalars['Int']['output'];
  description: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
  tagTypeId: StringAggExp;
};

export type ATagsBoolExp = {
  _and?: InputMaybe<Array<ATagsBoolExp>>;
  _not?: InputMaybe<ATagsBoolExp>;
  _or?: InputMaybe<Array<ATagsBoolExp>>;
  description?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  profileTags?: InputMaybe<AProfileTagsBoolExp>;
  tagType?: InputMaybe<ATagTypesBoolExp>;
  tagTypeId?: InputMaybe<StringBoolExp>;
};

export type ATagsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ATagsOrderBy>>;
  where?: InputMaybe<ATagsBoolExp>;
};

export type ATagsOrderBy = {
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  tagType?: InputMaybe<ATagTypesOrderBy>;
  tagTypeId?: InputMaybe<OrderBy>;
};

export type AUrlTypes = {
  __typename?: 'AUrlTypes';
  definition: Scalars['String1']['output'];
  id: Scalars['String1']['output'];
  name: Scalars['String1']['output'];
  urls?: Maybe<Array<AUrls>>;
  urlsAggregate: AUrlsAggExp;
};

export type AUrlTypesUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AUrlsOrderBy>>;
  where?: InputMaybe<AUrlsBoolExp>;
};

export type AUrlTypesUrlsAggregateArgs = {
  filter_input?: InputMaybe<AUrlsFilterInput>;
};

export type AUrlTypesAggExp = {
  __typename?: 'AUrlTypesAggExp';
  _count: Scalars['Int']['output'];
  definition: StringAggExp;
  id: StringAggExp;
  name: StringAggExp;
};

export type AUrlTypesBoolExp = {
  _and?: InputMaybe<Array<AUrlTypesBoolExp>>;
  _not?: InputMaybe<AUrlTypesBoolExp>;
  _or?: InputMaybe<Array<AUrlTypesBoolExp>>;
  definition?: InputMaybe<StringBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  name?: InputMaybe<StringBoolExp>;
  urls?: InputMaybe<AUrlsBoolExp>;
};

export type AUrlTypesFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AUrlTypesOrderBy>>;
  where?: InputMaybe<AUrlTypesBoolExp>;
};

export type AUrlTypesOrderBy = {
  definition?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

export type AUrls = {
  __typename?: 'AUrls';
  coreTableName?: Maybe<ACoreTableNames>;
  id: Scalars['String1']['output'];
  rowId: Scalars['String1']['output'];
  tableId: Scalars['String1']['output'];
  url: Scalars['String1']['output'];
  urlType?: Maybe<AUrlTypes>;
  urlTypeId?: Maybe<Scalars['String1']['output']>;
};

export type AUrlsAggExp = {
  __typename?: 'AUrlsAggExp';
  _count: Scalars['Int']['output'];
  id: StringAggExp;
  rowId: StringAggExp;
  tableId: StringAggExp;
  url: StringAggExp;
  urlTypeId: StringAggExp;
};

export type AUrlsBoolExp = {
  _and?: InputMaybe<Array<AUrlsBoolExp>>;
  _not?: InputMaybe<AUrlsBoolExp>;
  _or?: InputMaybe<Array<AUrlsBoolExp>>;
  coreTableName?: InputMaybe<ACoreTableNamesBoolExp>;
  id?: InputMaybe<StringBoolExp>;
  rowId?: InputMaybe<StringBoolExp>;
  tableId?: InputMaybe<StringBoolExp>;
  url?: InputMaybe<StringBoolExp>;
  urlType?: InputMaybe<AUrlTypesBoolExp>;
  urlTypeId?: InputMaybe<StringBoolExp>;
};

export type AUrlsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AUrlsOrderBy>>;
  where?: InputMaybe<AUrlsBoolExp>;
};

export type AUrlsOrderBy = {
  coreTableName?: InputMaybe<ACoreTableNamesOrderBy>;
  id?: InputMaybe<OrderBy>;
  rowId?: InputMaybe<OrderBy>;
  tableId?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  urlType?: InputMaybe<AUrlTypesOrderBy>;
  urlTypeId?: InputMaybe<OrderBy>;
};

export type AssetUrls = {
  __typename?: 'AssetUrls';
  id: Scalars['String1']['output'];
  rowId: Scalars['String1']['output'];
  tableId: Scalars['String1']['output'];
  url: Scalars['String1']['output'];
  urlType?: Maybe<AUrlTypes>;
  urlTypeId: Scalars['String1']['output'];
};

export type AssetUrlsBoolExp = {
  _and?: InputMaybe<Array<AssetUrlsBoolExp>>;
  _not?: InputMaybe<AssetUrlsBoolExp>;
  _or?: InputMaybe<Array<AssetUrlsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  rowId?: InputMaybe<StringBoolExp>;
  tableId?: InputMaybe<StringBoolExp>;
  url?: InputMaybe<StringBoolExp>;
  urlType?: InputMaybe<AUrlTypesBoolExp>;
  urlTypeId?: InputMaybe<StringBoolExp>;
};

export type AssetUrlsOrderBy = {
  id?: InputMaybe<OrderBy>;
  rowId?: InputMaybe<OrderBy>;
  tableId?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  urlType?: InputMaybe<AUrlTypesOrderBy>;
  urlTypeId?: InputMaybe<OrderBy>;
};

export type DateAggExp = {
  __typename?: 'DateAggExp';
  _count: Scalars['Int']['output'];
  _count_distinct: Scalars['Int']['output'];
};

export type DateBoolExp = {
  _eq?: InputMaybe<Scalars['Date']['input']>;
  _gt?: InputMaybe<Scalars['Date']['input']>;
  _gte?: InputMaybe<Scalars['Date']['input']>;
  _in?: InputMaybe<Array<Scalars['Date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Date']['input']>;
  _lte?: InputMaybe<Scalars['Date']['input']>;
};

export type EntityUrls = {
  __typename?: 'EntityUrls';
  id: Scalars['String1']['output'];
  rowId: Scalars['String1']['output'];
  tableId: Scalars['String1']['output'];
  url: Scalars['String1']['output'];
  urlType?: Maybe<AUrlTypes>;
  urlTypeId: Scalars['String1']['output'];
};

export type EntityUrlsBoolExp = {
  _and?: InputMaybe<Array<EntityUrlsBoolExp>>;
  _not?: InputMaybe<EntityUrlsBoolExp>;
  _or?: InputMaybe<Array<EntityUrlsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  rowId?: InputMaybe<StringBoolExp>;
  tableId?: InputMaybe<StringBoolExp>;
  url?: InputMaybe<StringBoolExp>;
  urlType?: InputMaybe<AUrlTypesBoolExp>;
  urlTypeId?: InputMaybe<StringBoolExp>;
};

export type EntityUrlsOrderBy = {
  id?: InputMaybe<OrderBy>;
  rowId?: InputMaybe<OrderBy>;
  tableId?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  urlType?: InputMaybe<AUrlTypesOrderBy>;
  urlTypeId?: InputMaybe<OrderBy>;
};

export type IntAggExp = {
  __typename?: 'IntAggExp';
  _count: Scalars['Int']['output'];
  _count_distinct: Scalars['Int']['output'];
  avg: Scalars['Float1']['output'];
  count: Scalars['Int1']['output'];
  max: Scalars['Int1']['output'];
  min: Scalars['Int1']['output'];
  stddev_pop: Scalars['Float1']['output'];
  stddev_samp: Scalars['Float1']['output'];
  sum: Scalars['Int1']['output'];
  var_pop: Scalars['Float1']['output'];
  var_samp: Scalars['Float1']['output'];
};

export type IntBoolExp = {
  _eq?: InputMaybe<Scalars['Int1']['input']>;
  _gt?: InputMaybe<Scalars['Int1']['input']>;
  _gte?: InputMaybe<Scalars['Int1']['input']>;
  _in?: InputMaybe<Array<Scalars['Int1']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int1']['input']>;
  _lte?: InputMaybe<Scalars['Int1']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _no_fields_accessible?: Maybe<Scalars['String']['output']>;
};

export enum OrderBy {
  /** Sorts the data in ascending order */
  Asc = 'Asc',
  /** Sorts the data in descending order */
  Desc = 'Desc'
}

export type ProductUrls = {
  __typename?: 'ProductUrls';
  id: Scalars['String1']['output'];
  rowId: Scalars['String1']['output'];
  tableId: Scalars['String1']['output'];
  url: Scalars['String1']['output'];
  urlType?: Maybe<AUrlTypes>;
  urlTypeId: Scalars['String1']['output'];
};

export type ProductUrlsBoolExp = {
  _and?: InputMaybe<Array<ProductUrlsBoolExp>>;
  _not?: InputMaybe<ProductUrlsBoolExp>;
  _or?: InputMaybe<Array<ProductUrlsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  rowId?: InputMaybe<StringBoolExp>;
  tableId?: InputMaybe<StringBoolExp>;
  url?: InputMaybe<StringBoolExp>;
  urlType?: InputMaybe<AUrlTypesBoolExp>;
  urlTypeId?: InputMaybe<StringBoolExp>;
};

export type ProductUrlsOrderBy = {
  id?: InputMaybe<OrderBy>;
  rowId?: InputMaybe<OrderBy>;
  tableId?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  urlType?: InputMaybe<AUrlTypesOrderBy>;
  urlTypeId?: InputMaybe<OrderBy>;
};

export type ProfileInfoUrls = {
  __typename?: 'ProfileInfoUrls';
  id: Scalars['String1']['output'];
  rowId: Scalars['String1']['output'];
  tableId: Scalars['String1']['output'];
  url: Scalars['String1']['output'];
  urlType?: Maybe<AUrlTypes>;
  urlTypeId: Scalars['String1']['output'];
};

export type ProfileInfoUrlsBoolExp = {
  _and?: InputMaybe<Array<ProfileInfoUrlsBoolExp>>;
  _not?: InputMaybe<ProfileInfoUrlsBoolExp>;
  _or?: InputMaybe<Array<ProfileInfoUrlsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  rowId?: InputMaybe<StringBoolExp>;
  tableId?: InputMaybe<StringBoolExp>;
  url?: InputMaybe<StringBoolExp>;
  urlType?: InputMaybe<AUrlTypesBoolExp>;
  urlTypeId?: InputMaybe<StringBoolExp>;
};

export type ProfileInfoUrlsOrderBy = {
  id?: InputMaybe<OrderBy>;
  rowId?: InputMaybe<OrderBy>;
  tableId?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  urlType?: InputMaybe<AUrlTypesOrderBy>;
  urlTypeId?: InputMaybe<OrderBy>;
};

export type Query = {
  __typename?: 'Query';
  assetDeployments?: Maybe<Array<AAssetDeployments>>;
  assetDeploymentsAggregate?: Maybe<AssetDeploymentsAggExp>;
  assetDeploymentsById?: Maybe<AAssetDeployments>;
  assetStandards?: Maybe<Array<AAssetStandards>>;
  assetStandardsAggregate?: Maybe<AAssetStandardsAggExp>;
  assetStandardsById?: Maybe<AAssetStandards>;
  assetStatuses?: Maybe<Array<AAssetStatuses>>;
  assetStatusesAggregate?: Maybe<AAssetStatusesAggExp>;
  assetStatusesById?: Maybe<AAssetStatuses>;
  assetSupportTypes?: Maybe<Array<AAssetSupportTypes>>;
  assetSupportTypesAggregate?: Maybe<AAssetSupportTypesAggExp>;
  assetSupportTypesById?: Maybe<AAssetSupportTypes>;
  assetTypes?: Maybe<Array<AAssetTypes>>;
  assetTypesAggregate?: Maybe<AAssetTypesAggExp>;
  assetTypesById?: Maybe<AAssetTypes>;
  assets?: Maybe<Array<AAssets>>;
  assetsAggregate?: Maybe<AAssetsAggExp>;
  assetsById?: Maybe<AAssets>;
  coreTableNames?: Maybe<Array<ACoreTableNames>>;
  coreTableNamesAggregate?: Maybe<ACoreTableNamesAggExp>;
  coreTableNamesById?: Maybe<ACoreTableNames>;
  countries?: Maybe<Array<ACountries>>;
  countriesAggregate?: Maybe<ACountriesAggExp>;
  countriesById?: Maybe<ACountries>;
  ddeploymentTypes?: Maybe<Array<ADeploymentTypes>>;
  deploymentTypesAggregate?: Maybe<ADeploymentTypesAggExp>;
  deploymentTypesById?: Maybe<ADeploymentTypes>;
  derivativeAssets?: Maybe<Array<ADerivativeAssets>>;
  derivativeAssetsAggregate?: Maybe<ADerivativeAssetsAggExp>;
  derivativeAssetsById?: Maybe<ADerivativeAssets>;
  entities?: Maybe<Array<AEntities>>;
  entitiesAggregate?: Maybe<AEntitiesAggExp>;
  entitiesById?: Maybe<AEntities>;
  entityTypes?: Maybe<Array<AEntityTypes>>;
  entityTypesAggregate?: Maybe<AEntityTypesAggExp>;
  entityTypesById?: Maybe<AEntityTypes>;
  productAssetRelationships?: Maybe<Array<AProductAssetRelationships>>;
  productAssetRelationshipsAggregate?: Maybe<AProductAssetRelationshipsAggExp>;
  productAssetRelationshipsById?: Maybe<AProductAssetRelationships>;
  productDeployments?: Maybe<Array<AProductDeployments>>;
  productDeploymentsAggregate?: Maybe<AProductDeploymentsAggExp>;
  productDeploymentsById?: Maybe<AProductDeployments>;
  productStatuses?: Maybe<Array<AProductStatuses>>;
  productStatusesAggregate?: Maybe<AProductStatusesAggExp>;
  productStatusesById?: Maybe<AProductStatuses>;
  productTypes?: Maybe<Array<AProductTypes>>;
  productTypesAggregate?: Maybe<AProductTypesAggExp>;
  productTypesById?: Maybe<AProductTypes>;
  products?: Maybe<Array<AProducts>>;
  productsAggregate?: Maybe<AProductsAggExp>;
  productsById?: Maybe<AProducts>;
  profileInfos?: Maybe<Array<AProfileInfos>>;
  profileInfosAggregate?: Maybe<AProfileInfosAggExp>;
  profileInfosById?: Maybe<AProfileInfos>;
  profileSectors?: Maybe<Array<AProfileSectors>>;
  profileSectorsAggregate?: Maybe<AProfileSectorsAggExp>;
  profileSectorsById?: Maybe<AProfileSectors>;
  profileStatuses?: Maybe<Array<AProfileStatuses>>;
  profileStatusesAggregate?: Maybe<AProfileStatusesAggExp>;
  profileStatusesById?: Maybe<AProfileStatuses>;
  /** Selects multiple objects from the model. Model description:   */
  profileTags?: Maybe<Array<AProfileTags>>;
  profileTagsAggregate?: Maybe<AProfileTagsAggExp>;
  /** Selects a single object from the model. Model description:   */
  profileTagsById?: Maybe<AProfileTags>;
  profileTypes?: Maybe<Array<AProfileTypes>>;
  profileTypesAggregate?: Maybe<AProfileTypesAggExp>;
  profileTypesById?: Maybe<AProfileTypes>;
  roots?: Maybe<Array<ARoots>>;
  rootsAggregate?: Maybe<ARootsAggExp>;
  rootsById?: Maybe<ARoots>;
  smartContractDeployments?: Maybe<Array<ASmartContractDeployments>>;
  smartContractDeploymentsAggregate?: Maybe<ASmartContractDeploymentsAggExp>;
  smartContractDeploymentsById?: Maybe<ASmartContractDeployments>;
  smartContracts?: Maybe<Array<ASmartContracts>>;
  smartContractsAggregate?: Maybe<ASmartContractsAggExp>;
  smartContractsById?: Maybe<ASmartContracts>;
  socialTypes?: Maybe<Array<ASocialTypes>>;
  socialTypesAggregate?: Maybe<ASocialTypesAggExp>;
  socialTypesById?: Maybe<ASocialTypes>;
  socials?: Maybe<Array<ASocials>>;
  socialsAggregate?: Maybe<ASocialsAggExp>;
  /** Selects multiple objects from the model. Model description: Table mapping product support relationships */
  supportsProducts?: Maybe<Array<ASupportsProducts>>;
  supportsProductsAggregate?: Maybe<ASupportsProductsAggExp>;
  /** Selects a single object from the model. Model description: Table mapping product support relationships */
  supportsProductsById?: Maybe<ASupportsProducts>;
  tagTypes?: Maybe<Array<ATagTypes>>;
  tagTypesAggregate?: Maybe<ATagTypesAggExp>;
  tagTypesById?: Maybe<ATagTypes>;
  tags?: Maybe<Array<ATags>>;
  tagsAggregate?: Maybe<ATagsAggExp>;
  tagsById?: Maybe<ATags>;
  urlTypes?: Maybe<Array<AUrlTypes>>;
  urlTypesAggregate?: Maybe<AUrlTypesAggExp>;
  urlTypesById?: Maybe<AUrlTypes>;
  urls?: Maybe<Array<AUrls>>;
  urlsAggregate?: Maybe<AUrlsAggExp>;
  urlsById?: Maybe<AUrls>;
};

export type QueryAssetDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetDeploymentsOrderBy>>;
  where?: InputMaybe<AAssetDeploymentsBoolExp>;
};

export type QueryAssetDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<AAssetDeploymentsFilterInput>;
};

export type QueryAssetDeploymentsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryAssetStandardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetStandardsOrderBy>>;
  where?: InputMaybe<AAssetStandardsBoolExp>;
};

export type QueryAssetStandardsAggregateArgs = {
  filter_input?: InputMaybe<AAssetStandardsFilterInput>;
};

export type QueryAssetStandardsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryAssetStatusesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetStatusesOrderBy>>;
  where?: InputMaybe<AAssetStatusesBoolExp>;
};

export type QueryAssetStatusesAggregateArgs = {
  filter_input?: InputMaybe<AAssetStatusesFilterInput>;
};

export type QueryAssetStatusesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryAssetSupportTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetSupportTypesOrderBy>>;
  where?: InputMaybe<AAssetSupportTypesBoolExp>;
};

export type QueryAssetSupportTypesAggregateArgs = {
  filter_input?: InputMaybe<AAssetSupportTypesFilterInput>;
};

export type QueryAssetSupportTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryAssetTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetTypesOrderBy>>;
  where?: InputMaybe<AAssetTypesBoolExp>;
};

export type QueryAssetTypesAggregateArgs = {
  filter_input?: InputMaybe<AAssetTypesFilterInput>;
};

export type QueryAssetTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AAssetsOrderBy>>;
  where?: InputMaybe<AAssetsBoolExp>;
};

export type QueryAssetsAggregateArgs = {
  filter_input?: InputMaybe<AAssetsFilterInput>;
};

export type QueryAssetsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryCoreTableNamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ACoreTableNamesOrderBy>>;
  where?: InputMaybe<ACoreTableNamesBoolExp>;
};

export type QueryCoreTableNamesAggregateArgs = {
  filter_input?: InputMaybe<ACoreTableNamesFilterInput>;
};

export type QueryCoreTableNamesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ACountriesOrderBy>>;
  where?: InputMaybe<ACountriesBoolExp>;
};

export type QueryCountriesAggregateArgs = {
  filter_input?: InputMaybe<ACountriesFilterInput>;
};

export type QueryCountriesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryDdeploymentTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ADeploymentTypesOrderBy>>;
  where?: InputMaybe<ADeploymentTypesBoolExp>;
};

export type QueryDeploymentTypesAggregateArgs = {
  filter_input?: InputMaybe<ADeploymentTypesFilterInput>;
};

export type QueryDeploymentTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryDerivativeAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ADerivativeAssetsOrderBy>>;
  where?: InputMaybe<ADerivativeAssetsBoolExp>;
};

export type QueryDerivativeAssetsAggregateArgs = {
  filter_input?: InputMaybe<ADerivativeAssetsFilterInput>;
};

export type QueryDerivativeAssetsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryEntitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntitiesOrderBy>>;
  where?: InputMaybe<AEntitiesBoolExp>;
};

export type QueryEntitiesAggregateArgs = {
  filter_input?: InputMaybe<AEntitiesFilterInput>;
};

export type QueryEntitiesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryEntityTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AEntityTypesOrderBy>>;
  where?: InputMaybe<AEntityTypesBoolExp>;
};

export type QueryEntityTypesAggregateArgs = {
  filter_input?: InputMaybe<AEntityTypesFilterInput>;
};

export type QueryEntityTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProductAssetRelationshipsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductAssetRelationshipsOrderBy>>;
  where?: InputMaybe<AProductAssetRelationshipsBoolExp>;
};

export type QueryProductAssetRelationshipsAggregateArgs = {
  filter_input?: InputMaybe<AProductAssetRelationshipsFilterInput>;
};

export type QueryProductAssetRelationshipsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProductDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductDeploymentsOrderBy>>;
  where?: InputMaybe<AProductDeploymentsBoolExp>;
};

export type QueryProductDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<AProductDeploymentsFilterInput>;
};

export type QueryProductDeploymentsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProductStatusesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductStatusesOrderBy>>;
  where?: InputMaybe<AProductStatusesBoolExp>;
};

export type QueryProductStatusesAggregateArgs = {
  filter_input?: InputMaybe<AProductStatusesFilterInput>;
};

export type QueryProductStatusesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProductTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductTypesOrderBy>>;
  where?: InputMaybe<AProductTypesBoolExp>;
};

export type QueryProductTypesAggregateArgs = {
  filter_input?: InputMaybe<AProductTypesFilterInput>;
};

export type QueryProductTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProductsOrderBy>>;
  where?: InputMaybe<AProductsBoolExp>;
};

export type QueryProductsAggregateArgs = {
  filter_input?: InputMaybe<AProductsFilterInput>;
};

export type QueryProductsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProfileInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileInfosOrderBy>>;
  where?: InputMaybe<AProfileInfosBoolExp>;
};

export type QueryProfileInfosAggregateArgs = {
  filter_input?: InputMaybe<AProfileInfosFilterInput>;
};

export type QueryProfileInfosByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProfileSectorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileSectorsOrderBy>>;
  where?: InputMaybe<AProfileSectorsBoolExp>;
};

export type QueryProfileSectorsAggregateArgs = {
  filter_input?: InputMaybe<AProfileSectorsFilterInput>;
};

export type QueryProfileSectorsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProfileStatusesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileStatusesOrderBy>>;
  where?: InputMaybe<AProfileStatusesBoolExp>;
};

export type QueryProfileStatusesAggregateArgs = {
  filter_input?: InputMaybe<AProfileStatusesFilterInput>;
};

export type QueryProfileStatusesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProfileTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileTagsOrderBy>>;
  where?: InputMaybe<AProfileTagsBoolExp>;
};

export type QueryProfileTagsAggregateArgs = {
  filter_input?: InputMaybe<AProfileTagsFilterInput>;
};

export type QueryProfileTagsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryProfileTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AProfileTypesOrderBy>>;
  where?: InputMaybe<AProfileTypesBoolExp>;
};

export type QueryProfileTypesAggregateArgs = {
  filter_input?: InputMaybe<AProfileTypesFilterInput>;
};

export type QueryProfileTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryRootsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ARootsOrderBy>>;
  where?: InputMaybe<ARootsBoolExp>;
};

export type QueryRootsAggregateArgs = {
  filter_input?: InputMaybe<ARootsFilterInput>;
};

export type QueryRootsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QuerySmartContractDeploymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractDeploymentsOrderBy>>;
  where?: InputMaybe<ASmartContractDeploymentsBoolExp>;
};

export type QuerySmartContractDeploymentsAggregateArgs = {
  filter_input?: InputMaybe<ASmartContractDeploymentsFilterInput>;
};

export type QuerySmartContractDeploymentsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QuerySmartContractsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASmartContractsOrderBy>>;
  where?: InputMaybe<ASmartContractsBoolExp>;
};

export type QuerySmartContractsAggregateArgs = {
  filter_input?: InputMaybe<ASmartContractsFilterInput>;
};

export type QuerySmartContractsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QuerySocialTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASocialTypesOrderBy>>;
  where?: InputMaybe<ASocialTypesBoolExp>;
};

export type QuerySocialTypesAggregateArgs = {
  filter_input?: InputMaybe<ASocialTypesFilterInput>;
};

export type QuerySocialTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QuerySocialsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASocialsOrderBy>>;
  where?: InputMaybe<ASocialsBoolExp>;
};

export type QuerySocialsAggregateArgs = {
  filter_input?: InputMaybe<ASocialsFilterInput>;
};

export type QuerySupportsProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ASupportsProductsOrderBy>>;
  where?: InputMaybe<ASupportsProductsBoolExp>;
};

export type QuerySupportsProductsAggregateArgs = {
  filter_input?: InputMaybe<ASupportsProductsFilterInput>;
};

export type QuerySupportsProductsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryTagTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ATagTypesOrderBy>>;
  where?: InputMaybe<ATagTypesBoolExp>;
};

export type QueryTagTypesAggregateArgs = {
  filter_input?: InputMaybe<ATagTypesFilterInput>;
};

export type QueryTagTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ATagsOrderBy>>;
  where?: InputMaybe<ATagsBoolExp>;
};

export type QueryTagsAggregateArgs = {
  filter_input?: InputMaybe<ATagsFilterInput>;
};

export type QueryTagsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryUrlTypesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AUrlTypesOrderBy>>;
  where?: InputMaybe<AUrlTypesBoolExp>;
};

export type QueryUrlTypesAggregateArgs = {
  filter_input?: InputMaybe<AUrlTypesFilterInput>;
};

export type QueryUrlTypesByIdArgs = {
  id: Scalars['String1']['input'];
};

export type QueryUrlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AUrlsOrderBy>>;
  where?: InputMaybe<AUrlsBoolExp>;
};

export type QueryUrlsAggregateArgs = {
  filter_input?: InputMaybe<AUrlsFilterInput>;
};

export type QueryUrlsByIdArgs = {
  id: Scalars['String1']['input'];
};

export type SocialUrls = {
  __typename?: 'SocialUrls';
  id?: Maybe<Scalars['String1']['output']>;
  rowId?: Maybe<Scalars['String1']['output']>;
  tableId?: Maybe<Scalars['String1']['output']>;
  url?: Maybe<Scalars['String1']['output']>;
  urlType?: Maybe<AUrlTypes>;
  urlTypeId?: Maybe<Scalars['String1']['output']>;
};

export type SocialUrlsBoolExp = {
  _and?: InputMaybe<Array<SocialUrlsBoolExp>>;
  _not?: InputMaybe<SocialUrlsBoolExp>;
  _or?: InputMaybe<Array<SocialUrlsBoolExp>>;
  id?: InputMaybe<StringBoolExp>;
  rowId?: InputMaybe<StringBoolExp>;
  tableId?: InputMaybe<StringBoolExp>;
  url?: InputMaybe<StringBoolExp>;
  urlType?: InputMaybe<AUrlTypesBoolExp>;
  urlTypeId?: InputMaybe<StringBoolExp>;
};

export type SocialUrlsOrderBy = {
  id?: InputMaybe<OrderBy>;
  rowId?: InputMaybe<OrderBy>;
  tableId?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  urlType?: InputMaybe<AUrlTypesOrderBy>;
  urlTypeId?: InputMaybe<OrderBy>;
};

export type StringAggExp = {
  __typename?: 'StringAggExp';
  _count: Scalars['Int']['output'];
  _count_distinct: Scalars['Int']['output'];
  max: Scalars['String1']['output'];
  min: Scalars['String1']['output'];
};

export type StringBoolExp = {
  _contains?: InputMaybe<Scalars['String1']['input']>;
  _eq?: InputMaybe<Scalars['String1']['input']>;
  _in?: InputMaybe<Array<Scalars['String1']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _like?: InputMaybe<Scalars['String1']['input']>;
};

export type AssetDeploymentsAggExp = {
  __typename?: 'assetDeploymentsAggExp';
  _count: Scalars['Int']['output'];
  assetId: StringAggExp;
  deploymentId: StringAggExp;
  id: StringAggExp;
};

export type AssetFieldsFragmentFragment = {
  __typename?: 'AAssets';
  ticker: string;
  rootId: string;
  name: string;
  id: string;
  icon: string;
  description: string;
  assetTypeId?: string | null;
  assetStatusId?: string | null;
  assetType?: {
    __typename?: 'AAssetTypes';
    definition: string;
    id: string;
    name: string;
  } | null;
  assetStatus?: {
    __typename?: 'AAssetStatuses';
    name: string;
    id: string;
    definition: string;
  } | null;
  assetDeployments?: Array<{
    __typename?: 'AAssetDeployments';
    id: string;
    deploymentId: string;
    assetId: string;
    smartContractDeployment?: {
      __typename?: 'ASmartContractDeployments';
      id: string;
      deployedOnProduct?: {
        __typename?: 'AProducts';
        id: string;
        name: string;
        root?: { __typename?: 'ARoots'; slug: string } | null;
      } | null;
      assetStandard?: { __typename?: 'AAssetStandards'; id: string } | null;
      smartContracts?: Array<{
        __typename?: 'ASmartContracts';
        name: string;
        id: string;
        deploymentId?: string | null;
        deploymentDate?: string | null;
        address: string;
      }> | null;
      deploymentType?: {
        __typename?: 'ADeploymentTypes';
        name: string;
        id: string;
        definition: string;
      } | null;
    } | null;
  }> | null;
  urls?: Array<{
    __typename?: 'AssetUrls';
    url: string;
    urlType?: {
      __typename?: 'AUrlTypes';
      name: string;
      id: string;
      definition: string;
    } | null;
  }> | null;
} & { ' $fragmentName'?: 'AssetFieldsFragmentFragment' };

export type EntityFieldsFragmentFragment = {
  __typename?: 'AEntities';
  name: string;
  tradeName: string;
  taxIdentificationNumber: string;
  localRegistrationNumber: string;
  leiNumber: string;
  id: string;
  dateOfIncorporation?: string | null;
  address: string;
  entityType?: {
    __typename?: 'AEntityTypes';
    name: string;
    id: string;
    definition: string;
  } | null;
  country?: {
    __typename?: 'ACountries';
    name: string;
    id: string;
    code: string;
  } | null;
  urls?: Array<{
    __typename?: 'EntityUrls';
    url: string;
    urlType?: {
      __typename?: 'AUrlTypes';
      name: string;
      id: string;
      definition: string;
    } | null;
  }> | null;
} & { ' $fragmentName'?: 'EntityFieldsFragmentFragment' };

export type ProfileFragmentFragment = {
  __typename?: 'AProfileInfos';
  profileSector?: { __typename?: 'AProfileSectors'; name: string } | null;
  profileType?: { __typename?: 'AProfileTypes'; name: string } | null;
  root?: {
    __typename?: 'ARoots';
    assets?: Array<{ __typename?: 'AAssets'; ticker: string }> | null;
    profileTags?: Array<{
      __typename?: 'AProfileTags';
      tag?: { __typename?: 'ATags'; name: string; id: string } | null;
    }> | null;
  } | null;
  profileStatus?: {
    __typename?: 'AProfileStatuses';
    name: string;
    id: string;
  } | null;
  mainProduct?: {
    __typename?: 'ARoots';
    products?: Array<{
      __typename?: 'AProducts';
      productType?: { __typename?: 'AProductTypes'; name: string } | null;
    }> | null;
  } | null;
} & { ' $fragmentName'?: 'ProfileFragmentFragment' };

export type ProductFieldsFragmentFragment = {
  __typename?: 'AProducts';
  rootId: string;
  productTypeId?: string | null;
  productStatusId?: string | null;
  name: string;
  launchDate?: string | null;
  isMainProduct?: number | null;
  id: string;
  description: string;
  productType?: {
    __typename?: 'AProductTypes';
    name: string;
    id: string;
    definition: string;
  } | null;
  productStatus?: {
    __typename?: 'AProductStatuses';
    name: string;
    id: string;
    definition: string;
  } | null;
  productDeployments?: Array<{
    __typename?: 'AProductDeployments';
    smartContractDeployment?: {
      __typename?: 'ASmartContractDeployments';
      isOfStandardId?: string | null;
      id: string;
      deployedOnProduct?: {
        __typename?: 'AProducts';
        id: string;
        name: string;
        root?: { __typename?: 'ARoots'; slug: string } | null;
      } | null;
      assetStandard?: { __typename?: 'AAssetStandards'; id: string } | null;
      deploymentType?: { __typename?: 'ADeploymentTypes'; name: string } | null;
      smartContracts?: Array<{
        __typename?: 'ASmartContracts';
        name: string;
        id: string;
        deploymentDate?: string | null;
        address: string;
        deploymentId?: string | null;
      }> | null;
    } | null;
  }> | null;
  supportsProducts?: Array<{
    __typename?: 'ASupportsProducts';
    supportsProduct?: {
      __typename?: 'AProducts';
      name: string;
      id: string;
      root?: { __typename?: 'ARoots'; slug: string } | null;
    } | null;
  }> | null;
  urls?: Array<{
    __typename?: 'ProductUrls';
    url: string;
    urlType?: {
      __typename?: 'AUrlTypes';
      name: string;
      id: string;
      definition: string;
    } | null;
  }> | null;
  productAssetRelationships?: Array<{
    __typename?: 'AProductAssetRelationships';
    assetId: string;
    asset?: {
      __typename?: 'AAssets';
      name: string;
      id: string;
      assetType?: { __typename?: 'AAssetTypes'; name: string } | null;
      root?: { __typename?: 'ARoots'; slug: string } | null;
    } | null;
    assetSupportType?: {
      __typename?: 'AAssetSupportTypes';
      name: string;
    } | null;
    product?: {
      __typename?: 'AProducts';
      name: string;
      id: string;
      description: string;
    } | null;
  }> | null;
} & { ' $fragmentName'?: 'ProductFieldsFragmentFragment' };

export type ProfileHeadingFragmentFragment = {
  __typename?: 'AProfileInfos';
  logo?: string | null;
  name: string;
  urls?: Array<{
    __typename?: 'ProfileInfoUrls';
    url: string;
    urlType?: { __typename?: 'AUrlTypes'; name: string } | null;
  }> | null;
  root?: {
    __typename?: 'ARoots';
    socials?: Array<{
      __typename?: 'ASocials';
      name: string;
      socialType?: { __typename?: 'ASocialTypes'; name: string } | null;
      urls?: Array<{ __typename?: 'SocialUrls'; url?: string | null }> | null;
    }> | null;
  } | null;
} & { ' $fragmentName'?: 'ProfileHeadingFragmentFragment' };

export type GetProfileDataQueryVariables = Exact<{
  where?: InputMaybe<AProfileInfosBoolExp>;
}>;

export type GetProfileDataQuery = {
  __typename?: 'Query';
  profileInfos?: Array<
    {
      __typename?: 'AProfileInfos';
      tagLine: string;
      descriptionShort: string;
      descriptionLong: string;
      root?: {
        __typename?: 'ARoots';
        products?: Array<
          { __typename?: 'AProducts'; id: string } & {
            ' $fragmentRefs'?: {
              ProductFieldsFragmentFragment: ProductFieldsFragmentFragment;
            };
          }
        > | null;
        assets?: Array<
          { __typename?: 'AAssets'; id: string } & {
            ' $fragmentRefs'?: {
              AssetFieldsFragmentFragment: AssetFieldsFragmentFragment;
            };
          }
        > | null;
        entities?: Array<
          { __typename?: 'AEntities'; id: string } & {
            ' $fragmentRefs'?: {
              EntityFieldsFragmentFragment: EntityFieldsFragmentFragment;
            };
          }
        > | null;
      } | null;
    } & {
      ' $fragmentRefs'?: {
        ProfileHeadingFragmentFragment: ProfileHeadingFragmentFragment;
        ProfileFragmentFragment: ProfileFragmentFragment;
      };
    }
  > | null;
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any> | undefined
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const AssetFieldsFragmentFragmentDoc = new TypedDocumentString(
  `
    fragment AssetFieldsFragment on AAssets {
  ticker
  rootId
  name
  id
  icon
  description
  assetTypeId
  assetStatusId
  assetType {
    definition
    id
    name
  }
  assetStatus {
    name
    id
    definition
  }
  assetDeployments {
    id
    deploymentId
    assetId
    smartContractDeployment {
      id
      deployedOnProduct {
        id
        name
        root {
          slug
        }
      }
      assetStandard {
        id
      }
      smartContracts {
        name
        id
        deploymentId
        deploymentDate
        address
      }
      deploymentType {
        name
        id
        definition
      }
    }
  }
  urls(order_by: {urlTypeId: Asc}) {
    url
    urlType {
      name
      id
      definition
    }
  }
}
    `,
  { fragmentName: 'AssetFieldsFragment' }
) as unknown as TypedDocumentString<AssetFieldsFragmentFragment, unknown>;
export const EntityFieldsFragmentFragmentDoc = new TypedDocumentString(
  `
    fragment EntityFieldsFragment on AEntities {
  name
  tradeName
  taxIdentificationNumber
  localRegistrationNumber
  leiNumber
  id
  dateOfIncorporation
  address
  entityType {
    name
    id
    definition
  }
  country {
    name
    id
    code
  }
  urls {
    url
    urlType {
      name
      id
      definition
    }
  }
}
    `,
  { fragmentName: 'EntityFieldsFragment' }
) as unknown as TypedDocumentString<EntityFieldsFragmentFragment, unknown>;
export const ProfileFragmentFragmentDoc = new TypedDocumentString(
  `
    fragment ProfileFragment on AProfileInfos {
  profileSector {
    name
  }
  profileType {
    name
  }
  root {
    assets {
      ticker
    }
  }
  profileStatus {
    name
    id
  }
  root {
    profileTags {
      tag {
        name
        id
      }
    }
  }
  mainProduct: root {
    products(where: {isMainProduct: {_eq: "1"}}, limit: 1) {
      productType {
        name
      }
    }
  }
}
    `,
  { fragmentName: 'ProfileFragment' }
) as unknown as TypedDocumentString<ProfileFragmentFragment, unknown>;
export const ProductFieldsFragmentFragmentDoc = new TypedDocumentString(
  `
    fragment ProductFieldsFragment on AProducts {
  rootId
  productTypeId
  productStatusId
  name
  launchDate
  isMainProduct
  id
  description
  productType {
    name
    id
    definition
  }
  productStatus {
    name
    id
    definition
  }
  productDeployments {
    smartContractDeployment {
      deployedOnProduct {
        id
        name
        root {
          slug
        }
      }
      assetStandard {
        id
      }
      deploymentType {
        name
      }
      smartContracts {
        name
        id
        deploymentDate
        address
        deploymentId
      }
      isOfStandardId
      id
    }
  }
  supportsProducts {
    supportsProduct {
      name
      id
      root {
        slug
      }
    }
  }
  urls(order_by: {urlTypeId: Asc}) {
    url
    urlType {
      name
      id
      definition
    }
  }
  productAssetRelationships {
    assetId
    asset {
      name
      id
      assetType {
        name
      }
      root {
        slug
      }
    }
    assetSupportType {
      name
    }
    product {
      name
      id
      description
    }
  }
}
    `,
  { fragmentName: 'ProductFieldsFragment' }
) as unknown as TypedDocumentString<ProductFieldsFragmentFragment, unknown>;
export const ProfileHeadingFragmentFragmentDoc = new TypedDocumentString(
  `
    fragment ProfileHeadingFragment on AProfileInfos {
  logo
  name
  urls(order_by: {urlTypeId: Asc}) {
    url
    urlType {
      name
    }
  }
  root {
    socials {
      name
      socialType {
        name
      }
      urls(order_by: {urlTypeId: Asc}) {
        url
      }
    }
  }
}
    `,
  { fragmentName: 'ProfileHeadingFragment' }
) as unknown as TypedDocumentString<ProfileHeadingFragmentFragment, unknown>;
export const GetProfileDataDocument = new TypedDocumentString(`
    query getProfileData($where: AProfileInfosBoolExp) {
  profileInfos(limit: 1, offset: 0, where: $where) {
    tagLine
    descriptionShort
    descriptionLong
    ...ProfileHeadingFragment
    ...ProfileFragment
    root {
      products {
        id
        ...ProductFieldsFragment
      }
      assets {
        id
        ...AssetFieldsFragment
      }
      entities {
        id
        ...EntityFieldsFragment
      }
    }
  }
}
    fragment AssetFieldsFragment on AAssets {
  ticker
  rootId
  name
  id
  icon
  description
  assetTypeId
  assetStatusId
  assetType {
    definition
    id
    name
  }
  assetStatus {
    name
    id
    definition
  }
  assetDeployments {
    id
    deploymentId
    assetId
    smartContractDeployment {
      id
      deployedOnProduct {
        id
        name
        root {
          slug
        }
      }
      assetStandard {
        id
      }
      smartContracts {
        name
        id
        deploymentId
        deploymentDate
        address
      }
      deploymentType {
        name
        id
        definition
      }
    }
  }
  urls(order_by: {urlTypeId: Asc}) {
    url
    urlType {
      name
      id
      definition
    }
  }
}
fragment EntityFieldsFragment on AEntities {
  name
  tradeName
  taxIdentificationNumber
  localRegistrationNumber
  leiNumber
  id
  dateOfIncorporation
  address
  entityType {
    name
    id
    definition
  }
  country {
    name
    id
    code
  }
  urls {
    url
    urlType {
      name
      id
      definition
    }
  }
}
fragment ProfileFragment on AProfileInfos {
  profileSector {
    name
  }
  profileType {
    name
  }
  root {
    assets {
      ticker
    }
  }
  profileStatus {
    name
    id
  }
  root {
    profileTags {
      tag {
        name
        id
      }
    }
  }
  mainProduct: root {
    products(where: {isMainProduct: {_eq: "1"}}, limit: 1) {
      productType {
        name
      }
    }
  }
}
fragment ProductFieldsFragment on AProducts {
  rootId
  productTypeId
  productStatusId
  name
  launchDate
  isMainProduct
  id
  description
  productType {
    name
    id
    definition
  }
  productStatus {
    name
    id
    definition
  }
  productDeployments {
    smartContractDeployment {
      deployedOnProduct {
        id
        name
        root {
          slug
        }
      }
      assetStandard {
        id
      }
      deploymentType {
        name
      }
      smartContracts {
        name
        id
        deploymentDate
        address
        deploymentId
      }
      isOfStandardId
      id
    }
  }
  supportsProducts {
    supportsProduct {
      name
      id
      root {
        slug
      }
    }
  }
  urls(order_by: {urlTypeId: Asc}) {
    url
    urlType {
      name
      id
      definition
    }
  }
  productAssetRelationships {
    assetId
    asset {
      name
      id
      assetType {
        name
      }
      root {
        slug
      }
    }
    assetSupportType {
      name
    }
    product {
      name
      id
      description
    }
  }
}
fragment ProfileHeadingFragment on AProfileInfos {
  logo
  name
  urls(order_by: {urlTypeId: Asc}) {
    url
    urlType {
      name
    }
  }
  root {
    socials {
      name
      socialType {
        name
      }
      urls(order_by: {urlTypeId: Asc}) {
        url
      }
    }
  }
}`) as unknown as TypedDocumentString<
  GetProfileDataQuery,
  GetProfileDataQueryVariables
>;
