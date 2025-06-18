import { useState, useEffect } from 'react';
import { Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProductCard, { Product } from './ProductCard';
import SocialSharing from './SocialSharing';

interface OutfitCombination {
  id: string;
  name: string;
  items: Product[];
  rating: number;
  shares: number;
  trending: boolean;
  tags: string[];
}

interface OutfitRecommendationsProps {
  currentCart: Product[];
  products: Product[];
  onAddToCart: (product: Product) => void;
}

// Mock data for outfit combinations - in real app this would come from backend AI
const mockOutfits: OutfitCombination[] = [
  {
    id: '1',
    name: 'Casual Weekend Look',
    items: [],
    rating: 4.8,
    shares: 234,
    trending: true,
    tags: ['casual', 'weekend', 'comfortable']
  },
  {
    id: '2',
    name: 'Business Professional',
    items: [],
    rating: 4.6,
    shares: 156,
    trending: false,
    tags: ['business', 'professional', 'office']
  },
  {
    id: '3',
    name: 'Date Night Special',
    items: [],
    rating: 4.9,
    shares: 189,
    trending: true,
    tags: ['date', 'elegant', 'evening']
  }
];

const OutfitRecommendations = ({ currentCart, products, onAddToCart }: OutfitRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<OutfitCombination[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitCombination | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate AI-powered recommendations based on cart items
    generateRecommendations();
  }, [currentCart, products]);

  const generateRecommendations = () => {
    // Mock AI logic - in real app this would be backend AI analysis
    const clothingItems = products.filter(p => p.category === 'Clothing');
    const electronicsItems = products.filter(p => p.category === 'Electronics');
    
    const updatedOutfits = mockOutfits.map(outfit => ({
      ...outfit,
      items: getRandomItems(clothingItems, 3) // Get 3 random clothing items for each outfit
    }));
    
    setRecommendations(updatedOutfits);
  };

  const getRandomItems = (items: Product[], count: number): Product[] => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const addOutfitToCart = (outfit: OutfitCombination) => {
    outfit.items.forEach(item => onAddToCart(item));
    
    toast({
      title: "Outfit added to cart",
      description: `${outfit.name} (${outfit.items.length} items) added successfully!`,
    });
  };

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Add items to your cart to get AI-powered outfit recommendations!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">AI Outfit Recommendations</h2>
        <Badge variant="secondary">Powered by Community</Badge>
      </div>
      
      <div className="grid gap-6">
        {recommendations.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {outfit.name}
                    {outfit.trending && (
                      <Badge variant="secondary" className="gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {outfit.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {outfit.shares} shares
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <SocialSharing 
                    outfitItems={outfit.items.map(item => ({
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      category: item.category
                    }))}
                    outfitName={outfit.name}
                  />
                  <Button onClick={() => addOutfitToCart(outfit)} size="sm">
                    Add Outfit to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2">
                {outfit.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {outfit.items.map((item) => (
                  <div key={item.id} className="scale-90 origin-top">
                    <ProductCard
                      product={item}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-muted/50">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Want Better Recommendations?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect to our backend to unlock AI-powered personalized recommendations based on your style, purchase history, and community trends.
          </p>
          <Badge variant="outline">Coming with Backend Integration</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutfitRecommendations;