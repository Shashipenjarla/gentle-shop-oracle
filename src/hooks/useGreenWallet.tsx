import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface GreenWalletData {
  totalPoints: number;
  level: string;
  monthlyPoints: number;
  totalProductsPurchased: number;
  carbonSaved: number; // kg CO2
}

export const useGreenWallet = () => {
  const [walletData, setWalletData] = useState<GreenWalletData>({
    totalPoints: 250,
    level: 'Eco Warrior',
    monthlyPoints: 85,
    totalProductsPurchased: 23,
    carbonSaved: 12.5
  });
  
  const { toast } = useToast();

  const addGreenPoints = useCallback((points: number, productName: string) => {
    setWalletData(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      monthlyPoints: prev.monthlyPoints + points,
      totalProductsPurchased: prev.totalProductsPurchased + 1
    }));

    toast({
      title: "Green Points Earned! 🌱",
      description: `+${points} points for purchasing ${productName}`,
    });
  }, [toast]);

  const getLevel = (points: number): string => {
    if (points < 100) return 'Eco Starter';
    if (points < 500) return 'Eco Warrior';
    if (points < 1000) return 'Eco Champion';
    return 'Eco Legend';
  };

  return {
    walletData: {
      ...walletData,
      level: getLevel(walletData.totalPoints)
    },
    addGreenPoints
  };
};