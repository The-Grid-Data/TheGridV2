'use client';

import {
  extractUrls,
  UrlTypeIconLinks
} from '@/components/containers/url-type-icon/url-type-icon-list';
import { EditProductOverlay } from '@/components/thegrid-ui/lenses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { CollapsibleList } from '@/components/ui/collapsible-list';
import { DeepLinkBadge } from '@/components/ui/deep-link-badge';
import { Separator } from '@/components/ui/separator';
import { FragmentType, graphql, useFragment } from '@/lib/graphql/generated';
import { paths } from '@/lib/routes/paths';
import { Banknote, Edit, Package } from 'lucide-react';
import Link from 'next/link';
import { ContractAddressesBadge } from './contract-address-badge';
import { InlineDataPoint } from './inline-data-point';
import { ProfileDataCard, ProfileDataCardProps } from './profile-data-card';

export const ProductFragment = graphql(`
  fragment ProductFieldsFragment on Products {
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
      id
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
          name
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
      id
      supportsProduct {
        name
        id
        root {
          slug
        }
      }
    }
    urls(order_by: { urlTypeId: Asc }) {
      id
      url
      urlType {
        name
        id
        definition
      }
    }
    productAssetRelationships {
      id
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
`);

export type ProductCardCardProps = {
  product: FragmentType<typeof ProductFragment>;
  variant?: ProfileDataCardProps['variant'];
};

export const ProductCard = ({
  product: productData,
  variant
}: ProductCardCardProps) => {
  const product = useFragment(ProductFragment, productData);

  return (
    <ProfileDataCard
      variant={variant}
      title={
        <div className="flex items-center gap-2">
          <CardTitle>{product.name}</CardTitle>
          {product.urls && (
            <>
              <Separator
                className="mx-2 h-[10px] rounded-lg border-[1px]"
                orientation="vertical"
              />
              <UrlTypeIconLinks urls={[extractUrls(product.urls)]} />
            </>
          )}
          <div className="ml-auto">
            <EditProductOverlay
              product={product}
              triggerNode={
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="1ProductEdit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
      }
      description={product.description || 'No description available'}
      dataPoints={[
        {
          label: 'Product Status',
          value: <Badge>{product.productStatus?.name}</Badge>
        },
        {
          label: 'Launch Date',
          value: product.launchDate ?? '-'
        },
        {
          label: 'Is Main Product',
          value: product.isMainProduct ? 'Yes' : 'No'
        },
        {
          label: 'Product type',
          fullWidth: true,
          children: <span className="text-sm">{product.productType?.name}</span>
        },
        {
          label: 'Supports',
          fullWidth: true,
          children: (
            <CollapsibleList
              items={product.supportsProducts}
              renderEmpty={() => <span className="text-sm">-</span>}
              renderItem={supportsProduct => (
                <div className="flex gap-2">
                  <DeepLinkBadge
                    icon={<Package size={16} />}
                    target="_blank"
                    href={
                      supportsProduct.supportsProduct?.root?.slug &&
                      paths.profile.detail(
                        supportsProduct.supportsProduct?.root?.slug,
                        {
                          section: 'products'
                        }
                      )
                    }
                    value={supportsProduct.supportsProduct?.name}
                  />
                </div>
              )}
            />
          )
        },
        {
          label: 'Asset relationships',
          fullWidth: true,
          children: (
            <CollapsibleList
              items={product.productAssetRelationships}
              renderEmpty={() => <span className="text-sm">-</span>}
              renderItem={relationship => (
                <div className="flex gap-2">
                  <DeepLinkBadge
                    icon={<Banknote size={16} />}
                    target="_blank"
                    href={
                      relationship.asset?.root?.slug &&
                      paths.profile.detail(relationship.asset?.root?.slug, {
                        section: 'assets'
                      })
                    }
                    value={`${relationship.asset?.name} | Support type: ${relationship.assetSupportType?.name}`}
                  />
                </div>
              )}
            />
          )
        },
        {
          fullWidth: true,
          label: 'Deployed on',
          separator: false,
          children: (
            <CollapsibleList
              className="w-full flex-1 flex-col items-start"
              wrapperClassName="w-full"
              items={product.productDeployments}
              renderEmpty={() => <span className="text-sm">-</span>}
              renderItem={deployment => (
                <div
                  key={deployment.smartContractDeployment?.id}
                  className="w-full flex-1 rounded-lg border p-3"
                >
                  <Link
                    className="mb-2 flex items-center gap-2 hover:underline"
                    href={paths.profile.detail(
                      deployment.smartContractDeployment?.deployedOnProduct
                        ?.root?.slug ?? '',
                      { section: 'products' }
                    )}
                  >
                    <Package size={16} />
                    <span className="font-medium">
                      {
                        deployment.smartContractDeployment?.deployedOnProduct
                          ?.name
                      }
                    </span>
                  </Link>

                  <div className="space-y-2">
                    <InlineDataPoint fullWidth label="Deployment Type">
                      <span className="text-sm">
                        {
                          deployment.smartContractDeployment?.deploymentType
                            ?.name
                        }
                      </span>
                    </InlineDataPoint>

                    <InlineDataPoint
                      fullWidth
                      separator={false}
                      label="Addresses"
                    >
                      <ContractAddressesBadge
                        smartContracts={
                          deployment?.smartContractDeployment?.smartContracts
                        }
                      />
                    </InlineDataPoint>
                  </div>
                </div>
              )}
            />
          )
        }
      ]}
    />
  );
};
