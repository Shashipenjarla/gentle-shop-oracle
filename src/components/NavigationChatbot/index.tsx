import { MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigationChat } from '@/hooks/useNavigationChat';
import { activateStoreCoupon } from '@/services/navigationService';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface NavigationChatbotProps {
  onNavigateToAisle: (aisleId: string) => void;
  onHighlightItem: (itemName: string) => void;
}

const NavigationChatbot = ({ onNavigateToAisle, onHighlightItem }: NavigationChatbotProps) => {
  const { toast } = useToast();
  const {
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    sendMessage,
    handleKeyPress,
    sendQuickMessage
  } = useNavigationChat();

  const handleNavigateClick = (aisleId: string, itemName: string) => {
    onNavigateToAisle(aisleId);
    onHighlightItem(itemName);
    
    toast({
      title: "Navigation Started",
      description: `Navigating to ${itemName} in aisle ${aisleId}`,
    });
  };

  const handleActivateCoupon = (couponCode: string, dealTitle: string) => {
    const success = activateStoreCoupon(couponCode);
    
    toast({
      title: success ? "Coupon Activated!" : "Coupon Failed",
      description: success ? `${couponCode} is now active for ${dealTitle}` : `Failed to activate ${couponCode}`,
      variant: success ? "default" : "destructive"
    });
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
        <MessageList
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          onNavigateClick={handleNavigateClick}
          onActivateCoupon={handleActivateCoupon}
        />
        
        <ChatInput
          input={input}
          setInput={setInput}
          onSendMessage={sendMessage}
          onKeyPress={handleKeyPress}
          onQuickMessage={sendQuickMessage}
        />
      </CardContent>
    </Card>
  );
};

export default NavigationChatbot;