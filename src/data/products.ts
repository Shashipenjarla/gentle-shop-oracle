export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  category: string;
  description?: string;
  features?: string[];
  availability?: 'in-stock' | 'low-stock' | 'out-of-stock';
  stockCount?: number;
  ecoData?: {
    carbonFootprint: number;
    isEcoFriendly: boolean;
    greenPoints: number;
  };
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB Natural Titanium',
    price: 1199.99,
    originalPrice: 1299.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 2847,
    badge: 'Bestseller',
    category: 'Electronics',
    description: 'Latest iPhone with titanium design, advanced camera system, and A17 Pro chip.',
    features: ['A17 Pro chip', '256GB storage', 'Titanium design', 'Advanced camera system', '5G connectivity'],
    availability: 'in-stock',
    stockCount: 50,
    ecoData: {
      carbonFootprint: 8.2,
      isEcoFriendly: false,
      greenPoints: 0
    }
  },
  {
    id: '2',
    name: 'Samsung 65" Class QLED 4K UHD Smart TV',
    price: 899.99,
    originalPrice: 1199.99,
    image: '/placeholder.svg',
    rating: 4.3,
    reviewCount: 1523,
    category: 'Electronics',
    description: 'Large 65-inch QLED smart TV with 4K UHD resolution and HDR support.',
    features: ['65-inch QLED display', '4K UHD resolution', 'HDR support', 'Smart TV features', 'Multiple HDMI ports'],
    availability: 'in-stock',
    stockCount: 25,
    ecoData: {
      carbonFootprint: 12.5,
      isEcoFriendly: false,
      greenPoints: 0
    }
  },
  {
    id: '3',
    name: 'Nike Air Max 270 Running Shoes - Black/White',
    price: 89.99,
    originalPrice: 130.00,
    image: '/placeholder.svg',
    rating: 4.4,
    reviewCount: 892,
    category: 'Clothing',
    description: 'Comfortable running shoes with Air Max cushioning technology.',
    features: ['Air Max cushioning', 'Breathable mesh upper', 'Durable rubber outsole', 'Lightweight design'],
    availability: 'in-stock',
    stockCount: 100
  },
  {
    id: '4',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart',
    price: 79.99,
    originalPrice: 119.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 45623,
    badge: 'Top Rated',
    category: 'Home & Garden'
  },
  {
    id: '5',
    name: 'Apple MacBook Air M2 Chip 13.6" Laptop',
    price: 1099.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 1892,
    category: 'Electronics'
  },
  {
    id: '6',
    name: 'LEGO Creator Expert Modular Buildings Collection',
    price: 199.99,
    originalPrice: 249.99,
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 756,
    category: 'Toys'
  },
  {
    id: '7',
    name: 'Organic Bananas, 3 lbs',
    price: 2.98,
    image: '/placeholder.svg',
    rating: 4.2,
    reviewCount: 234,
    category: 'Groceries',
    ecoData: {
      carbonFootprint: 0.3,
      isEcoFriendly: true,
      greenPoints: 15
    }
  },
  {
    id: '8',
    name: 'Adidas Ultraboost 22 Running Shoes - Women',
    price: 139.99,
    originalPrice: 180.00,
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 567,
    category: 'Clothing'
  },
  {
    id: '9',
    name: 'KitchenAid Stand Mixer 5-Qt Artisan Series',
    price: 349.99,
    originalPrice: 429.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 3421,
    badge: 'Popular',
    category: 'Home & Garden'
  },
  {
    id: '10',
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    price: 249.99,
    originalPrice: 349.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 8934,
    category: 'Electronics'
  },
  {
    id: '11',
    name: 'Great Value 2% Reduced Fat Milk, 1 Gallon',
    price: 3.64,
    image: '/placeholder.svg',
    rating: 4.1,
    reviewCount: 1876,
    category: 'Groceries'
  },
  {
    id: '12',
    name: 'Hanes ComfortSoft Cotton T-Shirt 6-Pack',
    price: 24.99,
    originalPrice: 39.99,
    image: '/placeholder.svg',
    rating: 4.3,
    reviewCount: 2341,
    category: 'Clothing'
  },
  {
    id: '13',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    price: 549.99,
    originalPrice: 649.99,
    image: '/placeholder.svg',
    rating: 4.4,
    reviewCount: 1234,
    badge: 'New',
    category: 'Home & Garden'
  },
  {
    id: '14',
    name: 'Nintendo Switch OLED Model Console',
    price: 299.99,
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 5432,
    category: 'Electronics'
  },
  {
    id: '15',
    name: 'Barbie Dreamhouse Dollhouse with Pool and Slide',
    price: 199.99,
    originalPrice: 249.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 987,
    category: 'Toys'
  },
  {
    id: '16',
    name: 'Wonder Bread Classic White Bread, 20 oz',
    price: 1.48,
    image: '/placeholder.svg',
    rating: 4.0,
    reviewCount: 445,
    category: 'Groceries'
  },
  {
    id: '17',
    name: 'Levi\'s 501 Original Fit Jeans - Men\'s',
    price: 59.99,
    originalPrice: 79.99,
    image: '/placeholder.svg',
    rating: 4.4,
    reviewCount: 3456,
    category: 'Clothing'
  },
  {
    id: '18',
    name: 'Ninja Foodi Personal Blender for Smoothies',
    price: 39.99,
    originalPrice: 59.99,
    image: '/placeholder.svg',
    rating: 4.2,
    reviewCount: 2134,
    category: 'Home & Garden'
  },
  {
    id: '19',
    name: 'Apple iPad Air 5th Generation 64GB WiFi',
    price: 499.99,
    originalPrice: 599.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 1567,
    category: 'Electronics'
  },
  {
    id: '20',
    name: 'Hot Wheels Track Builder Unlimited Triple Loop Kit',
    price: 49.99,
    originalPrice: 69.99,
    image: '/placeholder.svg',
    rating: 4.3,
    reviewCount: 789,
    category: 'Toys'
  }
];

export const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Groceries',
  'Toys',
  'Sports',
  'Health & Beauty',
  'Automotive'
];

export const getFeaturedProducts = () => {
  return sampleProducts.filter(product => 
    product.badge === 'Bestseller' || 
    product.badge === 'Top Rated' || 
    product.badge === 'Popular' ||
    product.originalPrice // Products with discounts
  ).slice(0, 10);
};

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};