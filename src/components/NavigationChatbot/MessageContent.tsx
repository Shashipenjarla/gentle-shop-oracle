import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import { Message } from '@/hooks/useNavigationChat';

interface MessageContentProps {
  message: Message;
  onNavigateClick: (aisleId: string, itemName: string) => void;
  onActivateCoupon: (couponCode: string, dealTitle: string) => void;
}

const MessageContent = ({ message, onNavigateClick, onActivateCoupon }: MessageContentProps) => {
  return (
    <div
      className={`max-w-[80%] rounded-lg p-3 ${
        message.sender === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted'
      }`}
    >
      <p className="text-sm whitespace-pre-line">{message.text}</p>
      
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
                onClick={() => onNavigateClick(item.aisle, item.name)}
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
                onClick={() => onActivateCoupon(deal.couponCode, deal.title)}
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
  );
};

export default MessageContent;