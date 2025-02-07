'use client';

import { DeploymentsTable } from '@/components/thegrid-ui/tables/deployments-table';
import { RelatedAssetsTable } from '@/components/thegrid-ui/tables/related-assets-table';
import { UrlsTable } from '@/components/thegrid-ui/tables/urls-table';
import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { ProductFieldsFragmentFragment } from '@/lib/graphql/generated/graphql';
import { EditProductForm } from './edit-product-form';

type EditProductOverlayProps = {
  product: ProductFieldsFragmentFragment;
  triggerNode?: React.ReactNode;
};

export function EditProductOverlay({
  product,
  triggerNode
}: EditProductOverlayProps) {
  return (
    <ControlledOverlay
      title={`Edit ${product?.name}`}
      size="full"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <div className="flex flex-row gap-16 [&>*:nth-child(1)]:w-1/3 [&>*:nth-child(2)]:w-2/3">
          <EditProductForm
            lensData={product}
            onSuccess={closeDialog}
            onCancel={closeDialog}
          />
          <div className="flex flex-col gap-12">
            <UrlsTable urls={product.urls} rootId={product.rootId} />
            <DeploymentsTable productDeployments={product.productDeployments} />
            <RelatedAssetsTable
              productAssetRelationships={product.productAssetRelationships}
            />
          </div>
        </div>
      )}
    />
  );
}
