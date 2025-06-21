import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Clock, TrendingUp, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';

interface OrderHistory {
  productId: string;
  orderCount: number;
  lastOrdered: Date;
  averageDaysBetweenOrders: number;
}

interface QuickReorderProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const QuickReorder = ({ products, onAddToCart }: QuickReorderProps) => {
  const { toast } = useToast();

  // Mock order history data - in real app this would come from backend
  const mockOrderHistory: OrderHistory[] = [
    { productId: '1', orderCount: 8, lastOrdered: new Date('2024-06-15'), averageDaysBetweenOrders: 7 },
    { productId: '2', orderCount: 12, lastOrdered: new Date('2024-06-12'), averageDaysBetweenOrders: 5 },
    { productId: '3', orderCount: 6, lastOrdered: new Date('2024-06-10'), averageDaysBetweenOrders: 10 },
    { productId: '4', orderCount: 15, lastOrdered: new Date('2024-06-14'), averageDaysBetweenOrders: 3 },
    { productId: '5', orderCount: 9, lastOrdered: new Date('2024-06-11'), averageDaysBetweenOrders: 6 },
  ];

  // Calculate frequently ordered items and reorder suggestions
  const frequentlyOrderedItems = useMemo(() => {
    const today = new Date();
    
    return mockOrderHistory
      .map(history => {
        const product = products.find(p => p.id === history.productId);
        if (!product) return null;

        const daysSinceLastOrder = Math.floor(
          (today.getTime() - history.lastOrdered.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        const shouldReorder = daysSinceLastOrder >= history.averageDaysBetweenOrders;
        const urgency = daysSinceLastOrder > history.averageDaysBetweenOrders * 1.5 ? 'high' : 
                       daysSinceLastOrder >= history.averageDaysBetweenOrders ? 'medium' : 'low';

        return {
          product,
          orderCount: history.orderCount,
          daysSinceLastOrder,
          shouldReorder,
          urgency,
          averageDaysBetweenOrders: history.averageDaysBetweenOrders
        };
      })
      .filter(item => item !== null)
      .sort((a, b) => {
        // Sort by urgency first, then by order frequency
        if (a!.shouldReorder && !b!.shouldReorder) return -1;
        if (!a!.shouldReorder && b!.shouldReorder) return 1;
        if (a!.urgency !== b!.urgency) {
          const urgencyOrder = { high: 3, medium: 2, low: 1 };
          return urgencyOrder[b!.urgency] - urgencyOrder[a!.urgency];
        }
        return b!.orderCount - a!.orderCount;
      });
  }, [products, mockOrderHistory]);

  const handleQuickReorder = (product: Product, orderCount: number) => {
    onAddToCart(product);
    
    toast({
      title: "Quick Reorder Added!",
      description: `${product.name} added to cart (ordered ${orderCount} times before)`,
    });
  };

  const handleReorderAll = () => {
    const itemsToReorder = frequentlyOrderedItems.filter(item => item!.shouldReorder).slice(0, 5);
    
    itemsToReorder.forEach(item => {
      if (item) {
        onAddToCart(item.product);
      }
    });

    toast({
      title: "Bulk Reorder Complete!",
      description: `Added ${itemsToReorder.length} frequently ordered items to cart`,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const reorderSuggestions = frequentlyOrderedItems.filter(item => item!.shouldReorder);

  if (frequentlyOrderedItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No order history available yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start shopping to see quick reorder suggestions!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reorder Suggestions */}
      {reorderSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Time to Reorder ({reorderSuggestions.length})
              </CardTitle>
              {reorderSuggestions.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReorderAll}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Based on your order patterns, these items are due for reorder:
            </p>
            
            {reorderSuggestions.slice(0, 5).map((item) => (
              <div key={item!.product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <img 
                  src={item!.product.image} 
                  alt={item!.product.name}
                  className="w-12 h-12 rounded object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {item!.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getUrgencyColor(item!.urgency)}>
                      {item!.urgency} priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Last ordered {item!.daysSinceLastOrder} days ago
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Usually reorder every {item!.averageDaysBetweenOrders} days
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">${item!.product.price.toFixed(2)}</p>
                  <Button
                    size="sm"
                    onClick={() => handleQuickReorder(item!.product, item!.orderCount)}
                    className="mt-1"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Frequently Ordered Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Your Grocery Favorites
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Items you order most frequently - quick reorder available:
          </p>

          {frequentlyOrderedItems.slice(0, 8).map((item) => (
            <div key={item!.product.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
              <img 
                src={item!.product.image} 
                alt={item!.product.name}
                className="w-10 h-10 rounded object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {item!.product.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    Ordered {item!.orderCount}x
                  </Badge>
                  {item!.shouldReorder && (
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                      Due for reorder
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium">${item!.product.price.toFixed(2)}</p>
                <Button
                  size="sm"
                  variant={item!.shouldReorder ? "default" : "outline"}
                  onClick={() => handleQuickReorder(item!.product, item!.orderCount)}
                  className="mt-1"
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Reorder
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickReorder;