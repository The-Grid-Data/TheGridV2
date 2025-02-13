'use client';

import { LensForm } from '../../base/components/lens-form';
import { EditLensFormProps } from '../../base/types';
import { useProfileInfoForm } from '../hooks/use-profileInfo-form';
import { ProfileInfoFormFields } from './profileInfo-form-fields';

export function EditProfileInfoForm({
  lensData,
  onSuccess,
  onCancel
}: EditLensFormProps) {
  const { form, isPending, error, onSubmit } = useProfileInfoForm({
    mode: 'edit',
    rootId: lensData?.rootId ?? '',
    lensData,
    onSuccess,
    onCancel
  });

  return (
    <LensForm
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      error={error}
      submitLabel="Save Changes"
    >
      <ProfileInfoFormFields />
    </LensForm>
  );
}
