'use client';

import { DeploymentsTable } from '@/components/thegrid-ui/tables/deployments-table';
import { DerivativeAssetsTable } from '@/components/thegrid-ui/tables/derivative-assets-table';
import { UrlsTable } from '@/components/thegrid-ui/tables/urls-table';
import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { AssetFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { EditAssetForm } from './edit-asset-form';

type EditAssetOverlayProps = {
  asset: AssetFieldsFragmentFragment;
  triggerNode?: React.ReactNode;
};

export function EditAssetOverlay({
  asset,
  triggerNode
}: EditAssetOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${asset?.name}`}
      size="full"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <div className="flex flex-row gap-16 [&>*:nth-child(1)]:w-1/3 [&>*:nth-child(2)]:w-2/3">
          <EditAssetForm
            lensData={asset}
            onSuccess={closeDialog}
            onCancel={closeDialog}
          />
          <div className="flex flex-col gap-12">
            <UrlsTable
              urls={asset?.urls ?? []}
              rootId={asset.rootId}
              lensName="assets"
              lensRowId={asset.id}
            />
            <DeploymentsTable
              deployments={asset?.assetDeployments ?? []}
              rootId={asset.rootId}
              lensName="assets"
              lensRecordId={asset.id}
            />
            <DerivativeAssetsTable
              derivativeAssets={asset?.derivativeAssets ?? []}
              rootId={asset.rootId}
              assetId={asset.id}
            />
          </div>
        </div>
      )}
    />
  );
}
