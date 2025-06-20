import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface GreenWalletData {
  totalPoints: number;
  level: string;
  monthlyPoints: number;
  totalProductsPurchased: number;
  carbonSaved: number; // lbs CO2
}

export const useGreenWallet = () => {
  const [walletData, setWalletData] = useState<GreenWalletData>({
    totalPoints: 250,
    level: 'Eco Starter',
    monthlyPoints: 85,
    totalProductsPurchased: 23,
    carbonSaved: 25.0
  });
  
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('greenWalletData');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setWalletData(parsedData);
      } catch (error) {
        console.error('Failed to parse stored green wallet data:', error);
      }
    }
  }, []);

  const getGreenLevel = (points: number): string => {
    if (points < 500) return 'Eco Starter';
    if (points < 1500) return 'Green Advocate';
    if (points < 3000) return 'Eco Champion';
    if (points < 5000) return 'Green Leader';
    return 'Eco Master';
  };

  const addGreenPoints = useCallback((points: number, productName: string) => {
    setWalletData(prev => {
      const newTotal = prev.totalPoints + points;
      const newLevel = getGreenLevel(newTotal);
      const newData = {
        ...prev,
        totalPoints: newTotal,
        monthlyPoints: prev.monthlyPoints + points,
        level: newLevel,
        totalProductsPurchased: prev.totalProductsPurchased + 1,
        carbonSaved: prev.carbonSaved + (points * 0.1) // 1 point = 0.1 lbs CO2 saved
      };
      
      localStorage.setItem('greenWalletData', JSON.stringify(newData));
      return newData;
    });

    toast({
      title: "Green Points Earned!",
      description: `+${points} points for purchasing ${productName}`,
    });
  }, [toast]);

  const removeGreenPoints = useCallback((points: number) => {
    setWalletData(prev => {
      const newTotal = Math.max(0, prev.totalPoints - points);
      const newLevel = getGreenLevel(newTotal);
      const newData = {
        ...prev,
        totalPoints: newTotal,
        level: newLevel
      };
      
      localStorage.setItem('greenWalletData', JSON.stringify(newData));
      return newData;
    });
  }, []);

  return { 
    walletData: {
      ...walletData,
      level: getGreenLevel(walletData.totalPoints)
    }, 
    addGreenPoints, 
    removeGreenPoints 
  };
};