'use client';
import { Button } from '@/components/ui/button';
import { paths } from '@/lib/routes/paths';
import { useClerkContext } from '@/providers/clerk-provider';
import Link from 'next/link';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { graphql } from '@/lib/graphql/generated';
import ProfileLoading from '@/components/containers/profile-detail/components/profile-loading';
import { ValidationLogsTable } from '@/components/thegrid-ui/tables/validation-logs-table';

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
    <section className="container mx-auto flex max-w-4xl flex-col items-center gap-6 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-12">
      <h1 className="scroll-m-20 text-balance text-center text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl lg:leading-[1.1]">
        Manage the {profile?.name} profile
      </h1>
      <p className="max-w-xl text-center text-lg font-light text-foreground">
        Easily update, customize, and manage your profile information all in one
        place.
      </p>

      <div className="flex flex-row gap-4">
        <Button variant="default" asChild>
          <Link href={paths.profile.base}>Edit your profile</Link>
        </Button>
        {profile?.root?.slug && (
          <Button variant="outline" asChild>
            <Link
              href={paths.profile.detail(profile?.root?.slug)}
              target="_blank"
            >
              View on the Explorer
            </Link>
          </Button>
        )}
      </div>

      {profile?.root?.id && <ValidationLogsTable rootId={profile?.root?.id} />}
    </section>
  );
};
