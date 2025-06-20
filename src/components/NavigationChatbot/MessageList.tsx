import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/hooks/useNavigationChat';
import MessageContent from './MessageContent';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onNavigateClick: (aisleId: string, itemName: string) => void;
  onActivateCoupon: (couponCode: string, dealTitle: string) => void;
}

const MessageList = ({ 
  messages, 
  isTyping, 
  messagesEndRef, 
  onNavigateClick, 
  onActivateCoupon 
}: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 max-h-96">
      <div className="space-y-4 pr-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <MessageContent
              message={message}
              onNavigateClick={onNavigateClick}
              onActivateCoupon={onActivateCoupon}
            />
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
  );
};

export default MessageList;