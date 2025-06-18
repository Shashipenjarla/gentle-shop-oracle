import { useState } from 'react';
import { Share2, Heart, Instagram, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Product } from './ProductCard';

interface OutfitItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface SocialSharingProps {
  outfitItems: OutfitItem[];
  outfitName?: string;
}

const SocialSharing = ({ outfitItems, outfitName = "My Outfit" }: SocialSharingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const totalPrice = outfitItems.reduce((sum, item) => sum + item.price, 0);
  
  const generateOutfitText = () => {
    const itemsList = outfitItems.map(item => `• ${item.name} - $${item.price.toFixed(2)}`).join('\n');
    return `Check out my ${outfitName}!\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}\n\nShop at ShopMart: ${window.location.origin}`;
  };

  const generateOutfitUrl = () => {
    const params = new URLSearchParams();
    params.set('outfit', outfitItems.map(item => item.id).join(','));
    params.set('name', outfitName);
    return `${window.location.origin}?${params.toString()}`;
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(generateOutfitText());
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
    
    toast({
      title: "Sharing via WhatsApp",
      description: "Opening WhatsApp to share your outfit",
    });
  };

  const shareViaInstagram = () => {
    // Instagram doesn't support direct text sharing, so we'll copy to clipboard
    navigator.clipboard.writeText(generateOutfitText()).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Outfit details copied! Open Instagram and paste to share",
      });
    });
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out my ${outfitName}!`);
    const body = encodeURIComponent(generateOutfitText());
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
    
    toast({
      title: "Opening email client",
      description: "Creating email with outfit details",
    });
  };

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: outfitName,
          text: generateOutfitText(),
          url: generateOutfitUrl(),
        });
        
        toast({
          title: "Shared successfully",
          description: "Your outfit has been shared!",
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(generateOutfitText()).then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Outfit details copied to clipboard",
        });
      });
    }
  };

  if (outfitItems.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Outfit
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Share Your Outfit
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Outfit Preview */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{outfitName}</h3>
              <div className="space-y-2">
                {outfitItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="flex-1">{item.name}</span>
                    <Badge variant="secondary">${item.price.toFixed(2)}</Badge>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={shareViaWhatsApp}
              className="flex items-center gap-2 h-12"
            >
              <MessageCircle className="h-5 w-5 text-green-600" />
              WhatsApp
            </Button>
            
            <Button
              variant="outline"
              onClick={shareViaInstagram}
              className="flex items-center gap-2 h-12"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
              Instagram
            </Button>
            
            <Button
              variant="outline"
              onClick={shareViaEmail}
              className="flex items-center gap-2 h-12"
            >
              <Mail className="h-5 w-5 text-blue-600" />
              Email
            </Button>
            
            <Button
              variant="outline"
              onClick={shareViaNative}
              className="flex items-center gap-2 h-12"
            >
              <Share2 className="h-5 w-5" />
              More
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialSharing;