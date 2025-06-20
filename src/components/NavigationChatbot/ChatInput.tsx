import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onQuickMessage: (message: string) => void;
}

const ChatInput = ({ 
  input, 
  setInput, 
  onSendMessage, 
  onKeyPress, 
  onQuickMessage 
}: ChatInputProps) => {
  const quickSuggestions = [
    { text: 'iPhone stock?', query: 'Is iPhone 15 in stock?' },
    { text: 'Shoe deals', query: 'Show me deals on shoes' },
    { text: 'Restrooms', query: 'Where are the restrooms?' },
    { text: 'Milk location', query: 'Where can I find milk?' }
  ];

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask me where to find anything..."
          className="flex-1"
        />
        <Button onClick={onSendMessage} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2">
        {quickSuggestions.map((suggestion) => (
          <Badge
            key={suggestion.text}
            variant="outline"
            className="cursor-pointer hover:bg-accent"
            onClick={() => onQuickMessage(suggestion.query)}
          >
            {suggestion.text}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;