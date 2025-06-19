import { Leaf, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EcoImpactBadgeProps {
  carbonFootprint: number;
  isEcoFriendly: boolean;
  greenPoints: number;
  size?: 'sm' | 'md';
}

const EcoImpactBadge = ({ carbonFootprint, isEcoFriendly, greenPoints, size = 'sm' }: EcoImpactBadgeProps) => {
  const getFootprintColor = (footprint: number) => {
    if (footprint < 1) return 'bg-green-100 text-green-800 border-green-200';
    if (footprint < 5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      {isEcoFriendly && (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Leaf className={`${iconSize} mr-1`} />
              <span className={textSize}>Eco</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eco-friendly product</p>
            <p>Earn {greenPoints} green points!</p>
          </TooltipContent>
        </Tooltip>
      )}
      
      <Tooltip>
        <TooltipTrigger>
          <Badge 
            variant="outline" 
            className={`${getFootprintColor(carbonFootprint)} ${textSize}`}
          >
            {carbonFootprint.toFixed(1)}kg CO₂
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Carbon footprint per unit</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default EcoImpactBadge;