'use client';

import { ProfileDetail } from '@/components/containers/profile-detail';
import { paths } from '@/lib/routes/paths';
import { useClerkContext } from '@/providers/clerk-provider';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Profile() {
  const { isLoading, isAuthenticated, profileMetadata } = useClerkContext();

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect(paths.signIn);
  }

  if (!profileMetadata) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">No Profile Found</h1>
        <p className="mt-4">
          Your profile is not properly set up. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="h-10" />
      <ProfileDetail
        profileId={profileMetadata.rootId}
        metadata={profileMetadata}
      />
    </div>
  );
}
