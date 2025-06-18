import { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
}

const Header = ({ cartItemCount, onCartClick, onSearchChange }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="py-2 text-sm border-b border-primary-foreground/20">
          <div className="flex justify-between items-center">
            <span>Free shipping on orders over $35</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Store Locator</a>
              <a href="#" className="hover:underline">Help</a>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-2xl font-bold">ShopMart</h1>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search everything at ShopMart online and in store"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-background text-foreground"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-6 w-6" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-background text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-3 border-t border-primary-foreground/20">
          <div className="flex space-x-8 overflow-x-auto">
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Groceries</a>
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Electronics</a>
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Clothing</a>
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Home & Garden</a>
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Pharmacy</a>
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Auto & Tires</a>
            <a href="#" className="whitespace-nowrap hover:underline font-medium">Sports</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;