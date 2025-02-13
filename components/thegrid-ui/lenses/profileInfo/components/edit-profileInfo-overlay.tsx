'use client';

import { UrlsTable } from '@/components/thegrid-ui/tables/urls-table';
import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { EditLensOverlayProps } from '../../base/types';
import { EditProfileInfoForm } from './edit-profileInfo-form';

export function EditProfileInfoOverlay({
  lensData,
  triggerNode
}: EditLensOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${lensData?.name}`}
      triggerNode={triggerNode}
      size="full"
      render={({ closeDialog }) => (
        <div className="flex flex-row gap-4">
          {/* Left Column - Core Product Information */}
          <div className="flex w-1/2 flex-col gap-4">
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Profile Info
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage core profile information and settings
                  </p>
                </div>
                <EditProfileInfoForm
                  lensData={lensData}
                  onSuccess={closeDialog}
                  onCancel={closeDialog}
                />
              </div>
            </section>
          </div>

          {/* Right Column - Related Data */}
          <div className="w-1/2 space-y-4">
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Profile URLs
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Associated links and references for this profile
                  </p>
                </div>
                <UrlsTable
                  urls={lensData?.urls ?? []}
                  rootId={lensData?.rootId ?? ''}
                  lensName="profileInfos"
                  lensRowId={lensData?.id ?? '' }
                />
              </div>
            </section>
          </div>
        </div>

      )}
    />
  );
}
