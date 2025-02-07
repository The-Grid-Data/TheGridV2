import { ReactNode, useState } from 'react';
import { PolymorphicOverlay, type OverlaySize } from './polymorphic-overlay';

export type ControlledOverlayProps = {
  title: string;
  triggerNode: ReactNode;
  render: (props: { closeDialog: () => void }) => ReactNode;
  className?: string;
  size?: OverlaySize;
};

export function ControlledOverlay({
  triggerNode,
  render,
  title,
  className,
  size = 'medium'
}: ControlledOverlayProps) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const closeDialog = () => {
    setIsOverlayOpen(false);
  };

  const toggleDialog = (value: boolean) => {
    setIsOverlayOpen(value);
  };

  return (
    <PolymorphicOverlay
      title={title}
      onOpenChange={toggleDialog}
      open={isOverlayOpen}
      triggerNode={triggerNode}
      className={className}
      size={size}
    >
      {render({ closeDialog })}
    </PolymorphicOverlay>
  );
}
