export interface Deal {
  id: string;
  title: string;
  description: string;
  category: string;
  discountPercentage: number;
  originalPrice: number;
  discountedPrice: number;
  couponCode: string;
  expiresAt: Date;
  isActive: boolean;
}

export interface StoreStock {
  storeId: string;
  storeName: string;
  address: string;
  distance: number;
  inStock: boolean;
  quantity: number;
}

export const currentDeals: Deal[] = [
  {
    id: "1",
    title: "Nike Running Shoes Sale",
    description: "Up to 40% off on select Nike running shoes",
    category: "shoes",
    discountPercentage: 40,
    originalPrice: 120,
    discountedPrice: 72,
    couponCode: "NIKE40",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true
  },
  {
    id: "2",
    title: "Adidas Athletic Wear",
    description: "25% off all Adidas athletic shoes and apparel",
    category: "shoes",
    discountPercentage: 25,
    originalPrice: 80,
    discountedPrice: 60,
    couponCode: "ADIDAS25",
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    isActive: true
  },
  {
    id: "3",
    title: "iPhone 15 Launch Offer",
    description: "Trade in your old phone and get $200 off iPhone 15",
    category: "electronics",
    discountPercentage: 15,
    originalPrice: 999,
    discountedPrice: 799,
    couponCode: "IPHONE200",
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    isActive: true
  },
  {
    id: "4",
    title: "Grocery Bundle Deal",
    description: "Buy 3 items get 1 free on selected grocery items",
    category: "groceries",
    discountPercentage: 25,
    originalPrice: 40,
    discountedPrice: 30,
    couponCode: "GROCERY3FOR2",
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    isActive: true
  }
];

export const mockStoreStock: Record<string, StoreStock[]> = {
  "iphone 15": [
    {
      storeId: "store1",
      storeName: "ShopMart Downtown",
      address: "123 Main St, Downtown",
      distance: 0.5,
      inStock: true,
      quantity: 8
    },
    {
      storeId: "store2", 
      storeName: "ShopMart Mall",
      address: "456 Mall Blvd, Shopping Center",
      distance: 2.1,
      inStock: true,
      quantity: 3
    },
    {
      storeId: "store3",
      storeName: "ShopMart Suburb",
      address: "789 Oak Ave, Suburbia",
      distance: 5.2,
      inStock: false,
      quantity: 0
    }
  ],
  "nike shoes": [
    {
      storeId: "store1",
      storeName: "ShopMart Downtown",
      address: "123 Main St, Downtown", 
      distance: 0.5,
      inStock: true,
      quantity: 15
    },
    {
      storeId: "store2",
      storeName: "ShopMart Mall",
      address: "456 Mall Blvd, Shopping Center",
      distance: 2.1,
      inStock: true,
      quantity: 22
    }
  ],
  "milk": [
    {
      storeId: "store1",
      storeName: "ShopMart Downtown",
      address: "123 Main St, Downtown",
      distance: 0.5,
      inStock: true,
      quantity: 45
    }
  ]
};

export const findDeals = (category: string): Deal[] => {
  return currentDeals.filter(deal => 
    deal.isActive && 
    deal.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getStockInfo = (productName: string): StoreStock[] => {
  const normalizedName = productName.toLowerCase();
  
  for (const [key, stores] of Object.entries(mockStoreStock)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return stores;
    }
  }
  
  return [];
};

export const activateCoupon = (couponCode: string): boolean => {
  const deal = currentDeals.find(d => d.couponCode === couponCode && d.isActive);
  return !!deal;
};