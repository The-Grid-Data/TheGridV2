'use client';

import { ControlledOverlay } from '@/components/ui/controlled-overlay';
import { CreateProductForm } from '../forms/product-form/create-product-form';

type CreateProductOverlayProps = {
  rootId: string;
  triggerNode?: React.ReactNode;
};

export function CreateProductOverlay({
  rootId,
  triggerNode
}: CreateProductOverlayProps) {
  return (
    <ControlledOverlay
      title="Create product"
      triggerNode={triggerNode}
      render={({ closeDialog }) => (
        <CreateProductForm
          rootId={rootId}
          onSuccess={closeDialog}
          onCancel={closeDialog}
        />
      )}
    />
  );
}
