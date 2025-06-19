import { useState } from 'react';
import { Leaf, Award, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { GreenWalletData } from '@/hooks/useGreenWallet';

interface GreenWalletWidgetProps {
  walletData: GreenWalletData;
}

const GreenWalletWidget = ({ walletData }: GreenWalletWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getNextLevelPoints = (currentPoints: number): number => {
    if (currentPoints < 100) return 100;
    if (currentPoints < 500) return 500;
    if (currentPoints < 1000) return 1000;
    return 2000;
  };

  const nextLevelPoints = getNextLevelPoints(walletData.totalPoints);
  const progress = (walletData.totalPoints / nextLevelPoints) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Leaf className="h-4 w-4 mr-2 text-green-600" />
          <span className="hidden sm:inline">Green Wallet</span>
          <Badge variant="secondary" className="ml-2">
            {walletData.totalPoints}
          </Badge>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Green Wallet Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Level Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                {walletData.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{walletData.totalPoints}/{nextLevelPoints}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{walletData.totalPoints}</p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{walletData.monthlyPoints}</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{walletData.totalProductsPurchased}</p>
                  <p className="text-xs text-muted-foreground">Eco Products</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{walletData.carbonSaved}kg</p>
                  <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    🌱 First Eco Purchase
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    💧 Water Saver
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    ♻️ Recycling Champion
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GreenWalletWidget;