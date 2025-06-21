import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import ShoppingCart, { CartItem } from '@/components/ShoppingCart';
import VoiceInterface from '@/components/VoiceInterface';
import PostPurchaseAssistant from '@/components/PostPurchaseAssistant';
import SizePredictor from '@/components/SizePredictor';
import QuickReorder from '@/components/QuickReorder';
import ProductDetailModal from '@/components/ProductDetailModal';
import BrowseDeals from '@/components/BrowseDeals';
import FloatingGreenWallet from '@/components/FloatingGreenWallet';
import { Product } from '@/data/products';
import { sampleProducts, categories, getProductById } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useGreenWallet } from '@/hooks/useGreenWallet';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();
  const { walletData, addGreenPoints } = useGreenWallet();
  const navigate = useNavigate();

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate product counts by category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category] = sampleProducts.filter(p => p.category === category).length;
    });
    return counts;
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    // Award green points for eco-friendly products
    if (product.ecoData?.isEcoFriendly && product.ecoData.greenPoints > 0) {
      addGreenPoints(product.ecoData.greenPoints, product.name);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleProductClickById = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      handleProductClick(product);
    }
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlist(prev => {
      const isAlreadyInWishlist = prev.some(item => item.id === product.id);
      if (isAlreadyInWishlist) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist.`,
          variant: "destructive"
        });
        return prev;
      } else {
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prev, product];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckOrderStatus = () => {
    // Mock order status - in real app this would fetch from backend
    toast({
      title: "Order Status",
      description: "You have 2 active orders. Last order: Delivered today!",
    });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Mock recent purchases for demo
  const recentPurchases = sampleProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
        greenWalletData={walletData}
      />
      
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Floating Panels - Always Visible */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 space-y-4 hidden lg:block">
          <BrowseDeals onProductClick={handleProductClickById} />
        </div>
        
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
          <FloatingGreenWallet onViewRewards={() => navigate('/green-rewards')} />
        </div>

        {/* Mobile Floating Panels */}
        <div className="lg:hidden">
          <div className="fixed bottom-20 left-4 z-40">
            <BrowseDeals onProductClick={handleProductClickById} />
          </div>
          
          <div className="fixed bottom-20 right-4 z-40">
            <FloatingGreenWallet onViewRewards={() => navigate('/green-rewards')} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                productCounts={productCounts}
              />
              
              {/* Size Predictor */}
              <SizePredictor />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-8 lg:mr-80 xl:mr-80">
            {/* Quick Reorder */}
            <QuickReorder 
              products={sampleProducts.filter(p => p.category === 'Groceries' || p.category === 'Health & Beauty')}
              onAddToCart={handleAddToCart}
            />

            {/* Post-Purchase Assistant */}
            <PostPurchaseAssistant 
              recentPurchases={recentPurchases}
              onAddToCart={handleAddToCart}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCategory || 'All Products'}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>
      </div>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Voice Interface */}
      <VoiceInterface
        onSearch={setSearchQuery}
        onAddToCart={handleAddToCart}
        products={filteredProducts}
        onCheckOrderStatus={handleCheckOrderStatus}
        onShowDeals={(category) => {
          if (category) setSelectedCategory(category);
          setSearchQuery(category ? `deals ${category}` : 'deals');
        }}
        onCheckStock={(productName) => {
          setSearchQuery(productName);
        }}
      />
    </div>
  );
};

export default Index;
