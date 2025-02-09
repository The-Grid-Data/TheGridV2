'use client';

import { CreateProductOverlay } from '@/components/thegrid-ui/lenses';
import { CreateAssetOverlay } from '@/components/thegrid-ui/lenses/asset';
import { CreateEntityOverlay } from '@/components/thegrid-ui/lenses/entity';
import { Button } from '@/components/ui/button';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Banknote, Building2, Package, Plus } from 'lucide-react';
import { AssetCard } from './components/asset-card';
import { EditProfileInfo } from './components/edit-profile-info';
import { EntityCard } from './components/entity-card';
import { OverviewSection } from './components/overview-section';
import { ProductCard } from './components/product-card';
import { ProfileDataPoint } from './components/profile-data-point';
import { ProfileDataSection } from './components/profile-data-section';
import { ProfileHeading } from './components/profile-heading';
import ProfileLoading from './components/profile-loading';
import ProfileNotFound from './components/profile-not-found';

export const ProfileDetailQuery = graphql(`
  query getProfileData($where: ProfileInfosBoolExp) {
    profileInfos(limit: 1, offset: 0, where: $where) {
      tagLine
      descriptionShort
      descriptionLong
      ...ProfileInfoFragment
      ...ProfileFragment
      ...ProfileHeadingFragment
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
`);

export type ProfileMetadata = {
  id: string;
  slug: string;
  name: string;
  rootId: string;
};

export type ProfileDetailProps = {
  profileId: string;
  metadata?: ProfileMetadata;
};

export const ProfileDetail = ({ profileId, metadata }: ProfileDetailProps) => {
  const query = {
    where: { root: { id: { _eq: profileId } } }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['profile', profileId],
    placeholderData: keepPreviousData,
    queryFn: () => execute(ProfileDetailQuery, query)
  });

  const profile = data?.profileInfos?.[0];

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <div className="container w-full space-y-10">
      <ProfileHeading
        query={ProfileDetailQuery.toString()}
        queryVariables={query}
        profile={profile}
      />

      <div className="flex flex-row items-end justify-between gap-16">
        <section className="space-y-3">
          <ProfileDataPoint label="Tagline" value={profile.tagLine} />
          <ProfileDataPoint
            label="Short Description"
            value={profile.descriptionShort}
          />
          <ProfileDataPoint
            label="Long Description"
            value={profile.descriptionLong}
          />
        </section>
        <EditProfileInfo profile={profile} />
      </div>

      <OverviewSection profile={profile} />

      <ProfileDataSection
        title="Products"
        id="products"
        icon={<Package className="h-6 w-6" />}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Boolean(profile.root?.products?.length) &&
            profile.root?.products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed">
            <CreateProductOverlay
              triggerNode={
                <Button variant="ghost" className="h-20 w-20" size="icon">
                  <Plus className="h-10 w-10" />
                </Button>
              }
              rootId={metadata?.rootId}
            />
          </div>
        </div>
      </ProfileDataSection>

      <ProfileDataSection
        icon={<Banknote className="h-6 w-6" />}
        title="Assets"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Boolean(profile.root?.assets?.length) &&
            profile.root?.assets?.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed">
            <CreateAssetOverlay
              triggerNode={
                <Button variant="ghost" className="h-20 w-20" size="icon">
                  <Plus className="h-10 w-10" />
                </Button>
              }
              rootId={metadata?.rootId}
            />
          </div>
        </div>
      </ProfileDataSection>

      <ProfileDataSection
        icon={<Building2 className="h-6 w-6" />}
        title="Entities"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Boolean(profile.root?.entities?.length) &&
            profile.root?.entities?.map(asset => (
              <EntityCard key={asset.id} entity={asset} />
            ))}
          <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed">
            <CreateEntityOverlay
              triggerNode={
                <Button variant="ghost" className="h-20 w-20" size="icon">
                  <Plus className="h-10 w-10" />
                </Button>
              }
              rootId={metadata?.rootId}
            />
          </div>
        </div>
      </ProfileDataSection>
    </div>
  );
};
