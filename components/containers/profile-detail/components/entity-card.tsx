'use client';

import {
  extractUrls,
  UrlTypeIconLinks
} from '@/components/containers/url-type-icon/url-type-icon-list';
import { EditEntityOverlay } from '@/components/thegrid-ui/lenses/entity';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FragmentType, graphql, useFragment } from '@/lib/graphql/generated';
import { Edit } from 'lucide-react';
import { ProfileDataCard, ProfileDataCardProps } from './profile-data-card';

export const EntityFieldsFragment = graphql(`
  fragment EntityFieldsFragment on Entities {
    rootId
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
    urls(order_by: { urlTypeId: Asc }) {
      id
      url
      urlType {
        name
        id
        definition
      }
    }
  }
`);

export type EntityCardProps = {
  entity: FragmentType<typeof EntityFieldsFragment>;
  variant?: ProfileDataCardProps['variant'];
};

export const EntityCard = ({
  entity: entityData,
  variant
}: EntityCardProps) => {
  const entity = useFragment(EntityFieldsFragment, entityData);

  return (
    <ProfileDataCard
      variant={variant}
      title={
        <div className="flex items-center gap-2">
          <CardTitle>{entity.name}</CardTitle>
          {entity.urls && (
            <>
              <Separator
                className="mx-2 h-[10px] rounded-lg border-[1px]"
                orientation="vertical"
              />
              <UrlTypeIconLinks urls={[extractUrls(entity.urls)]} />
            </>
          )}
          <EditEntityOverlay
            lensData={entity}
            triggerNode={
              <Button variant="ghost" size="icon" className="ml-auto">
                <Edit className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      }
      dataPoints={[
        {
          label: 'Entity Type',
          value: entity.entityType?.name || '-'
        },
        {
          label: 'Trade Name',
          value: entity.tradeName || '-'
        },
        {
          label: 'Reg Number',
          value: entity.localRegistrationNumber || '-'
        },
        {
          label: 'Tax Number',
          value: entity.taxIdentificationNumber || '-'
        },
        {
          label: 'LEI Code',
          value: entity.leiNumber || '-'
        },
        {
          label: 'Country',
          value: entity.country?.name || '-'
        },
        {
          label: 'Incorporation Date',
          value: entity.dateOfIncorporation || '-'
        },
        {
          label: 'Address',
          fullWidth: true,
          children: entity.address ? (
            <span className="w-full break-all text-sm">{entity.address}</span>
          ) : (
            '-'
          )
        }
      ]}
    />
  );
};
