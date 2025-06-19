import { useState } from 'react';
import Header from '@/components/Header';
import VirtualTryOn from '@/components/VirtualTryOn';
import { useToast } from '@/hooks/use-toast';

const VirtualTryOnPage = () => {
  const { toast } = useToast();

  const handleAddToCart = (accessory: any) => {
    toast({
      title: "Added to cart!",
      description: `${accessory.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={0}
        onCartClick={() => {}}
        onSearchChange={() => {}}
        greenWalletData={{
          totalPoints: 0,
          level: 'Eco Starter',
          monthlyPoints: 0,
          totalProductsPurchased: 0,
          carbonSaved: 0
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Virtual Try-On Studio</h1>
            <p className="text-muted-foreground">
              Try on sunglasses, hats, and earrings virtually before you buy
            </p>
          </div>
          
          <VirtualTryOn onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnPage;