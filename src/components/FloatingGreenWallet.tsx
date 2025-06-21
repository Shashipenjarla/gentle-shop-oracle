import { useState } from 'react';
import { Wallet, Star, TrendingUp, Gift, Leaf, Zap, TreePine } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useGreenWallet } from '@/hooks/useGreenWallet';
import { calculateGreenImpact } from '@/services/greenRewardsService';

interface FloatingGreenWalletProps {
  onViewRewards?: () => void;
}

const FloatingGreenWallet = ({ onViewRewards }: FloatingGreenWalletProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { walletData } = useGreenWallet();
  const greenImpact = calculateGreenImpact(walletData?.totalPoints || 0, walletData?.carbonSaved || 0);

  const getNextLevelInfo = () => {
    const currentPoints = walletData?.totalPoints || 0;
    const levels = [
      { name: 'Eco Starter', min: 0, max: 499 },
      { name: 'Green Advocate', min: 500, max: 1499 },
      { name: 'Eco Champion', min: 1500, max: 2999 },
      { name: 'Green Leader', min: 3000, max: 4999 },
      { name: 'Eco Master', min: 5000, max: Infinity }
    ];

    const currentLevel = levels.find(level => 
      currentPoints >= level.min && currentPoints <= level.max
    );
    
    const nextLevel = levels.find(level => level.min > currentPoints);
    
    return {
      current: currentLevel?.name || 'Eco Starter',
      next: nextLevel?.name,
      pointsToNext: nextLevel ? nextLevel.min - currentPoints : 0,
      progress: nextLevel ? ((currentPoints - (currentLevel?.min || 0)) / (nextLevel.min - (currentLevel?.min || 0))) * 100 : 100
    };
  };

  const levelInfo = getNextLevelInfo();

  return (
    <Card className="w-80 max-w-[calc(100vw-2rem)] shadow-lg border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 animate-slide-in-right">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="h-5 w-5 text-green-600" />
          Green Wallet
          <Badge variant="outline" className="ml-auto text-green-700 border-green-300">
            {levelInfo.current}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Points Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {walletData?.totalPoints || 0}
          </div>
          <div className="text-sm text-muted-foreground">Green Points</div>
        </div>

        {/* Level Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{levelInfo.current}</span>
            {levelInfo.next && (
              <span className="text-xs text-muted-foreground">
                {levelInfo.pointsToNext} to {levelInfo.next}
              </span>
            )}
          </div>
          <Progress value={levelInfo.progress} className="h-2" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-white/50 dark:bg-white/5 rounded-lg">
            <div className="text-lg font-semibold text-green-600">{walletData?.monthlyPoints || 0}</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
          <div className="text-center p-2 bg-white/50 dark:bg-white/5 rounded-lg">
            <div className="text-lg font-semibold text-green-600">{walletData?.totalProductsPurchased || 0}</div>
            <div className="text-xs text-muted-foreground">Eco Products</div>
          </div>
        </div>

        {/* Expandable Section */}
        {isExpanded && (
          <>
            <Separator />
            
            {/* Environmental Impact */}
            <div>
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-600" />
                Your Impact
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <TreePine className="h-4 w-4 text-green-600 mx-auto mb-1" />
                  <div className="font-semibold">{greenImpact.treesEquivalent}</div>
                  <div className="text-muted-foreground">Trees</div>
                </div>
                <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <Zap className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                  <div className="font-semibold">{greenImpact.energySaved}</div>
                  <div className="text-muted-foreground">kWh</div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div>
              <h4 className="font-medium text-sm mb-2">Recent Achievements</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>Eco Champion Level Reached!</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span>5 Eco-Products This Week</span>
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-left justify-start"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'View Details'}
          </Button>
          
          <Button 
            size="sm" 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={onViewRewards}
          >
            <Gift className="h-4 w-4 mr-2" />
            Redeem Rewards
          </Button>
        </div>

        {/* Tip */}
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-xs">
          💡 <strong>Tip:</strong> Purchase eco-friendly products to earn more green points!
        </div>
      </CardContent>
    </Card>
  );
};

export default FloatingGreenWallet;