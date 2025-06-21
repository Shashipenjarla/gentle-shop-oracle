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
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop" 
                alt="Shopping deals and electronics" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            {/* Enhanced floating deal card */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-xl animate-pulse">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop" 
                    alt="Deal item" 
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">⚡ TODAY'S DEAL</p>
                  <p className="text-3xl font-bold">50% OFF</p>
                  <p className="text-sm opacity-90">Samsung Smart TVs</p>
                </div>
              </div>
              <div className="mt-3 text-xs opacity-75">
                🔥 Limited time offer - Hurry up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;