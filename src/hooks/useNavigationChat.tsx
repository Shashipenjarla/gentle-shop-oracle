import { useState, useRef, useEffect } from 'react';
import { generateNavigationResponse } from '@/services/navigationService';
import { StoreStock, Deal } from '@/data/deals';

export interface Message {
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

export const useNavigationChat = () => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = generateNavigationResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        itemInfo: response.itemInfo,
        stockInfo: response.stockInfo,
        dealsInfo: response.dealsInfo
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendQuickMessage = (message: string) => {
    setInput(message);
    setTimeout(sendMessage, 100);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    sendMessage,
    handleKeyPress,
    sendQuickMessage
  };
};