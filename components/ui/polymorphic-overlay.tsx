import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog';
import { ScrollArea } from './scroll-area';

export type OverlaySize = 'small' | 'medium' | 'full';

export type PolymorphicOverlayProps = PropsWithChildren<{
  title: string;
  triggerNode?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  footer?: React.ReactNode;
  size?: OverlaySize;
}>;

type SizeConfig = {
  width: string;
  desktopHeight: string;
  mobileHeight: string;
  contentHeight: string;
};

const sizeVariants: Record<OverlaySize, SizeConfig> = {
  small: {
    width: 'max-w-lg',
    desktopHeight: 'max-h-[70vh]',
    mobileHeight: 'h-[70vh]',
    contentHeight: 'max-h-[calc(70vh-14rem)]'
  },
  medium: {
    width: 'max-w-3xl',
    desktopHeight: 'max-h-[90vh]',
    mobileHeight: 'h-[90vh]',
    contentHeight: 'max-h-[calc(90vh-14rem)]'
  },
  full: {
    width: 'max-w-[95vw]',
    desktopHeight: 'max-h-[98vh]',
    mobileHeight: 'h-[98vh]',
    contentHeight: 'max-h-[calc(98vh-14rem)]'
  }
};

export function PolymorphicOverlay({
  title,
  triggerNode,
  className,
  children,
  open,
  onOpenChange,
  size = 'medium'
}: PolymorphicOverlayProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const sizeConfig = sizeVariants[size];

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{triggerNode}</DialogTrigger>
        <DialogContent
          onInteractOutside={e => e.preventDefault()}
          className={cn(sizeConfig.width, sizeConfig.desktopHeight)}
        >
          <DialogHeader className="px-6 py-4">
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <DialogDescription className="sr-only">
            {title} form dialog
          </DialogDescription>
          <ScrollArea className={sizeConfig.contentHeight}>
            <div className={cn('p-6', className)}>{children}</div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {triggerNode}
      <DrawerContent>
        <DrawerHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <DrawerTitle>{title}</DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        <ScrollArea className={sizeConfig.contentHeight}>
          <div className={cn('p-6', className)}>{children}</div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
