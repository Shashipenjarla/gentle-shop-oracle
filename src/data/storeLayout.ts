export interface StoreItem {
  name: string;
  aisle: string;
  section: string;
  category: string;
}

export interface StoreAisle {
  id: string;
  name: string;
  sections: string[];
  position: { x: number; y: number; width: number; height: number };
  items: StoreItem[];
}

export interface StoreLayout {
  name: string;
  aisles: StoreAisle[];
  specialAreas: {
    id: string;
    name: string;
    position: { x: number; y: number; width: number; height: number };
  }[];
}

// Dummy Walmart store layout
export const walmartStoreLayout: StoreLayout = {
  name: "Walmart Supercenter - Demo Store",
  aisles: [
    {
      id: "A1",
      name: "Grocery - Produce",
      sections: ["Fresh Fruits", "Fresh Vegetables", "Organic Produce"],
      position: { x: 50, y: 100, width: 120, height: 40 },
      items: [
        { name: "Bananas", aisle: "A1", section: "Fresh Fruits", category: "Produce" },
        { name: "Apples", aisle: "A1", section: "Fresh Fruits", category: "Produce" },
        { name: "Lettuce", aisle: "A1", section: "Fresh Vegetables", category: "Produce" },
        { name: "Tomatoes", aisle: "A1", section: "Fresh Vegetables", category: "Produce" }
      ]
    },
    {
      id: "A2",
      name: "Grocery - Dairy & Frozen",
      sections: ["Milk & Eggs", "Cheese", "Frozen Foods"],
      position: { x: 200, y: 100, width: 120, height: 40 },
      items: [
        { name: "Milk", aisle: "A2", section: "Milk & Eggs", category: "Dairy" },
        { name: "Eggs", aisle: "A2", section: "Milk & Eggs", category: "Dairy" },
        { name: "Cheese", aisle: "A2", section: "Cheese", category: "Dairy" },
        { name: "Ice Cream", aisle: "A2", section: "Frozen Foods", category: "Frozen" }
      ]
    },
    {
      id: "A3",
      name: "Health & Beauty",
      sections: ["Personal Care", "Pharmacy", "Beauty Products"],
      position: { x: 350, y: 100, width: 120, height: 40 },
      items: [
        { name: "Toothpaste", aisle: "A3", section: "Personal Care", category: "Health" },
        { name: "Shampoo", aisle: "A3", section: "Personal Care", category: "Health" },
        { name: "Makeup", aisle: "A3", section: "Beauty Products", category: "Beauty" },
        { name: "Vitamins", aisle: "A3", section: "Pharmacy", category: "Health" }
      ]
    },
    {
      id: "A4",
      name: "Electronics",
      sections: ["TVs & Audio", "Computers", "Mobile Phones"],
      position: { x: 50, y: 200, width: 120, height: 40 },
      items: [
        { name: "Television", aisle: "A4", section: "TVs & Audio", category: "Electronics" },
        { name: "Laptop", aisle: "A4", section: "Computers", category: "Electronics" },
        { name: "iPhone", aisle: "A4", section: "Mobile Phones", category: "Electronics" },
        { name: "Headphones", aisle: "A4", section: "TVs & Audio", category: "Electronics" }
      ]
    },
    {
      id: "A5",
      name: "Clothing",
      sections: ["Men's Wear", "Women's Wear", "Kids' Wear"],
      position: { x: 200, y: 200, width: 120, height: 40 },
      items: [
        { name: "T-Shirt", aisle: "A5", section: "Men's Wear", category: "Clothing" },
        { name: "Jeans", aisle: "A5", section: "Women's Wear", category: "Clothing" },
        { name: "Kids Shoes", aisle: "A5", section: "Kids' Wear", category: "Clothing" },
        { name: "Dress", aisle: "A5", section: "Women's Wear", category: "Clothing" }
      ]
    },
    {
      id: "A6",
      name: "Home & Garden",
      sections: ["Home Decor", "Kitchen", "Garden Supplies"],
      position: { x: 350, y: 200, width: 120, height: 40 },
      items: [
        { name: "Pillow", aisle: "A6", section: "Home Decor", category: "Home" },
        { name: "Cookware", aisle: "A6", section: "Kitchen", category: "Home" },
        { name: "Plants", aisle: "A6", section: "Garden Supplies", category: "Garden" },
        { name: "Towels", aisle: "A6", section: "Home Decor", category: "Home" }
      ]
    }
  ],
  specialAreas: [
    { id: "entrance", name: "Main Entrance", position: { x: 225, y: 50, width: 50, height: 20 } },
    { id: "checkout", name: "Checkout", position: { x: 200, y: 300, width: 100, height: 30 } },
    { id: "customer-service", name: "Customer Service", position: { x: 50, y: 300, width: 80, height: 30 } },
    { id: "restrooms", name: "Restrooms", position: { x: 400, y: 300, width: 60, height: 30 } }
  ]
};

// Helper function to find items
export const findItemInStore = (query: string): StoreItem[] => {
  const searchTerm = query.toLowerCase();
  const allItems = walmartStoreLayout.aisles.flatMap(aisle => aisle.items);
  
  return allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm) ||
    item.section.toLowerCase().includes(searchTerm)
  );
};

// Helper function to get aisle by ID
export const getAisleById = (aisleId: string): StoreAisle | undefined => {
  return walmartStoreLayout.aisles.find(aisle => aisle.id === aisleId);
};