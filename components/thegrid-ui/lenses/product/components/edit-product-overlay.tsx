'use client';

import { DeploymentsTable } from '@/components/thegrid-ui/tables/deployments-table';
import { ProductAssetRelationshipsTable } from '@/components/thegrid-ui/tables/product-asset-relationships-table';
import { SupportsProductsTable } from '@/components/thegrid-ui/tables/supports-products-table';
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
        <div className="flex flex-row gap-4">
          {/* Left Column - Core Product Information */}
          <div className="flex w-1/3 flex-col gap-4">
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Product Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage core product information and settings
                  </p>
                </div>
                <EditProductForm
                  lensData={product}
                  onSuccess={closeDialog}
                  onCancel={closeDialog}
                />
              </div>
            </section>

            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Product URLs
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Associated links and references for this product
                  </p>
                </div>
                <UrlsTable
                  urls={product?.urls ?? []}
                  rootId={product.rootId}
                  lensName="products"
                  lensRowId={product.id}
                />
              </div>
            </section>
          </div>

          {/* Right Column - Related Data */}
          <div className="w-2/3 space-y-4">
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Products Deployments
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Track and manage product deployment history and status
                  </p>
                </div>
                <DeploymentsTable
                  deployments={product?.productDeployments ?? []}
                  rootId={product.rootId}
                  lensName="products"
                  lensRecordId={product.id}
                />
              </div>
            </section>

            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Asset Relationships
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage associated assets and their relationships with this
                    product
                  </p>
                </div>
                <ProductAssetRelationshipsTable
                  productAssetRelationships={
                    product?.productAssetRelationships ?? []
                  }
                  rootId={product.rootId}
                  productId={product.id}
                />
              </div>
            </section>

            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h2 className="text-lg font-medium tracking-tight">
                    Supported Products
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    View and configure product support relationships
                  </p>
                </div>
                <SupportsProductsTable
                  supportsProducts={product?.supportsProducts ?? []}
                  rootId={product.rootId}
                  productId={product.id}
                />
              </div>
            </section>
          </div>
        </div>
      )}
    />
  );
}
