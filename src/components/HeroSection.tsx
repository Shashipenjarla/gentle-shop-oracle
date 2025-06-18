import { Button } from '@/components/ui/button';
import { ChevronRight, Truck, Shield, DollarSign } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Save Money.
              <br />
              <span className="text-yellow-300">Live Better.</span>
            </h1>
            <p className="text-xl opacity-90">
              Shop millions of products at everyday low prices. Free pickup and delivery available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="font-semibold">
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold">
                Browse Deals
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-primary-foreground/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Truck className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Free Delivery</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-foreground/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Secure Shopping</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-foreground/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Best Prices</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm">
              <img 
                src="/placeholder.svg" 
                alt="Happy family shopping" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            {/* Floating deal card */}
            <div className="absolute -bottom-4 -left-4 bg-card text-card-foreground p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Today's Deal</p>
              <p className="text-2xl font-bold text-green-600">50% OFF</p>
              <p className="text-sm text-muted-foreground">Electronics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;