import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { Badge } from './badge';

export type DeepLinkProps = {
  value?: string | false;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  icon?: ReactNode;
};

export const DeepLinkBadge = ({ value, href, icon, target }: DeepLinkProps) => {
  return (
    <div className="flex flex-col items-start overflow-hidden">
      {href && value ? (
        <Link
          href={href}
          scroll={false}
          target={target}
          className="text-sm font-semibold text-primary hover:text-primary/60"
        >
          <Badge variant="secondary" className="flex w-fit items-center gap-2">
            {icon} {value}
          </Badge>
        </Link>
      ) : (
        '-'
      )}
    </div>
  );
};
