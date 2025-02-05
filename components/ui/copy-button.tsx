'use client';

import { CheckIcon, ClipboardIcon } from 'lucide-react';
import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface CopyButtonProps extends ButtonProps {
  value: string;
  src?: string;
  children?: React.ReactNode;
}

export function CopyButton({
  value,
  className,
  src,
  variant = 'outline',
  children,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
  };

  return (
    <TooltipProvider>
      <Tooltip open={hasCopied}>
        <TooltipTrigger asChild={!children}>
          <div>
            {children && <div onClick={handleCopy}>{children}</div>}
            {!children && (
              <Button
                size="icon"
                variant={variant}
                className={cn(
                  'h-full max-h-6 w-fit px-2 py-1 [&_svg]:h-3 [&_svg]:w-3',
                  className
                )}
                onClick={handleCopy}
                {...props}
              >
                <span className="sr-only">Copy</span>
                {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <span className="text-xs">Copied to clipboard</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
