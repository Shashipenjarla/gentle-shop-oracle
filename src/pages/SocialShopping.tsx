import { useState } from 'react';
import { ArrowLeft, Users, TrendingUp, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OutfitRecommendations from '@/components/OutfitRecommendations';
import SocialSharing from '@/components/SocialSharing';
import { Product } from '@/data/products';
import { sampleProducts } from '@/data/products';
import { useNavigate } from 'react-router-dom';

const SocialShopping = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const stats = [
    { label: 'Active Users', value: '12.5K', icon: Users },
    { label: 'Outfits Shared', value: '3.2K', icon: Share2 },
    { label: 'Trending Looks', value: '45', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Social Shopping</h1>
              <p className="text-muted-foreground">Discover and share amazing outfits</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="recommendations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="community">Community Shares</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-8">
            <OutfitRecommendations
              currentCart={cartItems}
              products={sampleProducts}
              onAddToCart={handleAddToCart}
            />
          </TabsContent>
          
          <TabsContent value="community" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Community Shared Outfits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Share2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Community Features Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    See what others are wearing and get inspired by community-shared outfits.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This feature requires backend integration to store and display community content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Demo Sharing */}
        {cartItems.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Share Your Current Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <SocialSharing 
                outfitItems={cartItems.map(item => ({
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  category: item.category
                }))}
                outfitName="My Custom Outfit"
              />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SocialShopping;