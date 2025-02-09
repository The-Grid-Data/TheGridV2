import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

export type InfoIconProps = {
  text: string;
  className?: string;
  delayDuration?: number;
};

export function InfoIconTooltip({
  text,
  className,
  delayDuration = 100
}: InfoIconProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <InfoIcon
            className={cn(
              'h-4 w-4 cursor-help text-muted-foreground/70',
              className
            )}
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-64 text-base">
          <p className="text-sm">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
