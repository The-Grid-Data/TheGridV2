'use client';
import ProfileLoading from '@/components/containers/profile-detail/components/profile-loading';
import { ValidationLogsTable } from '@/components/thegrid-ui/tables/validation-logs-table';
import { Button } from '@/components/ui/button';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import { paths } from '@/lib/routes/paths';
import { useClerkContext } from '@/providers/clerk-provider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Changelog } from './changelog';
import changelog from '@/lib/data/changelog.json';
export const HomeWhenSignedIn = () => {
  const { isLoading: isClerkLoading, profileMetadata } = useClerkContext();

  const query = {
    where: { root: { id: { _eq: profileMetadata?.rootId } } }
  };

  const { data, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', profileMetadata?.rootId],
    placeholderData: keepPreviousData,
    queryFn: () => execute(ProfileNameQuery, query)
  });

  const isLoading = isClerkLoading || isProfileLoading;

  const profile = data?.profileInfos?.[0];

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center space-y-8 py-16 md:py-24">
          <div className="max-w-4xl space-y-6 text-center">
            <h1 className="homeTitle scroll-m-20 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Manage the {profile?.name} profile
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
              Easily update, customize, and manage your profile information all
              in one place.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="default" asChild>
              <Link href={paths.profile.base}>Edit your profile</Link>
            </Button>
            {profile?.root?.slug && (
              <Button size="lg" variant="outline" asChild>
                <Link
                  href={paths.profile.detail(profile?.root?.slug)}
                  target="_blank"
                >
                  View on the Explorer
                </Link>
              </Button>
            )}
          </div>

          <div className="w-full max-w-4xl pt-8">
            <Changelog entries={changelog} />
          </div>
        </section>

        <section className="pb-16">
          {profile?.root?.id && (
            <ValidationLogsTable rootId={profile?.root?.id} />
          )}
        </section>
      </div>
    </div>
  );
};

export const ProfileNameQuery = graphql(`
  query getProfileName($where: ProfileInfosBoolExp) {
    profileInfos(limit: 1, offset: 0, where: $where) {
      name
      root {
        id
        slug
      }
    }
  }
`);
