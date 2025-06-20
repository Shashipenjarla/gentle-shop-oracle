import { useState } from 'react';
import { Leaf, Gift, Star, Zap, TreePine, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { useGreenWallet } from '@/hooks/useGreenWallet';
import { 
  getAvailableRewards, 
  getAffordableRewards, 
  redeemReward, 
  calculateGreenImpact,
  GreenReward 
} from '@/services/greenRewardsService';

const GreenRewards = () => {
  const { toast } = useToast();
  const { walletData, removeGreenPoints } = useGreenWallet();
  const [redeeming, setRedeeming] = useState<string>('');

  const availableRewards = getAvailableRewards(walletData?.totalPoints || 0);
  const affordableRewards = getAffordableRewards(walletData?.totalPoints || 0);
  const greenImpact = calculateGreenImpact(walletData?.totalPoints || 0, walletData?.carbonSaved || 0);

  const handleRedeemReward = async (reward: GreenReward) => {
    setRedeeming(reward.id);
    
    try {
      const result = redeemReward(reward.id, walletData?.totalPoints || 0);
      
      if (result.success && result.pointsUsed) {
        // Deduct points from wallet
        removeGreenPoints(result.pointsUsed);
        
        toast({
          title: "Reward Redeemed!",
          description: result.message,
        });
      } else {
        toast({
          title: "Redemption Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redeem reward. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRedeeming('');
    }
  };

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
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={0}
        onCartClick={() => {}}
        onSearchChange={() => {}}
        greenWalletData={walletData}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            Green Rewards
          </h1>
          <p className="text-muted-foreground">
            Earn points for eco-friendly purchases and redeem them for amazing rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Points Summary */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Your Green Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {walletData?.totalPoints || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Green Points</div>
                </div>

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

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{walletData?.monthlyPoints || 0}</div>
                    <div className="text-muted-foreground">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{walletData?.totalProductsPurchased || 0}</div>
                    <div className="text-muted-foreground">Eco Products</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-green-600" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TreePine className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="font-semibold">{greenImpact.treesEquivalent}</div>
                    <div className="text-xs text-muted-foreground">Trees Saved</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="font-semibold">{greenImpact.energySaved}</div>
                    <div className="text-xs text-muted-foreground">kWh Saved</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Droplets className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                    <div className="font-semibold">{greenImpact.plasticReduced}</div>
                    <div className="text-xs text-muted-foreground">Plastic Avoided</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Leaf className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="font-semibold">{Math.round(walletData?.carbonSaved || 0)}</div>
                    <div className="text-xs text-muted-foreground">lbs CO₂</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rewards */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-600" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All Rewards</TabsTrigger>
                    <TabsTrigger value="affordable">
                      Affordable ({affordableRewards.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4 mt-6">
                    {availableRewards.map((reward) => (
                      <div 
                        key={reward.id} 
                        className={`border rounded-lg p-4 ${
                          (walletData?.totalPoints || 0) >= reward.pointsCost 
                            ? 'border-green-200 bg-green-50 dark:bg-green-900/10' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{reward.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {reward.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {reward.pointsCost} points
                              </Badge>
                              <Badge variant="secondary">
                                {reward.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            disabled={
                              (walletData?.totalPoints || 0) < reward.pointsCost || 
                              redeeming === reward.id
                            }
                            onClick={() => handleRedeemReward(reward)}
                            className="ml-4"
                          >
                            {redeeming === reward.id ? 'Redeeming...' : 'Redeem'}
                          </Button>
                        </div>
                        
                        {(walletData?.totalPoints || 0) < reward.pointsCost && (
                          <div className="text-xs text-muted-foreground">
                            Need {reward.pointsCost - (walletData?.totalPoints || 0)} more points
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="affordable" className="space-y-4 mt-6">
                    {affordableRewards.length > 0 ? (
                      affordableRewards.map((reward) => (
                        <div 
                          key={reward.id} 
                          className="border border-green-200 bg-green-50 dark:bg-green-900/10 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{reward.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {reward.description}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {reward.pointsCost} points
                                </Badge>
                                <Badge variant="secondary">
                                  {reward.category}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              disabled={redeeming === reward.id}
                              onClick={() => handleRedeemReward(reward)}
                              className="ml-4"
                            >
                              {redeeming === reward.id ? 'Redeeming...' : 'Redeem'}
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>You don't have enough points for any rewards yet.</p>
                        <p className="text-sm">Keep purchasing eco-friendly products to earn more points!</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenRewards;