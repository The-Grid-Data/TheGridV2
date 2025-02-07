import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/ui/copy-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Link2 } from 'lucide-react';

type ContractAddressBadgeProps = {
  smartContracts:
    | {
        address: any;
      }[]
    | null
    | undefined;
};

export const ContractAddressesBadge = ({
  smartContracts
}: ContractAddressBadgeProps) => {
  const contracts = smartContracts?.filter(contract =>
    Boolean(contract.address)
  );

  if (!contracts?.length) {
    return '-';
  }

  const formatAddress = (address: string, length: number = 5) => {
    if (!address) return '-';
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  };

  return contracts.map(contract => (
    <div key={contract.address} className="flex w-full gap-2">
      <Badge
        variant="secondary"
        className="flex gap-2 font-mono text-xs hover:cursor-text"
      >
        <Link2 size={16} className="flex-shrink-0" />
        <span className="truncate">{formatAddress(contract.address, 6)}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CopyButton className="ml-2" value={contract.address} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-mono text-xs">{contract.address}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Badge>
    </div>
  ));
};
