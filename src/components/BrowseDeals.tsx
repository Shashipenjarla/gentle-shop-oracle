import { useState } from 'react';
import { Tag, Clock, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getFeaturedProducts } from '@/data/products';

interface BrowseDealsProps {
  onProductClick?: (productId: string) => void;
}

const BrowseDeals = ({ onProductClick }: BrowseDealsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const featuredProducts = getFeaturedProducts().slice(0, 5);

  const timeLeft = {
    hours: 23,
    minutes: 45,
    seconds: 30
  };

  return (
    <Card className="w-80 max-w-[calc(100vw-2rem)] shadow-lg border-primary/20 animate-slide-in-right">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5 text-primary" />
          Browse Deals
          <Badge variant="destructive" className="ml-auto">
            Hot
          </Badge>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Deals end in {timeLeft.hours}h {timeLeft.minutes}m</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Flash Deal Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-lg">
          <div className="text-sm font-semibold">⚡ Flash Sale</div>
          <div className="text-xs opacity-90">Up to 50% off selected items</div>
        </div>

        {/* Featured Deals */}
        <div className="space-y-3">
          {featuredProducts.slice(0, isExpanded ? 5 : 3).map((product) => {
            const discount = product.originalPrice 
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;

            return (
              <div 
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
                onClick={() => onProductClick?.(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  -{discount}%
                </Badge>
              </div>
            );
          })}
        </div>

        {featuredProducts.length > 3 && (
          <>
            <Separator />
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'View More Deals'}
              <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </Button>
          </>
        )}

        {/* Categories on Sale */}
        <div>
          <h4 className="font-medium text-sm mb-2">Categories on Sale</h4>
          <div className="flex flex-wrap gap-1">
            {['Electronics', 'Clothing', 'Sports', 'Health'].map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full" size="sm">
          <Tag className="h-4 w-4 mr-2" />
          View All Deals
        </Button>
      </CardContent>
    </Card>
  );
};

export default BrowseDeals;