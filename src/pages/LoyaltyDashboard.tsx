import { useState } from 'react';
import { User, Star, History, Ruler, Brain, TrendingUp, Leaf, Gift, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { useGreenWallet } from '@/hooks/useGreenWallet';
import { calculateGreenImpact } from '@/services/greenRewardsService';

interface PurchaseHistoryItem {
  id: string;
  productName: string;
  category: string;
  price: number;
  ecoPoints: number;
  date: Date;
  isEcoFriendly: boolean;
}

interface SizePreference {
  category: string;
  size: string;
  confidence: number;
}

interface AIPersonalizedSuggestion {
  id: string;
  type: 'eco-upgrade' | 'size-recommendation' | 'trending' | 'seasonal';
  title: string;
  description: string;
  confidence: number;
  category: string;
}

const LoyaltyDashboard = () => {
  const { walletData } = useGreenWallet();
  const greenImpact = calculateGreenImpact(walletData?.totalPoints || 0, walletData?.carbonSaved || 0);

  // Mock data - in real app this would come from APIs
  const purchaseHistory: PurchaseHistoryItem[] = [
    {
      id: '1',
      productName: 'Organic Cotton T-Shirt',
      category: 'Clothing',
      price: 29.99,
      ecoPoints: 50,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isEcoFriendly: true
    },
    {
      id: '2',
      productName: 'Bamboo Toothbrush Set',
      category: 'Health & Beauty',
      price: 12.99,
      ecoPoints: 25,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isEcoFriendly: true
    },
    {
      id: '3',
      productName: 'Regular Plastic Water Bottle',
      category: 'Groceries',
      price: 1.99,
      ecoPoints: 0,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isEcoFriendly: false
    }
  ];

  const sizePreferences: SizePreference[] = [
    { category: 'Shirts', size: 'M', confidence: 95 },
    { category: 'Pants', size: '32x30', confidence: 88 },
    { category: 'Shoes', size: '10', confidence: 92 }
  ];

  const aiSuggestions: AIPersonalizedSuggestion[] = [
    {
      id: '1',
      type: 'eco-upgrade',
      title: 'Switch to Eco-Friendly Alternatives',
      description: 'Based on your recent purchases, try reusable water bottles instead of single-use plastic.',
      confidence: 87,
      category: 'Sustainability'
    },
    {
      id: '2',
      type: 'size-recommendation',
      title: 'Perfect Fit Recommendation',
      description: 'We found organic cotton shirts in size M that match your eco preferences.',
      confidence: 92,
      category: 'Fashion'
    },
    {
      id: '3',
      type: 'trending',
      title: 'Trending in Your Area',
      description: 'Solar-powered phone chargers are popular among eco-conscious shoppers near you.',
      confidence: 78,
      category: 'Electronics'
    }
  ];

  const getEcoScore = () => {
    const ecoItems = purchaseHistory.filter(item => item.isEcoFriendly).length;
    const totalItems = purchaseHistory.length;
    return totalItems > 0 ? Math.round((ecoItems / totalItems) * 100) : 0;
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'eco-upgrade': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'size-recommendation': return <Ruler className="h-4 w-4 text-blue-600" />;
      case 'trending': return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default: return <Brain className="h-4 w-4 text-orange-600" />;
    }
  };

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
            <User className="h-8 w-8 text-primary" />
            Loyalty Dashboard
          </h1>
          <p className="text-muted-foreground">
            Your personalized shopping insights and eco-friendly journey
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Purchase History</TabsTrigger>
            <TabsTrigger value="preferences">Size Preferences</TabsTrigger>
            <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Green Points */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Green Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {walletData?.totalPoints || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Level: {walletData?.level}
                  </div>
                </CardContent>
              </Card>

              {/* Eco Score */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-green-500" />
                    Eco Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getEcoScore()}%</div>
                  <div className="text-xs text-muted-foreground">
                    Eco-friendly purchases
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Purchases */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <ShoppingBag className="h-4 w-4 text-blue-500" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{walletData?.totalProductsPurchased || 0}</div>
                  <div className="text-xs text-muted-foreground">
                    Eco products purchased
                  </div>
                </CardContent>
              </Card>

              {/* Carbon Impact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-green-500" />
                    Carbon Saved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(walletData?.carbonSaved || 0)}</div>
                  <div className="text-xs text-muted-foreground">
                    lbs CO₂ equivalent
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Your Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{greenImpact.treesEquivalent}</div>
                    <div className="text-sm text-muted-foreground">Trees Saved</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{greenImpact.energySaved}</div>
                    <div className="text-sm text-muted-foreground">kWh Saved</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{greenImpact.plasticReduced}</div>
                    <div className="text-sm text-muted-foreground">Plastic Items Avoided</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{Math.round(walletData?.carbonSaved || 0)}</div>
                    <div className="text-sm text-muted-foreground">lbs CO₂ Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Purchases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          {item.isEcoFriendly && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Leaf className="h-3 w-3 mr-1" />
                              Eco-Friendly
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.category} • {item.date.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${item.price}</div>
                        {item.ecoPoints > 0 && (
                          <div className="text-sm text-green-600">+{item.ecoPoints} points</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Size Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sizePreferences.map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{pref.category}</h4>
                        <div className="text-sm text-muted-foreground">Size: {pref.size}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Confidence</div>
                        <div className="flex items-center gap-2">
                          <Progress value={pref.confidence} className="w-20" />
                          <span className="text-sm font-medium">{pref.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Personalized Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <h4 className="font-medium">{suggestion.title}</h4>
                        </div>
                        <Badge variant="outline">{suggestion.confidence}% match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{suggestion.category}</Badge>
                        <Button size="sm" variant="outline">View Products</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoyaltyDashboard;