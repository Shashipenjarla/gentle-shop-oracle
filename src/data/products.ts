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
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 45623,
    badge: 'Top Rated',
    category: 'Home & Garden',
    description: 'Multi-functional electric pressure cooker for fast and easy cooking.',
    features: ['7-in-1 functionality', '6-quart capacity', 'Stainless steel construction', 'Smart programming'],
    availability: 'in-stock',
    stockCount: 35
  },
  {
    id: '5',
    name: 'Apple MacBook Air M2 Chip 13.6" Laptop',
    price: 1099.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 1892,
    category: 'Electronics',
    description: 'Lightweight laptop with M2 chip and stunning Retina display.',
    features: ['M2 chip', '13.6-inch display', 'All-day battery', 'Lightweight design'],
    availability: 'in-stock',
    stockCount: 20
  },
  {
    id: '6',
    name: 'LEGO Creator Expert Modular Buildings Collection',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 756,
    category: 'Toys',
    description: 'Detailed LEGO building set for creative construction play.',
    features: ['3000+ pieces', 'Detailed instructions', 'Expert level difficulty', 'Display worthy'],
    availability: 'in-stock',
    stockCount: 15
  },
  {
    id: '7',
    name: 'Organic Bananas, 3 lbs',
    price: 2.98,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    rating: 4.2,
    reviewCount: 234,
    category: 'Groceries',
    description: 'Fresh organic bananas, perfect for snacking or smoothies.',
    features: ['Organic certified', 'Rich in potassium', 'Natural sugars', 'Fresh picked'],
    availability: 'in-stock',
    stockCount: 200,
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
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 567,
    category: 'Clothing',
    description: 'Premium running shoes with responsive cushioning.',
    features: ['Boost midsole', 'Primeknit upper', 'Continental rubber outsole', 'Energy return'],
    availability: 'in-stock',
    stockCount: 45
  },
  {
    id: '9',
    name: 'KitchenAid Stand Mixer 5-Qt Artisan Series',
    price: 349.99,
    originalPrice: 429.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 3421,
    badge: 'Popular',
    category: 'Home & Garden',
    description: 'Professional-grade stand mixer for all your baking needs.',
    features: ['5-quart capacity', 'Tilt-head design', '10 speeds', 'Multiple attachments'],
    availability: 'in-stock',
    stockCount: 12
  },
  {
    id: '10',
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 8934,
    category: 'Electronics'
  },
  {
    id: '11',
    name: 'Great Value 2% Reduced Fat Milk, 1 Gallon',
    price: 3.64,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    rating: 4.1,
    reviewCount: 1876,
    category: 'Groceries',
    description: 'Fresh 2% reduced fat milk, perfect for cereal and cooking.',
    features: ['Reduced fat', 'Vitamin D enriched', '1 gallon size', 'Fresh daily'],
    availability: 'in-stock',
    stockCount: 150
  },
  {
    id: '12',
    name: 'Hanes ComfortSoft Cotton T-Shirt 6-Pack',
    price: 24.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 2341,
    category: 'Clothing',
    description: 'Comfortable cotton t-shirts in convenient 6-pack.',
    features: ['100% cotton', 'Pre-shrunk', 'Tagless design', 'Multiple colors'],
    availability: 'in-stock',
    stockCount: 80
  },
  {
    id: '13',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    price: 549.99,
    originalPrice: 649.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 1234,
    badge: 'New',
    category: 'Home & Garden',
    description: 'Advanced cordless vacuum with laser detection technology.',
    features: ['Laser detection', 'Up to 60min runtime', 'HEPA filtration', 'Multiple attachments'],
    availability: 'in-stock',
    stockCount: 18
  },
  {
    id: '14',
    name: 'Nintendo Switch OLED Model Console',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 5432,
    category: 'Electronics',
    description: 'Gaming console with vibrant OLED screen and enhanced features.',
    features: ['7-inch OLED screen', 'Enhanced audio', '64GB storage', 'Dock included'],
    availability: 'in-stock',
    stockCount: 30
  },
  {
    id: '15',
    name: 'Barbie Dreamhouse Dollhouse with Pool and Slide',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 987,
    category: 'Toys',
    description: 'Multi-story dollhouse with pool, slide, and accessories.',
    features: ['3 stories', 'Pool and slide', '70+ accessories', 'Easy assembly'],
    availability: 'in-stock',
    stockCount: 25
  },
  {
    id: '16',
    name: 'Wonder Bread Classic White Bread, 20 oz',
    price: 1.48,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    rating: 4.0,
    reviewCount: 445,
    category: 'Groceries',
    description: 'Classic white sandwich bread, soft and fresh.',
    features: ['Enriched flour', 'Soft texture', '20 oz loaf', 'No artificial colors'],
    availability: 'in-stock',
    stockCount: 120
  },
  {
    id: '17',
    name: "Levi's 501 Original Fit Jeans - Men's",
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 3456,
    category: 'Clothing',
    description: 'Classic straight-fit jeans with authentic vintage styling.',
    features: ['100% cotton denim', 'Button fly', 'Straight fit', 'Classic 5-pocket'],
    availability: 'in-stock',
    stockCount: 65
  },
  {
    id: '18',
    name: 'Ninja Foodi Personal Blender for Smoothies',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=400&h=400&fit=crop',
    rating: 4.2,
    reviewCount: 2134,
    category: 'Home & Garden',
    description: 'Compact personal blender perfect for smoothies and shakes.',
    features: ['18oz cup', 'Leak-proof lid', 'Easy cleaning', 'Powerful motor'],
    availability: 'in-stock',
    stockCount: 55
  },
  {
    id: '19',
    name: 'Apple iPad Air 5th Generation 64GB WiFi',
    price: 499.99,
    originalPrice: 599.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 1567,
    category: 'Electronics',
    description: 'Powerful and versatile iPad with M1 chip and stunning display.',
    features: ['M1 chip', '10.9-inch display', '64GB storage', 'Touch ID'],
    availability: 'in-stock',
    stockCount: 28
  },
  {
    id: '20',
    name: 'Hot Wheels Track Builder Unlimited Triple Loop Kit',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 789,
    category: 'Toys',
    description: 'Exciting track set with triple loops and stunt features.',
    features: ['Triple loop track', '2 vehicles included', 'Modular design', 'Stunt challenges'],
    availability: 'in-stock',
    stockCount: 40
  },
  // Sports Category Products
  {
    id: '21',
    name: 'Wilson Official NFL Football',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 892,
    category: 'Sports',
    description: 'Official size and weight NFL football with premium leather construction.',
    features: ['Official NFL size', 'Premium leather', 'ACL laces', 'Wilson quality'],
    availability: 'in-stock',
    stockCount: 75
  },
  {
    id: '22',
    name: 'Premium Yoga Mat - Non-Slip Exercise Mat',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 1243,
    category: 'Sports',
    description: 'High-quality yoga mat with superior grip and cushioning.',
    features: ['Non-slip surface', '6mm thickness', 'Eco-friendly TPE', 'Carrying strap'],
    availability: 'in-stock',
    stockCount: 60,
    ecoData: {
      carbonFootprint: 2.1,
      isEcoFriendly: true,
      greenPoints: 25
    }
  },
  {
    id: '23',
    name: 'Wilson Pro Staff Tennis Racket',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 567,
    category: 'Sports',
    badge: 'Popular',
    description: 'Professional-grade tennis racket for serious players.',
    features: ['Carbon fiber frame', '100 sq in head', 'Comfortable grip', 'Pre-strung'],
    availability: 'in-stock',
    stockCount: 35
  },
  // Health & Beauty Category Products
  {
    id: '24',
    name: 'Vitamin C + Hyaluronic Acid Face Serum',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1570194065650-d99558015979?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 2156,
    category: 'Health & Beauty',
    description: 'Anti-aging face serum with vitamin C and hyaluronic acid.',
    features: ['20% Vitamin C', 'Hyaluronic acid', 'Anti-aging formula', 'Cruelty-free'],
    availability: 'in-stock',
    stockCount: 85,
    ecoData: {
      carbonFootprint: 0.8,
      isEcoFriendly: true,
      greenPoints: 20
    }
  },
  {
    id: '25',
    name: 'Optimum Nutrition Gold Standard Whey Protein',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 12450,
    badge: 'Top Rated',
    category: 'Health & Beauty',
    description: 'Premium whey protein powder for muscle building and recovery.',
    features: ['24g protein per serving', 'Fast absorption', 'Great taste', '5lb container'],
    availability: 'in-stock',
    stockCount: 95
  },
  {
    id: '26',
    name: 'Oral-B Pro 3000 Electric Toothbrush',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 3421,
    category: 'Health & Beauty',
    description: 'Advanced electric toothbrush with pressure sensor and timer.',
    features: ['Pressure sensor', '2-minute timer', 'Rechargeable', 'Multiple brush heads'],
    availability: 'in-stock',
    stockCount: 42
  },
  // Automotive Category Products
  {
    id: '27',
    name: 'Michelin Defender T+H All-Season Tire 215/60R16',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1558618666-0eca407fb0ab?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 1876,
    category: 'Automotive',
    description: 'Premium all-season tire with exceptional tread life and performance.',
    features: ['All-season tread', '80,000 mile warranty', 'Wet weather grip', 'Fuel efficient'],
    availability: 'in-stock',
    stockCount: 150
  },
  {
    id: '28',
    name: 'GIRO Register MIPS Bike Helmet',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 934,
    category: 'Automotive',
    description: 'Lightweight bike helmet with MIPS technology for enhanced protection.',
    features: ['MIPS technology', 'Lightweight design', 'Adjustable fit', 'Multiple vents'],
    availability: 'in-stock',
    stockCount: 55,
    ecoData: {
      carbonFootprint: 3.2,
      isEcoFriendly: true,
      greenPoints: 15
    }
  },
  {
    id: '29',
    name: 'Castrol GTX High Mileage 5W-30 Motor Oil, 5 Quart',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1558618666-0eca407fb0ab?w=400&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 2341,
    category: 'Automotive',
    description: 'Premium motor oil designed for vehicles with over 75,000 miles.',
    features: ['High mileage formula', '5W-30 viscosity', 'Seal conditioners', '5 quart jug'],
    availability: 'in-stock',
    stockCount: 120
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