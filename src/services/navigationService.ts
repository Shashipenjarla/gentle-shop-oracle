import { findItemInStore, getAisleById } from '@/data/storeLayout';
import { getStockInfo, findDeals, activateCoupon, StoreStock, Deal } from '@/data/deals';

export interface NavigationResponse {
  text: string;
  itemInfo?: {
    items: any[];
    aisle?: string;
  };
  stockInfo?: StoreStock[];
  dealsInfo?: Deal[];
}

export const generateNavigationResponse = (userQuery: string): NavigationResponse => {
  const query = userQuery.toLowerCase();
  
  // Check for stock queries
  if (query.includes('stock') || query.includes('available') || query.includes('in stock')) {
    return handleStockQuery(query, userQuery);
  }

  // Check for deals queries
  if (query.includes('deal') || query.includes('discount') || query.includes('sale') || query.includes('offer')) {
    return handleDealsQuery(query);
  }
  
  // Find items matching the query
  const foundItems = findItemInStore(query);
  if (foundItems.length > 0) {
    return handleItemQuery(foundItems);
  }
  
  // Handle general location queries
  return handleLocationQuery(query, userQuery);
};

const handleStockQuery = (query: string, originalQuery: string): NavigationResponse => {
  const stockInfo = getStockInfo(query);
  if (stockInfo.length > 0) {
    const inStockStores = stockInfo.filter(store => store.inStock);
    let responseText = '';
    
    if (inStockStores.length > 0) {
      responseText = `Great news! I found stock availability:\n\n`;
      inStockStores.forEach(store => {
        responseText += `📍 ${store.storeName} (${store.distance} mi away)\n`;
        responseText += `   ${store.quantity} units in stock\n`;
        responseText += `   ${store.address}\n\n`;
      });
    } else {
      responseText = `Sorry, the item appears to be out of stock at nearby stores. `;
      if (stockInfo.length > 0) {
        responseText += `You can check these locations:\n\n`;
        stockInfo.forEach(store => {
          responseText += `📍 ${store.storeName} - Currently out of stock\n`;
        });
      }
    }
    
    return {
      text: responseText,
      stockInfo: stockInfo
    };
  }
  
  return {
    text: `I couldn't find stock information for "${originalQuery}". Please try a specific product name.`
  };
};

const handleDealsQuery = (query: string): NavigationResponse => {
  const category = extractCategory(query);
  const deals = findDeals(category || '');
  
  if (deals.length > 0) {
    let responseText = `🎉 I found ${deals.length} active deal(s):\n\n`;
    deals.forEach(deal => {
      responseText += `${deal.title}\n`;
      responseText += `${deal.description}\n`;
      responseText += `💰 ${deal.discountPercentage}% off - was $${deal.originalPrice}, now $${deal.discountedPrice}\n`;
      responseText += `🎫 Coupon: ${deal.couponCode}\n\n`;
    });
    responseText += `Would you like me to activate any of these coupons?`;
    
    return {
      text: responseText,
      dealsInfo: deals
    };
  }
  
  return {
    text: category 
      ? `No active deals found for ${category} at the moment.`
      : 'No active deals available right now. Check back later!'
  };
};

const handleItemQuery = (foundItems: any[]): NavigationResponse => {
  const item = foundItems[0];
  const aisle = getAisleById(item.aisle);
  
  let responseText = `I found "${item.name}" in ${aisle?.name} (${item.aisle}), ${item.section} section. `;
  
  if (foundItems.length > 1) {
    responseText += `I also found ${foundItems.length - 1} other related items. `;
  }
  
  responseText += "Would you like me to navigate you there?";
  
  return {
    text: responseText,
    itemInfo: {
      items: foundItems,
      aisle: item.aisle
    }
  };
};

const handleLocationQuery = (query: string, originalQuery: string): NavigationResponse => {
  if (query.includes('restroom') || query.includes('bathroom')) {
    return {
      text: "The restrooms are located at the back of the store, near aisle A6. Look for the purple area on the map!"
    };
  }
  
  if (query.includes('checkout') || query.includes('pay')) {
    return {
      text: "The checkout area is at the front center of the store. You can see it marked in purple on the map."
    };
  }
  
  if (query.includes('help') || query.includes('customer service')) {
    return {
      text: "Customer Service is located at the front left of the store. They can help you with returns, exchanges, and general inquiries."
    };
  }
  
  return {
    text: `I couldn't find "${originalQuery}" in our store. Try asking about:\n• Items: "toothpaste", "milk", "iPhone"\n• Stock: "Is iPhone 15 in stock?"\n• Deals: "Show me deals on shoes"\n• Locations: "restrooms", "checkout"`
  };
};

const extractCategory = (query: string): string => {
  const categories = ['shoes', 'electronics', 'groceries', 'clothing', 'beauty'];
  return categories.find(cat => query.includes(cat)) || '';
};

export const activateStoreCoupon = (couponCode: string): boolean => {
  return activateCoupon(couponCode);
};