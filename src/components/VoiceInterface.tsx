import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Product } from './ProductCard';

interface VoiceInterfaceProps {
  onSearch: (query: string) => void;
  onAddToCart: (product: Product) => void;
  products: Product[];
  onCheckOrderStatus: () => void;
}

const VoiceInterface = ({ onSearch, onAddToCart, products, onCheckOrderStatus }: VoiceInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const languages = {
    'en-US': 'English',
    'hi-IN': 'Hindi',
    'te-IN': 'Telugu'
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Voice activated",
          description: "Listening... Speak your command",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        toast({
          title: "Voice recognition error",
          description: "Please try again",
          variant: "destructive"
        });
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage]);

  const handleVoiceCommand = (transcript: string) => {
    // Search commands
    if (transcript.includes('search') || transcript.includes('find') || 
        transcript.includes('खोज') || transcript.includes('ढूंढ') ||
        transcript.includes('వెతక') || transcript.includes('కనుగొను')) {
      const searchTerm = extractSearchTerm(transcript);
      if (searchTerm) {
        onSearch(searchTerm);
        toast({
          title: "Voice search",
          description: `Searching for: ${searchTerm}`,
        });
      }
    }
    // Add to cart commands
    else if (transcript.includes('add to cart') || transcript.includes('buy') ||
             transcript.includes('कार्ट में डाल') || transcript.includes('खरीद') ||
             transcript.includes('కార్ట్‌లో చేర') || transcript.includes('కొనుగోలు')) {
      const productName = extractProductName(transcript);
      const product = findProductByName(productName);
      if (product) {
        onAddToCart(product);
        toast({
          title: "Added to cart",
          description: `${product.name} added via voice command`,
        });
      } else {
        toast({
          title: "Product not found",
          description: "Please try saying the product name clearly",
          variant: "destructive"
        });
      }
    }
    // Order status commands
    else if (transcript.includes('order status') || transcript.includes('my orders') ||
             transcript.includes('ऑर्डर स्थिति') || transcript.includes('मेरे ऑर्डर') ||
             transcript.includes('ఆర్డర్ స్థితి') || transcript.includes('నా ఆర్డర్లు')) {
      onCheckOrderStatus();
      toast({
        title: "Order status",
        description: "Checking your orders...",
      });
    }
    else {
      toast({
        title: "Command not recognized",
        description: "Try: 'Search for [item]', 'Add [item] to cart', or 'Check order status'",
        variant: "destructive"
      });
    }
  };

  const extractSearchTerm = (transcript: string): string => {
    const patterns = [
      /search (?:for )?(.+)/,
      /find (.+)/,
      /खोज(?:ें)? (.+)/,
      /ढूंढ(?:ें)? (.+)/,
      /వెతకండి (.+)/,
      /కనుగొనండి (.+)/
    ];
    
    for (const pattern of patterns) {
      const match = transcript.match(pattern);
      if (match) return match[1].trim();
    }
    return '';
  };

  const extractProductName = (transcript: string): string => {
    const patterns = [
      /add (.+) to cart/,
      /buy (.+)/,
      /(.+) कार्ट में डाल/,
      /(.+) खरीद/,
      /(.+) కార్ట్‌లో చేర/,
      /(.+) కొనుగోలు/
    ];
    
    for (const pattern of patterns) {
      const match = transcript.match(pattern);
      if (match) return match[1].trim();
    }
    return transcript;
  };

  const findProductByName = (name: string): Product | null => {
    return products.find(product => 
      product.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(product.name.toLowerCase())
    ) || null;
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.lang = currentLanguage;
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const cycleLanguage = () => {
    const languageKeys = Object.keys(languages);
    const currentIndex = languageKeys.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languageKeys.length;
    const newLanguage = languageKeys[nextIndex] as keyof typeof languages;
    setCurrentLanguage(newLanguage);
    
    toast({
      title: "Language changed",
      description: `Voice recognition set to ${languages[newLanguage]}`,
    });
  };

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Language selector */}
      <Button
        variant="secondary"
        size="sm"
        onClick={cycleLanguage}
        className="text-xs px-2 py-1 h-auto"
      >
        {languages[currentLanguage as keyof typeof languages]}
      </Button>
      
      {/* Main voice button */}
      <Button
        variant={isListening ? "destructive" : "default"}
        size="icon"
        onClick={toggleListening}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
          isListening ? 'animate-pulse scale-110' : 'hover:scale-105'
        }`}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default VoiceInterface;