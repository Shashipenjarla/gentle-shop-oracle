import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { findItemInStore, getAisleById, walmartStoreLayout } from '@/data/storeLayout';
import { getStockInfo, findDeals, activateCoupon, StoreStock, Deal } from '@/data/deals';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  itemInfo?: {
    items: any[];
    aisle?: string;
  };
  stockInfo?: StoreStock[];
  dealsInfo?: Deal[];
}

interface NavigationChatbotProps {
  onNavigateToAisle: (aisleId: string) => void;
  onHighlightItem: (itemName: string) => void;
}

const NavigationChatbot = ({ onNavigateToAisle, onHighlightItem }: NavigationChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your store navigator. Ask me where to find any item, and I'll guide you there!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userQuery: string): Message => {
    const query = userQuery.toLowerCase();
    
    // Check for stock queries
    if (query.includes('stock') || query.includes('available') || query.includes('in stock')) {
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
          id: Date.now().toString(),
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
          stockInfo: stockInfo
        };
      }
    }

    // Check for deals queries
    if (query.includes('deal') || query.includes('discount') || query.includes('sale') || query.includes('offer')) {
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
          id: Date.now().toString(),
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
          dealsInfo: deals
        };
      }
    }
    
    // Find items matching the query
    const foundItems = findItemInStore(query);
    
    if (foundItems.length > 0) {
      const item = foundItems[0];
      const aisle = getAisleById(item.aisle);
      
      let responseText = `I found "${item.name}" in ${aisle?.name} (${item.aisle}), ${item.section} section. `;
      
      if (foundItems.length > 1) {
        responseText += `I also found ${foundItems.length - 1} other related items. `;
      }
      
      responseText += "Would you like me to navigate you there?";
      
      return {
        id: Date.now().toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        itemInfo: {
          items: foundItems,
          aisle: item.aisle
        }
      };
    }
    
    // Handle general queries
    if (query.includes('restroom') || query.includes('bathroom')) {
      return {
        id: Date.now().toString(),
        text: "The restrooms are located at the back of the store, near aisle A6. Look for the purple area on the map!",
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    if (query.includes('checkout') || query.includes('pay')) {
      return {
        id: Date.now().toString(),
        text: "The checkout area is at the front center of the store. You can see it marked in purple on the map.",
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    if (query.includes('help') || query.includes('customer service')) {
      return {
        id: Date.now().toString(),
        text: "Customer Service is located at the front left of the store. They can help you with returns, exchanges, and general inquiries.",
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    // Default response for unknown queries
    return {
      id: Date.now().toString(),
      text: `I couldn't find "${userQuery}" in our store. Try asking about:\n• Items: "toothpaste", "milk", "iPhone"\n• Stock: "Is iPhone 15 in stock?"\n• Deals: "Show me deals on shoes"\n• Locations: "restrooms", "checkout"`,
      sender: 'bot',
      timestamp: new Date()
    };
  };

  const extractCategory = (query: string): string => {
    const categories = ['shoes', 'electronics', 'groceries', 'clothing', 'beauty'];
    return categories.find(cat => query.includes(cat)) || '';
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleNavigateClick = (aisleId: string, itemName: string) => {
    onNavigateToAisle(aisleId);
    onHighlightItem(itemName);
    
    toast({
      title: "Navigation Started",
      description: `Navigating to ${itemName} in aisle ${aisleId}`,
    });
  };

  const handleActivateCoupon = (couponCode: string, dealTitle: string) => {
    const success = activateCoupon(couponCode);
    
    toast({
      title: success ? "Coupon Activated!" : "Coupon Failed",
      description: success ? `${couponCode} is now active for ${dealTitle}` : `Failed to activate ${couponCode}`,
      variant: success ? "default" : "destructive"
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          Store Navigator Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Messages */}
        <ScrollArea className="flex-1 max-h-96">
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  
                  {/* Item navigation buttons */}
                  {message.itemInfo && (
                    <div className="mt-3 space-y-2">
                      {message.itemInfo.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-2">
                          <div className="text-xs">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground ml-1">- {item.aisle}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNavigateClick(item.aisle, item.name)}
                            className="h-6 px-2 text-xs"
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Go
                          </Button>
                        </div>
                      ))}
                      
                      {message.itemInfo.items.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{message.itemInfo.items.length - 3} more items found
                        </p>
                      )}
                    </div>
                  )}

                  {/* Stock information */}
                  {message.stockInfo && (
                    <div className="mt-3 space-y-2">
                      {message.stockInfo.filter(store => store.inStock).slice(0, 2).map((store, index) => (
                        <div key={index} className="text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded">
                          <div className="font-medium text-green-700 dark:text-green-300">{store.storeName}</div>
                          <div className="text-green-600 dark:text-green-400">{store.quantity} in stock • {store.distance} mi</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Deals information */}
                  {message.dealsInfo && (
                    <div className="mt-3 space-y-2">
                      {message.dealsInfo.slice(0, 2).map((deal, index) => (
                        <div key={index} className="flex items-center justify-between gap-2 bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
                          <div className="text-xs">
                            <div className="font-medium text-orange-700 dark:text-orange-300">{deal.discountPercentage}% OFF</div>
                            <div className="text-orange-600 dark:text-orange-400">{deal.couponCode}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleActivateCoupon(deal.couponCode, deal.title)}
                            className="h-6 px-2 text-xs"
                          >
                            Activate
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me where to find anything..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-2">
          {[
            { text: 'iPhone stock?', query: 'Is iPhone 15 in stock?' },
            { text: 'Shoe deals', query: 'Show me deals on shoes' },
            { text: 'Restrooms', query: 'Where are the restrooms?' },
            { text: 'Milk location', query: 'Where can I find milk?' }
          ].map((suggestion) => (
            <Badge
              key={suggestion.text}
              variant="outline"
              className="cursor-pointer hover:bg-accent"
              onClick={() => {
                setInput(suggestion.query);
                setTimeout(handleSendMessage, 100);
              }}
            >
              {suggestion.text}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationChatbot;