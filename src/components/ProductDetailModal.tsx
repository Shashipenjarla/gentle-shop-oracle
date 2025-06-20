import { useState } from 'react';
import { X, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/data/products';
import EcoImpactBadge from './EcoImpactBadge';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onAddToWishlist 
}: ProductDetailModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  const getStockStatus = () => {
    if (product.availability === 'out-of-stock') {
      return { text: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' };
    } else if (product.availability === 'low-stock') {
      return { text: `Only ${product.stockCount} left`, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-900/20' };
    } else {
      return { text: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' };
    }
  };

  const stockStatus = getStockStatus();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 animate-scale-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image Section */}
          <div className="p-6 bg-muted/30">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.originalPrice && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-4 left-4"
                >
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {product.ecoData?.isEcoFriendly && (
                <div className="absolute top-4 right-4">
                  <EcoImpactBadge ecoData={product.ecoData} />
                </div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 flex flex-col">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex-1">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bgColor} ${stockStatus.color} mb-4`}>
                  {stockStatus.text}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-6" />

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.stockCount}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <Button 
                    className="flex-1" 
                    onClick={handleAddToCart}
                    disabled={product.availability === 'out-of-stock'}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onAddToWishlist?.(product)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    Free shipping on orders over $35
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <RotateCcw className="h-4 w-4" />
                    30-day return policy
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    2-year warranty included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;