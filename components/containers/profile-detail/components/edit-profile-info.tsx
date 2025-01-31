'use client';

import { EditProfileInfoOverlay } from '@/components/thegrid-ui/lenses/profileInfo/components/edit-profileInfo-overlay';
import { Button } from '@/components/ui/button';
import { FragmentType, graphql, useFragment } from '@/lib/graphql/generated';
import { Edit } from 'lucide-react';

export const ProfileInfoFragment = graphql(`
  fragment ProfileInfoFragment on ProfileInfos {
    id
    name
    tagLine
    descriptionShort
    descriptionLong
    foundingDate
    profileType {
      id
      name
      definition
    }
    profileStatus {
      id
      name
      definition
    }
    profileSector {
      id
      name
      definition
    }
  }
`);

export type EditProfileInfoProps = {
  profile: FragmentType<typeof ProfileInfoFragment>;
};

export const EditProfileInfo = ({
  profile,
}: EditProfileInfoProps) => {
  const profileData = useFragment(ProfileInfoFragment, profile);

  return (
    <EditProfileInfoOverlay
      lensData={profileData}
      triggerNode={
        <Button size="lg" className="ml-auto">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile Info
        </Button>
      }
    />

  );
};
