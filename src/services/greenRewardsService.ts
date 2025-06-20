export interface GreenReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  discountPercentage: number;
  category: string;
  isActive: boolean;
  validUntil: Date;
}

export interface RedemptionHistory {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsUsed: number;
  redeemedAt: Date;
  usedAt?: Date;
  status: 'active' | 'used' | 'expired';
}

export const availableRewards: GreenReward[] = [
  {
    id: 'reward1',
    name: '$5 Off Eco-Friendly Products',
    description: 'Get $5 off your next purchase of eco-friendly items',
    pointsCost: 500,
    discountPercentage: 0,
    category: 'eco',
    isActive: true,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reward2',
    name: '10% Off Organic Food',
    description: '10% discount on all organic and natural food products',
    pointsCost: 750,
    discountPercentage: 10,
    category: 'food',
    isActive: true,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reward3',
    name: 'Free Reusable Shopping Bag',
    description: 'Get a free eco-friendly reusable shopping bag',
    pointsCost: 300,
    discountPercentage: 0,
    category: 'accessories',
    isActive: true,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reward4',
    name: '15% Off Green Cleaning Products',
    description: '15% discount on environmentally safe cleaning supplies',
    pointsCost: 600,
    discountPercentage: 15,
    category: 'cleaning',
    isActive: true,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'reward5',
    name: '$10 Off Solar Products',
    description: 'Get $10 off solar lights and eco-tech products',
    pointsCost: 1000,
    discountPercentage: 0,
    category: 'technology',
    isActive: true,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
];

export const getAvailableRewards = (userPoints: number): GreenReward[] => {
  return availableRewards.filter(reward => 
    reward.isActive && reward.validUntil > new Date()
  );
};

export const getAffordableRewards = (userPoints: number): GreenReward[] => {
  return getAvailableRewards(userPoints).filter(reward => 
    reward.pointsCost <= userPoints
  );
};

export const redeemReward = (rewardId: string, userPoints: number): { success: boolean; message: string; pointsUsed?: number } => {
  const reward = availableRewards.find(r => r.id === rewardId);
  
  if (!reward) {
    return { success: false, message: 'Reward not found' };
  }
  
  if (!reward.isActive) {
    return { success: false, message: 'Reward is no longer active' };
  }
  
  if (reward.validUntil < new Date()) {
    return { success: false, message: 'Reward has expired' };
  }
  
  if (userPoints < reward.pointsCost) {
    return { 
      success: false, 
      message: `Insufficient points. Need ${reward.pointsCost} points, you have ${userPoints}` 
    };
  }
  
  return { 
    success: true, 
    message: `Successfully redeemed ${reward.name}!`,
    pointsUsed: reward.pointsCost
  };
};

export const calculateGreenImpact = (totalPoints: number, carbonSaved: number) => {
  const treesEquivalent = Math.floor(carbonSaved / 50); // 50 lbs CO2 = 1 tree
  const energySaved = Math.floor(totalPoints / 10); // 10 points = 1 kWh saved
  const plasticReduced = Math.floor(totalPoints / 5); // 5 points = 1 plastic item avoided
  
  return {
    treesEquivalent,
    energySaved,
    plasticReduced,
    carbonSaved
  };
};