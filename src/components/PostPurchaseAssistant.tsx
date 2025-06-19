import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/components/ProductCard';

interface PostPurchaseAssistantProps {
  recentPurchases: Product[];
  onAddToCart: (product: Product) => void;
}

const PostPurchaseAssistant = ({ recentPurchases, onAddToCart }: PostPurchaseAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleFeedbackSubmit = () => {
    if (!selectedProduct || !feedback || rating === 0) {
      toast({
        title: "Please complete all fields",
        description: "Rating and feedback are required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for your feedback!",
      description: "Your review helps other customers make better decisions.",
    });
    
    // Mock email follow-up
    setTimeout(() => {
      toast({
        title: "Follow-up email sent!",
        description: `Personalized recommendations based on your ${selectedProduct.name} purchase have been sent to your email.`,
      });
    }, 2000);

    setIsOpen(false);
    setFeedback('');
    setRating(0);
    setSelectedProduct(null);
  };

  const handleReorder = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Reordered successfully!",
      description: `${product.name} has been added to your cart again.`,
    });
  };

  const getRelatedProducts = (product: Product): Product[] => {
    // Mock related products based on category
    const mockRelated: Product[] = [
      {
        id: 'related-1',
        name: `Premium ${product.category} Accessory`,
        price: product.price * 0.3,
        image: product.image,
        rating: 4.5,
        reviewCount: 128,
        category: product.category
      },
      {
        id: 'related-2',
        name: `${product.category} Care Kit`,
        price: product.price * 0.2,
        image: product.image,
        rating: 4.3,
        reviewCount: 89,
        category: product.category
      }
    ];
    return mockRelated;
  };

  const startFeedbackFlow = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  if (recentPurchases.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No recent purchases to review</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Post-Purchase Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            How was your recent shopping experience? Help us improve and get personalized recommendations!
          </p>

          {recentPurchases.slice(0, 3).map((product) => (
            <div key={product.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Delivered 2 days ago
                  </p>
                  <Badge variant="outline" className="mt-1">
                    ${product.price.toFixed(2)}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startFeedbackFlow(product)}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Leave Feedback
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReorder(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
              </div>

              {/* Related Products */}
              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-2">You might also like:</p>
                <div className="flex gap-2 flex-wrap">
                  {getRelatedProducts(product).map((related) => (
                    <Button
                      key={related.id}
                      variant="ghost"
                      size="sm"
                      className="h-auto p-2 text-left"
                      onClick={() => onAddToCart(related)}
                    >
                      <div>
                        <p className="text-xs font-medium">{related.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${related.price.toFixed(2)}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Your Experience</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h4 className="font-medium">{selectedProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    How satisfied are you with this purchase?
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-sm font-medium mb-2">Rating</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <p className="text-sm font-medium mb-2">Your Feedback</p>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience with this product..."
                  className="min-h-20"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleFeedbackSubmit}>
                  <Mail className="h-4 w-4 mr-1" />
                  Submit & Get Recommendations
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostPurchaseAssistant;